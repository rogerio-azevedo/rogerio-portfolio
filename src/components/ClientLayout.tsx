'use client'

import { useState, useEffect } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import AIAgent from './AIAgent'
import { Locale } from '@/app/[lang]/dictionaries'

interface ClientLayoutProps {
  children: React.ReactNode
  currentLang: Locale
}

export default function ClientLayout({
  children,
  currentLang,
}: ClientLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Evita problemas de hidratação
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <>
      <LanguageSwitcher currentLang={currentLang} isChatOpen={isChatOpen} />
      {children}
      <AIAgent onChatToggle={setIsChatOpen} />
    </>
  )
}
