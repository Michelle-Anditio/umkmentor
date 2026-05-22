from pydantic import BaseModel, Field


class ReviewRequest(BaseModel):
    reviews: list[str] = Field(default_factory=list)


class ProductRequest(BaseModel):
    kategori: str
    harga_jual: int
    is_official: int = 0
    gold_merchant: int = 0
    discount_pct: float = 0.0
    stok: int = 100
