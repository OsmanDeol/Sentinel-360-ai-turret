import socket
import RPi.GPIO as GPIO
import time

# GPIO pin configuration
PAN_PIN = 17
TILT_PIN = 18

GPIO.setmode(GPIO.BCM)
GPIO.setup(PAN_PIN, GPIO.OUT)
GPIO.setup(TILT_PIN, GPIO.OUT)

# Initialize PWM on both servos
pan_servo = GPIO.PWM(PAN_PIN, 50)
tilt_servo = GPIO.PWM(TILT_PIN, 50)
pan_servo.start(0)
tilt_servo.start(0)

last_pan = -1
last_tilt = -1

# Setup UDP socket to listen for incoming angle commands
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(("0.0.0.0", 6000))

def move_pan_servo(servo, angle):
    """
    Map pan angle (0-360) to PWM duty cycle.
    Assuming a duty cycle range from 2.5 (0°) to 12.5 (360°).
    """
    duty = 2.5 + (angle / 360.0) * 10
    servo.ChangeDutyCycle(duty)
    time.sleep(0.07)
    servo.ChangeDutyCycle(0)

def move_tilt_servo(servo, angle):
    """
    Map tilt angle (0-90) to PWM duty cycle.
    Assuming a duty cycle range from 2.5 (0°) to 12.5 (90°).
    """
    duty = 2.5 + (angle / 90.0) * 10
    servo.ChangeDutyCycle(duty)
    time.sleep(0.07)
    servo.ChangeDutyCycle(0)

print("🟢 Listening for angles on port 6000...")

try:
    while True:
        data, _ = sock.recvfrom(1024)
        msg = data.decode().strip()

        if "," in msg:
            try:
                pan_angle, tilt_angle = map(int, msg.split(","))

                # Clamp the received values to safe ranges
                pan_angle = max(0, min(pan_angle, 360))
                tilt_angle = max(0, min(tilt_angle, 90))

                # Update pan servo if change is significant
                if abs(pan_angle - last_pan) >= 2:
                    print(f"Pan → {pan_angle}")
                    move_pan_servo(pan_servo, pan_angle)
                    last_pan = pan_angle

                # Update tilt servo if change is significant
                if abs(tilt_angle - last_tilt) >= 2:
                    print(f"Tilt → {tilt_angle}")
                    move_tilt_servo(tilt_servo, tilt_angle)
                    last_tilt = tilt_angle

            except ValueError:
                print("Invalid data:", msg)

except KeyboardInterrupt:
    print("\n🛑 Stopping...")
finally:
    pan_servo.stop()
    tilt_servo.stop()
    GPIO.cleanup()

