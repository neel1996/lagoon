from fastapi import FastAPI
from transformers import pipeline, AutoTokenizer
from pydantic import BaseModel
import uvicorn
import torch

app = FastAPI()

model_id = "TheBloke/Llama-2-7b-Chat-GPTQ"
pipe = pipeline(
    "text-generation",
    model=model_id,
    tokenizer=AutoTokenizer.from_pretrained(model_id),
    do_sample=True,
    temperature=0.6,
    device_map="cuda:0",
    torch_dtype=torch.float16,
    max_new_tokens=512,
    top_p=0.95,
    top_k=40,
    repetition_penalty=1.1,
)


class InferenceRequest(BaseModel):
    query: str
    context: str


class InferenceResponse(BaseModel):
    response: str


@app.post("/api/infer")
async def inference(request: InferenceRequest) -> InferenceResponse:
    prompt = f"""
        [INST] <<SYS>>
         Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. If the question asks to list something, then list it as Markdown bullet points with a newline character. If the answer includes source code or commands, then format it using Markdown notation.\n\nContext:
        {request.context}
        <</SYS>>
        Question: {request.query}\n\n
        Helpful answer:\n\n[/INST]
        
    """

    generated_text = pipe(prompt)[0]["generated_text"]

    response = generated_text.split("[/INST]")[1].strip()

    print("Generated response ::", response)

    return InferenceResponse(response=response)


if __name__ == "__main__":
    uvicorn.run(app, port=8000)
