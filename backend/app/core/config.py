from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]

# Sentiment model paths
SENTIMENT_MODEL_DIR = BASE_DIR / "models" / "sentiment"
SENTIMENT_CSV_PATH = SENTIMENT_MODEL_DIR / "clean_dataset_umkmentor_all_category.csv"

# Product prediction model paths
PRODUCT_MODEL_DIR = BASE_DIR / "models" / "product"
PRODUCT_MODEL_PATH = PRODUCT_MODEL_DIR / "tokped_classifier.pkl"
FEATURE_COLUMNS_PATH = PRODUCT_MODEL_DIR / "feature_cols.json"
CATEGORY_ALIASES_PATH = PRODUCT_MODEL_DIR / "category_aliases.json"
CATEGORY_STATS_PATH = PRODUCT_MODEL_DIR / "category_stats.json"
CATEGORY_LEVELS_PATH = PRODUCT_MODEL_DIR / "category_levels.json"
CAT_DISCOUNT_RATE_PATH = PRODUCT_MODEL_DIR / "cat_discount_rate.json"
CAT_RATING_MEDIAN_PATH = PRODUCT_MODEL_DIR / "cat_rating_median.json"
MODEL_METADATA_PATH = PRODUCT_MODEL_DIR / "model_metadata.json"

ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://umkmentor.netlify.app",
]