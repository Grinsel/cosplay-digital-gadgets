/**
 * Translation Template
 *
 * When adding new pages or features, add translations following this pattern.
 *
 * Steps:
 * 1. Add your section to src/lib/i18n/types.ts
 * 2. Add English translations to src/lib/i18n/en.ts
 * 3. Add German translations to src/lib/i18n/de.ts
 */

// ============================================
// Step 1: Add to types.ts (src/lib/i18n/types.ts)
// ============================================

/*
export interface Translations {
  // ... existing sections ...

  // Add your new section:
  yourSection: {
    title: string
    description: string
    buttonText: string
    items: string[]  // For lists
    // Add more as needed
  }
}
*/

// ============================================
// Step 2: Add to en.ts (src/lib/i18n/en.ts)
// ============================================

export const yourSectionEN = {
  title: 'Your Section Title',
  description: 'English description text for your section.',
  buttonText: 'Click Here',
  items: [
    'First item in the list',
    'Second item in the list',
    'Third item in the list',
  ],
}

// ============================================
// Step 3: Add to de.ts (src/lib/i18n/de.ts)
// ============================================

export const yourSectionDE = {
  title: 'Dein Abschnittstitel',
  description: 'Deutsche Beschreibung für deinen Abschnitt.',
  buttonText: 'Hier klicken',
  items: [
    'Erstes Element in der Liste',
    'Zweites Element in der Liste',
    'Drittes Element in der Liste',
  ],
}

// ============================================
// Usage in Components
// ============================================

/*
'use client'

import { useTranslations } from '@/lib/i18n'

export default function YourComponent() {
  const t = useTranslations()

  return (
    <div>
      <h1>{t.yourSection.title}</h1>
      <p>{t.yourSection.description}</p>
      <button>{t.yourSection.buttonText}</button>
      <ul>
        {t.yourSection.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
*/
