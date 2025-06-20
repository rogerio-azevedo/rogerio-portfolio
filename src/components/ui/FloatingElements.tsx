'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const FloatingElements = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const predefinedValues = [
    { xPercent: 5, duration: 5, delay: 0.5 },
    { xPercent: 15, duration: 6, delay: 1.0 },
    { xPercent: 25, duration: 4.5, delay: 1.5 },
    { xPercent: 35, duration: 7, delay: 0.8 },
    { xPercent: 45, duration: 5.5, delay: 2.0 },
    { xPercent: 55, duration: 6.5, delay: 0.3 },
    { xPercent: 65, duration: 4, delay: 1.8 },
    { xPercent: 75, duration: 5.8, delay: 1.2 },
    { xPercent: 85, duration: 6.2, delay: 0.7 },
    { xPercent: 95, duration: 4.8, delay: 2.5 },
    { xPercent: 10, duration: 5.2, delay: 0.9 },
    { xPercent: 20, duration: 6.8, delay: 1.6 },
    { xPercent: 30, duration: 4.2, delay: 2.2 },
    { xPercent: 40, duration: 5.9, delay: 0.4 },
    { xPercent: 60, duration: 4.7, delay: 1.4 },
    { xPercent: 80, duration: 6.1, delay: 1.9 },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {predefinedValues.map((config, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-white/20"
          initial={{
            x:
              isClient && typeof window !== 'undefined'
                ? (window.innerWidth * config.xPercent) / 100
                : (1920 * config.xPercent) / 100,
            y: -10,
            scale: 0,
          }}
          animate={{
            y:
              isClient && typeof window !== 'undefined'
                ? window.innerHeight + 20
                : 820,
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: config.duration,
            repeat: Infinity,
            delay: config.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
