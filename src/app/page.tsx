'use client'

import Link from 'next/link'
import { getFeaturedGadgets, getAllGadgets } from '@/lib/gadgets'
import GadgetCard from '@/components/GadgetCard'
import { useLanguage, useTranslations } from '@/lib/i18n'

export default function Home() {
  const { language } = useLanguage()
  const t = useTranslations()
  const featuredGadgets = getFeaturedGadgets(3, language)
  const totalGadgets = getAllGadgets(language).length

  return (
    <div className="grid-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-accent/5 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">{t.landing.heroTitle1}</span>
            <br />
            <span className="text-cyber-accent text-glow-green">{t.landing.heroTitle2}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t.landing.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gadgets"
              className="px-8 py-4 bg-cyber-accent text-cyber-dark font-bold rounded-lg hover:bg-cyber-accent/90 transition-all hover:scale-105 glow-green"
            >
              {t.landing.ctaAllGadgets.replace('{count}', String(totalGadgets))}
            </Link>
            <Link
              href="/support"
              className="px-8 py-4 border border-cyber-accent text-cyber-accent font-bold rounded-lg hover:bg-cyber-accent/10 transition-all"
            >
              {t.landing.ctaSupport}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-cyber-darker/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            {t.landing.featuresTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon="🎬"
              title={t.landing.featureVideos}
              description={t.landing.featureVideosDesc}
            />
            <FeatureCard
              icon="📲"
              title={t.landing.featureDownload}
              description={t.landing.featureDownloadDesc}
            />
            <FeatureCard
              icon="📖"
              title={t.landing.featureGuides}
              description={t.landing.featureGuidesDesc}
            />
            <FeatureCard
              icon="ℹ️"
              title={t.landing.featureInfo}
              description={t.landing.featureInfoDesc}
            />
          </div>
        </div>
      </section>

      {/* Featured Gadgets */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              {t.landing.featuredTitle}
            </h2>
            <Link
              href="/gadgets"
              className="text-cyber-accent hover:text-cyber-blue transition-colors"
            >
              {t.landing.showAll}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGadgets.map(gadget => (
              <GadgetCard key={gadget.id} gadget={gadget} />
            ))}
          </div>
        </div>
      </section>

      {/* What It Is Section */}
      <section className="py-16 px-4 bg-cyber-darker/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            {t.landing.whatIsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-cyber-accent font-bold mb-2">{t.landing.whatIsIt}</h3>
              <p className="text-gray-400 text-sm">
                {t.landing.whatIsItDesc}
              </p>
            </div>
            <div>
              <h3 className="text-cyber-blue font-bold mb-2">{t.landing.whatItDoes}</h3>
              <p className="text-gray-400 text-sm">
                {t.landing.whatItDoesDesc}
              </p>
            </div>
            <div>
              <h3 className="text-cyber-purple font-bold mb-2">{t.landing.whatFor}</h3>
              <p className="text-gray-400 text-sm">
                {t.landing.whatForDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.landing.ctaTitle}
          </h2>
          <p className="text-gray-400 mb-8">
            {t.landing.ctaSubtitle}
          </p>
          <Link
            href="/gadgets"
            className="inline-block px-8 py-4 bg-cyber-accent text-cyber-dark font-bold rounded-lg hover:bg-cyber-accent/90 transition-all hover:scale-105 glow-green"
          >
            {t.landing.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center p-6 bg-cyber-dark/50 rounded-lg border border-cyber-accent/10">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}
