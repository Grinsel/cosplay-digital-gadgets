'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTranslations } from '@/lib/i18n'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations()

  return (
    <header className="bg-cyber-darker border-b border-cyber-accent/20 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl">📱</span>
            <span className="text-cyber-accent font-bold text-lg group-hover:text-glow-green transition-all">
              GADGETS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/gadgets"
              className="text-gray-300 hover:text-cyber-accent transition-colors"
            >
              {t.nav.allGadgets}
            </Link>
            <Link
              href="/ideas"
              className="text-gray-300 hover:text-cyber-accent transition-colors"
            >
              {t.nav.ideas}
            </Link>
            <Link
              href="/support"
              className="text-gray-300 hover:text-cyber-accent transition-colors"
            >
              {t.nav.support}
            </Link>
            <Link
              href="/disclaimer"
              className="text-gray-300 hover:text-cyber-accent transition-colors"
            >
              {t.nav.disclaimer}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile: Language + Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-300 hover:text-cyber-accent"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-cyber-accent/20">
            <div className="flex flex-col space-y-4">
              <Link
                href="/gadgets"
                className="text-gray-300 hover:text-cyber-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.allGadgets}
              </Link>
              <Link
                href="/ideas"
                className="text-gray-300 hover:text-cyber-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.ideas}
              </Link>
              <Link
                href="/support"
                className="text-gray-300 hover:text-cyber-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.support}
              </Link>
              <Link
                href="/disclaimer"
                className="text-gray-300 hover:text-cyber-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.disclaimer}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
