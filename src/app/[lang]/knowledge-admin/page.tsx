/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useState, useRef, useEffect } from 'react'
import { useDictionary } from '@/lib/use-dictionary'

interface Message {
  type: 'user' | 'system'
  content: string
  processedInfo?: any
  timestamp: Date
}

type SupportedLanguage = 'pt' | 'en' | 'es'

interface KnowledgeAdminPageProps {
  params: Promise<{ lang: string }>
}

export default function KnowledgeAdminPage({
  params,
}: KnowledgeAdminPageProps) {
  const [lang, setLang] = useState<SupportedLanguage>('pt')
  const { dictionary, loading: dictLoading } = useDictionary(lang)

  useEffect(() => {
    params.then(resolvedParams => {
      const resolvedLang = resolvedParams.lang as SupportedLanguage
      if (['pt', 'en', 'es'].includes(resolvedLang)) {
        setLang(resolvedLang)
      }
    })
  }, [params])

  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Inicializar mensagem de boas-vindas quando o dicionário estiver carregado
  useEffect(() => {
    if (dictionary?.knowledge && messages.length === 0) {
      setMessages([
        {
          type: 'system',
          content: dictionary.knowledge.admin.welcome_message,
          timestamp: new Date(),
        },
      ])
    }
  }, [dictionary, messages.length])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentMessage.trim()) return

    // Adiciona mensagem do usuário
    const userMessage: Message = {
      type: 'user',
      content: currentMessage,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setCurrentMessage('')
    setLoading(true)

    try {
      const res = await fetch('/api/update-knowledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentMessage }),
      })

      const data = await res.json()

      if (data.success) {
        // Adiciona resposta do sistema
        const systemMessage: Message = {
          type: 'system',
          content: data.message,
          processedInfo: data.processedInfo,
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, systemMessage])
      } else {
        const errorMessage: Message = {
          type: 'system',
          content: `Ops, algo deu errado: ${data.error}`,
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      const errorMessage: Message = {
        type: 'system',
        content: `Erro de conexão: ${error}`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  if (dictLoading || !dictionary?.knowledge) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-400">
            {dictionary?.common?.loading || 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  const quickActions = [
    dictionary.knowledge.admin.quick_actions.hobby_change,
    dictionary.knowledge.admin.quick_actions.new_project,
    dictionary.knowledge.admin.quick_actions.professional_update,
    dictionary.knowledge.admin.quick_actions.new_skill,
    dictionary.knowledge.admin.quick_actions.personal_change,
    dictionary.knowledge.admin.quick_actions.new_goal,
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header discreto */}
      <div className="border-b border-gray-800 p-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
            <h1 className="text-lg font-medium text-gray-300">
              {dictionary.knowledge.admin.title}
            </h1>
          </div>
          <div className="text-sm text-gray-500">
            {messages.filter(m => m.type === 'user').length}{' '}
            {dictionary.knowledge.admin.status.updates_today}
          </div>
        </div>
      </div>

      {/* Chat container */}
      <div className="mx-auto flex h-[calc(100vh-80px)] max-w-4xl flex-col">
        {/* Messages area */}
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-200'
                } rounded-2xl px-4 py-3 shadow-lg`}>
                <p className="whitespace-pre-wrap">{message.content}</p>

                {/* Mostrar informação processada se existir */}
                {message.processedInfo && (
                  <div className="mt-3 space-y-1 border-t border-gray-600 pt-3 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-green-400"></span>
                      <span className="font-medium text-green-400">
                        {dictionary.knowledge.admin.processed_info.title}
                      </span>
                    </div>
                    <p>
                      <span className="text-gray-400">
                        {dictionary.knowledge.admin.processed_info.category}
                      </span>{' '}
                      {message.processedInfo.categoria}
                    </p>
                    <p>
                      <span className="text-gray-400">
                        {dictionary.knowledge.admin.processed_info.type}
                      </span>{' '}
                      {message.processedInfo.tipo}
                    </p>
                    <p>
                      <span className="text-gray-400">
                        {dictionary.knowledge.admin.processed_info.tags}
                      </span>{' '}
                      {message.processedInfo.palavrasChave.join(', ')}
                    </p>
                  </div>
                )}

                <div className="mt-2 text-xs text-gray-400">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-gray-800 px-4 py-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                    style={{ animationDelay: '0.1s' }}></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                    style={{ animationDelay: '0.2s' }}></div>
                  <span className="ml-2 text-sm text-gray-400">
                    {dictionary.knowledge.admin.processing}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick actions (só mostra se não tem muitas mensagens) */}
        {messages.length < 5 && (
          <div className="px-6 pb-2">
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMessage(action)}
                  className="rounded-full bg-gray-800 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:bg-gray-700">
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="border-t border-gray-800 p-6">
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <input
              type="text"
              value={currentMessage}
              onChange={e => setCurrentMessage(e.target.value)}
              placeholder={dictionary.knowledge.admin.placeholder}
              className="flex-1 rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !currentMessage.trim()}
              className="flex items-center space-x-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-600">
              <span>
                {loading
                  ? dictionary.knowledge.admin.sending
                  : dictionary.knowledge.admin.send}
              </span>
              {!loading && (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
