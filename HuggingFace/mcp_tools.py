from transformers import pipeline
import os
from dotenv import load_dotenv

load_dotenv()

qa = pipeline(
    "text-generation",
    model="mistralai/Mistral-7B-Instruct-v0.3",  # 반드시 v0.3로
    token=os.getenv("HUGGINGFACE_TOKEN"),        # 반드시 token 사용
    max_new_tokens=200
)


qa = pipeline(
    "text-generation",
    model="mistralai/Mistral-7B-Instruct-v0.3",
    token=os.getenv("HUGGINGFACE_TOKEN"),
    max_new_tokens=200
)

def analyze_balance(hp, damage, enemy_name):
    prompt = f"""
You are a professional game balance expert.
The player has {hp} HP and received {damage} damage from an enemy named {enemy_name}.
Please evaluate whether this battle balance seems fair.
You can explain briefly if needed.
"""
    response = qa(prompt)
    
    if not response or not response[0]['generated_text'].strip():
        return "Unable to generate a response."
    
    generated_text = response[0]['generated_text'].strip()
    return generated_text