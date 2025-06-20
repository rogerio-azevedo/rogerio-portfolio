'use client'

import { FaLocationArrow } from 'react-icons/fa6'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { socialMediaItems } from '@/data/social-media'
import { MagicButton } from '@/components/ui/MagicButton'
import { Section } from '@/components/Section'
import { Dictionary } from '@/types/dictionary'

interface FooterProps {
  dict: Dictionary
}

export const Footer: React.FC<FooterProps> = ({ dict }) => {
  return (
    <Section className="relative z-10 w-full bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      <footer className="">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center">
          <h1 className="text-center text-4xl font-bold text-white md:text-5xl lg:max-w-[45vw]">
            {dict.footer.title}{' '}
            <span className="text-emerald-400">
              {dict.footer.title_highlight}
            </span>{' '}
            {dict.footer.title_end}
          </h1>
          <p className="text-white-200 my-5 text-center text-white md:mt-10 lg:text-xl">
            {dict.footer.description}
          </p>
          <a href="mailto:rogerio@rogerioazevedo.dev">
            <MagicButton
              title={dict.footer.cta_button}
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col-reverse items-center justify-between gap-4 md:flex-row md:gap-0">
          <p className="text-center text-sm font-light text-white md:text-left md:text-base md:font-normal">
            {dict.footer.copyright}
          </p>

          <div className="flex items-center gap-6 md:gap-3">
            {socialMediaItems.map((info, index) => (
              <motion.div
                key={info.id}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-opacity-75 bg-black-200 border-black-300 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border saturate-180 backdrop-blur-lg backdrop-filter transition-all duration-300 hover:border-emerald-400/50 hover:bg-emerald-400/10"
                onClick={() => window.open(info.link, '_blank')}>
                <Image
                  src={info.img}
                  alt={info.label || 'social media'}
                  width={20}
                  height={20}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </footer>
    </Section>
  )
}
