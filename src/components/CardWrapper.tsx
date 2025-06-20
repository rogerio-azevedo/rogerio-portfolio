'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import rogerioPhoto from '@assets/images/rogerio.png'

import {
  CardBody,
  CardContainer,
  CardItem,
} from '@/components/ui/CardContainer'
import { NeonBorder } from './ui/NeonBorder'

export function CardWrapper() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    const checkTablet = () =>
      setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 1024)

    checkMobile()
    window.addEventListener('resize', checkMobile)
    window.addEventListener('resize', checkTablet)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('resize', checkTablet)
    }
  }, [])

  return (
    <CardContainer className="inter-var select-none">
      <CardBody className="group/card relative h-auto w-auto rounded-xl border border-white/[0.2] bg-black p-6 hover:shadow-2xl hover:shadow-emerald-500/[0.1] sm:w-[30rem]">
        <CardItem translateZ="50" className="text-xl font-bold text-white">
          {isMobile || isTablet ? 'Touch and drag!' : 'Hover to explore!'}
        </CardItem>

        <CardItem translateZ="100" className="mt-4 w-full">
          <div className="relative mt-10 flex flex-1 items-center justify-center md:mt-0">
            <NeonBorder className="max-w-sm rounded-full bg-zinc-900 p-4 sm:p-10">
              <Image
                src={rogerioPhoto}
                alt="Rogério Azevedo"
                width={400}
                height={400}
                className="rounded-full object-cover"
                priority
              />
            </NeonBorder>
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}
