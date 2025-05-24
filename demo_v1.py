import numpy as np
import cv2
import torch
import torch.nn as nn
from torch.autograd import Variable
from torchvision import transforms
import time
import pathlib
import mediapipe as mp
from PIL import Image
from l2cs import L2CS
import torch.backends.cudnn as cudnn
import torchvision

# 기본 설정
CWD = pathlib.Path.cwd()
device = "cpu"

screen_width = 1920
screen_height = 1080

# 기본 위치
position = np.array([0, 0, 40])
adder = np.array([screen_width/2,screen_height,0])
adder = np.array([0,0,0])


# 시선 스무딩 (이전 프레임 값과 차이 조정)
class GazeSmoothing:
    def __init__(self, smoothing_factor=0.1):
        self.smoothing_factor = smoothing_factor
        self.prev_pitch = 0.0
        self.prev_yaw = 0.0

    def smooth(self, pitch, yaw):
        # 이전 예측 값과 현재 값을 비교하여 점진적인 변화를 적용
        smoothed_pitch = self.prev_pitch + self.smoothing_factor * (pitch - self.prev_pitch)
        smoothed_yaw = self.prev_yaw + self.smoothing_factor * (yaw - self.prev_yaw)
        
        # 최신 예측 값을 이전 값에 반영
        self.prev_pitch = smoothed_pitch
        self.prev_yaw = smoothed_yaw
        
        return smoothed_pitch, smoothed_yaw

# MediaPipe 설정
mp_face_detection = mp.solutions.face_detection
# mp_face_mesh = mp.solutions.face_mesh

# 모델 초기화
model = L2CS(torchvision.models.resnet.Bottleneck, [3, 4, 6, 3], 90)
saved_state_dict = torch.load(CWD / 'models' / 'L2CSNet_gaze360.pkl', map_location=device)
model.load_state_dict(saved_state_dict)
model.to(device=device)
model.eval()

# 얼굴 감지 모델
face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.9)

# 영상 캡처 설정
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, screen_width)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, screen_height)

# 변환 설정
transformations = transforms.Compose([
    transforms.Resize(448),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])
softmax = nn.Softmax(dim=1)
idx_tensor = torch.FloatTensor([idx for idx in range(90)]).to(device)

# FPS 측정 변수
frame_num = 0

# GazeSmoothing 객체 생성 (시선 스무딩)
gaze_smoothing = GazeSmoothing(smoothing_factor=0.2)

# 주요 처리 루프
with torch.no_grad():
    while True:
        success, frame = cap.read()
        frame = cv2.flip(frame, 1)  # 좌우 반전
        start_fps = time.time()

        # MediaPipe 얼굴 감지
        rgb_img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results_detection = face_detection.process(rgb_img)

        # 키보드 입력 처리: 위치 조정
        key = cv2.waitKey(1) & 0xFF
        if key == ord('w'):  # W 키: 전진 (Z축 감소)
            position[2] -= 1
        elif key == ord('s'):  # S 키: 후진 (Z축 증가)
            position[2] += 1
        elif key == ord('a'):  # A 키: 왼쪽으로 이동 (X축 감소)
            position[0] -= 1
        elif key == ord('d'):  # D 키: 오른쪽으로 이동 (X축 증가)
            position[0] += 1
        elif key == ord('q'):  # Q 키: 위로 이동 (Y축 증가)
            position[1] += 1
        elif key == ord('e'):  # E 키: 아래로 이동 (Y축 감소)
            position[1] -= 1
        elif key == ord('z'):
            adder[0] += 20
        elif key == ord('x'):
            adder[0] -= 20
        elif key == ord('c'):
            adder[1] += 20
        elif key == ord('v'):
            adder[1] -= 20
        elif key == 27:  # ESC 키: 종료
            break

        # 화면에 위치 표시
        cv2.putText(frame, f"Position: {position}", (100, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2, cv2.LINE_AA)
        cv2.putText(frame, f"Adder: {adder}", (100, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2, cv2.LINE_AA)
        # cv2.putText(frame, f"PPI: {ppi}", (100, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2, cv2.LINE_AA)

        if results_detection.detections:
            for detection in results_detection.detections:
                # 얼굴 위치 추출
                bboxC = detection.location_data.relative_bounding_box
                ih, iw, _ = frame.shape
                x_min, y_min, w, h = int(bboxC.xmin * iw), int(bboxC.ymin * ih), int(bboxC.width * iw), int(bboxC.height * ih)

                # 얼굴 영역 자르기
                img = frame[y_min:y_min + h, x_min:x_min + w]
                img = cv2.resize(img, (224, 224))
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                im_pil = Image.fromarray(img)
                img = transformations(im_pil)
                img = Variable(img).to(device)
                img = img.unsqueeze(0)

                # Gaze 예측
                gaze_pitch, gaze_yaw = model(img)

                pitch_predicted = softmax(gaze_pitch)
                yaw_predicted = softmax(gaze_yaw)

                # 예측 결과를 각도로 변환
                pitch_predicted = torch.sum(pitch_predicted.data[0] * idx_tensor) * 4 - 180
                yaw_predicted = torch.sum(yaw_predicted.data[0] * idx_tensor) * 4 - 180

                pitch_predicted = pitch_predicted.cpu().detach().numpy() * np.pi / 180.0
                yaw_predicted = yaw_predicted.cpu().detach().numpy() * np.pi / 180.0

                # 시선 스무딩 적용
                smoothed_pitch, smoothed_yaw = gaze_smoothing.smooth(pitch_predicted, yaw_predicted)

                p = smoothed_pitch
                y = smoothed_yaw
                r = 0

                # 3D 좌표 변환
                origin = position
                cy = np.cos(y)
                sy = np.sin(y)
                cr = np.cos(r)
                sr = np.sin(r)
                cp = np.cos(p)
                sp = np.sin(p)

                # 회전 행렬 계산
                R_x = np.array([[1, 0, 0], [0, cp, -sp], [0, sp, cp]])
                R_y = np.array([[cy, 0, sy], [0, 1, 0], [-sy, 0, cy]])
                R_z = np.array([[cr, -sr, 0], [sr, cr, 0], [0, 0, 1]])
                rotation_matrix = np.dot(R_z, np.dot(R_y, R_x))

                moved_point = np.dot(rotation_matrix, origin)
                factor = (position[2] / 2.54 * 138) / moved_point[2] 
                new_point = np.array([moved_point[0] * factor, moved_point[1] * factor, moved_point[2] * factor])

                new_x = int(new_point[1]) + int(adder[0]) + int((x_min + w / 2.0) / screen_width * screen_width + position[0])
                new_y = int(-1 * new_point[0]) + int(adder[1]) + int((y_min + h / 3.0) / screen_height * screen_height + position[1])
                # new_z = int(new_point[2]) # z 는 필요 없음

                if new_x < 0: new_x =0
                if new_x > screen_width: new_x = screen_width
                if new_y < 0: new_y = 0
                if new_y > screen_height: new_y = screen_height

                # frame = np.ones((screen_height, screen_width, 3), dtype=np.uint8) * 255 # 흰 이미지
                cv2.putText(frame, f"({new_x}, {new_y})", (int(100),int(100)), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2, cv2.LINE_AA)
                cv2.circle(frame, (new_x, new_y), 15, (255, 0, 0), -1)
                cv2.circle(frame, (int(screen_width/2),int(screen_height/2)), 15, (255, 0, 0), -1)

        # FPS
        fps = 1.0 / (time.time() - start_fps)
        cv2.putText(frame, f'FPS: {fps:.1f}', (10, 20), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (0, 255, 0), 1, cv2.LINE_AA)

        # window
        cv2.namedWindow('Demo', cv2.WINDOW_NORMAL)
        cv2.resizeWindow('Demo', screen_width, screen_height)
        cv2.imshow("Demo", frame)

        frame_num += 1

cap.release()
cv2.destroyAllWindows()
