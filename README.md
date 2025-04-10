# 🔭 Sentinel 360° AI Turret

> A Raspberry Pi-powered smart surveillance and tracking turret with facial recognition, real-time pan-tilt control, and an interactive web dashboard.

![Banner](sentinel%20360.jpeg)

---


---
# 🎯 Sentinel-360 AI Turret

The Sentinel 360° is more than just a security camera — it's a real-time autonomous surveillance and tracking system powered by AI. Equipped with facial recognition, servo-based tracking, and emergency alert capabilities, it offers next-gen security intelligence for any environment.


---
## 📂 Repository Structure

This project is split into 3 main components. Each has its own dedicated README for clarity and in-depth documentation:

- [`frontend/`](./frontend) — Web Dashboard built with Next.js → [Frontend README](./frontend/README.md)
- [`backend/`](./backend) — PC-side YOLO + Flask system → [Backend README](./backend/README.md)
- [`pi/`](./pi) — Raspberry Pi code for controlling servos → [Pi README](./pi/README.md)


### 🚀 Features

- 🎯 **Auto Tracking Mode**: Face recognition and automatic pan-tilt targeting using YOLOv8.
- 🕹️ **Manual Mode**: Real-time joystick control from a futuristic web dashboard.
- 🔒 **Surveillance Mode**: Sends an email alert and records footage when a person is detected.
- 🌐 **Interactive Dashboard** (built with Next.js): Switch modes, view live feed, and monitor status.
- 💡 **Hardware Integration**: Built using Raspberry Pi, camera, servos, joystick.
- 📷 **Video Feed & Recording**: Live feed with auto-lock, and recording during intrusions.



---
🛡️ Sentinel 360° AI Turret — Intelligent Surveillance & Tracking System

🔗 GitHub: [github.com/OsmanDeol/Sentinel-360-ai-turret](https://github.com/OsmanDeol/Sentinel-360-ai-turret)

🎬 Watch the full demonstration here:
➡️ [YouTube Demo](https://youtu.be/pR1h6KWUKuw)

---

## 🧾 About This Repository

This project folder includes everything needed for the final submission:

- ✅ Project presentation slides and demo media  
- ✅ UML diagrams for system architecture and logic  
- ✅ Three operating modes: Manual Control, Auto Tracking, Surveillance  
- ✅ Video stream integration and email alerts  
- ✅ Raspberry Pi + PC multi-device coordination  

Each core section of the system contains its **own `README.md` file** for setup and usage:

| Folder        | Description                                      |
|---------------|--------------------------------------------------|
| `frontend/`   | 📱 Next.js dashboard (deployed on Vercel)         |
| `backend/`    | 🧠 Python scripts for YOLO inference & Flask APIs |
| `pi/`         | 🤖 Servo control code running on Raspberry Pi     |
| `diagrams/`   | 📊 UML activity + flow diagrams                   |
| `presentaion/`| contains the presentaion slide                    |

---

🧩 UML & Architecture Diagrams  
📂 Located in: `diagrams/`

- **overview.png** – High-level system architecture (Frontend → Backend → Pi)  
- **auto-tracking-mode.png** – Auto-tracking logic with YOLO + UDP  
- **manual-mode.png** – Real-time servo control using joystick  
- **surveillance-mode.png** – Email alerts, detection & recording logic  

---

---


## 👨‍💻 Meet the Team

### 🧠 Osman Deol  
**Role:** Lead Developer  
**Focus:** Backend · AI Integration · Project Architecture  
> *"I engineered the ML pipeline, coordinated backend/frontend integration, and drove the overall vision."*

---

### 🛠️ Umberto De Luca
**Role:** Hardware Engineer  
**Focus:** Raspberry Pi · Servo System · Power Architecture  
> *"I wired and configured the servo control system and ensured all hardware components were functional and precise."*

---

### ⚙️ David Ursu  
**Role:** Hardware Assistant  
**Focus:** GPIO Configuration · Mechanical Setup  
> *"I contributed to servo calibration and the physical assembly of the turret and pan-tilt mechanism."*

---

### 💻 Joel  deHoog
**Role:** Frontend Assistant  
**Focus:** React Integration · Web Dashboard Components  
> *"I contributed to refining the web interface and supported frontend integration with the Flask backend."*
---
---

## ✅ Final Notes

This `README.md` is an overview.  
👉 Check inside each folder for detailed setup and code explanations.

---




📜 License
MIT License © 2025
