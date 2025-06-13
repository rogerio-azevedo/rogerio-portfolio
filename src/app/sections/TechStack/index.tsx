'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { techStacks } from '@/data'

interface TechStackProps {
  className?: string
}

const TechCard = ({
  tech,
  index,
}: {
  tech: (typeof techStacks)[0]
  index: number
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleInteractionStart = () => {
    setIsHovered(true)
  }

  const handleInteractionEnd = () => {
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      whileHover={{
        y: -10,
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        y: -10,
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      onHoverStart={handleInteractionStart}
      onHoverEnd={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      className="group relative">
      <div className="relative h-full overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 backdrop-blur-sm">
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${tech.color} rounded-2xl transition-opacity duration-300`}
          animate={
            isHovered ? { scale: 1.05, opacity: 0.2 } : { scale: 1, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles effect */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-none absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white"
                initial={{
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  opacity: 0,
                }}
                animate={{
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        )}

        <div className="relative z-10 flex h-full flex-col items-center justify-between space-y-4 text-center">
          {/* Tech Icon */}
          <motion.div
            className="relative"
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}>
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <Image
                src={tech.icon}
                alt={tech.name}
                width={24}
                height={24}
                className="h-10 w-10 object-contain"
              />
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="flex flex-col items-center space-y-3 text-center">
            {/* Tech Name */}
            <h3 className="text-xl font-bold text-white">{tech.name}</h3>

            {/* Description */}
            <p className="text-sm text-gray-300">{tech.description}</p>
          </div>

          {/* Skill Level Badge - Now at bottom */}
          <div className="w-full">
            <div className="flex items-center justify-between gap-2">
              {/* Category Badge - Left */}
              <span
                className={`inline-block bg-gradient-to-r px-3 py-1 text-xs font-medium ${tech.color} rounded-full text-black`}>
                {tech.category}
              </span>

              {/* Experience Level Badge - Right */}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                  tech.level === 'Expert'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : tech.level === 'Advanced'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                      : tech.level === 'Intermediate'
                        ? 'bg-gradient-to-r from-green-500 to-green-700 text-white'
                        : 'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
                }`}>
                <span className="mr-1">
                  {tech.level === 'Expert'
                    ? '🏆'
                    : tech.level === 'Advanced'
                      ? '🎯'
                      : tech.level === 'Intermediate'
                        ? '📈'
                        : '🌱'}
                </span>
                {tech.level}
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const TechStack = ({ className }: TechStackProps) => {
  return (
    <section
      className={cn('relative z-10 px-4 py-5 md:px-0 md:py-40', className)}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center">
          <h1 className="text-center text-4xl font-bold text-white md:text-5xl">
            Some of my
            <span className="text-purple-300"> Tech Stack</span>
          </h1>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {techStacks.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>

        {/* Floating Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl"
          />
        </div>
      </div>
    </section>
  )
}
