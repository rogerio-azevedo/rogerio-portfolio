'use client'

import { useState } from 'react'
import Lottie from 'react-lottie'
import { IoCopyOutline } from 'react-icons/io5'
import Image from 'next/image'

import animationData from '@/data/confetti.json'
import { cn } from '@/lib/utils'
import { BackgroundGradient } from './BackgroundGradient'
import { GridGlobe } from './GridGlobe'
import { MagicButton } from './MagicButton'

type BentoGridItemProps = {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  id?: number
  img?: string
  imgClassName?: string
  titleClassName?: string
  spareImg?: string
  header?: React.ReactNode
  icon?: React.ReactNode
}

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'md:grid-row-7 mx-auto grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-5 lg:gap-8',
        className,
      )}>
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: BentoGridItemProps) => {
  const leftLists = ['ReactJS', 'Express', 'Typescript']
  const rightLists = ['VueJS', 'NuxtJS', 'GraphQL']

  const [copied, setCopied] = useState(false)

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const handleCopy = () => {
    const text = 'rogerio.francis@gmail.com'
    navigator.clipboard.writeText(text)
    setCopied(true)
  }

  return (
    <div
      className={cn(
        'group/bento shadow-input relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-3xl border border-white/[0.1] bg-red-400 transition duration-200 hover:shadow-xl dark:shadow-none',
        className,
      )}
      style={{
        background: 'rgb(4,7,29)',
        backgroundColor:
          'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
      }}>
      <div className={`${id === 6 && 'flex justify-center'} h-full`}>
        <div className="absolute h-full w-full">
          {img && (
            <Image
              src={img}
              alt={img}
              className={cn(imgClassName, 'object-cover object-center')}
              width={500}
              height={500}
            />
          )}
        </div>

        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && 'w-full opacity-80'
          } `}>
          {spareImg && (
            <Image
              src={spareImg}
              alt={spareImg}
              className="h-full w-full object-cover object-center"
              width={500}
              height={500}
            />
          )}
        </div>

        {id === 6 && <BackgroundGradient />}

        <div
          className={cn(
            titleClassName,
            'relative flex min-h-40 flex-col p-5 px-5 transition duration-200 group-hover/bento:translate-x-2 md:h-full lg:p-10',
          )}>
          <div className="z-10 font-sans text-sm font-extralight text-neutral-600 md:max-w-32 lg:text-base dark:text-neutral-300">
            {description}
          </div>

          <div
            className={`z-10 max-w-96 font-sans text-lg font-bold lg:text-3xl`}>
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {/* Tech stack list div */}
          {id === 3 && (
            <div className="absolute -right-3 flex w-fit gap-1 lg:-right-2 lg:gap-5">
              {/* tech stack lists */}
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-[#10132E] px-3 py-2 text-center text-xs opacity-50 lg:px-3 lg:py-4 lg:text-base lg:opacity-100">
                    {item}
                  </span>
                ))}
                <span className="rounded-lg bg-[#10132E] px-3 py-4 text-center lg:px-3 lg:py-4"></span>
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                <span className="rounded-lg bg-[#10132E] px-3 py-4 text-center lg:px-3 lg:py-4"></span>
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-[#10132E] px-3 py-2 text-center text-xs opacity-50 lg:px-3 lg:py-4 lg:text-base lg:opacity-100">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="relative mt-5">
              <div
                className={`absolute right-0 -bottom-5 ${
                  copied ? 'block' : 'block'
                }`}>
                <Lottie options={defaultOptions} height={200} width={400} />
              </div>

              <MagicButton
                title={copied ? 'Email is Copied!' : 'Copy my email address'}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
