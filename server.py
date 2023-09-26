from fastapi import FastAPI
from config import configuration, config_keys
from inference import infer

import uvicorn

from llm.loader import LLM

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
    uvicorn.run(app=app, port=configuration[config_keys.PORT])
