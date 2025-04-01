from flask import Flask, request
from flask_cors import CORS
import subprocess
import os
import signal

app = Flask(__name__)
CORS(app)

# Global process
running_process = None

def kill_process():
    global running_process
    if running_process and running_process.poll() is None:
        print("Stopping existing script...")
        os.killpg(os.getpgid(running_process.pid), signal.SIGTERM)
        running_process = None

@app.route("/api/start-auto", methods=["POST"])
def start_auto():
    kill_process()
    global running_process
    print("🧠 Starting Auto Tracking...")
    running_process = subprocess.Popen(
        ["python", "auto_tracking.py"], preexec_fn=os.setsid
    )
    return {"status": "started auto"}

@app.route("/api/start-surveillance", methods=["POST"])
def start_surveillance():
    kill_process()
    global running_process
    print("🔒 Starting Surveillance Mode...")
    running_process = subprocess.Popen(
        ["python", "surveillance_mode.py"], preexec_fn=os.setsid
    )
    return {"status": "started surveillance"}

@app.route("/api/stop", methods=["POST"])
def stop():
    kill_process()
    return {"status": "stopped"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
