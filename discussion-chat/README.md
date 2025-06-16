# 💬 discussion-chat (프론트엔드 웹앱)

React + Vite 기반의 토론/채팅 UI 프로젝트입니다.

---

## 📦 주요 폴더 및 파일
- **src/** : 소스 코드
  - **components/** : UI 컴포넌트
  - **app/** : 주요 페이지/라우팅
  - **lib/** : 유틸리티, API 등
  - **types/** : 타입 정의
  - **main.jsx** : 앱 진입점
- **public/** : 정적 리소스
- **index.html** : HTML 진입점
- **tailwind.config.js, postcss.config.js** : 스타일 설정
- **vite.config.ts** : Vite 빌드 설정

---

## 🛠️ 설치 및 실행 방법

1. Node.js(권장 v18+) 설치
2. 의존성 설치
   ```bash
   npm install
   # 또는
   pnpm install
   ```
3. 개발 서버 실행
   ```bash
   npm run dev
   # 또는
   pnpm dev
   ```
4. 브라우저에서 `http://localhost:5173` 접속

---

## 💡 주요 특징
- 실시간 토론/채팅 UI
- React 19, Vite, TailwindCSS 기반
- 라우팅, 컴포넌트 분리, 타입스크립트 지원

---

## 📄 참고
- 실제 서버 연동, API 명세 등은 상위(메인) README.md 및 백엔드 문서를 참고하세요.
- 스타일 및 빌드 관련 추가 설정은 Tailwind, Vite 공식 문서를 참고하세요.
