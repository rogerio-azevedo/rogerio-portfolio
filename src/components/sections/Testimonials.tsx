'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Section } from '../Section'
import { Dictionary } from '@/types/dictionary'
import {
  testimonials,
  ModernTestimonial,
  handleImageSize,
} from '@/data/testimonials'
import porterLogo from '@assets/images/companies/porter.png'
import meuiotLogo from '@assets/images/companies/meuiot.png'
import escovatoLogo from '@assets/images/companies/escovato.svg'

interface TestimonialsProps {
  dict: Dictionary
}

export const Testimonials: React.FC<TestimonialsProps> = ({ dict }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Function to get company logo
  const getCompanyLogo = (company: string) => {
    switch (company.toLowerCase()) {
      case 'porter':
        return porterLogo
      case 'meuiot':
        return meuiotLogo
      case 'escovato':
        return escovatoLogo
      default:
        return null
    }
  }
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  // Intersection Observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio > 0.3)
      },
      {
        threshold: [0.3, 0.7], // Trigger when 30% visible
        rootMargin: '0px 0px -10% 0px', // Add some margin
      },
    )

    const currentRef = containerRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  // Auto-play testimonials when section is visible
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveTestimonial(prev => (prev + 1) % testimonials.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isVisible])

  return (
    <Section
      id="testimonials"
      ref={containerRef}
      className="relative z-10 w-full bg-gradient-to-br from-slate-900 via-[#00110f] to-black px-2">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-white md:text-5xl">
          {dict.testimonials.title}{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
            {dict.testimonials.subtitle}
          </span>
        </h1>
      </motion.div>

      {/* Immersive Testimonial Container */}
      <div className="relative">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
          {/* Left Side - Testimonial Cards Stack */}
          <div className="space-y-4 lg:col-span-1">
            {testimonials.map(
              (testimonial: ModernTestimonial, index: number) => (
                <motion.div
                  key={testimonial.name}
                  className={`relative cursor-pointer transition-all duration-500 ${
                    index === activeTestimonial
                      ? 'z-10 scale-105'
                      : 'scale-95 opacity-50 hover:opacity-80'
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                  style={{
                    transform: `translateY(${(index - activeTestimonial) * 20}px) rotateY(${index === activeTestimonial ? 0 : -5}deg)`,
                    zIndex:
                      testimonials.length - Math.abs(index - activeTestimonial),
                  }}>
                  <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div
                          className={`h-16 w-16 overflow-hidden rounded-full border-2 transition-all duration-300 ${
                            index === activeTestimonial
                              ? 'border-emerald-400 shadow-lg shadow-emerald-400/50'
                              : 'border-slate-600/50 hover:border-slate-500/50'
                          }`}>
                          <Image
                            src={testimonial.photo}
                            alt={testimonial.name}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-slate-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ),
            )}
          </div>

          {/* Center - Main Testimonial Display */}
          <div className="relative mt-8 lg:col-span-2 lg:mt-0">
            <motion.div
              style={{ scale }}
              className="relative flex min-h-[500px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-700/30 bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-12 backdrop-blur-xl">
              {/* Metal Shader Background */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-emerald-500/5 to-cyan-500/10" />

              {/* Progressive Blur Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-30">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-full w-full"
                    style={{
                      background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`,
                      filter: `blur(${Math.random() * 3}px)`,
                    }}
                    animate={{
                      opacity: [0, 0.5, 0],
                      scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 4,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 flex h-full flex-col">
                {/* Quote Icon with 3D Effect */}
                <motion.div
                  className="mb-6"
                  animate={{ rotateY: [0, 5, 0], rotateX: [0, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}>
                  <div className="flex h-16 w-16 rotate-3 transform items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400">
                    <svg
                      className="h-8 w-8 text-slate-900"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                    </svg>
                  </div>
                </motion.div>

                {/* Testimonial Content with Text Transitions */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -30, filter: 'blur(5px)' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}>
                    <blockquote className="text-lf mb-6 flex-1 leading-relaxed font-light text-slate-200 md:text-2xl">
                      &ldquo;{testimonials[activeTestimonial].testimonial}
                      &rdquo;
                    </blockquote>

                    <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-slate-600/50">
                          <Image
                            src={testimonials[activeTestimonial].photo}
                            alt={testimonials[activeTestimonial].name}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <cite className="text-lg font-semibold text-white not-italic">
                            {testimonials[activeTestimonial].name}
                          </cite>
                          <p className="font-medium text-emerald-400">
                            {testimonials[activeTestimonial].role}
                          </p>
                        </div>
                      </div>

                      {/* Interactive Company Logo */}
                      <motion.div
                        className={`flex items-center justify-center rounded-lg md:justify-end ${handleImageSize(
                          testimonials[activeTestimonial].companyType,
                        )}`}>
                        {getCompanyLogo(
                          testimonials[activeTestimonial].company,
                        ) ? (
                          <Image
                            src={
                              getCompanyLogo(
                                testimonials[activeTestimonial].company,
                              )!
                            }
                            alt={testimonials[activeTestimonial].company}
                            width={200}
                            height={200}
                            // className="h-full w-full object-contain brightness-75 filter transition-all duration-300 hover:brightness-100"
                            className={`object-contain transition-all duration-300 hover:scale-110`}
                          />
                        ) : (
                          <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                            {testimonials[activeTestimonial].company}
                          </span>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Navigation Dots with 3D Effect */}
            <div className="mt-8 flex justify-center gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'scale-125 bg-gradient-to-r from-emerald-400 to-cyan-400'
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    boxShadow:
                      index === activeTestimonial
                        ? '0 0 15px rgba(16, 185, 129, 0.6)'
                        : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
