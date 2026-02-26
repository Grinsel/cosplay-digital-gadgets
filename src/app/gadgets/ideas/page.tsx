'use client'

import Link from 'next/link'
import { useTranslations } from '@/lib/i18n'
import CommentList from '@/components/CommentList'

export default function IdeasPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/gadgets/" className="text-cyber-accent hover:text-cyber-blue transition-colors">
            ← {t.gadgetDetail.backToOverview}
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {t.ideas.title}
          </h1>
          <p className="text-cyber-blue text-lg">{t.ideas.subtitle}</p>
        </header>

        {/* Intro */}
        <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-6 mb-8">
          <p className="text-gray-300">{t.ideas.intro}</p>
        </div>

        {/* Comments */}
        <CommentList type="idea" />
      </div>
    </div>
  )
}
