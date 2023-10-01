from fastapi import APIRouter

from logger import logger

router = APIRouter(prefix="/api/auth")


@router.get("/callback")
async def callback(provider_token: str):
    logger.info(f"Callback received with provider_token: {provider_token}")
    return {"provider_token": provider_token}
