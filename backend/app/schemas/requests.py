from pydantic import BaseModel, Field


class ReviewRequest(BaseModel):
    reviews: list[str] = Field(default_factory=list)


class ProductRequest(BaseModel):
    kategori: str
    harga_jual: int
    harga_diskon: int
    stok: int

    is_official: int = 0
    rating_average: float = 5.0
    is_topads: int = 0