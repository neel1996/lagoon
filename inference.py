"""
    pytorch nightly preview is required to make it work with Macbooks
    with apple silicon

    pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu121
"""
from transformers import AutoTokenizer
import transformers
import torch
import timeit

model = "meta-llama/Llama-2-7b-chat-hf"

start = timeit.default_timer()
tokenizer = AutoTokenizer.from_pretrained(model)
pipeline = transformers.pipeline(
    "text-generation",
    model=model,
    torch_dtype=torch.float16,
    device_map="cuda:0",
    trust_remote_code=True,
)

sequences = pipeline(
    "what is a pizza?",
    do_sample=True,
    top_k=10,
    num_return_sequences=1,
    eos_token_id=tokenizer.eos_token_id,
    max_length=200,
)

for seq in sequences:
    print(f"Result: {seq['generated_text']}")

end = timeit.default_timer()
print(f"Execution time {end - start} seconds")
