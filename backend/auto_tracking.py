import cv2
import socket
import torch
from ultralytics import YOLO
import time

# 🧠 Use YOLOv8s-Face model (download from https://github.com/lindevs/yolov8-face)
model = YOLO("yolov8n-face-lindevs.pt")
device = "cuda" if torch.cuda.is_available() else "cpu"
model = model.to(device)

# 🎥 Open iVCam or any webcam
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 416)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 416)

# 📡 Setup UDP socket
PI_IP = '192.168.1.162'  # Replace with your Pi's IP
PORT = 6000
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# 🧠 Track last angles to reduce update spam
last_pan, last_tilt = -1, -1

# 🎛️ Parameters
CONFIDENCE = 0.4
MIN_ANGLE_CHANGE = 2
FRAME_SKIP = 1  # Process every 2nd frame

frame_count = 0

print("🟢 Tracking started...")

while True:
    ret, frame = cap.read()
    if not ret:
        continue

    frame_count += 1
    if frame_count % FRAME_SKIP != 0:
        continue

    # YOLO Inference
    results = model.predict(frame, conf=CONFIDENCE, verbose=False)

    # Draw + send only if face is detected
    if results[0].boxes:
        annotated = results[0].plot()

        for box in results[0].boxes:
            x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
            center_x = int((x1 + x2) / 2)
            center_y = int((y1 + y2) / 2)

            # Draw center dot
            cv2.circle(annotated, (center_x, center_y), 5, (0, 255, 0), -1)

            # Convert to angle
            frame_w, frame_h = frame.shape[1], frame.shape[0]
            pan = int((center_x / frame_w) * 180)
            tilt = int((1 - (center_y / frame_h)) * 180)

            # Clamp
            pan = max(0, min(pan, 180))
            tilt = max(0, min(tilt, 180))

            # Only send if significant change
            if abs(pan - last_pan) >= MIN_ANGLE_CHANGE or abs(tilt - last_tilt) >= MIN_ANGLE_CHANGE:
                message = f"{pan},{tilt}"
                sock.sendto(message.encode(), (PI_IP, PORT))
                last_pan, last_tilt = pan, tilt
                # Optional: print(f"Sent: {message}")

            break  # Only track first face

        cv2.imshow("Face Tracking", annotated)

    if cv2.waitKey(1) == 27:  # ESC to quit
        break

cap.release()
cv2.destroyAllWindows()
sock.close()
