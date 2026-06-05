import json

import joblib
import numpy as np
import pandas as pd

from app.core.config import (
    CATEGORY_ALIASES_PATH,
    CATEGORY_STATS_PATH,
    FEATURE_COLUMNS_PATH,
    PRODUCT_MODEL_PATH,
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

    with open(FEATURE_COLUMNS_PATH, encoding="utf-8") as file:
        product_state.feature_cols = json.load(file)

    with open(CATEGORY_ALIASES_PATH, encoding="utf-8") as file:
        product_state.category_aliases = json.load(file)

    with open(CATEGORY_STATS_PATH, encoding="utf-8") as file:
        product_state.category_stats = json.load(file)

    print("Product model berhasil dimuat")


def run_product_prediction(
    kategori: str,
    harga_jual: int,
    harga_diskon: int,
    stok: int,
    is_official: int,
    rating_average: float,
    is_topads: int,
) -> dict:
    if product_state.model is None:
        raise RuntimeError("Product model belum dimuat")

    category_row, category_name = resolve_category(kategori)
    category_features = get_category_features(category_row, category_name)

    input_dict = build_product_input(
        kategori=category_features["cat_name"],
        harga_jual=harga_jual,
        harga_diskon=harga_diskon,
        stok=stok,
        is_official=is_official,
        rating_average=rating_average,
        is_topads=is_topads,
        category_features=category_features,
    )

    x_input = pd.DataFrame([input_dict])

    for col in product_state.feature_cols:
        if col not in x_input.columns:
            x_input[col] = 0

    x_input = x_input[product_state.feature_cols].fillna(0)

    probabilities = product_state.model.predict_proba(x_input)[0]
    prediction = product_state.model.predict(x_input)[0]
    score = round(float(probabilities[1]) * 100, 1)

    suggestions = build_suggestions(
        kategori=category_features["cat_name"],
        harga_jual=harga_jual,
        harga_diskon=harga_diskon,
        stok=stok,
        is_official=is_official,
        rating_average=rating_average,
        is_topads=is_topads,
        score=score,
        category_features=category_features,
    )

    return {
        "prediction": "Laku" if int(prediction) == 1 else "Tidak Laku",
        "laku_score": score,
        "risk_level": get_risk_level(score),
        "saran": suggestions,
        "kategori_resolved": category_features["cat_name"],
        "harga_median_cat": round(category_features["cat_median_price"]),
        "stock_median_cat": round(category_features["cat_stock_median"]),
        "cat_pct_official": round(category_features["cat_pct_official"] * 100),
    }


def resolve_category(kategori: str) -> tuple[dict | None, str]:
    category_input = normalize_category(kategori)
    category_resolved = product_state.category_aliases.get(category_input, category_input)

    category_row = next(
        (
            row
            for row in product_state.category_stats
            if normalize_category(row["category_main"]) == category_resolved
        ),
        None,
    )

    if category_row is None:
        category_row = next(
            (
                row
                for row in product_state.category_stats
                if category_resolved in normalize_category(row["category_main"])
            ),
            None,
        )

        if category_row:
            category_resolved = normalize_category(category_row["category_main"])

    return category_row, category_resolved


def normalize_category(category: str) -> str:
    return (
        str(category)
        .lower()
        .strip()
        .replace("&", " ")
        .replace("-", " ")
        .replace("/", " ")
        .replace("  ", " ")
        .replace(" ", "_")
    )


def get_category_features(category_row: dict | None, category_resolved: str) -> dict:
    if category_row is None:
        all_prices = [row["cat_median_price"] for row in product_state.category_stats]
        all_stocks = [row["cat_stock_median"] for row in product_state.category_stats]
        all_official = [row["cat_pct_official"] for row in product_state.category_stats]

        return {
            "cat_median_price": float(np.median(all_prices)),
            "cat_stock_median": float(np.median(all_stocks)),
            "cat_pct_official": float(np.mean(all_official)),
            "cat_name": "tidak_dikenali",
        }

    return {
        "cat_median_price": float(category_row["cat_median_price"]),
        "cat_stock_median": float(category_row["cat_stock_median"]),
        "cat_pct_official": float(category_row["cat_pct_official"]),
        "cat_name": normalize_category(category_resolved),
    }


def build_product_input(
    kategori: str,
    harga_jual: int,
    harga_diskon: int,
    stok: int,
    is_official: int,
    rating_average: float,
    is_topads: int,
    category_features: dict,
) -> dict:
    harga_jual = max(int(harga_jual), 0)
    harga_diskon = max(int(harga_diskon), 0)
    stok = max(int(stok), 0)

    is_official = int(bool(is_official))
    is_topads = int(bool(is_topads))

    rating_average = float(rating_average)
    rating_average = min(max(rating_average, 0), 5)

    cat_median_price = category_features["cat_median_price"]
    cat_stock_median = category_features["cat_stock_median"]

    discount_pct = 0.0
    if harga_jual > 0 and 0 < harga_diskon < harga_jual:
        discount_pct = (harga_jual - harga_diskon) / harga_jual

    has_discount = int(discount_pct > 0)
    category_key = normalize_category(kategori)

    return {
        "log_price": np.log1p(harga_jual),
        "log_price_vs_cat": np.log1p(harga_jual / (cat_median_price + 1)),
        "price_rank_in_cat": harga_jual / (cat_median_price + 1),
        "price_diff_median": harga_jual - cat_median_price,
        "rating_average": rating_average,
        "has_discount": has_discount,
        "discount_pct": discount_pct,
        "stock_rank_in_cat": stok / (cat_stock_median + 1),
        "stock_is_enough": int(stok >= cat_stock_median),
        "stock_price_ratio": stok / (harga_jual + 1),
        "is_topads": is_topads,
        "is_jakarta": 0,
        "trust_factor": is_official + is_topads,
        "cat_median_price": cat_median_price,
        "cat_stock_median": cat_stock_median,
        "cat_pct_official": category_features["cat_pct_official"],
        "cat_elektronik": int(category_key == "elektronik"),
        "cat_hiburan": int(category_key == "hiburan"),
        "cat_olahraga": int(category_key == "olahraga"),
        "cat_kecantikan": int(category_key == "kecantikan"),
        "cat_makanan_minuman": int(category_key == "makanan_minuman"),
        "cat_fashion": int(category_key == "fashion"),
        "cat_pertukangan": int(category_key == "pertukangan"),
    }


def build_suggestions(
    kategori: str,
    harga_jual: int,
    harga_diskon: int,
    stok: int,
    is_official: int,
    rating_average: float,
    is_topads: int,
    score: float,
    category_features: dict,
) -> list[str]:
    suggestions = []

    cat_median_price = category_features["cat_median_price"]
    cat_stock_median = category_features["cat_stock_median"]

    price_ratio = harga_jual / (cat_median_price + 1)

    discount_pct = 0.0
    if harga_jual > 0 and 0 < harga_diskon < harga_jual:
        discount_pct = (harga_jual - harga_diskon) / harga_jual

    if price_ratio > 2.0:
        suggestions.append(
            f"Harga Rp{harga_jual:,} cukup tinggi dibanding median kategori "
            f"Rp{cat_median_price:,.0f}. Pertimbangkan penyesuaian harga."
        )
    elif price_ratio < 0.3:
        suggestions.append(
            f"Harga Rp{harga_jual:,} jauh di bawah median kategori "
            f"Rp{cat_median_price:,.0f}. Pastikan margin dan kualitas tetap aman."
        )

    if discount_pct == 0 and score < 60:
        suggestions.append(
            "Produk belum memiliki diskon. Coba gunakan diskon ringan untuk meningkatkan daya tarik."
        )

    if stok < cat_stock_median and score < 60:
        suggestions.append(
            f"Stok masih di bawah median kategori ({cat_stock_median:,.0f}). "
            "Pertimbangkan menambah stok jika permintaan mulai terlihat."
        )

    if rating_average < 4.3:
        suggestions.append(
            "Rating produk masih perlu diperkuat. Fokus pada kualitas produk, pengiriman, dan respons review."
        )

    if is_topads == 0 and score < 60:
        suggestions.append(
            "TopAds bisa dipertimbangkan sebagai strategi promosi, tetapi pengaruhnya pada model relatif kecil."
        )

    if is_official == 0 and score < 60:
        suggestions.append(
            "Status official store dapat membantu kepercayaan pembeli, meskipun pengaruhnya pada model tidak terlalu besar."
        )

    if not suggestions:
        suggestions.append(
            "Produk memiliki potensi yang cukup baik. Tetap pantau harga kompetitor, stok, dan review pembeli."
        )

    return suggestions


def get_risk_level(score: float) -> str:
    if score >= 70:
        return "Rendah"
    if score >= 45:
        return "Sedang"
    return "Tinggi"