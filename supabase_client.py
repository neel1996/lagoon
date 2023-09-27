from supabase import create_client

import os

from logger import logger


class SupabaseClient:
    supabase_client = None

    def __new__(cls):
        if cls.supabase_client is None:
            logger.info('Creating new SupabaseClient')
            cls.supabase_client = create_client(
                os.getenv('SUPABASE_URL'),
                os.getenv('SUPABASE_KEY')
            )

        logger.info('Returning SupabaseClient')
        return cls.supabase_client
