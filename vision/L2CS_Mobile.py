import torch
import torch.nn as nn
import torchvision.models as models

class L2CS_Mobile(nn.Module):
    def __init__(self, num_bins=90, version='large'):
        super(L2CS_Mobile, self).__init__()

        if version == 'large':
            self.feature_extractor = models.mobilenet_v3_large(pretrained=True)
            feature_dim = 960  # MobileNetV3 Large 마지막 출력 채널 수
        elif version == 'small':
            self.feature_extractor = models.mobilenet_v3_small(pretrained=True)
            feature_dim = 576  # MobileNetV3 Small 마지막 출력 채널 수
        else:
            raise ValueError("Invalid MobileNetV3 version. Choose 'large' or 'small'.")

        self.feature_extractor.classifier = nn.Identity()

        self.fc_yaw_gaze = nn.Sequential(
            nn.Linear(feature_dim, 256),
            nn.ReLU(),
            nn.Linear(256, num_bins)
        )

        self.fc_pitch_gaze = nn.Sequential(
            nn.Linear(feature_dim, 256),
            nn.ReLU(),
            nn.Linear(256, num_bins)
        )

    def forward(self, x):
        features = self.feature_extractor(x)
        yaw = self.fc_yaw_gaze(features)
        pitch = self.fc_pitch_gaze(features)
        return pitch, yaw
