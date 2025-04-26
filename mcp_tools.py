# mcp_tools.py
import os
from dotenv import load_dotenv
from transformers import pipeline

# .env에서 토큰 로드
load_dotenv()
token = os.getenv("HUGGINGFACE_TOKEN")

# Hugging Face 파이프라인 생성
qa = pipeline(
    "text-generation",
    #model="mistralai/Mixtral-8x7B-Instruct-v0.1",
    model="tiiuae/falcon-7b-instruct",
    token=token
)

def analyze_balance(hp, damage, enemy_name):
    prompt = f"""
    플레이어 HP는 {hp}, 적 {enemy_name}에게 받은 데미지는 {damage}입니다.
    이 전투 밸런스가 적절한지 판단해 주세요. 문제가 있다면 간단히 이유도 설명해주세요.
    """
    response = qa(prompt, max_new_tokens=200)
    return response[0]['generated_text']
