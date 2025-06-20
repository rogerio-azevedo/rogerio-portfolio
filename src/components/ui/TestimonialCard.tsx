'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface TestimonialCardProps {
  quote: string
  name: string
  title: string
  company: string
  index: number
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  title,
  company,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative">
      {/* Background blur effect */}
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 opacity-30 blur transition duration-1000 group-hover:opacity-60 group-hover:duration-200" />

      {/* Main card */}
      <div className="relative h-full rounded-xl border border-emerald-500/20 bg-black/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/40 hover:bg-black/60">
        {/* Quote icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="mb-4 flex justify-start">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
        </motion.div>

        {/* Quote text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="mb-6 text-sm leading-relaxed text-gray-300 md:text-base">
          &ldquo;{quote}&rdquo;
        </motion.p>

        {/* Author info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.4 }}
          className="flex items-center space-x-3">
          {/* Avatar placeholder */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-500 font-semibold text-white">
            {name
              .split(' ')
              .map(n => n[0])
              .join('')}
          </div>

          <div>
            <h4 className="font-semibold text-white">{name}</h4>
            <p className="text-sm text-emerald-400">
              {title} at {company}
            </p>
          </div>
        </motion.div>

        {/* Hover effect overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500"
        />
      </div>
    </motion.div>
  )
}
