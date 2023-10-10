from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from ctransformers import AutoModelForCausalLM

app = FastAPI()

model_id = "TheBloke/Llama-2-7b-Chat-GGUF"
llm = AutoModelForCausalLM.from_pretrained(
    model_id, context_length=4096, model_type="llama", gpu_layers=120
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
        Use the following pieces of context to answer the question at the end. If the question asks to list something, then list it as Markdown bullet points with a newline character. If the answer includes source code or commands, then format it using Markdown notation. If you don't know the answer, truthfully say "I don't know". If the question is out of the context, then say "The query is not related to the context".\n\nContext:
        {request.context}
        <</SYS>>
        
        User: {request.query} [/INST]
        
    """

    generated_text = llm(prompt, max_new_tokens=4096)

    print("Generated response ::", generated_text)

    return InferenceResponse(response=generated_text)


if __name__ == "__main__":
    uvicorn.run(app, port=8000)
