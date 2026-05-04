"""Backend configuration using Pydantic Settings."""

from __future__ import annotations

import re
from functools import lru_cache
from typing import List

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # App
    APP_ENV: str = "development"
    API_BASE_URL: str = "https://api.souksham.shop"
    FRONTEND_URL: str = "https://souksham.shop"
    CORS_ORIGINS: str = "https://souksham.shop,http://localhost:3000"

    # Database — accepts the raw EasyPanel URL (postgres://...) and converts it
    DATABASE_URL: str = "postgresql+asyncpg://souksham:souksham@localhost:5432/souksham"

    # Google Sheets webhook
    SHEET_WEBHOOK_URL: str = ""
    SHEET_WEBHOOK_SECRET: str = ""

    # Order
    ORDER_NUMBER_PREFIX: str = "SS"
    ORDER_CONFIRMATION_COUNTRY: str = "LB"

    # Tracking
    META_PIXEL_ID: str = ""
    META_ACCESS_TOKEN: str = ""
    TIKTOK_PIXEL_ID: str = ""
    TIKTOK_ACCESS_TOKEN: str = ""
    SNAP_PIXEL_ID: str = ""
    SNAP_ACCESS_TOKEN: str = ""

    # Security
    BACKEND_API_KEY: str = ""

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def convert_db_url(cls, v: str) -> str:
        """Convert EasyPanel postgres:// URL to SQLAlchemy asyncpg format."""
        if v.startswith("postgres://"):
            v = v.replace("postgres://", "postgresql+asyncpg://", 1)
        if "?sslmode=disable" in v:
            v = v.replace("?sslmode=disable", "")
        return v

    def get_cors_origins(self) -> List[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]

    @property
    def is_production(self) -> bool:
        return self.APP_ENV == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()
