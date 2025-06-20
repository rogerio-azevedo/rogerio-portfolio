'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Dictionary } from '@/types/dictionary'
import { Section } from '@/components/Section'
import { techStackItems, TechStackItem } from '@/data/tech-stack'

interface TechStackProps {
  dict: Dictionary
}

const TechCard = ({
  tech,
  techData,
  dict,
  index,
}: {
  tech: TechStackItem
  techData: { name: string; description: string }
  dict: Dictionary
  index: number
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleInteractionStart = () => {
    setIsHovered(true)
  }

  const handleInteractionEnd = () => {
    setIsHovered(false)
  }

  const getLevelEmoji = (level: string) => {
    switch (level) {
      case 'expert':
        return '🏆'
      case 'advanced':
        return '🎯'
      case 'intermediate':
        return '📈'
      default:
        return '🌱'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
      case 'advanced':
        return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
      case 'intermediate':
        return 'bg-gradient-to-r from-green-500 to-green-700 text-white'
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
    }
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
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${tech.color} rounded-2xl transition-opacity duration-300`}
          animate={
            isHovered ? { scale: 1.05, opacity: 0.2 } : { scale: 1, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
        />

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
          <motion.div
            className="relative"
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}>
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <Image
                src={tech.icon}
                alt={techData.name}
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>
          </motion.div>

          <div className="flex flex-col items-center space-y-3 text-center">
            <h3 className="text-xl font-bold text-white">{techData.name}</h3>
            <p className="text-sm text-gray-300">{techData.description}</p>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`inline-block bg-gradient-to-r px-3 py-1 text-xs font-medium ${tech.color} rounded-full text-black`}>
                {dict.techStack.categories[tech.category]}
              </span>

              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getLevelColor(tech.level)}`}>
                <span className="mr-1">{getLevelEmoji(tech.level)}</span>
                {dict.techStack.levels[tech.level]}
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const TechStack = ({ dict }: TechStackProps) => {
  return (
    <Section
      id="tech-stack"
      className="relative z-10 w-full bg-gradient-to-br from-slate-900 via-[#00110f] to-black">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center">
          <h1 className="text-center text-4xl font-bold text-white md:text-5xl">
            {dict.techStack.title.split(' ')[0]}{' '}
            {dict.techStack.title.split(' ')[1]}{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
              {dict.techStack.title.split(' ').slice(2).join(' ')}
            </span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {techStackItems.map((tech, index) => {
            const techData = dict.techStack.technologies[tech.key]
            return (
              <TechCard
                key={tech.key}
                tech={tech}
                techData={techData}
                dict={dict}
                index={index}
              />
            )
          })}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </Section>
  )
}
