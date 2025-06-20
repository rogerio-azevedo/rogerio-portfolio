'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, X, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useDictionary } from '@/lib/use-dictionary'
import devinho from '@assets/images/devinho.png'

type SupportedLanguage = 'pt' | 'en' | 'es'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
}

interface ChatInterfaceProps {
  isOpen: boolean
  onToggle: () => void
}

function getCurrentLanguage(pathname: string): SupportedLanguage {
  const langMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/)
  const detectedLang = langMatch?.[1] as SupportedLanguage

  if (detectedLang && ['pt', 'en', 'es'].includes(detectedLang)) {
    return detectedLang
  }

  return 'en'
}

export default function ChatInterface({
  isOpen,
  onToggle,
}: ChatInterfaceProps) {
  const pathname = usePathname()
  const language = getCurrentLanguage(pathname)
  const { dictionary, loading: dictionaryLoading } = useDictionary(language)

  const [messages, setMessages] = useState<Message[]>([])
  const [sessionId] = useState(() =>
    typeof window !== 'undefined'
      ? `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      : 'session_ssr',
  )

  useEffect(() => {
    if (dictionary) {
      setMessages([
        {
          id: '1',
          content: dictionary.ai_assistant.welcome_message,
          role: 'assistant',
          timestamp: new Date().toISOString(),
        },
      ])
    }
  }, [dictionary])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSpeechBubble, setShowSpeechBubble] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowSpeechBubble(true)
    }, 1000)

    const hideTimer = setTimeout(() => {
      setShowSpeechBubble(false)
    }, 6000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      setShowSpeechBubble(false)
    } else {
      if (dictionary) {
        setMessages([
          {
            id: '1',
            content: dictionary.ai_assistant.welcome_message,
            role: 'assistant',
            timestamp: new Date().toISOString(),
          },
        ])
      }

      fetch('/api/chat/clear-memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      }).catch(error => console.error('Erro ao limpar memória:', error))
    }
  }, [isOpen, dictionary, sessionId])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      role: 'user',
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          language: language,
          sessionId: sessionId,
          conversationHistory: messages.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro na resposta')
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        timestamp: data.timestamp || new Date().toISOString(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: dictionary?.ai_assistant.error_message || 'Erro desconhecido',
        role: 'assistant',
        timestamp: new Date().toISOString(),
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <>
      <div className="fixed right-4 bottom-20 z-50 md:right-6 md:bottom-6">
        <AnimatePresence>
          {showSpeechBubble && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 bottom-24 mb-2 w-32 rounded-lg border border-gray-200 bg-white p-2 shadow-lg md:bottom-32 md:w-36 md:p-3 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-center text-xs leading-tight text-gray-800 md:text-sm dark:text-gray-200">
                {dictionary?.ai_assistant.speech_bubble.line1}
                <br />
                {dictionary?.ai_assistant.speech_bubble.line2}
                <br />
                {dictionary?.ai_assistant.speech_bubble.line3}
              </p>

              <div className="absolute right-3 -bottom-2 h-0 w-0 border-t-8 border-r-8 border-l-8 border-t-white border-r-transparent border-l-transparent md:right-4 dark:border-t-gray-800"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={onToggle}
          className="relative h-20 w-20 rounded-full border border-white/20 bg-white/10 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/15 md:h-28 md:w-28"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle AI Assistant">
          <div className="p-1 md:p-1.5">
            <Image
              src={devinho}
              alt="Devinho - AI Assistant"
              width={112}
              height={112}
              className="h-full w-full rounded-full object-cover"
              priority={true}
              quality={90}
              sizes="(max-width: 768px) 80px, 112px"
              unoptimized={true}
            />

            <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
          </div>
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
            className="fixed top-24 right-6 bottom-6 left-6 z-40 flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl md:top-auto md:right-12 md:bottom-40 md:left-auto md:h-[500px] md:w-[420px] dark:border-gray-700 dark:bg-gray-900">
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/20">
                  <Image
                    src={devinho}
                    alt="Devinho"
                    width={40}
                    height={40}
                    className="h-full w-full rounded-full object-cover"
                    quality={90}
                    sizes="40px"
                    unoptimized={true}
                  />

                  <div className="h-full w-full animate-pulse rounded-full bg-white/40"></div>
                </div>
                <div>
                  <h3 className="font-semibold">
                    {dictionary?.ai_assistant.header_title || 'AI Assistant'}
                  </h3>
                  <p className="text-xs text-white/80">
                    {dictionary?.ai_assistant.header_subtitle ||
                      'Sobre Rogerio Azevedo'}
                  </p>
                </div>
              </div>
              <button
                onClick={onToggle}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Fechar chat">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4 md:p-6">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                  {message.role === 'assistant' && (
                    <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center md:h-10 md:w-10">
                      <Image
                        src={devinho}
                        alt="Devinho"
                        width={40}
                        height={40}
                        className="h-full w-full rounded-full object-cover shadow-sm"
                        quality={90}
                        sizes="(max-width: 768px) 32px, 40px"
                        unoptimized={true}
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : ''}`}>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                      }`}>
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    <p className="mt-1 px-1 text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>

                  {message.role === 'user' && (
                    <div className="order-3 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 md:h-10 md:w-10 dark:bg-gray-700">
                      <User
                        size={16}
                        className="text-gray-500 md:h-5 md:w-5 dark:text-gray-400"
                      />
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center md:h-10 md:w-10">
                    <Image
                      src={devinho}
                      alt="Devinho"
                      width={40}
                      height={40}
                      className="h-full w-full rounded-full object-cover shadow-sm"
                      quality={90}
                      sizes="(max-width: 768px) 32px, 40px"
                      unoptimized={true}
                    />
                  </div>
                  <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                    <div className="flex space-x-1">
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: '0ms' }}></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: '150ms' }}></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4 md:p-6 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    dictionary?.ai_assistant.input_placeholder ||
                    'Digite sua pergunta...'
                  }
                  className="flex-1 rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-2 text-white transition-all duration-200 hover:from-purple-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
