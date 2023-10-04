from fastapi import APIRouter

from llm.loader import LLM
from logger import logger
from .model import InferenceRequest, InferenceResponse

router = APIRouter(prefix="/api")


@router.post("/api/inference", response_model=InferenceResponse)
async def inference(request: InferenceRequest):
    llm = LLM()
    pipeline = llm.pipeline
    tokenizer = llm.tokenizer

    logger.info(f"Running inference with query: {request.query}")
    sequences = pipeline(
        request.query,
        do_sample=True,
        top_k=10,
        num_return_sequences=1,
        eos_token_id=tokenizer.eos_token_id,
        max_length=200,
    )

    if len(sequences) == 0:
        logger.error("No response returned by model")
        return None

    llm_response = sequences[0]['generated_text']
    logger.info(f"Response: {llm_response}")

    return InferenceResponse(
        query=request.query,
        response=llm_response
    )
