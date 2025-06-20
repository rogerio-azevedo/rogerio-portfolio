'use client'

import { useEffect, useMemo, useCallback } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextGenerateEffectProps {
  words: string
  className?: string
  filter?: boolean
  duration?: number
  staggerDelay?: number
  highlightAfter?: number
  highlightColor?: string
  baseColor?: string
}

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.8,
  staggerDelay = 0.1,
  highlightAfter = 8,
  highlightColor = 'text-emerald-300',
  baseColor = 'text-white',
}: TextGenerateEffectProps) => {
  const [scope, animate] = useAnimate()

  const wordsArray = useMemo(() => words.split(' '), [words])

  const animationConfig = useMemo(
    () => ({
      opacity: 1,
      filter: filter ? 'blur(0px)' : 'none',
    }),
    [filter],
  )

  const animationOptions = useMemo(
    () => ({
      duration: duration,
      delay: stagger(staggerDelay),
      ease: [0.25, 0.1, 0.25, 1] as const, // Easing otimizado
    }),
    [duration, staggerDelay],
  )

  const startAnimation = useCallback(() => {
    if (!scope.current) return

    animate('span', animationConfig, animationOptions)
  }, [animate, animationConfig, animationOptions])

  useEffect(() => {
    const timer = setTimeout(startAnimation, 50)
    return () => clearTimeout(timer)
  }, [startAnimation])

  const renderedWords = useMemo(
    () => (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={`${word}-${idx}`}
            className={cn(
              'will-change-opacity opacity-0 will-change-transform',
              idx > highlightAfter ? highlightColor : baseColor,
            )}
            style={{
              filter: filter ? 'blur(10px)' : 'none',
            }}>
            {word}{' '}
          </motion.span>
        ))}
      </motion.div>
    ),
    [wordsArray, highlightAfter, highlightColor, baseColor, filter],
  )

  return (
    <div className={cn('font-bold', className)}>
      <div className="my-4">
        <div className="leading-snug tracking-wide">{renderedWords}</div>
      </div>
    </div>
  )
}
