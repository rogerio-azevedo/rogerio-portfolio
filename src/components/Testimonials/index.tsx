'use client'

import React from 'react'
import Image from 'next/image'
import { companies, testimonials } from '@/data'
import { InfiniteCards } from '../ui/InfiniteCards'

export const Testimonials = () => {
  return (
    <section id="testimonials" className="relative z-10 py-20">
      <h1 className="text-center text-4xl font-bold md:text-5xl">
        Kind words from
        <span className="text-purple-300"> satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <InfiniteCards items={testimonials} direction="right" speed="slow" />

        <div className="flex flex-wrap items-center justify-center gap-4 max-lg:mt-10 md:gap-16">
          {companies.map(company => (
            <React.Fragment key={company.id}>
              <div className="flex max-w-32 gap-2 md:max-w-60">
                <Image
                  src={company.img}
                  alt={company.name}
                  width={40}
                  height={40}
                  className="w-5 md:w-10"
                />
                <Image
                  src={company.nameImg}
                  alt={company.name}
                  width={company.id === 4 || company.id === 5 ? 100 : 150}
                  height={40}
                  className="w-20 md:w-24"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
