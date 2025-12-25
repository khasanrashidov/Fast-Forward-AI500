from typing import List

import requests
import urllib3

from configurations.logging_config import get_logger

# Suppress SSL warnings for Chakana API
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
from models.shop_models import Product

logger = get_logger(__name__)


class ChakanaClient:
    """Client to interact with Chakana API."""

    def __init__(self):
        """Initialize the Chakana client."""
        self.base_url = "https://api.chakana.uz/v1/product/new-search"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Accept": "application/json",
        }

    def search(self, query: str, page: int = 1, limit: int = 5) -> List[Product]:
        """
        Search Chakana API and return top products.

        Args:
            query (str): The search query
            page (int): Page number (default: 1)
            limit (int): Number of results to return (default: 5)

        Returns:
            List[Product]: List of products mapped to Product model
        """
        params = {"key": query, "page": page, "limit": limit}

        try:
            logger.info(f"Searching Chakana for: {query}")
            response = requests.get(self.base_url, params=params, headers=self.headers, verify=False)
            response.raise_for_status()

            data = response.json()

            # Check if response is valid
            if data.get("status") != 1 or not data.get("data", {}).get("products"):
                logger.warning("Chakana returned no products or invalid response")
                return []

            # Map Chakana products to Product model
            products = []
            for item in data["data"]["products"][:limit]:
                try:
                    product = Product(
                        id=item.get("id", 0),
                        name=item.get("name_ru", ""),
                        code=str(item.get("merchant_product_id", "")),
                        sale_price=item.get("price_full", 0),
                        image=item.get("image", ""),
                        availability="in_stock" if item.get("offers_count", 0) > 0 else "out_of_stock",
                        old_price=item.get("old_price", 0),
                        reviews_count=item.get("product_rating", {}).get("count_rating", 0),
                        reviews_average=item.get("product_rating", {}).get("total_rating", 0),
                        all_count=item.get("offers_count", 0),
                    )
                    products.append(product)
                except Exception as e:
                    logger.error(f"Error mapping Chakana product: {e}")
                    continue

            logger.info(f"Chakana returned {len(products)} products")
            return products

        except requests.exceptions.RequestException as e:
            logger.error(f"Error making request to Chakana API: {e}")
            return []
        except Exception as e:
            logger.error(f"Error parsing Chakana response: {e}")
            return []

