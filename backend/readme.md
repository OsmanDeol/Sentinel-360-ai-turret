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

## 🔧 Setup Instructions

### 1. Clone & Navigate

```bash
git clone https://github.com/OsmanDeol/Sentinel-360-ai-turret.git
cd Sentinel-360-ai-turret/backend
2. Set Up Virtual Environment
bash
Copy
Edit
python -m venv .venv
.venv\Scripts\activate   # For Windows
3. Install Dependencies
bash
Copy
Edit
pip install -r requirements.txt
✅ Make sure PyTorch is installed with GPU support if using CUDA.

▶️ Running the Scripts
🌐 API Server (for dashboard)
bash
Copy
Edit
python server.py
🧠 Auto Face Tracking Mode
bash
Copy
Edit
python auto_stream.py
🔒 Surveillance Mode
bash
Copy
Edit
python surveillance_stream.py
📤 Email Alert Setup
Create a .env file:

ini
Copy
Edit
EMAIL_SENDER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_RECEIVER=receiver_email@gmail.com
Enable 2FA on Gmail and generate an App Password: 👉 https://support.google.com/accounts/answer/185833
