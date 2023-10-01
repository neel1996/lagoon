from logger import logger
from supabase_client import SupabaseClient


async def auth_middleware(request, call_next):
    logger.info("Authenticating request")
    supabase_client = SupabaseClient()

    session = supabase_client.auth.get_session()

    logger.info(f"Session: {session}")
    return await call_next(request)
