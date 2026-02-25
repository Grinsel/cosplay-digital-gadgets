'use client'

import { useLanguage, Language } from '@/lib/i18n'

const flags: Record<Language, { flag: string; label: string }> = {
  en: { flag: '🇬🇧', label: 'English' },
  de: { flag: '🇩🇪', label: 'Deutsch' },
}

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en')
  }

  const current = flags[language]
  const other = flags[language === 'en' ? 'de' : 'en']

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-dark border border-cyber-accent/30 hover:border-cyber-accent transition-all group"
      title={`Switch to ${other.label}`}
      aria-label={`Current language: ${current.label}. Click to switch to ${other.label}`}
    >
      <span className="text-lg">{current.flag}</span>
      <span className="text-gray-400 text-sm group-hover:text-cyber-accent transition-colors hidden sm:inline">
        {language.toUpperCase()}
      </span>
    </button>
  )
}
