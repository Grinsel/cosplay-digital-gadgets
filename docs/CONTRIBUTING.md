# Contributing Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Adding a New Gadget

### Step 1: Add Entry to gadgets.json

Add a new object to `content/gadgets.json`:

```json
{
  "id": "your-gadget-id",
  "title": "Gadget Name",
  "subtitle": {
    "en": "English subtitle",
    "de": "German subtitle"
  },
  "shortDescription": {
    "en": "Short English description for cards",
    "de": "Kurze deutsche Beschreibung für Karten"
  },
  "longDescription": {
    "en": "Detailed English description for detail page",
    "de": "Ausführliche deutsche Beschreibung für Detailseite"
  },
  "tags": ["Android", "Your", "Tags"],
  "status": "wip",
  "youtube": "",
  "download": {
    "type": "local",
    "apkPath": "/apks/your-gadget.apk",
    "version": "1.0.0",
    "sha256": ""
  },
  "features": [
    { "en": "Feature 1", "de": "Funktion 1" },
    { "en": "Feature 2", "de": "Funktion 2" }
  ],
  "howToUse": [
    { "en": "Step 1", "de": "Schritt 1" },
    { "en": "Step 2", "de": "Schritt 2" }
  ],
  "permissions": ["PERMISSION_NAME"],
  "disclaimerNotes": {
    "en": "Optional notes",
    "de": "Optionale Hinweise"
  },
  "credits": "Optional credits"
}
```

### Step 2: Add APK File (Optional)

Place APK file in `public/apks/your-gadget.apk`

### Step 3: Add YouTube Video (Optional)

Add the video URL or ID to the `youtube` field:
- Full URL: `https://www.youtube.com/watch?v=VIDEO_ID`
- Or just the ID: `VIDEO_ID`

### Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | URL-safe identifier |
| `title` | string | Yes | Display name |
| `subtitle` | LocalizedText | Yes | Tagline |
| `shortDescription` | LocalizedText | Yes | Card description |
| `longDescription` | LocalizedText | Yes | Full description |
| `tags` | string[] | Yes | Category tags |
| `status` | "stable" \| "wip" | Yes | Development status |
| `youtube` | string | No | YouTube URL or ID |
| `download.type` | "local" \| "external" | Yes | APK location type |
| `download.apkPath` | string | If local | Path to APK |
| `download.apkUrl` | string | If external | External APK URL |
| `download.version` | string | No | Version number |
| `download.sha256` | string | No | File hash |
| `features` | LocalizedText[] | Yes | Feature list |
| `howToUse` | LocalizedText[] | Yes | Usage steps |
| `permissions` | string[] | No | Android permissions |
| `disclaimerNotes` | LocalizedText | No | Warning notes |
| `credits` | string | No | Attribution |

---

## Adding a New Page

### Step 1: Create Page File

Create `src/app/your-page/page.tsx`:

```typescript
'use client'

import { useTranslations } from '@/lib/i18n'

export default function YourPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          {t.yourPage.title}
        </h1>
        {/* Your content */}
      </div>
    </div>
  )
}
```

### Step 2: Add Translations

Add to `src/lib/i18n/en.ts`:

```typescript
yourPage: {
  title: 'Your Page Title',
  // ... more strings
},
```

Add to `src/lib/i18n/de.ts`:

```typescript
yourPage: {
  title: 'Dein Seitentitel',
  // ... more strings
},
```

### Step 3: Update Types

Add to `src/lib/i18n/types.ts`:

```typescript
yourPage: {
  title: string
  // ... more strings
}
```

### Step 4: Add Navigation (Optional)

Update `src/components/Header.tsx` to include a link.

---

## Adding Translations

### Step 1: Update English File

Edit `src/lib/i18n/en.ts`:

```typescript
export const en: Translations = {
  // ... existing
  newSection: {
    title: 'New Section',
    description: 'Description text',
  },
}
```

### Step 2: Update German File

Edit `src/lib/i18n/de.ts`:

```typescript
export const de: Translations = {
  // ... existing
  newSection: {
    title: 'Neuer Abschnitt',
    description: 'Beschreibungstext',
  },
}
```

### Step 3: Update Types

Edit `src/lib/i18n/types.ts`:

```typescript
export interface Translations {
  // ... existing
  newSection: {
    title: string
    description: string
  }
}
```

---

## Code Style Guidelines

### TypeScript

- Use strict mode
- Define interfaces for all data structures
- Avoid `any` type

### Components

- Use functional components
- Use `'use client'` directive only when needed
- Keep components small and focused

### Styling

- Use Tailwind utility classes
- Use custom cyber theme classes when available
- Follow mobile-first responsive design

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Pages: `page.tsx` (Next.js convention)

---

## Testing Checklist

Before committing changes:

- [ ] `npm run build` succeeds
- [ ] Site works in development mode
- [ ] Both languages display correctly
- [ ] Mobile layout looks good
- [ ] All links work
- [ ] No console errors
