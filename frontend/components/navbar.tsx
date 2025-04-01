"use client"

import { Activity, Shield, Menu } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

interface NavbarProps {
  systemStatus: string
  currentMode: string
}

export function Navbar({ systemStatus, currentMode }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-800 bg-gray-950">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-[#38bdf8]" />
          <span className="font-bold text-lg tracking-tight">Sentinel 360</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <StatusIndicator status={systemStatus} />
          <ModeIndicator mode={currentMode} />
        </div>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gray-950 border-gray-800 text-white">
            <div className="flex flex-col gap-6 mt-8">
              <StatusIndicator status={systemStatus} />
              <ModeIndicator mode={currentMode} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function StatusIndicator({ status }: { status: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-sm text-gray-400">System Status:</div>
      <div className="flex items-center gap-1.5">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
          className="h-2 w-2 rounded-full bg-[#14b8a6]"
        />
        <span className="font-medium">{status}</span>
      </div>
    </div>
  )
}

function ModeIndicator({ mode }: { mode: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-sm text-gray-400">Active Mode:</div>
      <div className="flex items-center gap-1.5">
        <Activity className="h-4 w-4 text-[#6366f1]" />
        <span className="font-medium">{mode}</span>
      </div>
    </div>
  )
}

