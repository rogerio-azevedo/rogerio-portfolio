'use client'

import React from 'react'
import { Spotlight } from '../../../components/ui/Spotlight'
import { GridBackground } from '../../../components/ui/GridBackground'
import { TextGenerateEffect } from '../../../components/ui/TextGenerateEffect'
import { MagicButton } from '../../../components/ui/MagicButton'
import { FaLocationArrow } from 'react-icons/fa'
import { GridGlobe } from '../../../components/ui/GridGlobe'

export const Hero = () => {
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

  return (
    <div className="pt-36 pb-20 lg:pb-40">
      <div>
        <Spotlight
          className="-top-40 -left-10 h-screen md:-top-20 md:-left-32"
          fill="white"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vh]"
          fill="purple"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vh]" fill="blue" />
      </div>

      <GridBackground />

      <div className="flex h-full w-full items-center justify-center">
        <div className="absolute h-full w-full">
          <GridGlobe />
        </div>
      </div>

      <div className="pointer-events-none relative z-10 my-10 flex justify-center md:my-20">
        <div className="flex max-w-[89vw] flex-col items-center justify-center md:max-w-2xl lg:max-w-[60vw]">
          <TextGenerateEffect
            words="It's not about code or dark screens. It's about experience!"
            className="text-center text-[36px] text-white select-none md:text-5xl lg:text-6xl"
          />

          <p className="text-md mb-4 text-center text-white select-none md:text-lg md:tracking-wider lg:text-2xl">
            Hi! I&apos;m Rogério Azevedo, a FullStack Developer based in Brazil.
          </p>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="pointer-events-auto">
            <MagicButton
              title="Show my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
