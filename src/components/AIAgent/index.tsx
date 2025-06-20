'use client'

import { useState, useEffect } from 'react'
import ChatInterface from './ChatInterface'

export default function AIAgent() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  // Evita problemas de hidratação ao renderizar apenas após o mount
  if (!mounted) {
    return null
  }

  return <ChatInterface isOpen={isChatOpen} onToggle={toggleChat} />
}
