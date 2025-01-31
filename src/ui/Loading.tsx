"use client"


import { motion } from "framer-motion"

export function LoadingPage() {
  return (
    <div className="fixed inset-0 bg-[#FAF7F2] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="flex flex-col items-center space-y-4"
      >
        <div className="relative w-48 h-16">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-28%20163818-KrJf3vLZPKPvzi2J6cYi0S0RNodZb2.png"
            alt="ルックミール"            
            className="object-contain"
          />
        </div>
        
      </motion.div>
    </div>
  )
}

