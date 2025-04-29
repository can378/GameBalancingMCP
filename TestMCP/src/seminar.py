def seminar_attendees(party_name: str) -> list:
    """
    주어진 세미나 이름에 따라 참석자 목록을 반환하는 함수.
    실제 구현에서는 파일(attendance-A.md, attendance-B.md)에서 데이터를 읽어올 것.
    """
    attendees = []
    if party_name == "A":
        with open("src/attendance-A.md", encoding="utf-8") as f:
            attendees = [line.strip() for line in f if line.strip()]
    elif party_name == "B":
        with open("src/attendance-B.md", encoding="utf-8") as f:
            attendees = [line.strip() for line in f if line.strip()]
    else:
        raise ValueError(f"Unknown party name: {party_name}")
    return attendees
