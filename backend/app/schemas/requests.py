from pydantic import BaseModel, Field


class ReviewRequest(BaseModel):
    reviews: list[str] = Field(default_factory=list)


class ProductRequest(BaseModel):
    kategori: str
    harga_jual: int
    stok: int

    is_official: int = 0
    rating_average: float = 5.0
    gold_merchant: int = 0
    discounted_price: float | None = None