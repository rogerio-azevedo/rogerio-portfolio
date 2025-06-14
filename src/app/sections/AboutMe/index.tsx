'use client'

import { CardWrapper } from '@/components/CardWrapper'
import { Section } from '@/components/Section'
import { socialMedia } from '@/data'
import Image from 'next/image'

export const AboutMe = () => {
  return (
    <Section id="about">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 w-full text-center text-4xl font-bold text-white md:text-5xl">
          This is <span className="text-purple-300">Me!</span>
        </h1>

        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
          <div>
            <div className="flex w-full max-w-xl flex-1 flex-col items-center gap-4 sm:gap-6 md:items-start">
              <span className="mb-1 text-center text-2xl font-semibold text-purple-300 md:text-left">
                Hello 👋
              </span>
              <h2 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-left">
                I&apos;m Rogério Azevedo
              </h2>
              <h3 className="mb-2 text-center text-2xl font-semibold text-white/80 sm:text-2xl md:text-left">
                Senior Software Engineer
              </h3>

              <p className="mb-2 text-center text-lg text-white/80 sm:text-lg md:text-left">
                <span className="font-semibold text-purple-300">
                  Father of the Anas
                </span>
                , passionate about technology, family, and music. In my free
                time, I enjoy playing online games, singing, playing the guitar,
                and spending time with my wife and daughters.
              </p>
              <p className="mb-2 text-center text-lg text-white/80 sm:text-lg md:text-left">
                My core values:
                <span className="ml-2 font-semibold text-purple-300">
                  family, commitment, and loyalty.
                </span>
              </p>

              <div className="mt-2 flex flex-wrap justify-center gap-3 md:justify-start">
                {socialMedia.map(info => (
                  <div
                    key={info.id}
                    className="bg-opacity-75 bg-black-200 border-black-300 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border saturate-180 backdrop-blur-lg backdrop-filter"
                    onClick={() => window.open(info.link, '_blank')}>
                    <Image src={info.img} alt="icons" width={20} height={20} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <CardWrapper />
        </div>
      </div>
    </Section>
  )
}
