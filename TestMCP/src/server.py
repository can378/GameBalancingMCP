from mcp.server.fastmcp import FastMCP
from seminar import seminar_attendees
from datetime import datetime
import json

mcp = FastMCP("Seminar Management System")

@mcp.tool()
def get_seminar_details(party_name: str) -> str:
    attendees = seminar_attendees(party_name)

    seminar_info = {
        "name": party_name,
        "total_attendees": len(attendees),
        "attendees": attendees,
    }

    return json.dumps(seminar_info, ensure_ascii=False, indent=2)

@mcp.tool()
def register_attendee(party_name: str, attendee_name: str) -> str:
    # 실제 구현에서는 파일에 참석자를 추가하는 로직을 구현

    return f"성공: {attendee_name}님이 {party_name} 세미나에 등록되었습니다."

@mcp.prompt()
def prompt(message: str) -> str:
    return f"""
당신은 세미나 관리 시스템의 AI 어시스턴트입니다.

사용 가능한 도구:
- get_seminar_details(party_name) - 특정 세미나의 상세 정보를 조회합니다.
- register_attendee(party_name, attendee_name) - 새 참석자를 등록합니다.

사용자 메시지: {message}
"""

if __name__ == "__main__":
    mcp.run()
