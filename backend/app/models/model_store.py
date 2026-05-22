from dataclasses import dataclass, field
from typing import Any


@dataclass
class SentimentState:
    tokenizer: Any = None
    model: Any = None
    emotion_map: dict[int, str] = field(default_factory=dict)
    max_length: int = 128
    dataset_summary: dict | None = None


@dataclass
class ProductState:
    model: Any = None
    feature_cols: list[str] | None = None
    category_aliases: dict[str, str] = field(default_factory=dict)
    category_stats: list[dict] = field(default_factory=list)
    stock_q75: float = 30.0
    category_map_inv: dict[str, int] = field(default_factory=dict)


sentiment_state = SentimentState()
product_state = ProductState()
