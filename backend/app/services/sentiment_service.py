import joblib
import pandas as pd

from app.core.config import SENTIMENT_CSV_PATH, SENTIMENT_MODEL_DIR
from app.models.model_store import sentiment_state


def load_sentiment_model() -> None:
    sentiment_state.tfidf = joblib.load(
        SENTIMENT_MODEL_DIR / "tfidf_umkmentor_all_category.pkl"
    )
    sentiment_state.model = joblib.load(
        SENTIMENT_MODEL_DIR / "svm_umkmentor_all_category.pkl"
    )
    sentiment_state.label_map = joblib.load(
        SENTIMENT_MODEL_DIR / "label_map.pkl"
    )

    print("Sentiment model TF-IDF + SVM berhasil dimuat")


def build_dataset_summary() -> None:
    if not SENTIMENT_CSV_PATH.exists():
        sentiment_state.dataset_summary = None
        print("Dataset sentiment tidak ditemukan, dataset_summary kosong")
        return

    dataframe = pd.read_csv(SENTIMENT_CSV_PATH)

    if "review" not in dataframe.columns:
        sentiment_state.dataset_summary = None
        print("Kolom review tidak ditemukan, dataset_summary kosong")
        return

    category_column = None

    for column in ["kategori", "category", "Kategori", "Category"]:
        if column in dataframe.columns:
            category_column = column
            break

    if category_column is None:
        sample = dataframe["review"].dropna().sample(
            min(1000, len(dataframe)),
            random_state=42
        ).tolist()

        sentiments = predict_texts(sample)
        sentiment_state.dataset_summary = build_summary(sentiments)

        print(f"Dataset summary global: {sentiment_state.dataset_summary}")
        return

    summary_by_category = {}

    for category, group in dataframe.groupby(category_column):
        reviews = group["review"].dropna().tolist()

        if not reviews:
            continue

        if len(reviews) > 1000:
            reviews = group["review"].dropna().sample(
                1000,
                random_state=42
            ).tolist()

        sentiments = predict_texts(reviews)
        summary_by_category[str(category).lower()] = build_summary(sentiments)

    sentiment_state.dataset_summary = summary_by_category

    print(f"Dataset summary per kategori: {sentiment_state.dataset_summary}")

def predict_texts(texts: list[str]) -> list[str]:
    vectorized_texts = sentiment_state.tfidf.transform([str(text) for text in texts])
    prediction_ids = sentiment_state.model.predict(vectorized_texts)

    reversed_label_map = {
        value: key for key, value in sentiment_state.label_map.items()
    }

    results = []

    for prediction_id in prediction_ids:
        if prediction_id in sentiment_state.label_map:
            label = sentiment_state.label_map[prediction_id]
        else:
            label = reversed_label_map.get(prediction_id, prediction_id)

        results.append(str(label).lower())

    return results


def build_summary(sentiments: list[str]) -> dict:
    total = len(sentiments)

    if total == 0:
        return {
            "positive": 0,
            "neutral": 0,
            "negative": 0,
            "total_reviews": 0,
            "emotion": "netral",
        }

    count = {
        "positif": 0,
        "netral": 0,
        "negatif": 0,
    }

    for sentiment in sentiments:
        sentiment = str(sentiment).lower()

        if sentiment in ["positive", "positif"]:
            count["positif"] += 1
        elif sentiment in ["negative", "negatif"]:
            count["negatif"] += 1
        else:
            count["netral"] += 1

    dominant_sentiment = max(count, key=count.get)

    return {
        "positive": round(count["positif"] / total * 100),
        "neutral": round(count["netral"] / total * 100),
        "negative": round(count["negatif"] / total * 100),
        "total_reviews": total,
        "emotion": dominant_sentiment,
    }