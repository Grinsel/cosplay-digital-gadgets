'use client'

import { useTranslations } from '@/lib/i18n'

export default function SupportPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">{t.support.title}</h1>

        <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <p className="text-gray-300 leading-relaxed mb-6">
            {t.support.intro}
          </p>

          <p className="text-gray-400 text-sm mb-8">
            {t.support.freeNote}
          </p>

          <h2 className="text-xl font-bold text-white mb-6">{t.support.optionsTitle}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DonationOption
              name="Ko-fi"
              description={t.support.kofiDesc}
              link="#"
              color="text-pink-400"
              linkText={t.support.supportLink}
              comingSoon={t.support.linkComingSoon}
            />
            <DonationOption
              name="Buy Me a Coffee"
              description={t.support.bmcDesc}
              link="#"
              color="text-yellow-400"
              linkText={t.support.supportLink}
              comingSoon={t.support.linkComingSoon}
            />
            <DonationOption
              name="Patreon"
              description={t.support.patreonDesc}
              link="#"
              color="text-orange-400"
              linkText={t.support.supportLink}
              comingSoon={t.support.linkComingSoon}
            />
            <DonationOption
              name="PayPal"
              description={t.support.paypalDesc}
              link="#"
              color="text-blue-400"
              linkText={t.support.supportLink}
              comingSoon={t.support.linkComingSoon}
            />
          </div>
        </section>

        <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">{t.support.otherWaysTitle}</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-cyber-accent">⭐</span>
              <span>{t.support.shareApps}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-accent">📸</span>
              <span>{t.support.showPhotos}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-accent">💬</span>
              <span>{t.support.giveFeedback}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-accent">🐛</span>
              <span>{t.support.reportBugs}</span>
            </li>
          </ul>
        </section>

        <section className="bg-cyber-purple/10 border border-cyber-purple/30 rounded-lg p-6">
          <p className="text-gray-300 text-sm">
            {t.support.anonymousNote}
          </p>
        </section>
      </div>
    </div>
  )
}

function DonationOption({
  name,
  description,
  link,
  color,
  linkText,
  comingSoon
}: {
  name: string
  description: string
  link: string
  color: string
  linkText: string
  comingSoon: string
}) {
  const isPlaceholder = link === '#'

  return (
    <div className={`p-4 bg-cyber-dark border border-cyber-accent/20 rounded-lg ${isPlaceholder ? 'opacity-60' : 'hover:border-cyber-accent transition-colors'}`}>
      <h3 className={`font-bold ${color} mb-1`}>{name}</h3>
      <p className="text-gray-400 text-sm mb-3">{description}</p>
      {isPlaceholder ? (
        <span className="text-gray-500 text-sm">{comingSoon}</span>
      ) : (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyber-accent hover:text-cyber-blue transition-colors text-sm"
        >
          {linkText}
        </a>
      )}
    </div>
  )
}
