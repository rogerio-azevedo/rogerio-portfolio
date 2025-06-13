'use client'

import { FaLocationArrow } from 'react-icons/fa6'
import Image from 'next/image'

import { socialMedia } from '@/data'
import { MagicButton } from '@/components/ui/MagicButton'

export const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      <div className="flex flex-col items-center">
        <h1 className="text-center text-4xl font-bold md:text-5xl lg:max-w-[45vw]">
          Ready to take <span className="text-purple-300">your</span> digital
          presence to new heights?
        </h1>
        <p className="text-white-200 my-5 text-center md:mt-10 lg:text-lg">
          Let’s connect and explore how I can help you turn ideas into impactful
          results. Reach out today — your next big step starts here.
        </p>
        <a href="mailto:contact@jsmastery.pro">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="mt-16 flex flex-col-reverse items-center justify-between gap-4 md:flex-row md:gap-0">
        <p className="text-center text-sm font-light md:text-left md:text-base md:font-normal">
          Copyright © 2025 Rogerio Azevedo
        </p>

        <div className="flex items-center gap-6 md:gap-3">
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
    </footer>
  )
}
