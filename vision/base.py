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
import torch.backends.cudnn as cudnn
# from filterpy.kalman import KalmanFilter

from L2CS_Mobile import L2CS_Mobile


# 기본 설정
CWD = pathlib.Path.cwd()
device = "cpu"

position = np.array([0, 0, 40])

##
screen_width = 1920
screen_height = 1080

screen_width_mm = 332.2
screen_height_mm = 186.8
##

camera_width = 640
camera_height = 480

mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(refine_landmarks=True)

# 눈을 구성하는 랜드마크 인덱스
LEFT_EYE_IDX = [362, 385, 387, 263, 373, 380]  # 왼쪽 눈
RIGHT_EYE_IDX = [33, 160, 158, 133, 153, 144]  # 오른쪽 눈

def calculate_EAR(landmarks, eye_points):
    """EAR(Eye Aspect Ratio) 계산"""
    p1, p2, p3, p4, p5, p6 = [np.array([landmarks[i].x, landmarks[i].y]) for i in eye_points]
    
    # EAR 공식 적용
    vertical1 = np.linalg.norm(p2 - p6)
    vertical2 = np.linalg.norm(p3 - p5)
    horizontal = np.linalg.norm(p1 - p4)

    ear = (vertical1 + vertical2) / (2.0 * horizontal)
    return ear


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
    
# GazeSmoothing 객체 생성 (시선 스무딩)
gaze_smoothing = GazeSmoothing(smoothing_factor=0.2)

# # 칼만 필터 초기화
# class KalmanFilterXY:
#     def __init__(self):
#         self.kf = KalmanFilter(dim_x=4, dim_z=2)
#         self.kf.F = np.array([[1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0], [0, 0, 0, 1]])
#         self.kf.H = np.array([[1, 0, 0, 0], [0, 1, 0, 0]])
#         self.kf.P *= 1000  # 초기 공분산 설정
#         self.kf.R = np.array([[10, 0], [0, 10]])  # 측정 노이즈 공분산
#         self.kf.Q = np.eye(4) * 0.1  # 프로세스 노이즈
#         self.kf.x = np.array([[0], [0], [0], [0]])
    
#     def update(self, x, y):
#         self.kf.predict()
#         self.kf.update([x, y])
#         return int(self.kf.x[0]), int(self.kf.x[1])

# kalman_filter = KalmanFilterXY()

# MediaPipe 설정
mp_face_detection = mp.solutions.face_detection

# 모델 초기화
model = L2CS_Mobile(90)
saved_state_dict = torch.load(CWD / 'vision' / 'models' / '_epoch_48.pkl', map_location=device)
model.load_state_dict(saved_state_dict)
model.to(device=device)
model.eval()

face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.9)
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, camera_width)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, camera_height)

transformations = transforms.Compose([
    transforms.Resize(448),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])
softmax = nn.Softmax(dim=1)
idx_tensor = torch.FloatTensor([idx for idx in range(90)]).to(device)

with torch.no_grad():
    while True:
        success, frame = cap.read()
        rgb_img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = face_mesh.process(frame)

        if results.multi_face_landmarks:
            for face_landmarks in results.multi_face_landmarks:
                landmarks = face_landmarks.landmark

                # 각 눈의 EAR 계산
                left_ear = calculate_EAR(landmarks, LEFT_EYE_IDX)
                right_ear = calculate_EAR(landmarks, RIGHT_EYE_IDX)

                # EAR 임계값 설정 (눈 감았다고 판단하는 기준)
                EAR_THRESHOLD = 0.2

                # 감지 결과 표시
                if left_ear < EAR_THRESHOLD and right_ear < EAR_THRESHOLD:
                    text = "Both Eyes Closed!"
                elif left_ear < EAR_THRESHOLD:
                    text = "Left Eye Closed!"
                elif right_ear < EAR_THRESHOLD:
                    text = "Right Eye Closed!"
                else:
                    text = "Eyes Open"
                print(text)

        rgb_img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results_detection = face_detection.process(rgb_img)

        if results_detection.detections:
            for detection in results_detection.detections:
                bboxC = detection.location_data.relative_bounding_box
                ih, iw, _ = frame.shape
                x_min, y_min, w, h = int(bboxC.xmin * iw), int(bboxC.ymin * ih), int(bboxC.width * iw), int(bboxC.height * ih)
                
                img = frame[y_min:y_min + h, x_min:x_min + w]
                # img = cv2.resize(img, (224, 224))
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                im_pil = Image.fromarray(img)
                img = transformations(im_pil)
                img = Variable(img).to(device)
                img = img.unsqueeze(0)

                gaze_pitch, gaze_yaw = model(img)
                pitch_predicted = softmax(gaze_pitch)
                yaw_predicted = softmax(gaze_yaw)

                pitch_predicted = torch.sum(pitch_predicted.data[0] * idx_tensor) * 4 - 180
                yaw_predicted = torch.sum(yaw_predicted.data[0] * idx_tensor) * 4 - 180

                pitch_predicted = pitch_predicted.cpu().detach().numpy() * np.pi / 180.0
                yaw_predicted = yaw_predicted.cpu().detach().numpy() * np.pi / 180.0

                # 시선 스무딩 적용
                smoothed_pitch, smoothed_yaw = gaze_smoothing.smooth(pitch_predicted, yaw_predicted)

                p = smoothed_pitch
                y = smoothed_yaw
                r = 0

                ##
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
                factor = (position[2] / 2.54 * 138/3) / moved_point[2] # 2.54 * 138

                new_point = np.array([moved_point[0] * factor, moved_point[1] * factor, moved_point[2] * factor])
                ##

                ## https://github.com/NVlabs/few_shot_gaze/blob/master/demo/monitor.py
                new_x = int(np.ceil(int(screen_width / 2) - -float(new_point[1]) * screen_width / screen_width_mm))
                new_y = int(np.ceil((-float(new_point[0]) - 10.0) * screen_height / screen_height_mm))
                ##

                # new_x, new_y = kalman_filter.update(new_x, new_y)

                new_x = max(0, min(screen_width, new_x))
                new_y = max(0, min(screen_height, new_y))

                # 중 하 상 중 오 왼 -> 32 16 8 4 2 1
                command = 0
                if new_x == 0:
                    command +=1
                    # print("left")
                elif new_x == screen_width:
                    command += 2
                    # print("right")
                else:
                    command += 4
                    # print("center")
                if new_y ==0:
                    command += 8
                    # print("up")
                elif new_y == screen_height:
                    command += 16
                    # print("down")
                else:
                    command += 32
                    # print("center")


cap.release()
