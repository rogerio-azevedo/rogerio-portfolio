'use client'

import { useState, useEffect } from 'react'
import ChatInterface from './ChatInterface'

interface AIAgentProps {
  onChatToggle?: (isOpen: boolean) => void
}

export default function AIAgent({ onChatToggle }: AIAgentProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleChat = () => {
    const newState = !isChatOpen
    setIsChatOpen(newState)
    onChatToggle?.(newState)
  }

  // Evita problemas de hidratação ao renderizar apenas após o mount
  if (!mounted) {
    return null
  }

  return <ChatInterface isOpen={isChatOpen} onToggle={toggleChat} />
}
