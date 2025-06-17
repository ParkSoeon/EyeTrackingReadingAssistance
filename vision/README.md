# 👁️ vision - 시선 추적/머신러닝 모듈

이 폴더는 시선 추적 및 관련 머신러닝 모델(L2CS-Net 등) 구현, 실험, 연동을 위한 코드와 리소스를 포함합니다.

---

## 📦 주요 파일 및 폴더
- **base.py** : 시선 추적 기본 로직, 얼굴/눈 랜드마크 추출, 화면 좌표 변환 등
- **control.py** : 시선 추적 결과를 소켓으로 전송, 외부(게임 등)와 실시간 연동
- **L2CS_Mobile.py** : MobileNetV3 기반 시선 추정 딥러닝 모델 정의
- **train.ipynb** : L2CS-Net 기반 모델 학습/실험 노트북
- **models/** : 학습된 모델 파일 저장 폴더
- **requirements.txt** : Python 의존성 목록 (PyTorch, OpenCV, mediapipe 등)

---

## 🛠️ 설치 및 실행 방법

1. Python 3.10+ 및 pip 설치
2. 의존성 설치
   ```bash
   pip install -r requirements.txt
   ```
3. (선택) Jupyter Notebook에서 `train.ipynb` 실행
4. 시선 추적 실험/연동 예시
   ```bash
   python base.py
   # 또는
   python control.py
   ```

---

## 💡 주요 특징
- Mediapipe 기반 얼굴/눈 랜드마크 추출
- MobileNetV3(L2CS-Net) 기반 시선 추정 딥러닝 모델
  - 기존 L2CS-Net(ResNet) 대신 MobileNetV3(large/small)를 백본으로 사용하여 경량화 및 실시간 추론에 최적화
- 실시간 시선 추적 결과를 외부(게임 등)로 전송하는 소켓 연동 기능
- 다양한 해상도/화면 환경 지원

---

## 📄 참고
- 모델 학습/추론, 연동 방식 등은 코드 및 주석, 상위 README.md 참고
- L2CS-Net 논문 및 원본 코드: https://github.com/Ahmednull/L2CS-Net
- 실험 환경/추가 설정은 requirements.txt 및 각 코드 파일 참고