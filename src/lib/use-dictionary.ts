import { useState, useEffect } from 'react'
import { Dictionary } from '@/types/dictionary'

type SupportedLanguage = 'pt' | 'en' | 'es'

const dictionaries = {
  pt: () => import('../dictionaries/pt.json').then(module => module.default),
  en: () => import('../dictionaries/en.json').then(module => module.default),
  es: () => import('../dictionaries/es.json').then(module => module.default),
}

export function useDictionary(locale: SupportedLanguage) {
  const [dictionary, setDictionary] = useState<Dictionary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDictionary() {
      try {
        setLoading(true)
        const dict = await (dictionaries[locale]?.() ?? dictionaries.pt())
        setDictionary(dict as Dictionary)
      } catch (error) {
        console.error('Erro ao carregar dicionário:', error)

        const fallback = await dictionaries.en()
        setDictionary(fallback as Dictionary)
      } finally {
        setLoading(false)
      }
    }

    loadDictionary()
  }, [locale])

  return { dictionary, loading }
}
