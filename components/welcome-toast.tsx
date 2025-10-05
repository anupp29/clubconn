"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface WelcomeToastProps {
  username: string
  show: boolean
  onClose: () => void
}

export function WelcomeToast({ username, show, onClose }: WelcomeToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[100]"
        >
          <div className="relative">
            {/* Green glow effect */}
            <div className="absolute inset-0 bg-green-500/30 blur-xl rounded-full animate-pulse" />

            {/* Toast content */}
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-full shadow-2xl border-2 border-green-400">
              <p className="text-lg font-semibold text-center">
                Hello <span className="font-bold">{username}</span>!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
