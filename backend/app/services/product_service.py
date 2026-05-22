import json

import joblib
import numpy as np
import pandas as pd

from app.core.config import (
    CATEGORY_ALIASES_PATH,
    CATEGORY_MAP_PATH,
    CATEGORY_STATS_PATH,
    FEATURE_COLUMNS_PATH,
    PRODUCT_MODEL_PATH,
    STOCK_Q75_PATH,
)
from app.models.model_store import product_state


def load_product_model() -> None:
    required_paths = [
        PRODUCT_MODEL_PATH,
        FEATURE_COLUMNS_PATH,
        CATEGORY_ALIASES_PATH,
        CATEGORY_STATS_PATH,
    ]

    if not all(path.exists() for path in required_paths):
        print("WARNING: File model produk tidak lengkap, endpoint /predict-product tidak tersedia")
        return

    product_state.model = joblib.load(PRODUCT_MODEL_PATH)

    with open(FEATURE_COLUMNS_PATH) as file:
        product_state.feature_cols = json.load(file)
    with open(CATEGORY_ALIASES_PATH) as file:
        product_state.category_aliases = json.load(file)
    with open(CATEGORY_STATS_PATH) as file:
        product_state.category_stats = json.load(file)

    if CATEGORY_MAP_PATH.exists():
        with open(CATEGORY_MAP_PATH) as file:
            category_map = json.load(file)
        product_state.category_map_inv = {value.lower(): int(key) for key, value in category_map.items()}

    if STOCK_Q75_PATH.exists():
        with open(STOCK_Q75_PATH) as file:
            product_state.stock_q75 = json.load(file).get("stock_q75", 30.0)

    print("Product model berhasil dimuat")


def run_product_prediction(
    kategori: str,
    harga_jual: int,
    is_official: int,
    gold_merchant: int,
    discount_pct: float,
    stok: int,
) -> dict:
    category_row, category_name = resolve_category(kategori)
    category_features = get_category_features(category_row, category_name)

    input_dict = build_product_input(
        harga_jual=harga_jual,
        is_official=is_official,
        gold_merchant=gold_merchant,
        discount_pct=discount_pct,
        stok=stok,
        category_features=category_features,
    )

    x_input = pd.DataFrame([input_dict])[product_state.feature_cols].fillna(0)
    probabilities = product_state.model.predict_proba(x_input)[0]
    prediction = product_state.model.predict(x_input)[0]
    score = round(float(probabilities[1]) * 100, 1)

    suggestions = build_suggestions(
        harga_jual=harga_jual,
        discount_pct=discount_pct,
        gold_merchant=gold_merchant,
        is_official=is_official,
        stok=stok,
        score=score,
        category_name=category_features["cat_name"],
        cat_median=category_features["cat_median"],
        cat_laku=category_features["cat_laku"],
    )

    return {
        "prediction": "Laku" if prediction == 1 else "Tidak Laku",
        "laku_score": score,
        "risk_level": get_risk_level(score),
        "saran": suggestions,
        "kategori_resolved": category_features["cat_name"],
        "harga_median_cat": round(category_features["cat_median"]),
        "cat_laku_rate": round(category_features["cat_laku"] * 100),
    }


def resolve_category(kategori: str) -> tuple[dict | None, str]:
    category_input = kategori.lower().strip()
    category_resolved = product_state.category_aliases.get(category_input, category_input)

    category_row = next(
        (
            row
            for row in product_state.category_stats
            if row["category_main"].lower() == category_resolved.lower()
        ),
        None,
    )

    if category_row is None:
        category_row = next(
            (
                row
                for row in product_state.category_stats
                if category_resolved.lower() in row["category_main"].lower()
            ),
            None,
        )
        if category_row:
            category_resolved = category_row["category_main"]

    return category_row, category_resolved


def get_category_features(category_row: dict | None, category_resolved: str) -> dict:
    if category_row is None:
        all_prices = [row["cat_median_price"] for row in product_state.category_stats]
        all_ratings = [row["cat_avg_rating"] for row in product_state.category_stats]
        all_official = [row["cat_pct_official"] for row in product_state.category_stats]
        all_laku = [row["cat_laku_rate"] for row in product_state.category_stats]

        return {
            "cat_median": float(np.median(all_prices)),
            "cat_rating": float(np.mean(all_ratings)),
            "cat_official": float(np.mean(all_official)),
            "cat_laku": float(np.mean(all_laku)),
            "cat_count": sum(row["cat_product_count"] for row in product_state.category_stats),
            "cat_encoded": 0,
            "cat_name": "tidak dikenali (pakai rata-rata global)",
        }

    return {
        "cat_median": float(category_row["cat_median_price"]),
        "cat_rating": float(category_row["cat_avg_rating"]),
        "cat_official": float(category_row["cat_pct_official"]),
        "cat_laku": float(category_row["cat_laku_rate"]),
        "cat_count": int(category_row["cat_product_count"]),
        "cat_encoded": product_state.category_map_inv.get(category_resolved.lower(), 0),
        "cat_name": category_resolved,
    }


def build_product_input(
    harga_jual: int,
    is_official: int,
    gold_merchant: int,
    discount_pct: float,
    stok: int,
    category_features: dict,
) -> dict:
    cat_median = category_features["cat_median"]
    cat_rating = category_features["cat_rating"]

    return {
        "log_price": np.log1p(harga_jual),
        "discount_pct": discount_pct,
        "price_tier": 1,
        "log_price_vs_cat": np.log1p(harga_jual / (cat_median + 1)),
        "gold_merchant": gold_merchant,
        "is_official": is_official,
        "log_stock": np.log1p(stok),
        "in_stock": 1,
        "high_stock": int(stok > product_state.stock_q75),
        "final_rating": cat_rating,
        "high_rating": int(cat_rating >= 4.5),
        "low_rating": int(cat_rating < 3.0),
        "cat_median_price": cat_median,
        "cat_avg_rating": cat_rating,
        "cat_pct_official": category_features["cat_official"],
        "cat_laku_rate": category_features["cat_laku"],
        "cat_product_count": category_features["cat_count"],
        "category_encoded": category_features["cat_encoded"],
    }


def build_suggestions(
    harga_jual: int,
    discount_pct: float,
    gold_merchant: int,
    is_official: int,
    stok: int,
    score: float,
    category_name: str,
    cat_median: float,
    cat_laku: float,
) -> list[str]:
    price_ratio = harga_jual / (cat_median + 1)
    suggestions = []

    if price_ratio > 2.0:
        suggestions.append(
            f"Harga Rp{harga_jual:,} terlalu tinggi vs median kategori "
            f"Rp{cat_median:,.0f}. Coba turunkan harga."
        )
    elif price_ratio < 0.3:
        suggestions.append(
            f"Harga Rp{harga_jual:,} jauh di bawah pasar "
            f"(median Rp{cat_median:,.0f}). Pastikan kualitas terjaga."
        )

    if cat_laku < 0.35:
        suggestions.append(
            f"Kategori '{category_name}' punya tingkat laku rendah "
            f"({round(cat_laku * 100)}%). Pertimbangkan kategori lain."
        )

    if discount_pct == 0 and score < 60:
        suggestions.append("Tambahkan promo diskon 10–20% untuk meningkatkan daya tarik.")

    if gold_merchant == 0 and is_official == 0 and score < 60:
        suggestions.append("Daftar Gold Merchant untuk meningkatkan kepercayaan pembeli.")

    if stok < 50 and score < 60:
        suggestions.append("Stok terlalu sedikit. Tambah minimal 50+ unit.")

    return suggestions


def get_risk_level(score: float) -> str:
    if score >= 70:
        return "Rendah"
    if score >= 45:
        return "Sedang"
    return "Tinggi"
