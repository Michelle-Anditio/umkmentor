from dotenv import load_dotenv
load_dotenv()
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router
from app.core.config import ALLOWED_ORIGINS
from app.services.product_service import load_product_model
from app.services.sentiment_service import build_dataset_summary, load_sentiment_model


@asynccontextmanager
async def lifespan(app: FastAPI):
    load_sentiment_model()
    build_dataset_summary()
    load_product_model()
    yield
    print("Server shutting down")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
