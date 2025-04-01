# 🛡️ Sentinel 360° AI Turret

> A Raspberry Pi-powered smart surveillance and tracking turret with facial recognition, joystick control, and intrusion detection — all managed via a futuristic web dashboard.

![Banner](sentinel%20360.jpeg)


---

## 🚀 Features

### 🎯 1. Auto-Tracking Mode
- Uses YOLOv8-Face model to detect and follow human faces.
- Sends real-time commands to the pan-tilt servos using UDP.
- Minimal latency and smooth tracking.

### 🕹️ 2. Manual Control Mode
- Control turret direction with an on-screen joystick from a React dashboard.
- Live camera view included.
- Real-time servo control via Flask API on Raspberry Pi.

### 🔒 3. Surveillance Mode
- Starts video recording upon detection of a person.
- Sends a real-time email alert with:
  - Timestamp of detection
  - Snapshot of intruder
- All powered by OpenCV, YOLO, and Flask.

---

## 📦 Folder Structure
Sentinel-360-ai-turret/
│
├── frontend/        # Next.js dashboard (deploy locally)
│
├── backend/         # PC-side detection scripts (face tracking & surveillance)
│
└── pi/              # Raspberry Pi scripts (servo control, Flask server)

⚙️ Requirements
PC
Python 3.10+

PyTorch + torchvision (CUDA recommended)

ultralytics

OpenCV

Flask

Flask-Cors

smtplib (for email)

iVCam or USB webcam

Pi
Raspberry Pi OS

RPi.GPIO

Flask

Flask-Cors

Servo motor wired to GPIO (powered externally for best results)

Install Python requirements:

bash
Copy
Edit
pip install -r requirements.txt
🚀 Setup & Run
1. Frontend (Vercel or Local)
bash
Copy
Edit
cd frontend
npm install
npm run dev
2. Backend Scripts
In backend/, run:

auto_stream.py for Auto Tracking Mode

surveillance_stream.py for Surveillance Mode

3. Raspberry Pi Server
bash
Copy
Edit
cd pi
python3 server.py   # For Manual Joystick Control
python3 servo.py    # For receiving UDP-based angle updates
🛰️ UML Diagram
mermaid
Copy
Edit
graph LR
A[Web Dashboard] -- Selects Mode --> B[Flask Backend (server.py)]
B --> |Manual| C[Servo Control via GPIO]
B --> |Auto| D[PC Detection → UDP → Pi]
B --> |Surveillance| E[Stream → Record + Email]
📷 Demo Video
🎬 Coming soon on YouTube!

💌 Email Alert (Surveillance Mode)
Sends a screenshot, timestamp, and location when a person is detected.

Uses your Gmail account (App Password recommended).

🔒 Disclaimer
This project is built for educational and demonstration purposes only.

✨ Credits
YOLOv8 by Ultralytics

Face model by lindevs/yolov8-face

Design inspired by futuristic surveillance and robotics systems.

⭐ Final Thoughts
This is not just a turret — it's a complete end-to-end AI + IoT system, showing how future defense and surveillance tools can be created with open-source power.
