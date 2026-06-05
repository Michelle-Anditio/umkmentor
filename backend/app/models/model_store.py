from dataclasses import dataclass, field
from typing import Any


@dataclass
class SentimentState:
    tfidf: Any = None
    model: Any = None
    label_map: dict = field(default_factory=dict)
    dataset_summary: dict | None = None


@dataclass
class ProductState:
    model: Any = None
    feature_cols: list[str] | None = None
    category_aliases: dict[str, str] = field(default_factory=dict)
    category_stats: list[dict] = field(default_factory=list)


sentiment_state = SentimentState()
product_state = ProductState()