import { cn } from '@/lib/utils'
import React from 'react'

export const Section = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) => {
  return (
    <div
      id={id}
      className={cn('relative w-full px-4 py-10 lg:px-0 lg:py-20', className)}>
      <section className="mx-auto max-w-7xl">{children}</section>
    </div>
  )
}
