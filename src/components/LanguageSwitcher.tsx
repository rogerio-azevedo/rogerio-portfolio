'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe } from 'lucide-react'
import { Locale } from '@/app/[lang]/dictionaries'
import { startTransition, useState, useEffect, useRef } from 'react'

interface LanguageSwitcherProps {
  currentLang: Locale
}

const languages = {
  pt: { label: 'Português', flag: '🇧🇷' },
  en: { label: 'English', flag: '🇺🇸' },
  es: { label: 'Español', flag: '🇪🇸' },
}

export default function LanguageSwitcher({
  currentLang,
}: LanguageSwitcherProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLanguageChange = (newLang: Locale) => {
    const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, '')
    const newPath = `/${newLang}${pathWithoutLang}`

    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=${365 * 24 * 60 * 60}`

    setIsOpen(false) // Fecha o dropdown
    startTransition(() => {
      window.location.href = newPath
    })
  }

  // Fecha o dropdown quando clica fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
      <div className="relative">
        <motion.button
          onClick={toggleDropdown}
          className="flex w-32 items-center justify-between gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/15 sm:w-40"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <div className="flex min-w-0 items-center gap-2">
            <Globe className="h-4 w-4 flex-shrink-0" />
            <span className="hidden truncate sm:inline">
              {languages[currentLang].label}
            </span>
          </div>
          <span className="flex-shrink-0 text-lg">
            {languages[currentLang].flag}
          </span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-12 right-0 w-40 overflow-hidden rounded-lg border border-white/20 bg-white/10 shadow-xl backdrop-blur-md">
              {Object.entries(languages).map(([code, { label, flag }]) => (
                <motion.button
                  key={code}
                  onClick={() => handleLanguageChange(code as Locale)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-white/10 ${
                    currentLang === code
                      ? 'bg-white/20 font-medium text-white'
                      : 'text-gray-200'
                  }`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}>
                  <span className="text-lg">{flag}</span>
                  <span>{label}</span>
                  {currentLang === code && (
                    <motion.div
                      className="ml-auto h-2 w-2 rounded-full bg-emerald-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
