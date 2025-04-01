"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"
import { Joystick } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ManualControlMode() {
  const [lastCommands, setLastCommands] = useState<{ command: string; timestamp: string }[]>([])
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const joystickRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const bounds = useRef({ radius: 0, centerX: 0, centerY: 0 })
  
  // Motion values for smooth animations
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Springs for smooth return to center
  const springX = useSpring(x, { damping: 20, stiffness: 300 })
  const springY = useSpring(y, { damping: 20, stiffness: 300 })

  // Function to send command with normalized values
  const sendCommand = async (x: number, y: number) => {
    // Convert normalized values (-1 to 1) to servo angles (0 to 180)
    // Invert Y axis since -1 is up in our joystick but would be 0 in servo angle
    const servoX = Math.round(90 + x * 30) // Map -1,1 to 60,120
    const servoY = Math.round(90 - y * 30) // Map -1,1 to 120,60 (inverted)
    
    try {
      await fetch("http://192.168.1.162:5000/api/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ x: servoX, y: servoY }),
      })

      // Get direction name for logging
      let dirName = "center"
      if (Math.abs(x) < 0.2 && Math.abs(y) < 0.2) {
        dirName = "center"
      } else if (Math.abs(x) > Math.abs(y)) {
        dirName = x > 0 ? "right" : "left"
      } else {
        dirName = y > 0 ? "up" : "down"
      }

      const now = new Date()
      const timestamp = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`

      setLastCommands((prev) => {
        const newCommands = [{ command: `${dirName} (${x.toFixed(2)}, ${y.toFixed(2)})`, timestamp }, ...prev]
        return newCommands.slice(0, 5)
      })
    } catch (err) {
      console.error("Failed to send direction:", err)
    }
  }
  
  // Initialize joystick dimensions
  useEffect(() => {
    if (!joystickRef.current) return
    
    const updateBounds = () => {
      const joystick = joystickRef.current
      if (!joystick) return
      
      const rect = joystick.getBoundingClientRect()
      const size = Math.min(rect.width, rect.height)
      
      bounds.current = {
        radius: size / 2 - 30, // Subtract knob radius to keep within bounds
        centerX: rect.width / 2,
        centerY: rect.height / 2
      }
    }
    
    updateBounds()
    window.addEventListener('resize', updateBounds)
    
    return () => {
      window.removeEventListener('resize', updateBounds)
    }
  }, [])
  
  // Handle mouse/touch events
  useEffect(() => {
    if (!joystickRef.current) return
    
    const joystick = joystickRef.current
    
    const handleStart = (clientX: number, clientY: number) => {
      isDragging.current = true
      handleMove(clientX, clientY)
    }
    
    const handleEnd = () => {
      isDragging.current = false
      // Return to center with spring animation
      springX.set(0)
      springY.set(0)
      setPosition({ x: 0, y: 0 })
      sendCommand(0, 0) // Send centered position
    }
    
    const handleMove = (clientX: number, clientY: number) => {
      if (!isDragging.current || !joystickRef.current) return
      
      const rect = joystickRef.current.getBoundingClientRect()
      const offsetX = clientX - rect.left
      const offsetY = clientY - rect.top
      
      // Calculate distance from center
      const deltaX = offsetX - bounds.current.centerX
      const deltaY = offsetY - bounds.current.centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      
      // Normalize position if outside the bounds
      let normX = deltaX
      let normY = deltaY
      
      if (distance > bounds.current.radius) {
        normX = (deltaX / distance) * bounds.current.radius
        normY = (deltaY / distance) * bounds.current.radius
      }
      
      // Update position
      x.set(normX)
      y.set(normY)
      
      // Calculate normalized values (-1 to 1)
      const normalizedX = normX / bounds.current.radius
      const normalizedY = -normY / bounds.current.radius // Invert Y for intuitive control
      
      setPosition({ x: normalizedX, y: normalizedY })
      sendCommand(normalizedX, normalizedY)
    }
    
    // Mouse events
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      handleStart(e.clientX, e.clientY)
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      handleMove(e.clientX, e.clientY)
    }
    
    const handleMouseUp = () => {
      handleEnd()
    }
    
    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.touches[0]
      handleStart(touch.clientX, touch.clientY)
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.touches[0]
      handleMove(touch.clientX, touch.clientY)
    }
    
    const handleTouchEnd = () => {
      handleEnd()
    }
    
    // Add event listeners
    joystick.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    
    joystick.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
    
    return () => {
      joystick.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      
      joystick.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 border-gray-800 bg-gray-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Joystick className="h-5 w-5 text-[#6366f1]" />
            Manual Control Interface
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="text-center mb-4">
            <p className="text-gray-400">Drag the joystick to control direction</p>
          </div>
          
          {/* Joystick container */}
          <div 
            ref={joystickRef}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-gray-800 bg-gray-900 mb-8 touch-none select-none"
          >
            {/* Grid lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-px bg-gray-800 opacity-30" />
              <div className="w-px h-full bg-gray-800 opacity-30" />
              <div className="w-[70%] h-[70%] rounded-full border border-gray-800 opacity-30" />
              <div className="w-[40%] h-[40%] rounded-full border border-gray-800 opacity-30" />
            </div>
            
            {/* Joystick knob */}
            <motion.div 
              className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-[#6366f1]/20 border-2 border-[#6366f1] cursor-grab active:cursor-grabbing"
              style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%"
              }}
              whileTap={{ scale: 1.1 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#6366f1]" />
              </div>
            </motion.div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 mb-2">Position</p>
            <div className="text-xl font-bold text-[#6366f1]">
              X: {position.x.toFixed(2)} | Y: {position.y.toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-gray-800 bg-gray-950">
        <CardHeader>
          <CardTitle>Control Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-2">System Status</h4>
              <div className="space-y-2">
                <StatusItem 
                  label="Control Mode" 
                  value="Manual" 
                  color="#6366f1" 
                  pulsing 
                />
                <StatusItem 
                  label="Response Time" 
                  value="12ms" 
                  color="#38bdf8" 
                />
                <StatusItem 
                  label="Signal Strength" 
                  value="Excellent" 
                  color="#14b8a6" 
                />
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Command History</h4>
              {lastCommands.length > 0 ? (
                <div className="space-y-2">
                  {lastCommands.map((cmd, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-[#6366f1]">{cmd.command}</span>
                      <span className="text-gray-500">{cmd.timestamp}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">No commands sent yet</p>
              )}
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Instructions</h4>
              <p className="text-xs text-gray-400">
                Drag the joystick to send directional commands with precise control.
                Release to return to neutral position.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface StatusItemProps {
  label: string
  value: string
  color: string
  pulsing?: boolean
}

function StatusItem({ label, value, color, pulsing }: StatusItemProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}</span>
      <div className="flex items-center gap-2">
        {pulsing && (
          <motion.div 
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: color }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          />
        )}
        <span className="font-medium" style={{ color }}>{value}</span>
      </div>
    </div>
  )
}