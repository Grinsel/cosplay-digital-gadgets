# Architecture Overview

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom cyber theme
- **i18n**: Custom React Context-based system
- **Deployment**: Railway (server mode)

## Directory Structure

```
cosplay_digital_gadget_page/
├── content/
│   └── gadgets.json          # Central data source for all gadgets
├── docs/                      # Documentation
├── public/
│   └── apks/                  # APK files for download
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── gadgets/
│   │   │   ├── [id]/          # Dynamic gadget detail pages
│   │   │   └── page.tsx       # Gadgets gallery
│   │   ├── disclaimer/
│   │   ├── impressum/
│   │   ├── privacy/
│   │   ├── support/
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── GadgetCard.tsx
│   │   ├── Header.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── Providers.tsx
│   └── lib/
│       ├── i18n/              # Internationalization system
│       │   ├── context.tsx    # Language provider
│       │   ├── en.ts          # English translations
│       │   ├── de.ts          # German translations
│       │   ├── types.ts       # Translation types
│       │   └── index.ts       # Exports
│       ├── gadgets.ts         # Gadget data access functions
│       └── types.ts           # TypeScript interfaces
├── templates/                 # Skeleton files for new content
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Key Concepts

### Server vs Client Components

Next.js 14 uses React Server Components by default. Our approach:

- **Server Components** (`page.tsx`): Handle data fetching, SEO, static generation
- **Client Components** (`'use client'`): Handle interactivity, state, browser APIs

Example pattern for dynamic routes:

```typescript
// page.tsx (Server Component)
export async function generateStaticParams() {
  return getAllGadgetIds().map((id) => ({ id }))
}

export default async function Page({ params }: Props) {
  const { id } = await params
  return <ClientComponent id={id} />
}

// ClientComponent.tsx (Client Component)
'use client'
export default function ClientComponent({ id }: { id: string }) {
  // Can use hooks, browser APIs, etc.
}
```

### Data Flow

```
gadgets.json → gadgets.ts (resolver) → Components
                    ↓
              Language Context
                    ↓
              Resolved strings
```

1. Raw data stored in `content/gadgets.json` with `LocalizedText` objects
2. `gadgets.ts` resolves text based on current language
3. Components receive fully resolved string values

### i18n System

The internationalization system uses React Context:

```typescript
// Reading language
const { language } = useLanguage()

// Getting translations
const t = useTranslations()

// Usage
<h1>{t.hero.title}</h1>
```

**Hydration Safety**: The `LanguageProvider` uses a `mounted` state to prevent hydration mismatches between server and client rendering.

### Styling System

Custom Tailwind CSS classes for cyber theme:

| Class | Purpose |
|-------|---------|
| `bg-cyber-dark` | Main background (#0a0a0f) |
| `bg-cyber-darker` | Card backgrounds (#050508) |
| `text-cyber-accent` | Green accent (#00ff9d) |
| `text-cyber-blue` | Blue accent (#00d4ff) |
| `text-cyber-purple` | Purple accent (#b347ff) |
| `text-cyber-red` | Red accent (#ff3366) |
| `glow-green` | Green glow effect |
| `glow-blue` | Blue glow effect |

## Deployment

### Railway Configuration

The site runs in **server mode** (not static export) to support:
- Dynamic routes with `generateStaticParams`
- Server-side features if needed later

Key `next.config.js` settings:
```javascript
const nextConfig = {
  trailingSlash: true,      // Clean URLs
  images: {
    unoptimized: true,      // No image optimization server needed
  },
}
```

### Build Commands

```bash
npm run build    # Build for production
npm run start    # Start production server
npm run dev      # Development server
```

## Adding New Content

See `CONTRIBUTING.md` for detailed guides on:
- Adding new gadgets
- Adding new pages
- Adding new translations
