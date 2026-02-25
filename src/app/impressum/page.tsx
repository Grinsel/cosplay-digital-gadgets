'use client'

import { useTranslations } from '@/lib/i18n'

export default function ImpressumPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">{t.impressum.title}</h1>

        <div className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <p className="text-cyber-blue mb-6">
            {t.impressum.placeholder}
          </p>

          <div className="mb-6">
            <h2 className="text-lg font-bold text-white mb-4">{t.impressum.section1Title}</h2>
            <div className="space-y-2">
              <Placeholder label={t.impressum.nameLabel} value="[YOUR NAME OR PROVIDER NAME]" />
              <Placeholder label={t.impressum.addressLabel} value="[STREET, ZIP, CITY, COUNTRY]" />
              <Placeholder label={t.impressum.contactLabel} value="[EMAIL]" />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold text-white mb-4">{t.impressum.section2Title}</h2>
            <div className="space-y-2">
              <Placeholder label={t.impressum.nameLabel} value="[NAME, ADDRESS]" />
            </div>
          </div>
        </div>

        <div className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">{t.impressum.noteTitle}</h2>
          <p className="text-gray-300">
            {t.impressum.noteText}
          </p>
        </div>

        <div className="bg-cyber-purple/10 border border-cyber-purple/30 rounded-lg p-6 mt-8">
          <h3 className="text-cyber-purple font-bold mb-2">{t.impressum.fillInTitle}</h3>
          <p className="text-gray-400 text-sm mb-4">
            {t.impressum.fillInText1}
          </p>
          <p className="text-gray-400 text-sm">
            {t.impressum.fillInText2}
          </p>
        </div>
      </div>
    </div>
  )
}

function Placeholder({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <span className="text-gray-400 sm:w-32">{label}:</span>
      <code className="text-cyber-accent bg-cyber-dark px-3 py-1 rounded font-mono text-sm">
        {value}
      </code>
    </div>
  )
}
