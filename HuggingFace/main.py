from fastapi import FastAPI
from mcp_tools import analyze_balance  # 분석 함수 불러오기
from pydantic import BaseModel

app = FastAPI()

class LogData(BaseModel):
    player_hp: int
    damage: int
    enemy_name: str

@app.post("/analyze")
async def analyze(data: LogData):
    return {"result": analyze_balance(data.player_hp, data.damage, data.enemy_name)}
