export function SurveillanceMode() {
  return (
    <div className="text-center">
      <p className="text-lg mb-4">🔒 Surveillance Mode Active</p>
      <p className="text-sm text-gray-400 mb-2">Recording will start and an alert will be sent if a person is detected.</p>
      <img
        src="http://127.0.0.1:5051/surveillance_feed"
        alt="Surveillance Live Feed"
        className="mx-auto border rounded-md w-[480px]"
      />
    </div>
  );
}

