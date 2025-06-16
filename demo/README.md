# 🎮 demo - Godot 인터랙티브 동화/게임 데모

이 폴더는 Godot 엔진 기반의 인터랙티브 동화 및 게임 데모 프로젝트입니다.

---

## 📦 구성 요소
- **art/** : 게임에 사용되는 이미지, 배경, 캐릭터 등 리소스
- **fonts/** : 폰트 파일
- **gdscripts/** : 주요 게임 로직(GDScript)
- **scenes/** : Godot 씬(.tscn) 파일
- **global/** : 전역 스크립트 및 설정
- **project.godot** : Godot 프로젝트 설정 파일

---

## 🌐 global/ 주요 파일별 기능

- `http.gd` : 서버와의 HTTP 통신(로그인, 채팅, 스토리 다운로드 등) 및 인증 토큰 관리  
  → 상단의 `url` 상수를 실제 서버 주소로 설정하면 해당 서버와 연동됩니다.
  
  예시)
  ```gdscript
  # http.gd 파일 상단
  const url = "http://your-server-address:8000"
  ```
- `state.gd` : 사용자 정보, 토큰, 현재 스토리 진행 상태 등 전역 상태 관리

---

## 🗂️ gdscripts/ 주요 파일별 기능

- `StoryManager.gd` : 동화(스토리) JSON 데이터 로드 및 노드별 데이터 제공
- `books.gd` : 동화책 목록 조회, 다운로드 및 UI 생성
- `choice.gd` : 선택지 표시, 스토리 분기, 오디오 녹음 등 선택 관련 로직
- `color_rect.gd` : 색상 배경(Overlay) 제어
- `end.gd` : 엔딩 화면, 전체 스토리 결과 처리 및 서버 전송
- `hud.gd` : 대화/피드백 표시, AI 응답 출력
- `login.gd` : 로그인 UI 및 인증 처리
- `main.gd` : 메인 화면, 인사말 및 진입 버튼 처리
- `player.gd` : 플레이어 캐릭터 제어, 시선/네트워크 입력 처리
- `scene_transition_layer.gd` : 씬 전환 애니메이션(페이드 효과)
- `story.gd` : 스토리 본문 출력, 플레이어 상호작용 및 씬 전환

---

## 🛠️ 실행 방법

1. [Godot Engine](https://godotengine.org/) (권장 버전 4.x) 설치
2. Godot에서 이 `demo` 폴더를 프로젝트로 열기
3. 메인 씬(main.tscn) 또는 원하는 씬을 실행

---

## 💡 주요 특징
- 분기형 스토리와 선택지 기반 진행
- 시선 추적 등 외부 입력 연동(연동 방식은 상위 README.md 참고)
- AI 피드백 및 대화 기능(서버와 연동 필요)

---

## 📄 참고
- 자세한 연동 방법 및 전체 시스템 구조는 최상위 README.md를 참고하세요.
- Godot 관련 추가 설정이나 빌드 방법은 [Godot 공식 문서](https://docs.godotengine.org/ko/stable/)를 참고하세요.
