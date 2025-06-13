'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Skill {
  name: string
  level: number
  description: string
  impact: string
  years: number
}

const skills: Skill[] = [
  {
    name: 'Strategic Leadership',
    level: 95,
    description: 'Visão estratégica e liderança de equipes de alta performance',
    impact: '3x crescimento de equipe',
    years: 8,
  },
  {
    name: 'Innovation Management',
    level: 92,
    description: 'Implementação de soluções inovadoras e processos de melhoria',
    impact: '40% redução de tempo',
    years: 6,
  },
  {
    name: 'Stakeholder Communication',
    level: 88,
    description: 'Comunicação efetiva com C-level e stakeholders técnicos',
    impact: '95% aprovação projetos',
    years: 7,
  },
  {
    name: 'Technical Mentorship',
    level: 94,
    description: 'Desenvolvimento de talentos e construção de cultura técnica',
    impact: '25+ profissionais mentorados',
    years: 5,
  },
]

const metrics = [
  { label: 'Projetos Liderados', value: '50+', trend: '+12%' },
  { label: 'Equipes Gerenciadas', value: '8', trend: '+60%' },
  { label: 'ROI Médio', value: '340%', trend: '+28%' },
  { label: 'Satisfação Time', value: '4.9/5', trend: '+15%' },
]

export const ExecutiveDashboard = () => {
  const [activeSkill, setActiveSkill] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-light text-white md:text-4xl">
            Leadership
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text font-semibold text-transparent">
              {' '}
              Portfolio
            </span>
          </h2>
          <p className="text-white-200 mx-auto max-w-2xl text-lg font-light">
            Competências estratégicas desenvolvidas através de experiência
            executiva e resultados mensuráveis
          </p>
        </motion.div>

        {/* Metrics Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.9,
              }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/10">
              <div className="mb-2 text-2xl font-bold text-white md:text-3xl">
                {metric.value}
              </div>
              <div className="text-white-200 mb-2 text-sm">{metric.label}</div>
              <div className="text-xs font-medium text-green-400">
                {metric.trend}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              onHoverStart={() => setActiveSkill(index)}
              onHoverEnd={() => setActiveSkill(null)}
              className="group relative cursor-pointer rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/10">
              {/* Subtle glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                layoutId={`glow-${index}`}
              />

              <div className="relative z-10">
                {/* Skill Header */}
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-blue-400">
                      {skill.name}
                    </h3>
                    <p className="text-white-200 text-sm leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="mb-1 text-2xl font-bold text-white">
                      {skill.level}%
                    </div>
                    <div className="text-white-200 text-xs">
                      {skill.years} anos
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative mb-6">
                  <div className="h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: isVisible ? `${skill.level}%` : 0 }}
                      transition={{
                        duration: 1.5,
                        delay: 0.8 + index * 0.2,
                        ease: 'easeOut',
                      }}
                    />
                  </div>
                </div>

                {/* Impact Metric */}
                <motion.div
                  className="flex items-center justify-between"
                  animate={{
                    opacity: activeSkill === index ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.3 }}>
                  <span className="text-white-200 text-sm">
                    Impacto Mensurável
                  </span>
                  <span className="text-sm font-medium text-cyan-400">
                    {skill.impact}
                  </span>
                </motion.div>
              </div>

              {/* Hover indicator */}
              <motion.div
                className="absolute top-4 right-4 h-2 w-2 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100"
                animate={{
                  scale: activeSkill === index ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: activeSkill === index ? Number.POSITIVE_INFINITY : 0,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            <span className="text-white-200 text-sm">
              Disponível para novas oportunidades de liderança
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
