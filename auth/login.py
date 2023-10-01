from fastapi import APIRouter
from fastapi.responses import RedirectResponse

from logger import logger
from supabase_client import SupabaseClient

router = APIRouter(prefix="/api/auth")


@router.get("/login", response_class=RedirectResponse)
async def login():
    supabase_client = SupabaseClient()

    logger.info('Logging in with Github')
    auth_response = supabase_client.auth.sign_in_with_oauth({
        "provider": "github",
        "options": {
            "scopes": "repo"
        }
    })

    return auth_response.url
