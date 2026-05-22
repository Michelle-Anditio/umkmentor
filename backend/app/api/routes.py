from fastapi import APIRouter

from app.models.model_store import product_state, sentiment_state
from app.schemas.requests import ProductRequest, ReviewRequest
from app.services.product_service import run_product_prediction
from app.services.sentiment_service import build_summary, predict_texts

router = APIRouter()


@router.get("/")
def root():
    return {"status": "UMKMentor API is running"}


@router.get("/sentiment-summary")
def get_sentiment_summary():
    if sentiment_state.dataset_summary is None:
        return {"error": "Dataset belum diproses atau tidak ditemukan."}
    return sentiment_state.dataset_summary


@router.post("/predict")
def predict_sentiment(request: ReviewRequest):
    if sentiment_state.model is None or sentiment_state.tokenizer is None:
        return {"error": "Model belum dimuat."}

    emotions = predict_texts(request.reviews)
    return build_summary(emotions)


@router.post("/predict-product")
def predict_product(request: ProductRequest):
    if product_state.model is None:
        return {"error": "Model produk belum dimuat. Pastikan folder models_final tersedia."}

    return run_product_prediction(
        kategori=request.kategori,
        harga_jual=request.harga_jual,
        is_official=request.is_official,
        gold_merchant=request.gold_merchant,
        discount_pct=request.discount_pct,
        stok=request.stok,
    )
