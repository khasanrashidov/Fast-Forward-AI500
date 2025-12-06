import json
import os
from datetime import datetime

import requests

from models import SearchResult


class TexnomartSearchService:
    """Service to search products in Texnomart catalog."""

    def __init__(self):
        """Initialize the Texnomart search service."""
        self.base_url = "https://gw.texnomart.uz/api/common/v1/search/result"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Accept": "application/json",
        }

    def search(self, query: str, page: int = 1, limit: int = 20) -> SearchResult:
        """
        Search Texnomart API.

        Args:
            query (str): The search query
            page (int): Page number (default: 1)
            limit (int): Number of results per page (default: 20)

        Returns:
            SearchResult: API response containing search results

        Raises:
            requests.exceptions.RequestException: If the API request fails
        """
        params = {"q": query, "page": page, "limit": limit}

        try:
            response = requests.get(self.base_url, params=params, headers=self.headers)
            response.raise_for_status()
            return SearchResult(**response.json())
        except requests.exceptions.RequestException as e:
            print(f"Error making request to Texnomart API: {e}")
            raise

    def search_safe(
        self, query: str, page: int = 1, limit: int = 20
    ) -> SearchResult | None:
        """
        Search Texnomart API with error handling.

        Args:
            query (str): The search query
            page (int): Page number (default: 1)
            limit (int): Number of results per page (default: 20)

        Returns:
            SearchResult | None: API response or None if request fails
        """
        try:
            return self.search(query, page, limit)
        except requests.exceptions.RequestException:
            return None
