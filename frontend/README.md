# 🚀 Sentinel 360° AI Turret - Frontend

This is the **Next.js + Tailwind CSS** powered web dashboard for controlling and monitoring the AI Turret. It provides three operational modes:

- 🕹️ **Manual Control** – Real-time servo movement via joystick interface.
- 🧠 **Auto Tracking** – Face detection and automated servo adjustments using YOLOv8.
- 🔒 **Surveillance** – Live video feed + recording + email alerts on detection.

## 📁 Folder Structure

```
frontend/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auto-tracking-mode.tsx
│   ├── manual-control-mode.tsx
│   ├── surveillance-mode.tsx
│   ├── mode-selector.tsx
│   ├── navbar.tsx
│   ├── theme-provider.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── chart.tsx
│       ├── toast.tsx
│       └── ... (40+ more)
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   └── utils.ts
├── public/
│   ├── placeholder-logo.png
│   ├── placeholder-user.jpg
│   └── ...
├── styles/
│   └── globals.css
├── .gitignore
├── README.md
├── components.json
├── next.config.mjs
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
└── package-lock.json
```

### 📄 Description of Key Folders & Files

- `app/` – Pages built using Next.js App Router.
- `components/` – All UI components including dashboards for each mode.
  - `ui/` – ShadCN components (accordion, toast, button, etc).
- `hooks/` – Custom React hooks for modular behavior.
- `lib/` – Utility logic for shared helper functions.
- `public/` – Static assets like logos and images.
- `styles/` – Global Tailwind CSS styling.
- `tailwind.config.ts` – Tailwind CSS setup and theme customization.
- `next.config.mjs` – Next.js configuration.
- `package.json` – Project metadata and dependencies.

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
