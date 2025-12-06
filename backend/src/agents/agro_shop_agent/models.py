from typing import Any, List, Optional

from pydantic import BaseModel, Field


class Brand(BaseModel):
    id: int
    name: str
    count: int


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
    code: str
    sale_price: int
    image: str
    availability: str
    axiom_monthly_price: str
    old_price: Optional[int] = 0
    reviews_count: Optional[int] = 0
    reviews_average: Optional[Any] = None  # Can be string "5" or null
    all_count: int


class SearchResultData(BaseModel):
    products: List[Product] = []
    brands: List[Brand] = []
    pagination: Pagination
    price: PriceRange
    filter: List[Any] = []  # We can leave filter as generic list for now
    total: int


class SearchResult(BaseModel):
    success: bool
    message: str
    code: int
    data: SearchResultData
    errors: Optional[Any] = None
