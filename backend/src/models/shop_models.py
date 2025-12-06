from typing import Any, List, Optional

from pydantic import BaseModel, Field

# --- Product Models (Texnomart API) ---


class Brand(BaseModel):
    id: int
    name: str
    count: Optional[int] = 0


class Pagination(BaseModel):
    current_page: int
    page_size: int
    total_count: int
    total_page: int


class PriceRange(BaseModel):
    min_price: int
    max_price: int


class Product(BaseModel):
    id: int
    name: str
    code: Optional[str] = ""
    sale_price: int
    image: Optional[str] = ""
    availability: Optional[str] = ""
    axiom_monthly_price: Optional[str] = ""
    old_price: Optional[int] = 0
    reviews_count: Optional[int] = 0
    reviews_average: Optional[Any] = None
    all_count: Optional[int] = 0
    # Opencard Installment Fields
    opencard_total_price: int = Field(
        default=0, description="Total price with Opencard installment (145%)"
    )
    opencard_monthly_payment: int = Field(
        default=0, description="Monthly payment for 12 months"
    )
    opencard_month_text: str = Field(
        default="12 months", description="Installment duration text"
    )
    opencard_monthly_payment: int = Field(
        default=0, description="Monthly payment for 12 months"
    )
    opencard_month_text: str = Field(
        default="12 months", description="Installment duration text"
    )
    product_url: str = Field(default="", description="URL to the product on Texnomart")


class ProductResponse(BaseModel):
    """Streamlined product response for the frontend."""

    all_count: Optional[int] = 0
    id: int
    image: Optional[str] = ""
    name: str
    opencard_month_text: str
    opencard_monthly_payment: int
    opencard_total_price: int
    product_url: str


class SearchResultData(BaseModel):
    products: List[Product] = []
    brands: List[Brand] = []
    pagination: Optional[Pagination] = None
    price: Optional[PriceRange] = None
    filter: List[Any] = []
    total: Optional[int] = 0


class SearchResult(BaseModel):
    success: bool
    message: Optional[str] = ""
    code: Optional[int] = 0
    data: Optional[SearchResultData] = None
    errors: Optional[Any] = None


# --- AI Agent Models ---


class ShopSearchParams(BaseModel):
    """Parameters extracted from user query for product search."""

    query: str = Field(description="The main search query for the product in Russian.")
    limit: int = Field(default=10, description="Number of results to return.")
    sort: Optional[str] = Field(
        default=None, description="Sort order: price_asc, price_desc, new, popular."
    )


class ProductRelevance(BaseModel):
    """Relevance filtering result for a single product."""

    product_id: int
    is_relevant: bool = Field(
        description="Whether the product matches the user's specific intent."
    )
    reason: Optional[str] = Field(description="Why the product is relevant or not.")


class FilteredProductList(BaseModel):
    """List of relevant product IDs."""

    relevant_ids: List[int] = Field(
        description="List of product IDs that are relevant to the query."
    )


class ShopInsight(BaseModel):
    """Insight about a product or the search results."""

    insight_text: str = Field(
        description="One sentence insight about the products (e.g., 'The first option offers the best value')."
    )
