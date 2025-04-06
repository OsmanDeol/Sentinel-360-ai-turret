# 🚀 Sentinel 360° AI Turret - Frontend

This is the **Next.js + Tailwind CSS** powered web dashboard for controlling and monitoring the AI Turret. It provides three operational modes:

- 🕹️ **Manual Control** – Real-time servo movement via joystick interface.
- 🧠 **Auto Tracking** – Face detection and automated servo adjustments using YOLOv8.
- 🔒 **Surveillance** – Live video feed + recording + email alerts on detection.

## 📁 Folder Structure

frontend/
├── app/                          # App Router pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout (includes ThemeProvider, NavBar)
│   ├── page.tsx                  # Home page (mode selector)
│
├── components/                   # UI components for each mode
│   ├── auto-tracking-mode.tsx
│   ├── manual-control-mode.tsx
│   ├── surveillance-mode.tsx
│   ├── mode-selector.tsx
│   ├── navbar.tsx
│   ├── theme-provider.tsx
│   └── ui/                       # ShadCN + custom UI components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── card.tsx
│       ├── chart.tsx
│       ├── slider.tsx
│       ├── toast.tsx
│       └── ... (40+ more reusable UI components)
│
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│
├── lib/
│   └── utils.ts                  # Utility functions
│
├── public/                       # Static assets
│   ├── placeholder-logo.png
│   ├── placeholder-user.jpg
│   └── ...
│
├── styles/
│   └── globals.css               # Optional alternative location for styling
│
├── .gitignore
├── README.md
├── components.json
├── next.config.mjs
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── package-lock.json



🚀 How to Run the Frontend
1. Navigate to the frontend folder
bash
Copy
Edit
cd frontend
2. Install dependencies
bash
Copy
Edit
npm install
3. Start development server
bash
Copy
Edit
npm run dev
Your dashboard will be available at:
➡️ http://localhost:3000

🔌 API Integration
This frontend communicates with a Flask backend that runs on the PC or Raspberry Pi.

Endpoints Used:
Mode	Endpoint	Method	Description
Manual Control	/api/move	POST	Sends joystick X/Y to servos
Auto Tracking	/api/start-auto	POST	Starts face-tracking stream
Surveillance	/api/start-surveillance	POST	Starts surveillance + email alert
Any Mode	/api/stop	POST	Stops current backend process
Streams	/video_feed, /surveillance_feed	GET	Live MJPEG stream from Flask
💻 Tech Stack
Next.js 14 (App Router)

Tailwind CSS

Framer Motion

TypeScript

Integrated with Flask backend and Raspberry Pi GPIO system

🖼️ Screenshots
Add screen captures of each mode in action (Manual, Auto, Surveillance)

📄 License
This project is open-source under the MIT Licens
