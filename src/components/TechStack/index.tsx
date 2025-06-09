'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TechStackProps {
  className?: string
}

const techStacks = [
  {
    name: 'React Native',
    icon: '/tech/react.svg',
    description: 'Cross-Platform Mobile Framework',
    category: 'Mobile',
    level: 90,
    color: 'from-blue-600 to-cyan-600',
  },
  {
    name: 'React',
    icon: '/tech/react.svg',
    description: 'Modern UI Library',
    category: 'Frontend',
    level: 90,
    color: 'from-blue-400 to-cyan-400',
  },
  {
    name: 'Next.js',
    icon: '/tech/next.svg',
    description: 'React Framework',
    category: 'Frontend',
    level: 85,
    color: 'from-gray-300 to-white',
  },
  {
    name: 'TypeScript',
    icon: '/tech/typescript.svg',
    description: 'Type-Safe JavaScript',
    category: 'Language',
    level: 90,
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'JavaScript',
    icon: '/tech/javascript.svg',
    description: 'Programming Language',
    category: 'Language',
    level: 90,
    color: 'from-yellow-400 to-yellow-500',
  },
  {
    name: 'Tailwind CSS',
    icon: '/tech/tailwind.svg',
    description: 'Utility-First CSS',
    category: 'Styling',
    level: 88,
    color: 'from-teal-400 to-blue-500',
  },
  {
    name: 'Node.js',
    icon: '/tech/nodejs.svg',
    description: 'JavaScript Runtime',
    category: 'Backend',
    level: 80,
    color: 'from-green-400 to-green-600',
  },
  {
    name: 'NestJS',
    icon: '/tech/nestjs.svg',
    description: 'Node.js Framework',
    category: 'Backend',
    level: 80,
    color: 'from-red-500 to-pink-500',
  },
  {
    name: 'GraphQL',
    icon: '/tech/graphql.svg',
    description: 'Query Language',
    category: 'API',
    level: 80,
    color: 'from-pink-500 to-purple-500',
  },
  {
    name: 'AWS',
    icon: '/tech/aws.svg',
    description: 'Cloud Services',
    category: 'Cloud',
    level: 60,
    color: 'from-orange-400 to-yellow-500',
  },
  {
    name: 'C#',
    icon: '/tech/csharp.svg',
    description: 'Programming Language',
    category: 'Language',
    level: 50,
    color: 'from-purple-400 to-purple-500',
  },
  {
    name: 'Python',
    icon: '/tech/python.svg',
    description: 'Versatile Programming Language',
    category: 'Language',
    level: 40,
    color: 'from-blue-400 to-yellow-400',
  },
]

const TechCard = ({
  tech,
  index,
}: {
  tech: (typeof techStacks)[0]
  index: number
}) => {
  const [isHovered, setIsHovered] = useState(false)

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
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative">
      <div className="relative h-full overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 backdrop-blur-sm">
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${tech.color} rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-20`}
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
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

        <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
          {/* Tech Icon */}
          <motion.div
            className="relative"
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}>
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <img
                src={tech.icon}
                alt={tech.name}
                className="h-10 w-10 object-contain"
              />
            </div>
          </motion.div>

          {/* Tech Name */}
          <h3 className="text-xl font-bold text-white">{tech.name}</h3>

          {/* Description */}
          <p className="text-sm text-gray-300">{tech.description}</p>

          {/* Category Badge */}
          <span
            className={`inline-block bg-gradient-to-r px-3 py-1 text-xs font-medium ${tech.color} rounded-full text-black`}>
            {tech.category}
          </span>

          {/* Skill Level Bar */}
          <div className="w-full">
            <div className="mb-2 flex justify-between text-xs text-gray-400">
              <span>Proficiency</span>
              <span>{tech.level}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-700">
              <motion.div
                className={`h-2 bg-gradient-to-r ${tech.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${tech.level}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              />
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
          <h1 className="text-center text-4xl font-bold md:text-5xl">
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
