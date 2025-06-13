'use client'

import React from 'react'
import Image from 'next/image'
import { companies, testimonials } from '@/data'
import { InfiniteCards } from '@/components/ui/InfiniteCards'

export const Testimonials = () => {
  return (
    <section id="testimonials" className="relative z-10 py-20">
      <h1 className="text-center text-4xl font-bold text-white md:text-5xl">
        Kind words from
        <span className="text-purple-300"> satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <InfiniteCards items={testimonials} direction="right" speed="normal" />

        <div className="flex flex-wrap items-center justify-center gap-4 max-lg:mt-10 md:gap-16">
          {companies.map(company => (
            <React.Fragment key={company.id}>
              <div className="flex h-16 w-32 items-center justify-center md:h-20 md:w-40">
                <Image
                  src={company.img}
                  alt={company.name}
                  width={120}
                  height={80}
                  className={`object-contain transition-all duration-300 hover:scale-110 ${
                    company.type === 'square'
                      ? 'h-16 w-16 md:h-20 md:w-20'
                      : 'h-12 w-24 md:h-20 md:w-36'
                  }`}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
