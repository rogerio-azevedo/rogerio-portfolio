import { cn } from '@/lib/utils'
import React from 'react'

export const Section = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode
    className?: string
    id?: string
  }
>(({ children, className, id }, ref) => {
  return (
    <div
      id={id}
      ref={ref}
      className={cn('relative w-full py-10 lg:py-20', className)}>
      <section className="mx-auto max-w-7xl px-4 xl:px-0">{children}</section>
    </div>
  )
})

Section.displayName = 'Section'
