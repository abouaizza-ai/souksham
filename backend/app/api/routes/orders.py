"""Orders route."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.schemas.orders import CheckoutRequest, CheckoutResponse
from app.services.orders import CheckoutError, process_checkout

router = APIRouter()


@router.post("/orders/checkout", response_model=CheckoutResponse)
async def checkout(
    body: CheckoutRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> CheckoutResponse:
    ip = request.client.host if request.client else None
    ua = request.headers.get("user-agent")

    try:
        result = await process_checkout(body, db, ip_address=ip, user_agent=ua)
    except CheckoutError as exc:
        error_map = {
            "INVALID_PHONE": (status.HTTP_422_UNPROCESSABLE_ENTITY, "رقم الموبايل غير صحيح"),
            "INVALID_CART": (status.HTTP_422_UNPROCESSABLE_ENTITY, "السلة غير صحيحة"),
            "OFFER_UNAVAILABLE": (status.HTTP_422_UNPROCESSABLE_ENTITY, "العرض غير متاح"),
            "ORDER_CREATE_FAILED": (status.HTTP_500_INTERNAL_SERVER_ERROR, "فشل إنشاء الطلب"),
        }
        http_status, _ = error_map.get(exc.code, (status.HTTP_400_BAD_REQUEST, "خطأ"))
        raise HTTPException(status_code=http_status, detail=exc.code)

    return CheckoutResponse(**result)
