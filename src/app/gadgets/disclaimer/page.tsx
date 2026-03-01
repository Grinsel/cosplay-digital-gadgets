'use client'

import { useTranslations } from '@/lib/i18n'

export default function DisclaimerPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">{t.disclaimer.title}</h1>

        <div className="space-y-8">
          <Section title={t.disclaimer.section1Title}>
            <p>{t.disclaimer.section1Text}</p>
          </Section>

          <Section title={t.disclaimer.section2Title}>
            <p>{t.disclaimer.section2Text}</p>
          </Section>

          <Section title={t.disclaimer.section3Title}>
            <p>{t.disclaimer.section3Text}</p>
          </Section>

          <Section title={t.disclaimer.section4Title}>
            <p>{t.disclaimer.section4Text}</p>
          </Section>

          <Section title={t.disclaimer.section5Title}>
            <p>{t.disclaimer.section5Text}</p>
          </Section>

          <Section title={t.disclaimer.section6Title}>
            <div className="bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-4">
              <ul className="space-y-2 text-gray-300">
                {t.disclaimer.section6List.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </Section>

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
