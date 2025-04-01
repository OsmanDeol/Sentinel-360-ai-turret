import cv2
import socket
import torch
from flask import Flask, Response
from ultralytics import YOLO

app = Flask(__name__)

model = YOLO("yolov8n-face-lindevs.pt")
device = "cuda" if torch.cuda.is_available() else "cpu"
model = model.to(device)

cap = cv2.VideoCapture(0)
PI_IP = '192.168.1.162'  # Replace with your Pi's IP
PORT = 6000
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

last_pan, last_tilt = -1, -1

def gen_frames():
    global last_pan, last_tilt

    while True:
        success, frame = cap.read()
        if not success:
            continue

        results = model.predict(frame, conf=0.4, verbose=False)

        if results[0].boxes:
            annotated = results[0].plot()
            x1, y1, x2, y2 = results[0].boxes.xyxy[0].cpu().numpy()
            cx = int((x1 + x2) / 2)
            cy = int((y1 + y2) / 2)

            pan = int((cx / frame.shape[1]) * 180)
            tilt = int((1 - (cy / frame.shape[0])) * 180)

            pan = max(0, min(pan, 180))
            tilt = max(0, min(tilt, 180))

            if abs(pan - last_pan) >= 2 or abs(tilt - last_tilt) >= 2:
                sock.sendto(f"{pan},{tilt}".encode(), (PI_IP, PORT))
                last_pan, last_tilt = pan, tilt

            frame = annotated

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5050)
