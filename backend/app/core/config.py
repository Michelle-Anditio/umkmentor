from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]

# Sentiment model paths
SENTIMENT_MODEL_DIR = BASE_DIR / "models" / "sentiment"
SENTIMENT_CONFIG_PATH = SENTIMENT_MODEL_DIR / "config.pkl"
SENTIMENT_CSV_PATH = SENTIMENT_MODEL_DIR / "elektronik.csv"

# Product prediction model paths
PRODUCT_MODEL_DIR = BASE_DIR / "models" / "product"
PRODUCT_MODEL_PATH = PRODUCT_MODEL_DIR / "tokped_classifier.pkl"
FEATURE_COLUMNS_PATH = PRODUCT_MODEL_DIR / "feature_cols.json"
CATEGORY_ALIASES_PATH = PRODUCT_MODEL_DIR / "category_aliases.json"
CATEGORY_STATS_PATH = PRODUCT_MODEL_DIR / "category_stats.json"
CATEGORY_MAP_PATH = PRODUCT_MODEL_DIR / "category_map.json"
STOCK_Q75_PATH = PRODUCT_MODEL_DIR / "stock_q75.json"

ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
]

DEFAULT_EMOTION_MAP = {
    0: "bahagia",
    1: "cinta",
    2: "marah",
    3: "sedih",
}

EMOTION_TO_SENTIMENT = {
    "bahagia": "positif",
    "cinta": "positif",
    "sedih": "negatif",
    "marah": "negatif",
}
