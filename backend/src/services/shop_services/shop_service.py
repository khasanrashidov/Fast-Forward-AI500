import math
from pathlib import Path
from typing import Any, Dict, List, Optional

from langchain_core.prompts import ChatPromptTemplate

from configurations.logging_config import get_logger
from models.shop_models import (FilteredProductList, Product, SearchResult,
                                ShopInsight, ShopSearchParams)
from services.ai_services.llm_client import LLMClient
from services.shop_services.texnomart_client import TexnomartClient

logger = get_logger(__name__)

PROMPTS_DIR = Path(__file__).parent.parent.parent / "prompts"


def _load_prompt(filename: str) -> str:
    """Load prompt from file in prompts directory."""
    prompt_path = PROMPTS_DIR / filename
    try:
        with open(prompt_path, "r", encoding="utf-8") as f:
            return f.read().strip()
    except Exception as e:
        logger.error(f"Error loading prompt {filename}: {e}")
        return ""


class ShopService:
    """Service for Shop Agent operations."""

    def __init__(self):
        self.texnomart_client = TexnomartClient()
        self.llm_client = LLMClient()

    def search_products(self, user_query: str) -> Dict[str, Any]:
        """
        Orchestrate the search process:
        1. Extract params (query, limit, sort) via AI.
        2. Search Texnomart API.
        3. Filter results via AI.
        4. Generate insights via AI.
        """
        # 1. Extract params
        params = self._extract_search_params(user_query)
        logger.info(f"Extracted params: {params}")

        # 2. Search API
        search_result = self.texnomart_client.search(
            query=params.query, limit=params.limit
        )

        if (
            not search_result
            or not search_result.data
            or not search_result.data.products
        ):
            return {
                "user_query": user_query,
                "translated_query": params.query,
                "products": [],
                "insight": "Sorry, I couldn't find any products matching your request.",
            }

        all_products = search_result.data.products

        # 3. Filter results
        valid_ids = self._filter_results(user_query, all_products)
        filtered_products = [p for p in all_products if p.id in valid_ids]

        # If filtering removed everything (maybe too strict?), fall back to top 5 original
        if not filtered_products and all_products:
            logger.warning(
                "Filtering removed all products. Falling back to original results."
            )
            filtered_products = all_products[:5]

        # Calculate installments for all filtered products
        # Calculate installments for all filtered products
        for p in filtered_products:
            # Populate URL
            p.product_url = f"https://texnomart.uz/product/detail/{p.id}"

            # Calculate Opencard (12 months, 1.45 coefficient)
            if p.sale_price > 0:
                total = math.ceil((p.sale_price * 1.45) / 1000) * 1000
                monthly = math.ceil(total / 12)
                p.opencard_total_price = int(total)
                p.opencard_monthly_payment = int(monthly)
                p.opencard_month_text = "12 months"

        # 4. Generate Insight
        insight = self._generate_insight(user_query, filtered_products)

        # 5. Format Response using ProductResponse
        # Note: We manually map or use dict comprehension to match the specific subset requested
        # 'sale_price' is purposefully removed from the output as per request, but used for calculation.

        from models.shop_models import ProductResponse

        final_products = []
        for p in filtered_products:
            final_products.append(
                {
                    "all_count": p.all_count,
                    "id": p.id,
                    "image": p.image,
                    "name": p.name,
                    "opencard_month_text": p.opencard_month_text,
                    "opencard_monthly_payment": p.opencard_monthly_payment,
                    "opencard_total_price": p.opencard_total_price,
                    "product_url": p.product_url,
                }
            )

        return {
            "user_query": user_query,
            "translated_query": params.query,
            "products": final_products,
            "insight": insight,
            "total_found": len(all_products),
            "shown": len(filtered_products),
        }

    def _extract_search_params(self, user_query: str) -> ShopSearchParams:
        """Extract query params using LLM."""
        try:
            structured_llm = self.llm_client.llm.with_structured_output(
                ShopSearchParams
            )

            system_prompt = _load_prompt("shop_search_params_system.md")
            user_prompt_template = _load_prompt("shop_search_params_user.md")

            prompt = ChatPromptTemplate.from_messages(
                [("system", system_prompt), ("user", user_prompt_template)]
            )

            chain = prompt | structured_llm
            return chain.invoke({"query": user_query})

        except Exception as e:
            logger.error(f"Params extraction failed: {e}")
            # Fallback
            return ShopSearchParams(query=user_query)

    def _filter_results(self, user_query: str, products: List[Product]) -> List[int]:
        """Filter products using LLM."""
        try:
            structured_llm = self.llm_client.llm.with_structured_output(
                FilteredProductList
            )

            system_prompt = _load_prompt("shop_filter_results_system.md")
            user_prompt_template = _load_prompt("shop_filter_results_user.md")

            # Prepare product list string
            product_str = "\n".join(
                [
                    f"- ID: {p.id}, Name: {p.name}, Price: {p.sale_price}"
                    for p in products[:20]
                ]  # Limit context
            )

            prompt = ChatPromptTemplate.from_messages(
                [("system", system_prompt), ("user", user_prompt_template)]
            )

            chain = prompt | structured_llm
            response = chain.invoke({"query": user_query, "products": product_str})
            return response.relevant_ids

        except Exception as e:
            logger.error(f"Filtering failed: {e}")
            # Return all IDs if fail
            return [p.id for p in products]

    def _generate_insight(self, user_query: str, products: List[Product]) -> str:
        """Generate shopping insight."""
        try:
            if not products:
                return "No products to analyze."

            structured_llm = self.llm_client.llm.with_structured_output(ShopInsight)

            system_prompt = _load_prompt("shop_insights_system.md")
            user_prompt_template = _load_prompt("shop_insights_user.md")

            # Context
            top_products = products[:5]
            product_str = "\n".join(
                [f"- {p.name}: {p.sale_price} UZS" for p in top_products]
            )

            # Calculate installments locally to give context to AI
            installments = []
            for p in top_products:
                total = math.ceil((p.sale_price * 1.45) / 1000) * 1000
                monthly = math.ceil(total / 12)
                installments.append(f"{p.name}: ~{monthly} UZS/mo")

            installments_str = "\n".join(installments)

            prompt = ChatPromptTemplate.from_messages(
                [("system", system_prompt), ("user", user_prompt_template)]
            )

            chain = prompt | structured_llm
            response = chain.invoke(
                {
                    "query": user_query,
                    "products": product_str,
                    "installments": installments_str,
                }
            )
            return response.insight_text

        except Exception as e:
            logger.error(f"Insight generation failed: {e}")
            return "Here are the products I found for you."
