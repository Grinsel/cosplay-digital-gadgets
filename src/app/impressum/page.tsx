'use client'

import { useTranslations } from '@/lib/i18n'

export default function ImpressumPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">{t.impressum.title}</h1>

        <div className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white mb-4">{t.impressum.section1Title}</h2>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-gray-400">{t.impressum.nameLabel}:</span> Marc Schmelzer</p>
              <p><span className="text-gray-400">{t.impressum.addressLabel}:</span> Marienstr. 1, Neunkirchen, Germany</p>
              <p><span className="text-gray-400">{t.impressum.contactLabel}:</span> cosplay.gadget@gmail.com</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold text-white mb-4">{t.impressum.section2Title}</h2>
            <div className="space-y-2 text-gray-300">
              <p>Marc Schmelzer</p>
              <p>Marienstr. 1, Neunkirchen, Germany</p>
            </div>
          </div>
        </div>

        <div className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">{t.impressum.noteTitle}</h2>
          <p className="text-gray-300">
            {t.impressum.noteText}
          </p>
        </div>
      </div>
    </div>
  )
}
