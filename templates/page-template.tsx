/**
 * Page Template
 *
 * Copy this file to src/app/your-page/page.tsx
 *
 * Steps:
 * 1. Copy this file to your new page directory
 * 2. Add translations to src/lib/i18n/en.ts and de.ts
 * 3. Update src/lib/i18n/types.ts with new translation keys
 * 4. Optionally add navigation link in Header.tsx
 */

'use client'

import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'

export default function YourPageName() {
  const t = useTranslations()

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Page Title
        </h1>

        {/* Info Box (optional) */}
        <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-6 mb-8">
          <p className="text-cyber-blue">
            Information or highlight text goes here.
          </p>
        </div>

        {/* Content Section */}
        <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">
            Section Title
          </h2>
          <div className="text-gray-300 leading-relaxed">
            <p>
              Your content goes here. Use Tailwind classes for styling.
            </p>
          </div>
        </section>

        {/* List Section (optional) */}
        <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">
            List Section
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-3 text-gray-300">
              <span className="text-cyber-accent mt-1">▸</span>
              <span>List item 1</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
              <span className="text-cyber-accent mt-1">▸</span>
              <span>List item 2</span>
            </li>
          </ul>
        </section>

        {/* Warning Box (optional) */}
        <div className="bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-6 mb-8">
          <h3 className="text-cyber-red font-bold mb-2">Warning Title</h3>
          <p className="text-gray-300">
            Warning or disclaimer text goes here.
          </p>
        </div>

        {/* Call to Action (optional) */}
        <div className="text-center">
          <Link
            href="/gadgets"
            className="inline-block px-6 py-3 bg-cyber-accent text-cyber-dark font-bold rounded-lg hover:bg-cyber-accent/90 transition-all hover:scale-105 glow-green"
          >
            Call to Action Button
          </Link>
        </div>
      </div>
    </div>
  )
}
