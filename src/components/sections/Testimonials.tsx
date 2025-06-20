'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Section } from '@/components/Section'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import {
  testimonialItems,
  companies,
  handleImageSize,
} from '@/data/testimonials'
import { Dictionary } from '@/types/dictionary'

interface TestimonialsProps {
  dict: Dictionary
}

export const Testimonials: React.FC<TestimonialsProps> = ({ dict }) => {
  return (
    <section
      id="testimonials"
      className="relative min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-emerald-950/20 py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <Section className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              {dict.testimonials.title}
            </span>{' '}
            <span className="text-white">{dict.testimonials.subtitle}</span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-emerald-500 to-green-500"
          />
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonialItems.map((item, index) => {
            const testimonial = dict.testimonials.clients[item.key]

            if (!testimonial) return null

            return (
              <TestimonialCard
                key={item.key}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                company={testimonial.company}
                index={index}
              />
            )
          })}
        </div>

        {/* Companies Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20">
          <h3 className="mb-8 text-center text-xl font-semibold text-gray-400">
            Trusted by amazing companies
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-4 max-lg:mt-10 md:gap-16">
            {companies.map((company, index) => (
              <React.Fragment key={company.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex h-16 w-32 items-center justify-center md:h-20 md:w-40">
                  <Image
                    src={company.img}
                    alt={company.name}
                    width={120}
                    height={80}
                    className={`object-contain transition-all duration-300 hover:scale-110 ${handleImageSize(
                      company.type,
                    )}`}
                  />
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[
            { left: 22.62, top: 12.78, duration: 3.2, delay: 0.5 },
            { left: 8.25, top: 23.64, duration: 4.1, delay: 1.2 },
            { left: 45.07, top: 8.97, duration: 3.8, delay: 0.8 },
            { left: 2.97, top: 47.35, duration: 4.5, delay: 1.8 },
            { left: 78.43, top: 65.22, duration: 3.3, delay: 0.3 },
            { left: 91.15, top: 15.84, duration: 4.2, delay: 1.5 },
            { left: 34.68, top: 78.91, duration: 3.9, delay: 0.9 },
            { left: 67.22, top: 35.47, duration: 3.6, delay: 1.1 },
            { left: 15.89, top: 82.33, duration: 4.3, delay: 0.6 },
            { left: 86.54, top: 28.76, duration: 3.7, delay: 1.7 },
            { left: 53.91, top: 92.15, duration: 4.0, delay: 0.4 },
            { left: 29.47, top: 5.68, duration: 3.4, delay: 1.3 },
            { left: 72.83, top: 58.29, duration: 4.4, delay: 0.7 },
            { left: 11.26, top: 41.92, duration: 3.5, delay: 1.6 },
            { left: 88.75, top: 74.35, duration: 4.1, delay: 1.0 },
            { left: 42.18, top: 19.67, duration: 3.8, delay: 1.4 },
            { left: 64.39, top: 87.53, duration: 3.2, delay: 0.2 },
            { left: 18.92, top: 63.28, duration: 4.6, delay: 1.9 },
            { left: 76.54, top: 31.85, duration: 3.9, delay: 0.1 },
            { left: 38.67, top: 96.42, duration: 4.3, delay: 1.4 },
          ].map((particle, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-emerald-400/30"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [-20, 20],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      </Section>
    </section>
  )
}
