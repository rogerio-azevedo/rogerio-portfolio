/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { useState, useEffect, useMemo } from 'react'
import { useFuzzySearch } from '@/hooks/useFuzzySearch'
import { useDictionary } from '@/lib/use-dictionary'

interface KnowledgeItem {
  id: string
  content: string
  metadata: any
  timestamp: string
  category: string
  type: string
  keywords: string[]
  source: string
}

interface CategoryStat {
  name: string
  count: number
  displayName: string
}

type SupportedLanguage = 'pt' | 'en' | 'es'

interface KnowledgeListPageProps {
  params: Promise<{ lang: string }>
}

export default function KnowledgeListPage({ params }: KnowledgeListPageProps) {
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

  const [allKnowledge, setAllKnowledge] = useState<KnowledgeItem[]>([])
  const [categories, setCategories] = useState<CategoryStat[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])

  // Configurar busca fuzzy
  const { search } = useFuzzySearch(allKnowledge)

  // Filtrar conhecimento com busca fuzzy
  const filteredKnowledge = useMemo(() => {
    let results = allKnowledge

    // Filtro por categoria
    if (selectedCategory) {
      results = results.filter(item => item.category === selectedCategory)
    }

    // Busca fuzzy se há query
    if (searchQuery.trim()) {
      const fuzzyResults = search(searchQuery)

      // Se não há categoria selecionada, usa os resultados da busca fuzzy
      if (!selectedCategory) {
        return fuzzyResults
      } else {
        // Se há categoria selecionada, aplica busca fuzzy nos resultados filtrados
        return fuzzyResults.filter(item => item.category === selectedCategory)
      }
    }

    return results
  }, [allKnowledge, selectedCategory, searchQuery, search])

  // Calcular sugestões de forma simples
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchSuggestions([])
      return
    }

    // Palavras-chave comuns para sugestões
    const commonKeywords = [
      'hobbies',
      'hobby',
      'diversão',
      'lazer',
      'trabalho',
      'carreira',
      'profissional',
      'projetos',
      'projeto',
      'desenvolvimento',
      'habilidades',
      'skills',
      'tecnologia',
      'família',
      'filhas',
      'pessoal',
      'estudos',
      'aprendendo',
      'curso',
      'react',
      'typescript',
      'nodejs',
      'violão',
      'música',
      'sertanejo',
    ]

    const suggestions = commonKeywords
      .filter(keyword => {
        const queryLower = searchQuery.toLowerCase()
        const keywordLower = keyword.toLowerCase()
        return (
          keywordLower.includes(queryLower) || queryLower.includes(queryLower)
        )
      })
      .slice(0, 3)

    setSearchSuggestions(suggestions)
  }, [searchQuery])

  const loadKnowledge = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory) params.append('category', selectedCategory)
      if (searchQuery) params.append('query', searchQuery)
      params.append('limit', '50')

      const response = await fetch(`/api/list-knowledge?${params.toString()}`)
      const data = await response.json()

      if (data.success) {
        setAllKnowledge(data.results)
        setCategories(data.categoryStats)
        setTotal(data.total)
      } else {
        console.error('Erro ao carregar conhecimento:', data.error)
      }
    } catch (error) {
      console.error('Erro ao carregar conhecimento:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadKnowledge()
  }, [selectedCategory, searchQuery])

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString(
      lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US',
    )
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'chat_secreto':
        return '🔒'
      case 'conversa_natural':
        return '💬'
      case 'api_direta':
        return '🔧'
      default:
        return '📝'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'adicionar':
        return 'text-green-400'
      case 'atualizar':
        return 'text-blue-400'
      case 'remover':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getCategoryDisplayName = (category: string) => {
    if (!dictionary?.knowledge) return `📋 ${category}`

    const categoryMap: Record<string, string> = {
      informações_pessoais: dictionary.knowledge.list.categories.personal_info,
      hobbies_interesses: dictionary.knowledge.list.categories.hobbies,
      carreira_profissional: dictionary.knowledge.list.categories.career,
      projetos: dictionary.knowledge.list.categories.projects,
      habilidades_tecnicas:
        dictionary.knowledge.list.categories.technical_skills,
      experiencias: dictionary.knowledge.list.categories.experiences,
      familia_relacionamentos: dictionary.knowledge.list.categories.family,
      objetivos_planos: dictionary.knowledge.list.categories.goals,
      preferencias_gostos: dictionary.knowledge.list.categories.preferences,
      sem_categoria: dictionary.knowledge.list.categories.uncategorized,
    }
    return categoryMap[category] || `📋 ${category}`
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

  return (
    <div className="min-h-screen bg-gray-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-center text-3xl font-bold">
            🧠 {dictionary.knowledge.list.title}
          </h1>
          <p className="text-center text-gray-400">
            {dictionary.knowledge.list.subtitle}
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-blue-400">
              {dictionary.knowledge.list.stats.total_entries}
            </h3>
            <p className="text-3xl font-bold">{total}</p>
          </div>
          <div className="rounded-lg bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-green-400">
              {dictionary.knowledge.list.stats.categories}
            </h3>
            <p className="text-3xl font-bold">{categories.length}</p>
          </div>
          <div className="rounded-lg bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-purple-400">
              {dictionary.knowledge.list.stats.active_filters}
            </h3>
            <p className="text-3xl font-bold">
              {(selectedCategory ? 1 : 0) + (searchQuery ? 1 : 0)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-lg bg-gray-900 p-6">
          <h3 className="mb-4 text-lg font-semibold">
            {dictionary.knowledge.list.filters.title}
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Category Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                {dictionary.knowledge.list.filters.category}
              </label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 text-white">
                <option value="">
                  {dictionary.knowledge.list.filters.all_categories}
                </option>
                {categories.map(cat => (
                  <option key={cat.name} value={cat.name}>
                    {getCategoryDisplayName(cat.name)} ({cat.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                {dictionary.knowledge.list.filters.search}
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={
                  dictionary.knowledge.list.filters.search_placeholder
                }
                className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 text-white"
              />

              {/* Sugestões de busca */}
              {searchSuggestions.length > 0 && (
                <div className="mt-2">
                  <p className="mb-1 text-xs text-gray-400">
                    {dictionary.knowledge.list.filters.suggestions}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(suggestion)}
                        className="rounded bg-blue-600 px-2 py-1 text-xs text-white transition-colors hover:bg-blue-700">
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Categories Overview */}
        {categories.length > 0 && (
          <div className="mb-8 rounded-lg bg-gray-900 p-6">
            <h3 className="mb-4 text-lg font-semibold">
              {dictionary.knowledge.list.categories.overview}
            </h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {categories.map(cat => (
                <button
                  key={cat.name}
                  onClick={() =>
                    setSelectedCategory(
                      cat.name === selectedCategory ? '' : cat.name,
                    )
                  }
                  className={`rounded-lg p-3 text-left transition-colors ${
                    selectedCategory === cat.name
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}>
                  <div className="text-sm font-medium">
                    {getCategoryDisplayName(cat.name)}
                  </div>
                  <div className="text-xs opacity-75">{cat.count} items</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Knowledge Items */}
        {loading ? (
          <div className="py-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-400">
              {dictionary.knowledge.list.messages.loading}
            </p>
          </div>
        ) : filteredKnowledge.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-400">
              {dictionary.knowledge.list.messages.no_results}
            </p>
            {searchQuery && (
              <p className="mt-2 text-sm text-yellow-400">
                ⚡ {dictionary.knowledge.list.messages.search_active}: "
                {searchQuery}"
              </p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              {dictionary.knowledge.list.messages.adjust_filters}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Indicador de busca fuzzy */}
            {searchQuery && (
              <div className="mb-4 rounded-lg border border-green-700 bg-green-900/30 p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">🎯</span>
                  <span className="text-sm text-green-300">
                    {dictionary.knowledge.list.messages.search_found}{' '}
                    {filteredKnowledge.length}{' '}
                    {dictionary.knowledge.list.messages.results_for} "
                    {searchQuery}"
                  </span>
                </div>
                {searchSuggestions.length > 0 && (
                  <p className="mt-1 text-xs text-green-400">
                    {dictionary.knowledge.list.messages.autocorrect}
                  </p>
                )}
              </div>
            )}

            {filteredKnowledge.map((item: KnowledgeItem) => (
              <div
                key={item.id}
                className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {item.category === 'hobbies_interesses'
                        ? '🎮'
                        : item.category === 'carreira_profissional'
                          ? '💼'
                          : item.category === 'projetos'
                            ? '🚀'
                            : item.category === 'habilidades_tecnicas'
                              ? '⚡'
                              : item.category === 'familia_relacionamentos'
                                ? '👨‍👩‍👧‍👦'
                                : item.category === 'objetivos_planos'
                                  ? '🎯'
                                  : item.category === 'informações_pessoais'
                                    ? '👤'
                                    : item.category === 'experiencias'
                                      ? '🎯'
                                      : item.category === 'preferencias_gostos'
                                        ? '❤️'
                                        : '📋'}
                    </span>
                    <div>
                      <h4 className="font-semibold text-white">
                        {getCategoryDisplayName(item.category)}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span className={getTypeColor(item.type)}>
                          {item.type}
                        </span>
                        <span>•</span>
                        <span>
                          {getSourceIcon(item.source)} {item.source}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    {formatDate(item.timestamp)}
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <p className="leading-relaxed text-gray-200">
                    {item.content}
                  </p>
                </div>

                {/* Keywords */}
                {item.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.keywords.map((keyword: string, index: number) => (
                      <span
                        key={index}
                        className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300">
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
