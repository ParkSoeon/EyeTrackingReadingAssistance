# ✨ 시선잇다

> **“시선잇다”는 아이 스스로 이야기를 선택하고 토론하며 사고력을 키울 수 있도록 설계된 인터랙티브 독서·토론 플랫폼입니다.**

---

## 🚀 주요 기능

### 📚 인터랙티브 동화 기능
- **분기형 스토리**: 아이의 선택에 따라 이야기가 달라지는 구조  
  → 동화 진행 중 선택지를 통해 다양한 분기 생성
- **시선 추적 캐릭터 조작**: 사용자의 시선을 인식하여 캐릭터를 직접 움직이고 상호작용할 수 있음
- **AI 대화 피드백**: LLM 기반 조언 및 대화 피드백 제공  
  → 아이의 선택에 맞는 AI 캐릭터의 반응과 질문
- **나만의 동화 구성**: 상상력과 이야기 구성 능력 향상

---

### 💬 도서 기반 질의응답 및 토론 기능
- **RAG + LangChain 기반 질문 생성**: 도서 본문 기반 개방형 질문, LLM이 문맥 따라 응답 조정
- **실시간 퀴즈 채점 및 토론 태도 분석**: 논리성, 이해도, 감정 표현 등 다면적 분석
- **독서 성향 분석**: 자주 사용하는 어휘, 선택 유형 등을 기반으로 학습 피드백 제공

---

## 📁 폴더 구조 및 역할

| 폴더명             | 설명                                                         |
|--------------------|------------------------------------------------------------|
| `server/`          | 메인 백엔드 API 서버 (FastAPI 기반, DB 및 주요 비즈니스 로직 포함) |
| `server_add/`      | 추가 실험/확장용 백엔드 서버 (server와 유사, 실험적 기능 포함)    |
| `demo/`            | Godot 기반 인터랙티브 동화/게임 데모 프로젝트                  |
| `discussion-chat/` | 프론트엔드 웹앱 (React + Vite, 토론/채팅 UI)                  |
| `public/`          | 프론트엔드에 필요한 이미지                                    |
| `src/`             | 프론트엔드 웹앱 (React + Vite, 로그인, 회원가입,책 선택)       |
| `vision/`          | 시선 추적 및 컴퓨터 비전 관련 코드 (머신러닝 모델, 실험 노트북 등) |
| `QA/`              | 도서 기반 질의응답 데이터 및 생성 스크립트                     |

> 각 폴더의 자세한 설명과 사용법은 해당 폴더의 README.md를 참고하세요.

---

## 🛠️ 설치 방법

이 저장소는 여러 하위 프로젝트로 구성되어 있습니다. 각 폴더별로 아래와 같이 설치를 진행하세요.

<details>
<summary><b>1. server (백엔드 API 서버)</b></summary>

```bash
cd server
pip install -r requirements.txt
```
</details>

<details>
<summary><b>2. server_add (추가 백엔드 서버)</b></summary>

```bash
cd server_add
pip install -r requirements.txt  # requirements.txt가 있을 경우
```
</details>

<details>
<summary><b>3. demo (Godot 프로젝트)</b></summary>

Godot 엔진(권장 버전 4.x) 설치 후, Godot에서 demo 폴더를 열어 실행하세요.
</details>

<details>
<summary><b>4. discussion-chat (프론트엔드 웹앱)</b></summary>

```bash
cd discussion-chat
npm install
npm run dev
```
</details>

<details>
<summary><b>5. vision (시선 추적/머신러닝)</b></summary>

```bash
cd vision
pip install -r requirements.txt
```
</details>

<details>
<summary><b>6. QA (질의응답 데이터/스크립트)</b></summary>

(추가 예정)
</details>

---

## ▶️ 사용 방법

> 각 폴더의 README.md에서 자세한 사용 방법을 확인하실 수 있습니다.


