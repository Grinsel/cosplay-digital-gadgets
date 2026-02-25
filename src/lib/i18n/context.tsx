'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, Translations } from './types'
import { en } from './en'
import { de } from './de'

const translations: Record<Language, Translations> = { en, de }

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'gadgets-language'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load language from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null
    if (stored && (stored === 'en' || stored === 'de')) {
      setLanguageState(stored)
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('de')) {
        setLanguageState('de')
      }
    }
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }

  // Prevent hydration mismatch by rendering with default language until mounted
  const t = translations[mounted ? language : 'en']

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function useTranslations() {
  const { t } = useLanguage()
  return t
}
