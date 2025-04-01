export function AutoTrackingMode() {
  return (
    <div className="text-center">
      <p className="text-lg mb-4">🧠 Auto Tracking Active</p>
      <img
        src="http://127.0.0.1:5050/video_feed"
        alt="Live Video Feed"
        className="mx-auto border rounded-md w-[480px]"
      />
    </div>
  )
}
