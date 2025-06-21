/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useCallback } from 'react'
import Fuse, { IFuseOptions } from 'fuse.js'

interface SearchableItem {
  id: string
  content: string
  metadata: any
  timestamp: string
  category: string
  type: string
  keywords: string[]
  source: string
}

interface FuseOptions {
  threshold?: number // 0.0 = perfeito, 1.0 = qualquer coisa
  distance?: number
  includeScore?: boolean
  includeMatches?: boolean
  minMatchCharLength?: number
}

const defaultFuseOptions: IFuseOptions<SearchableItem> = {
  // Configurações de busca fuzzy
  threshold: 0.4, // Tolerância a erros (0.4 = bem tolerante)
  distance: 100, // Distância máxima para considerar uma match
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,

  // Campos onde buscar e seus pesos
  keys: [
    {
      name: 'content',
      weight: 0.7, // 70% de peso para o conteúdo
    },
    {
      name: 'keywords',
      weight: 0.3, // 30% de peso para palavras-chave
    },
    {
      name: 'category',
      weight: 0.2, // 20% de peso para categoria
    },
  ],
}

export function useFuzzySearch(
  items: SearchableItem[],
  options: FuseOptions = {},
) {
  const fuse = useMemo(() => {
    const fuseOptions = { ...defaultFuseOptions, ...options }
    return new Fuse(items, fuseOptions)
  }, [items, options])

  const search = useCallback(
    (query: string) => {
      if (!query.trim()) return items

      // Busca fuzzy
      const results = fuse.search(query)

      // Retorna os itens encontrados com score
      return results.map(result => ({
        ...result.item,
        score: result.score || 0,
        matches: result.matches || [],
      }))
    },
    [fuse, items],
  )

  return {
    search,
    fuse,
  }
}

// Hook específico para busca de categorias
export function useCategoryFuzzySearch(categories: string[]) {
  const fuse = useMemo(() => {
    const categoryObjects = categories.map(cat => ({ name: cat }))
    return new Fuse(categoryObjects, {
      threshold: 0.3, // Mais restritivo para categorias
      keys: ['name'],
    })
  }, [categories])

  const searchCategory = useCallback(
    (query: string) => {
      if (!query.trim()) return categories

      const results = fuse.search(query)
      return results.map(result => result.item.name)
    },
    [fuse, categories],
  )

  return { searchCategory }
}
