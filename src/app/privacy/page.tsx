'use client'

import { useTranslations } from '@/lib/i18n'

export default function PrivacyPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">{t.privacy.title}</h1>

        <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-6 mb-8">
          <p className="text-cyber-blue">
            {t.privacy.placeholder}
          </p>
        </div>

        <div className="space-y-8">
          <Section title={t.privacy.section1Title}>
            <p>{t.privacy.section1Text}</p>
            <code className="block mt-4 text-cyber-accent bg-cyber-dark px-4 py-2 rounded font-mono text-sm">
              [NAME AND CONTACT DETAILS - SEE LEGAL NOTICE]
            </code>
          </Section>

          <Section title={t.privacy.section2Title}>
            <p>{t.privacy.section2Text}</p>
            <code className="block mt-4 text-cyber-accent bg-cyber-dark px-4 py-2 rounded font-mono text-sm">
              [HOSTING PROVIDER, e.g. Vercel, Netlify, GitHub Pages]
            </code>
            <p className="mt-4 text-gray-400 text-sm">
              {t.privacy.section2Note}
            </p>
          </Section>

          <Section title={t.privacy.section3Title}>
            <p>{t.privacy.section3Text}</p>
            <ul className="mt-4 space-y-2 text-gray-300">
              {t.privacy.section3List.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
            <p className="mt-4 text-gray-400 text-sm">
              {t.privacy.section3Note}
            </p>
          </Section>

          <Section title={t.privacy.section4Title}>
            <p>{t.privacy.section4Text}</p>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-cyber-accent hover:text-cyber-blue transition-colors"
            >
              https://policies.google.com/privacy
            </a>
          </Section>

          <Section title={t.privacy.section5Title}>
            <p>{t.privacy.section5Text}</p>
          </Section>

          <Section title={t.privacy.section6Title}>
            <p>{t.privacy.section6Text}</p>
          </Section>
        </div>

        <div className="bg-cyber-purple/10 border border-cyber-purple/30 rounded-lg p-6 mt-8">
          <p className="text-gray-400 text-sm">
            {t.privacy.legalNote}
          </p>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div className="text-gray-300 leading-relaxed">
        {children}
      </div>
    </section>
  )
}
