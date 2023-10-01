from fastapi import FastAPI
from starlette.middleware.base import BaseHTTPMiddleware

from auth import login, callback
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
    app.include_router(login.router, tags=["auth"])
    app.include_router(callback.router, tags=["auth"])


if __name__ == "__main__":
    app.add_middleware(BaseHTTPMiddleware, dispatch=auth_middleware)
    uvicorn.run(app=app, port=configuration[config_keys.PORT])
