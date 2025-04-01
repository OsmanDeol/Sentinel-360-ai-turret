"use client";

import { useEffect, useState } from "react";

interface Props {
  currentMode: string;
  onModeChange: (mode: string) => void;
  isLoading: boolean;
}

export function ModeSelector({ currentMode, onModeChange, isLoading }: Props) {
  const [selected, setSelected] = useState(currentMode);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = e.target.value;
    setSelected(newMode);
    onModeChange(newMode);

    try {
      // 🔌 Stop the current script
      await fetch("http://192.168.1.156:5000/api/stop", {
        method: "POST",
      });

      // 🚀 Start the relevant script
      if (newMode === "Auto Tracking") {
        await fetch("http://192.168.1.156:5000/api/start-auto", {
          method: "POST",
        });
      } else if (newMode === "Surveillance") {
        await fetch("http://192.168.1.156:5000/api/start-surveillance", {
          method: "POST",
        });
      }
      // 🕹️ Manual mode does not launch anything extra
    } catch (err) {
      console.error("Error switching modes:", err);
    }
  };

  return (
    <div className="w-full text-center py-4">
      <label className="font-semibold mr-2">Select Mode:</label>
      <select
        value={selected}
        onChange={handleChange}
        disabled={isLoading}
        className="border px-4 py-2 rounded text-black"
      >
        <option value="Manual Control">🕹️ Manual Control</option>
        <option value="Auto Tracking">🧠 Auto Tracking</option>
        <option value="Surveillance">🔒 Surveillance</option>
      </select>
    </div>
  );
}
