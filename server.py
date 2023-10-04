from fastapi import FastAPI
from starlette.middleware.base import BaseHTTPMiddleware

from config import configuration, config_keys
from inference import infer

import uvicorn

from llm.loader import LLM
from middleware.auth import auth_middleware

app = FastAPI(
    title="Lagoon",
    description="Search engine for github repo docs",
    version="0.0.1",
)


@app.on_event("startup")
def initialize():
    LLM()
    app.include_router(infer.router, tags=["inference"])


if __name__ == "__main__":
    app.add_middleware(BaseHTTPMiddleware, dispatch=auth_middleware)
    uvicorn.run(app=app, port=configuration[config_keys.PORT])
