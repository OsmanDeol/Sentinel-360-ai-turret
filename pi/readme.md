📦 Raspberry Pi Module (pi/)
This folder contains all the scripts that run on the Raspberry Pi. These are responsible for receiving angle data from the main system (PC) and controlling the physical pan-tilt servos in real time.

📁 Folder Contents
```
pi/
├── servo.py              # Listens for pan/tilt angle data and moves servos accordingly
├── requirements.txt      # Python dependencies needed to run the Raspberry Pi code

```
⚙️ How It Works
The Raspberry Pi listens for incoming UDP packets on port 6000.

Each packet contains a string in the format pan,tilt (e.g., 120,45).

These angles are translated into PWM signals to drive two servos:

Pan: rotates the base (left–right).

Tilt: rotates the top (up–down).

🚀 How to Run
Install dependencies (after SSH-ing into the Pi):

bash
Copy
Edit
pip3 install -r requirements.txt
Run the servo control listener:

bash
Copy
Edit
python3 servo.py
You should see output like:

csharp
Copy
Edit
🟢 Listening for angles on port 6000...
Pan → 120
Tilt → 45
🛠 Hardware Setup
GPIO Pins Used:

GPIO 17 → Pan Servo

GPIO 18 → Tilt Servo

Wiring:

Signal wires of the servos go to GPIO 17 & 18.

Power the servos either:

Directly from Pi (for low-torque).

Or preferably, from an external 5V source if jitter occurs.

✅ Dependencies
Install these on your Raspberry Pi:

Copy
Edit
RPi.GPIO
Add this to your requirements.txt:

txt
Copy
Edit
RPi.GPIO
📡 Communication Protocol
Protocol: UDP (low-latency, fast)

Port: 6000

Expected Packet: "120,45" (pan, tilt)

📌 Notes
Make sure the servo angles are within safe bounds (0–360 for pan, 0–90 for tilt).

Angle updates are throttled to only apply changes when movement is significant (≥ 2°).
