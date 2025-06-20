/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import React, { JSX, useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'
import { cn } from '@/lib/utils'
type NavItemProps = {
  navItems: {
    name: string
    link: string
    icon?: JSX.Element
  }[]
  className?: string
}

export const FloatingNav = ({ navItems, className }: NavItemProps) => {
  const { scrollYProgress } = useScroll()

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('')

  useMotionValueEvent(scrollYProgress, 'change', current => {
    // Check if current is not undefined and is a number
    if (typeof current === 'number') {
      const direction = current! - scrollYProgress.getPrevious()!

      if (scrollYProgress.get() < 0.05) {
        setVisible(true)
      } else {
        if (direction < 0) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      }
    }
  })

  // Scroll spy para detectar seção ativa
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('div[id], section[id]')
      const scrollPosition = window.scrollY + 200 // Ajuste para compensar a navbar

      let currentSection = ''
      let minDistance = Infinity

      sections.forEach(section => {
        const sectionId = section.getAttribute('id') || ''
        const sectionTop = (section as HTMLElement).offsetTop
        const distance = Math.abs(scrollPosition - sectionTop)

        // Encontra a seção mais próxima do scroll atual
        if (distance < minDistance) {
          minDistance = distance
          currentSection = sectionId
        }
      })

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    // Executa uma vez na montagem para definir seção inicial
    setTimeout(handleScroll, 100) // Pequeno delay para garantir que o DOM esteja pronto

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const offsetTop = section.offsetTop
      window.scrollTo({
        top: offsetTop - 80,
        behavior: 'smooth',
      })
      setActiveSection(sectionId)
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          'border-black/.1 fixed inset-x-0 top-4 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-2 rounded-lg border px-4 py-3 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:top-10 md:min-w-[70vw] md:space-x-4 md:px-10 md:py-5 lg:min-w-fit',
          className,
        )}
        style={{
          backdropFilter: 'blur(16px) saturate(180%)',
          backgroundColor: 'rgba(17, 25, 40, 0.75)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.125)',
        }}>
        {navItems.map((navItem: any, idx: number) => {
          const sectionId = navItem.link.replace('#', '')
          const isActive = activeSection === sectionId

          return (
            <button
              key={`nav-item-${idx}`}
              onClick={() => scrollToSection(sectionId)}
              className={cn(
                'relative flex items-center space-x-1 rounded-md px-2 py-1 text-sm transition-colors duration-200 md:px-3 md:py-1',
                isActive
                  ? 'bg-white/10 text-purple-300'
                  : 'text-neutral-300 hover:bg-white/5 hover:text-neutral-100',
              )}>
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="cursor-pointer">{navItem.name}</span>
              {isActive && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 rounded-md bg-purple-500/20"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}
