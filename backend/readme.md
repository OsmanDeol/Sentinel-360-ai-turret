# 🧠 Sentinel-360 Backend (PC-Side Processing)

This folder contains all the **AI-powered video processing** and **streaming scripts** for the Sentinel-360 AI Turret system. These scripts run on a **Windows PC with GPU support (e.g., RTX 3060)** and handle:

- 🎯 Auto Face Tracking (YOLOv8 + UDP angle transmission to Pi)
- 🔒 Surveillance Mode (motion-triggered recording + email alerts)
- 🌐 Real-time video streaming for web dashboard integration

---
```
## 📁 Folder Structure
backend/
├── auto_stream.py
├── surveillance_stream.py
├── server.py
├── yolov8n-face-lindevs.pt
├── requirements.txt
```

📄 Description of Key Folders & Files
auto_stream.py – Launches face-tracking mode using YOLOv8 and streams video to the dashboard; calculates face position and sends pan/tilt angles to Raspberry Pi via UDP.

surveillance_stream.py – Enables surveillance mode: detects human presence, records video, sends email alerts, and streams footage.

server.py – Flask-based API server that allows frontend to switch between modes.

yolov8n-face-lindevs.pt – Lightweight YOLOv8n model trained specifically for real-time face detection.

requirements.txt – Lists all Python dependencies required for running the backend

## 🚀 Modes Overview

### 🧠 Auto Tracking
- Uses YOLOv8 face detection
- Calculates pan/tilt based on face position
- Sends angle data to Raspberry Pi via UDP
- Streams annotated feed to the frontend

### 🔒 Surveillance
- Detects human presence (motion or face)
- Records video clip
- Sends alert email with screenshot and timestamp
- Streams surveillance feed to dashboard

### 🕹 Manual
- Controlled via joystick from the frontend
- No backend processing needed

---
