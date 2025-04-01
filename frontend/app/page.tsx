"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { ModeSelector } from "@/components/mode-selector"
import { AutoTrackingMode } from "@/components/auto-tracking-mode"
import { ManualControlMode } from "@/components/manual-control-mode"
import { SurveillanceMode } from "@/components/surveillance-mode"

export default function Dashboard() {
  const [currentMode, setCurrentMode] = useState("Auto Tracking")
  const [systemStatus, setSystemStatus] = useState("Online")
  const [isLoading, setIsLoading] = useState(false)

  const handleModeChange = async (mode: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setCurrentMode(mode)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar systemStatus={systemStatus} currentMode={currentMode} />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <ModeSelector
          currentMode={currentMode}
          onModeChange={handleModeChange}
          isLoading={isLoading}
        />
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {currentMode === "Auto Tracking" && <AutoTrackingMode />}
              {currentMode === "Manual Control" && <ManualControlMode />}
              {currentMode === "Surveillance" && <SurveillanceMode />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
