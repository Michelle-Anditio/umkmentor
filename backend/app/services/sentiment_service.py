import pickle

import pandas as pd
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer

from app.core.config import (
    DEFAULT_EMOTION_MAP,
    EMOTION_TO_SENTIMENT,
    SENTIMENT_CONFIG_PATH,
    SENTIMENT_CSV_PATH,
    SENTIMENT_MODEL_DIR,
)
from app.models.model_store import sentiment_state


def load_sentiment_model() -> None:
    sentiment_state.tokenizer = AutoTokenizer.from_pretrained(SENTIMENT_MODEL_DIR)
    sentiment_state.model = AutoModelForSequenceClassification.from_pretrained(SENTIMENT_MODEL_DIR)
    sentiment_state.model.eval()
    print("Sentiment model berhasil dimuat")

    if SENTIMENT_CONFIG_PATH.exists():
        with open(SENTIMENT_CONFIG_PATH, "rb") as file:
            config = pickle.load(file)
        label_map = config.get("label_map", {})
        sentiment_state.emotion_map = {v: k for k, v in label_map.items()}
        sentiment_state.max_length = config.get("max_length", 128)
        print(f"Config dimuat: {sentiment_state.emotion_map}, max_length={sentiment_state.max_length}")
    else:
        sentiment_state.emotion_map = DEFAULT_EMOTION_MAP
        print("config.pkl tidak ditemukan, pakai label default")


def build_dataset_summary() -> None:
    if not SENTIMENT_CSV_PATH.exists():
        sentiment_state.dataset_summary = None
        print("elektronik.csv tidak ditemukan, dataset_summary kosong")
        return

    dataframe = pd.read_csv(SENTIMENT_CSV_PATH)
    sample = dataframe["review"].dropna().sample(min(1000, len(dataframe)), random_state=42).tolist()
    print(f"Memproses {len(sample)} review dari dataset...")

    emotions = predict_texts(sample)
    sentiment_state.dataset_summary = build_summary(emotions)
    print(f"Dataset summary: {sentiment_state.dataset_summary}")


def predict_texts(texts: list[str]) -> list[str]:
    emotions = []

    for text in texts:
        inputs = sentiment_state.tokenizer(
            str(text),
            return_tensors="pt",
            truncation=True,
            padding=True,
            max_length=sentiment_state.max_length,
        )

        with torch.no_grad():
            outputs = sentiment_state.model(**inputs)
            prediction_id = torch.argmax(outputs.logits, dim=1).item()

        emotions.append(sentiment_state.emotion_map.get(prediction_id, "netral"))

    return emotions


def build_summary(emotions: list[str]) -> dict:
    total = len(emotions)

    if total == 0:
        return {
            "positive": 0,
            "neutral": 0,
            "negative": 0,
            "total_reviews": 0,
            "emotion": "netral",
        }

    count = {"positif": 0, "netral": 0, "negatif": 0}

    for emotion in emotions:
        count[EMOTION_TO_SENTIMENT.get(emotion, "netral")] += 1

    dominant_emotion = max(set(emotions), key=emotions.count)

    return {
        "positive": round(count["positif"] / total * 100),
        "neutral": round(count["netral"] / total * 100),
        "negative": round(count["negatif"] / total * 100),
        "total_reviews": total,
        "emotion": dominant_emotion,
    }
