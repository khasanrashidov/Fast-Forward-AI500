from typing import Optional

import requests

from configurations.logging_config import get_logger
from models.shop_models import SearchResult

logger = get_logger(__name__)


class TexnomartClient:
    """Client to interact with Texnomart API."""

    def __init__(self):
        """Initialize the Texnomart client."""
        self.base_url = "https://gw.texnomart.uz/api/common/v1/search/result"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Accept": "application/json",
        }

    def search(
        self, query: str, page: int = 1, limit: int = 20
    ) -> Optional[SearchResult]:
        """
        Search Texnomart API.

        Args:
            query (str): The search query
            page (int): Page number (default: 1)
            limit (int): Number of results per page (default: 20)

        Returns:
            SearchResult | None: API response containing search results or None if failed
        """
        params = {"q": query, "page": page, "limit": limit}

        try:
            logger.info(f"Searching Texnomart for: {query}")
            response = requests.get(self.base_url, params=params, headers=self.headers)
            response.raise_for_status()

            data = response.json()
            # Basic validation/transformation if needed, but pydantic should handle it
            return SearchResult(**data)

        except requests.exceptions.RequestException as e:
            logger.error(f"Error making request to Texnomart API: {e}")
            return None
        except Exception as e:
            logger.error(f"Error parsing Texnomart response: {e}")
            return None
