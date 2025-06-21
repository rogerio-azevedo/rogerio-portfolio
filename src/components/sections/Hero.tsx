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
import { FaLocationArrow } from 'react-icons/fa'
import { MagicButton } from '../ui/MagicButton'

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

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop
    window.scrollTo({
      top: offsetTop - 80,
      behavior: 'smooth',
    })
  }
}

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
          <div className="pointer-events-auto">
            <MagicButton
              title={dict.hero.show_button}
              icon={<FaLocationArrow />}
              position="right"
              handleClick={() => scrollToSection('projects')}
            />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 hidden flex-col items-center text-white/50 lg:flex">
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
      </Section>

      {/* Elementos decorativos */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  )
}
