'use client'

import { interpolate } from '@/lib/interpolate'
import { Dictionary } from '@/types/dictionary'
import { motion } from 'framer-motion'
// import { Github, Linkedin, Mail } from 'lucide-react'
import { TextGenerateEffect } from '../ui/TextGenerateEffect'
import { Section } from '@/components/Section'

import { AnimatedBackground } from '../ui/AnimatedBackground'
import { FloatingElements } from '../ui/FloatingElements'
import { WorldGlobe } from '../WorldGlobe'

interface HeroProps {
  dict: Dictionary
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

// const scaleIn = {
//   initial: { scale: 0.8, opacity: 0 },
//   animate: { scale: 1, opacity: 1 },
//   transition: { duration: 0.6, ease: 'backOut' },
// }

export default function Hero({ dict }: HeroProps) {
  const heroData = dict.hero

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <FloatingElements />

      <Section className="relative z-10">
        <motion.div
          className="text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate">
          <div className="flex h-full w-full items-center justify-center">
            <div className="absolute h-full w-full">
              <WorldGlobe />
            </div>
          </div>

          <div className="pointer-events-none relative z-10 my-10 flex justify-center md:my-20">
            <div className="flex max-w-[89vw] flex-col items-center justify-center md:max-w-2xl lg:max-w-[60vw]">
              <TextGenerateEffect
                words={heroData.animated_title}
                className="text-center text-[36px] text-white select-none md:text-5xl lg:text-6xl"
              />

              <motion.h2
                variants={fadeInUp}
                className="mx-auto mb-8 max-w-4xl text-xl leading-relaxed font-light text-white/80 md:text-3xl">
                {heroData.subtitle}
              </motion.h2>

              {/* Descrição */}
              <motion.p
                variants={fadeInUp}
                className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
                {interpolate(heroData.description, { years: '8' })}
              </motion.p>
            </div>
          </div>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative rounded-full bg-gradient-to-r from-emerald-500 to-green-500 px-8 py-4 font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-emerald-400/30">
              <span className="relative z-10">{heroData.cta_projects}</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group rounded-full border-2 border-emerald-400/40 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/60 hover:bg-emerald-400/10">
              {heroData.cta_contact}
            </motion.button>
          </motion.div>

          {/* Social Links */}
          {/* <motion.div
            variants={scaleIn}
            className="mb-16 flex items-center justify-center gap-6">
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Mail, href: '#', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-white"
                aria-label={label}>
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div> */}

          {/* Scroll Indicator */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center text-white/50">
            <span className="mb-3 text-sm">{heroData.scroll_down}</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="mt-2 h-3 w-1 rounded-full bg-white/50"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Elementos decorativos */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  )
}
