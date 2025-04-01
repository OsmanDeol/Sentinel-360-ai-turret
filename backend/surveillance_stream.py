# surveillance_stream.py
import cv2
import socket
import time
from flask import Flask, Response
from ultralytics import YOLO
import smtplib
from email.message import EmailMessage
import os
from datetime import datetime

app = Flask(__name__)

model = YOLO("yolov8n-face-lindevs.pt")
cap = cv2.VideoCapture(0)

recording = False
out = None
last_alert_time = 0

def send_email_alert(frame):
    global last_alert_time
    if time.time() - last_alert_time < 30:
        return

    last_alert_time = time.time()

    # Save screenshot
    os.makedirs("screenshots", exist_ok=True)
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    screenshot_path = f"screenshots/intruder_{timestamp}.jpg"
    cv2.imwrite(screenshot_path, frame)

    msg = EmailMessage()
    msg["Subject"] = "🚨 Surveillance Alert - Intruder Detected"
    msg["From"] = "osmanalideol@gmail.com"
    msg["To"] = "osmanalideo@gmail.com"

    msg.set_content(
        f"A person was detected at {timestamp}.\nScreenshot is attached."
    )

    with open(screenshot_path, "rb") as f:
        img_data = f.read()
        msg.add_attachment(
            img_data, maintype="image", subtype="jpeg", filename=os.path.basename(screenshot_path)
        )

    try:
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login("osmanalideol@gmail.com", "oqef aewc hvrb xbxf")
        server.send_message(msg)
        server.quit()
        print("✅ Email alert with screenshot sent!")
    except Exception as e:
        print("❌ Email failed:", e)

def gen_frames():
    global recording, out

    while True:
        success, frame = cap.read()
        if not success:
            continue

        results = model.predict(frame, conf=0.4, classes=[0], verbose=False)

        if results[0].boxes:
            if not recording:
                print("🎥 Started Recording...")
                fourcc = cv2.VideoWriter_fourcc(*'XVID')
                out = cv2.VideoWriter(f"recording_{int(time.time())}.avi", fourcc, 20.0, (frame.shape[1], frame.shape[0]))
                recording = True
                send_email_alert(frame)

            out.write(frame)
            annotated = results[0].plot()
        else:
            annotated = frame

        ret, buffer = cv2.imencode('.jpg', annotated)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/surveillance_feed')
def surveillance_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5051)
