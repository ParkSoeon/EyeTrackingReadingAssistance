# ❓ QA - 도서 기반 질의응답 데이터 및 생성 스크립트

이 폴더는 동화/도서 본문을 기반으로 한 질의응답 데이터 생성 및 관련 스크립트를 포함합니다.

---

## 📦 주요 파일
- **generatingQuestions.py** : 도서 본문에서 다양한 유형의 질문(이해, 추론, 비판, 창의 등)을 자동 생성하는 Python 스크립트
- **generated_question.json** : 생성된 질문 데이터 예시(JSON)

---

## 🛠️ 사용 방법

1. Python 3.10+ 및 pip 설치
2. (필요시) 의존성 설치
   ```bash
   pip install openai numpy scikit-learn
   ```
3. OpenAI API 키를 generatingQuestions.py 내에 입력 또는 환경변수로 설정
4. 스크립트 실행
   ```bash
   python generatingQuestions.py
   ```
5. 결과는 `generated_question.json` 등으로 저장됨

---

## 🔑 OpenAI API 키 설정 예시
- OpenAI API 키는 generatingQuestions.py 내에 직접 입력하거나, 환경 변수로 설정할 수 있습니다.
- 환경 변수 사용 예시 (권장):

```bash
export OPENAI_API_KEY=your-openai-api-key
```

- 코드 내 직접 입력 예시:
```python
client = OpenAI(api_key="your-openai-api-key")
```


---

## 💡 주요 특징
- OpenAI Embedding 및 LLM API 활용
- 도서 본문 chunk별 임베딩, 유사도 기반 질문 생성
- 다양한 질문 유형(이해, 추론, 비판, 창의) 지원
- 객관식/서술형/단답형 등 다양한 답변 형식 생성

---

## 📄 참고
- 입력 데이터 포맷, 추가 옵션 등은 generatingQuestions.py 코드 및 주석 참고
