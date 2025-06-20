'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Locale } from '@/app/[lang]/dictionaries'

interface LanguageSwitcherProps {
  currentLang: Locale
}

const languages = {
  pt: { name: 'Português', flag: '🇧🇷' },
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' }
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLang: Locale) => {
    // Remove o locale atual da URL e adiciona o novo
    const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, '')
    const newPath = `/${newLang}${pathWithoutLang}`
    
    // Salva a preferência em cookie
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=${365 * 24 * 60 * 60}`
    
    router.push(newPath)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-2">
        <div className="flex gap-1">
          {Object.entries(languages).map(([code, { name, flag }]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as Locale)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md transition-all
                ${currentLang === code 
                  ? 'bg-blue-100 text-blue-800 shadow-sm' 
                  : 'hover:bg-gray-100 text-gray-700'
                }
              `}
              title={name}
            >
              <span className="text-lg">{flag}</span>
              <span className="font-medium text-sm">{code.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 