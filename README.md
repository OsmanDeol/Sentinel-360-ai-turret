# 🔭 Sentinel 360° AI Turret

> A Raspberry Pi-powered smart surveillance and tracking turret with facial recognition, real-time pan-tilt control, and an interactive web dashboard.

![Banner](sentinel%20360.jpeg)

---

### 🚀 Features

- 🎯 **Auto Tracking Mode**: Face recognition and automatic pan-tilt targeting using YOLOv8.
- 🕹️ **Manual Mode**: Real-time joystick control from a futuristic web dashboard.
- 🔒 **Surveillance Mode**: Sends an email alert and records footage when a person is detected.
- 🌐 **Interactive Dashboard** (built with Next.js): Switch modes, view live feed, and monitor status.
- 💡 **Hardware Integration**: Built using Raspberry Pi, camera, servos, joystick.
- 📷 **Video Feed & Recording**: Live feed with auto-lock, and recording during intrusions.

---

### 📂 Project Structure

```bash
Sentinel-360-ai-turret/
│
├── frontend/      # Next.js web dashboard (deployed via Vercel)
├── backend/       # PC-side face tracking and surveillance scripts (YOLO, Flask)
└── pi/            # Raspberry Pi servo control + manual control Flask server
🛠️ Requirements
PC (Backend):
Python 3.9+

Flask

OpenCV

Ultralytics (YOLOv8)

Torch & TorchVision (with GPU support for CUDA)

smtplib (for email alerts)

bash
Copy
Edit
pip install -r backend/requirements.txt
Pi:
Flask

RPi.GPIO

bash
Copy
Edit
pip install -r pi/requirements.txt
Frontend:
Node.js 18+

npm

bash
Copy
Edit
cd frontend
npm install
npm run dev
🖥️ Usage
Start Flask servers:

On PC: Start auto_stream.py and surveillance_stream.py as needed.

On Raspberry Pi: Start servo.py and server.py.

Launch Frontend:

bash
Copy
Edit
cd frontend
npm run dev
Switch between modes in the UI:

Auto Tracking

Manual Control

Surveillance

📧 Surveillance Mode Email Setup
Set up a Gmail app password:

Enable 2FA on Gmail

Create an App Password

Add it to surveillance_stream.py

🧠 Tech Stack
YOLOv8 (ultralytics)

Flask

OpenCV

Next.js (React)

Raspberry Pi GPIO



📸 Demo Preview (YouTube)
🎬 YouTube Demo - Watch Here (Add your link here)


📜 License
MIT License © 2025
