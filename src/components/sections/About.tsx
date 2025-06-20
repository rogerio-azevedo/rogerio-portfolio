'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Section } from '@/components/Section'
import { socialMediaItems } from '@/data/social-media'
import { Dictionary } from '@/types/dictionary'
import { CardWrapper } from '@/components/CardWrapper'

interface AboutProps {
  dict: Dictionary
}

export const About: React.FC<AboutProps> = ({ dict }) => {
  const aboutData = dict.about

  return (
    <Section
      id="about"
      className="relative z-10 w-full bg-gradient-to-br from-slate-900 via-[#00110f] to-black">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white md:text-5xl">
          {aboutData.title}{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
            {aboutData.subtitle}
          </span>
        </h1>
      </motion.div>

      <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex w-full max-w-xl flex-1 flex-col items-center gap-4 sm:gap-6 md:items-start">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-1 text-center text-2xl font-semibold text-purple-300 md:text-left">
            {aboutData.greeting}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center text-3xl font-bold text-white sm:text-4xl md:text-left">
            {aboutData.name}
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mb-2 text-center text-2xl font-semibold text-white/80 sm:text-2xl md:text-left">
            {aboutData.role}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="mb-2 text-center text-lg text-white/80 sm:text-lg md:text-left">
            <span className="font-semibold text-purple-300">
              {aboutData.description_1.split(',')[0]},
            </span>
            {aboutData.description_1.substring(
              aboutData.description_1.indexOf(',') + 1,
            )}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
            className="mb-2 text-center text-lg text-white/80 sm:text-lg md:text-left">
            {aboutData.values_intro}
            <span className="ml-2 font-semibold text-purple-300">
              {aboutData.values}
            </span>
          </motion.p>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
            {socialMediaItems.map((social, index) => (
              <motion.div
                key={social.id}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group cursor-pointer"
                style={{ cursor: 'pointer' }}
                onClick={() => window.open(social.link, '_blank')}>
                <div
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-emerald-400/50 group-hover:bg-emerald-400/10 group-hover:shadow-lg group-hover:shadow-emerald-400/20"
                  style={{ cursor: 'pointer' }}>
                  <Image
                    src={social.img}
                    alt={social.label || 'Social media'}
                    width={24}
                    height={24}
                    className="opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Card Wrapper */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}>
          <CardWrapper />
        </motion.div>
      </div>
    </Section>
  )
}
