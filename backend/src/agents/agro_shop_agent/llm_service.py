import json
from typing import List

import requests

from models import Product


class LLMService:
    """Service to interact with local LLM."""

    def __init__(self, base_url="http://127.0.0.1:1234/v1"):
        """Initialize the LLM service."""
        self.base_url = base_url
        self.headers = {"Content-Type": "application/json"}

    def extract_search_params(self, user_prompt: str) -> dict:
        """
        Extract search parameters from user prompt using LLM.

        Args:
            user_prompt (str): The user's natural language query.

        Returns:
            dict: Extracted parameters (query, limit, sort).
        """
        system_prompt = """
        You are a helpful shopping assistant. Your task is to extract search parameters from the user's request.
        The available parameters are:
        - query: The main product search term. IMPORTANT: Translate this to Russian if it is not already. The API only understands Russian.
        - limit: The number of results to return (default to 10 if not specified).
        - sort: The sort order. Can be "price_asc", "price_desc", "new", "popular". Infer this from terms like "cheap", "expensive", "newest", "best".

        Return ONLY a JSON object with these keys. Do not include any other text.
        Example:
        User: "Show me 5 cheap laptops"
        Output: {"query": "ноутбук", "limit": 5, "sort": "price_asc"}
        """

        payload = {
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "temperature": 0.1,
            "max_tokens": 100,
        }

        try:
            response = requests.post(
                f"{self.base_url}/chat/completions", headers=self.headers, json=payload
            )
            response.raise_for_status()
            result = response.json()
            content = result["choices"][0]["message"]["content"]

            # Clean up content if it contains markdown code blocks
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0].strip()
            elif "```" in content:
                content = content.split("```")[1].split("```")[0].strip()

            return json.loads(content)
        except Exception as e:
            print(f"Error calling LLM: {e}")
            # Fallback to simple extraction if LLM fails
            return {"query": user_prompt, "limit": 20}

    def filter_results(self, user_query: str, products: List[Product]) -> List[int]:
        """
        Filter products based on relevance to the user query using LLM.

        Args:
            user_query (str): The original user query.
            products (List[Product]): List of products to filter.

        Returns:
            List[int]: List of valid product IDs.
        """
        if not products:
            return []

        product_list_str = "\n".join(
            [f"- ID: {p.id}, Name: {p.name}" for p in products]
        )

        system_prompt = """
        You are a strict shopping assistant. Your task is to filter a list of products and keep ONLY those that strictly match the user's intent.
        
        Rules:
        1. If the user asks for a specific product (e.g., "iPhone 15"), remove accessories (cases, chargers) unless explicitly asked for.
        2. If the user asks for a category (e.g., "washing machine"), remove unrelated items.
        3. Be strict. Better to show fewer, highly relevant results than many irrelevant ones.
        
        Input Format:
        User Query: [query]
        Products:
        - ID: [id], Name: [name]
        ...

        Output Format:
        Return ONLY a JSON object with a single key "valid_ids" containing a list of integers.
        Example: {"valid_ids": [123, 456]}
        """

        user_content = f"User Query: {user_query}\nProducts:\n{product_list_str}"

        payload = {
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_content},
            ],
            "temperature": 0.1,
            "max_tokens": 500,
        }

        try:
            response = requests.post(
                f"{self.base_url}/chat/completions", headers=self.headers, json=payload
            )
            response.raise_for_status()
            result = response.json()
            content = result["choices"][0]["message"]["content"]

            # Clean up content
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0].strip()
            elif "```" in content:
                content = content.split("```")[1].split("```")[0].strip()

            data = json.loads(content)
            return data.get("valid_ids", [])
        except Exception as e:
            print(f"Error filtering results: {e}")
            # If validation fails, return all IDs to be safe (or none? safe is all)
            return [p.id for p in products]
