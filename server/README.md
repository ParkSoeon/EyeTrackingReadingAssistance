# 🛠️ server - FastAPI 백엔드 API 서버

이 폴더는 시선잇다 프로젝트의 메인 백엔드 API 서버(FastAPI 기반)입니다.

---

## 📦 주요 폴더 및 파일
- **main.py** : FastAPI 앱 진입점, 라우터 등록
- **requirements.txt** : Python 의존성 목록
- **crud/** : 데이터베이스 연산(생성/조회/수정/삭제) 관련 코드
- **models/** : 데이터베이스 모델(Pydantic/ORM)
- **routers/** : API 엔드포인트(유저, 채팅, 선택, 플레이, 리포트 등)
- **schemas/** : 데이터 스키마(Pydantic)
- **static/** : 정적 리소스(동화 등)

---

## 🛠️ 설치 및 실행 방법

1. Python 3.10+ 및 pip 설치
2. 의존성 설치
   ```bash
   pip install -r requirements.txt
   ```
3. 서버 실행
   ```bash
   uvicorn main:app --reload
   ```
   또는
   ```bash
   python main.py
   ```
4. 기본 주소: [http://localhost:8000](http://localhost:8000)

---

## 💡 주요 특징
- FastAPI 기반 RESTful API
- 사용자 관리, 동화/선택/토론/채팅 등 다양한 엔드포인트 제공
- CORS 허용, 외부 프론트엔드와 연동 가능
- OpenAI, Google GenAI 등 LLM 연동(일부 기능)

---

## 🔑 외부 API 키 및 환경 변수 설정

- OpenAI, Google GenAI 등 LLM 연동 기능을 사용하려면 별도의 API 키가 필요합니다.
- 프로젝트 루트 또는 server 폴더에 `.env` 파일을 생성하여 아래와 같이 환경 변수를 설정하세요.

예시)
```env
OPENAI_API_KEY=your-openai-api-key
GOOGLE_API_KEY=your-google-api-key
# 기타 필요한 환경 변수
```
- 환경 변수는 FastAPI 및 관련 라이브러리에서 자동으로 불러옵니다.
- API 키는 절대 공개 저장소에 커밋하지 마세요!

---

## 🗄️ 데이터베이스(PostgreSQL) 설정

- 이 프로젝트는 PostgreSQL을 기본 데이터베이스로 사용합니다.
- `.env` 파일에 아래와 같이 DB 연결 정보를 추가하세요.

예시)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/your_db_name
```
- 실제 username, password, db_name은 본인 환경에 맞게 변경하세요.
- DB 초기화가 필요하다면 `init_db.py`를 실행해 테이블을 생성할 수 있습니다.

```bash
python init_db.py
```
- 데이터베이스 마이그레이션/관리 방법은 프로젝트 구조 및 코드에 따라 추가 안내될 수 있습니다.

---

## 📑 주요 API 명세 (로그인, 채팅)

### 🔐 로그인 (토큰 발급)
- **POST** `/users/token/`
- **설명:** 사용자 로그인 및 JWT 토큰 발급
- **요청 (x-www-form-urlencoded):**
  - `username`: 사용자명
  - `password`: 비밀번호
- **응답 예시:**
```json
{
  "access_token": "...jwt...",
  "token_type": "bearer"
}
```

---

### 💬 채팅 (LLM 피드백)
- **POST** `/chat/`
- **설명:** LLM(OpenAI, Gemini 등) 기반 채팅/피드백 응답
- **헤더:**
  - `Authorization: Bearer <access_token>`
- **요청 (application/json):**
```json
{
  "provider": "openai", // 또는 "gemini"
  "messages": [
    { "role": "user", "content": "질문 또는 선택 내용" }
  ]
}
```
- **응답 예시:**
```json
{
  "response": "AI의 답변 내용"
}
```

---

## 📄 참고

