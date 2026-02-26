'use client'

import Link from 'next/link'
import { useTranslations } from '@/lib/i18n'

export default function Footer() {
  const t = useTranslations()

  return (
    <footer className="bg-cyber-darker border-t border-cyber-accent/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-cyber-accent font-bold text-lg mb-4">
              Cosplay Digital Gadgets
            </h3>
            <p className="text-gray-400 text-sm">
              {t.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.links}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/gadgets/" className="text-gray-400 hover:text-cyber-accent transition-colors">
                  {t.nav.allGadgets}
                </Link>
              </li>
              <li>
                <Link href="/gadgets/support/" className="text-gray-400 hover:text-cyber-accent transition-colors">
                  {t.nav.support}
                </Link>
              </li>
              <li>
                <Link href="/gadgets/disclaimer/" className="text-gray-400 hover:text-cyber-accent transition-colors">
                  {t.nav.disclaimer}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.legal}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/gadgets/impressum/" className="text-gray-400 hover:text-cyber-accent transition-colors">
                  {t.footer.impressum}
                </Link>
              </li>
              <li>
                <Link href="/gadgets/privacy/" className="text-gray-400 hover:text-cyber-accent transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cyber-accent/10 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>
            {t.footer.copyright.replace('{year}', String(new Date().getFullYear()))}
          </p>
        </div>
      </div>
    </footer>
  )
}
