'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaLocationArrow } from 'react-icons/fa'
import { Section } from '@/components/Section'
import { PinContainer } from '@/components/ui/Pin'
import { projectItems } from '@/data/projects'
import { Dictionary } from '@/types/dictionary'

interface ProjectsProps {
  dict: Dictionary
}

export const Projects: React.FC<ProjectsProps> = ({ dict }) => {
  const projectsData = dict.projects

  return (
    <Section
      className="relative z-10 w-full bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900"
      id="projects">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-white md:text-5xl">
          {projectsData.title}{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
            {projectsData.subtitle}
          </span>
        </h1>
      </motion.div>

      {/* Projects Grid */}
      <div className="mb-20 flex flex-wrap items-center justify-center gap-x-24 md:mt-8 md:gap-y-10 lg:mt-20 lg:gap-y-40">
        {projectItems.map((item, index) => {
          const projectData = projectsData.projects[item.key]

          if (!projectData) return null

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex h-[32rem] w-[80vw] items-center justify-center md:h-[41rem] md:w-[570px] lg:min-h-[32.5rem]">
              <PinContainer
                title={item.link}
                href={`https://${item.link}`}
                className="target-blank">
                <div className="relative mb-8 flex h-[30vh] w-[80vw] items-center justify-center overflow-hidden sm:h-[40vh] sm:w-[570px]">
                  <div className="relative h-full w-full overflow-hidden bg-[#00110f] lg:rounded-3xl"></div>
                  <Image
                    src={item.img}
                    alt={projectData.title}
                    width={570}
                    height={400}
                    className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 rotate-3 object-contain"
                  />
                </div>

                <h1 className="line-clamp-1 text-base font-bold text-white md:text-xl lg:text-2xl">
                  {projectData.title}
                </h1>

                <p
                  className="line-clamp-3 text-sm font-light lg:text-xl lg:font-normal"
                  style={{
                    color: '#BEC1DD',
                    margin: '1vh 0',
                  }}>
                  {projectData.description}
                </p>

                <div className="mt-5 mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    {item.iconLists.map((icon, iconIndex) => (
                      <motion.div
                        key={iconIndex}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.2 + iconIndex * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[.2] bg-black lg:h-10 lg:w-10"
                        style={{
                          transform: `translateX(-${5 * iconIndex + 2}px)`,
                        }}>
                        <Image
                          src={icon}
                          alt="technology icon"
                          width={32}
                          height={32}
                          className="p-2"
                        />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center">
                    <p className="text-purple flex text-sm md:text-xs lg:text-xl">
                      Live Site
                    </p>
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
                  </motion.div>
                </div>
              </PinContainer>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
