import sys

import torch
import transformers
from transformers import LlamaTokenizer

from config import configuration, config_keys
from logger import logger


def load_model():
    model_id = configuration[config_keys.MODEL]
    tokenizer = LlamaTokenizer.from_pretrained(model_id)
    logger.info(f"Loading {model_id} for inference")

    pipeline_config = {
        "model": model_id,
        "torch_dtype": torch.float16,
        "device": torch.device("cuda:0") if torch.cuda.is_available() else torch.device("cpu")
    }
    if sys.platform == "darwin":
        logger.info("Loading pipeline config for Mac")
        pipeline_config["model"] = model_id
        pipeline_config["device"] = torch.device("mps")
        pipeline_config["torch_dtype"] = torch.float32

    pipeline = transformers.pipeline(
        "text-generation",
        **pipeline_config,
    )

    return pipeline, tokenizer


class LLM:
    _model = None

    def __new__(cls):
        if cls._model is None:
            pipeline, tokenizer = load_model()
            cls._model = super().__new__(cls)
            cls._model.pipeline = pipeline
            cls._model.tokenizer = tokenizer

        return cls._model
