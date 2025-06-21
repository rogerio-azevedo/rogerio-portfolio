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
  const { dictionary } = useDictionary(language)

  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() =>
    typeof window !== 'undefined'
      ? `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      : 'session_ssr',
  )
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Inicializar com mensagem de boas-vindas
  useEffect(() => {
    if (dictionary && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        content: dictionary.ai_assistant.welcome_message,
        role: 'assistant',
        timestamp: new Date().toISOString(),
      }
      setMessages([welcomeMessage])
    }
  }, [dictionary, messages.length])

  // Auto scroll para a última mensagem
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
    if (!isOpen) {
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
        content:
          dictionary?.ai_assistant.error_message ||
          'Sorry, there was an error processing your request.',
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
      {/* Floating Button */}
      <div
        className={`fixed right-8 bottom-8 z-30 transition-all duration-300 ${isOpen ? 'pointer-events-none scale-75 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Speech Bubble */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ delay: 1, duration: 0.5 }}
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
            className="prevent-overflow fixed inset-0 z-30 flex flex-col overflow-hidden bg-white shadow-2xl md:inset-auto md:top-auto md:right-12 md:bottom-40 md:h-[500px] md:w-[420px] md:max-w-[calc(100vw-3rem)] md:rounded-lg md:border md:border-gray-200 dark:bg-gray-900 dark:md:border-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/20">
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

            {/* Messages Area */}
            <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
              <div className="flex min-h-full flex-col justify-end">
                <div className="space-y-4 p-4 pb-2 md:p-6 md:pb-4">
                  {messages.map(message => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${
                        message.role === 'user'
                          ? 'justify-end'
                          : 'justify-start'
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
                        className={`max-w-[calc(100%-4rem)] min-w-0 md:max-w-[70%] ${message.role === 'user' ? 'order-2' : ''}`}>
                        <div
                          className={`rounded-2xl p-3 md:p-4 ${
                            message.role === 'user'
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                          }`}>
                          <p className="overflow-wrap-anywhere text-sm leading-relaxed break-words hyphens-auto whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </div>
                        <p className="mt-2 px-2 text-xs text-gray-500">
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
                      <div className="rounded-2xl bg-gray-100 p-3 md:p-4 dark:bg-gray-800">
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
              </div>
            </div>

            {/* Input Area - Sticky no mobile */}
            <div className="safe-area-pb sticky bottom-0 border-t border-gray-200 bg-white p-3 md:p-6 dark:border-gray-700 dark:bg-gray-900">
              <div className="flex gap-2 md:gap-3 lg:pb-4">
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
                  className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-base focus:ring-2 focus:ring-purple-500 focus:outline-none md:px-4 md:py-3 md:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white transition-all duration-200 hover:from-purple-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500 md:h-12 md:w-12">
                  <Send size={18} className="md:h-5 md:w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
