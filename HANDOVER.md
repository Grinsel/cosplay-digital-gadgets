# Übergabeprotokoll: Cosplay Digital Gadgets

**Erstellt:** 2026-02-26
**Projekt:** Cosplay Digital Gadget Page
**Status:** Funktionsfähig, einige Features ausstehend

---

## 1. Projektübersicht

Eine Next.js Website für Cosplay-Gadget-Apps (Android APKs). Die Apps sind visuelle Simulationen für Conventions, Fotoshoots und Live-Roleplay (Scanner, Tracker, Timer, Terminals etc.).

### Kernfunktionen
- Bilingual (Deutsch/Englisch) mit automatischer Browser-Erkennung
- Gadget-Katalog mit Filterung nach Tags und Status
- Detailseiten für jedes Gadget mit YouTube-Video, Download, Features
- Anonymes Kommentarsystem (Firebase)
- Admin-Dashboard für Kommentar-Moderation
- SEO-optimiert (Sitemap, Open Graph, Twitter Cards)

---

## 2. Technologie-Stack

| Komponente | Technologie |
|------------|-------------|
| Framework | Next.js 14 (App Router) |
| Sprache | TypeScript |
| Styling | Tailwind CSS (Cyberpunk-Theme) |
| Backend | Firebase (Firestore + Auth) |
| Hosting | Railway |
| Domain | www.grinsel.online (bei Strato gekauft) |

---

## 3. Projektstruktur

```
cosplay_digital_gadget_page/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing Page
│   │   ├── layout.tsx                  # Root Layout mit Providers
│   │   ├── globals.css                 # Tailwind + Custom CSS
│   │   ├── gadgets/
│   │   │   ├── page.tsx                # Gadget-Übersicht
│   │   │   └── [id]/
│   │   │       ├── page.tsx            # Server Component (Metadata)
│   │   │       └── GadgetDetailClient.tsx  # Client Component
│   │   ├── ideas/
│   │   │   └── page.tsx                # Ideen-Vorschläge
│   │   ├── support/
│   │   │   └── page.tsx                # Spenden-Seite
│   │   ├── disclaimer/
│   │   │   └── page.tsx                # Haftungsausschluss
│   │   ├── impressum/
│   │   │   └── page.tsx                # Impressum
│   │   ├── privacy/
│   │   │   └── page.tsx                # Datenschutz
│   │   ├── manage-gx7k9m/
│   │   │   └── page.tsx                # Admin-Dashboard (geheimer Pfad!)
│   │   ├── sitemap.ts                  # SEO Sitemap
│   │   └── robots.ts                   # SEO Robots.txt
│   │
│   ├── components/
│   │   ├── Header.tsx                  # Navigation
│   │   ├── Footer.tsx                  # Footer
│   │   ├── GadgetCard.tsx              # Gadget-Vorschaukarte
│   │   ├── LanguageSwitcher.tsx        # DE/EN Toggle
│   │   ├── CommentForm.tsx             # Kommentar-Formular
│   │   ├── CommentItem.tsx             # Einzelner Kommentar
│   │   └── CommentList.tsx             # Kommentar-Liste
│   │
│   ├── lib/
│   │   ├── gadgets/
│   │   │   ├── index.ts                # Gadget-API (getGadgetById, getAllGadgets)
│   │   │   ├── types.ts                # TypeScript Interfaces
│   │   │   └── data/
│   │   │       ├── geiger-counter.ts   # Gadget-Daten
│   │   │       ├── pip-boy-terminal.ts
│   │   │       ├── motion-tracker.ts
│   │   │       └── ...                 # Weitere Gadgets
│   │   ├── i18n/
│   │   │   ├── index.tsx               # i18n Provider + Hooks
│   │   │   ├── types.ts                # Translation Interface
│   │   │   ├── en.ts                   # Englische Texte
│   │   │   └── de.ts                   # Deutsche Texte
│   │   ├── firebase.ts                 # Firebase Config
│   │   └── comments.ts                 # Kommentar-API
│   │
│   └── providers/
│       └── Providers.tsx               # Context Providers
│
├── public/
│   ├── gadgets/
│   │   └── [gadget-id]/
│   │       └── thumb.png               # Thumbnail-Bilder
│   └── apk/                            # APK-Downloads (falls lokal)
│
├── next.config.js                      # Next.js Config
├── tailwind.config.ts                  # Tailwind Config (Cyberpunk-Farben)
├── package.json
└── tsconfig.json
```

---

## 4. Datenstruktur

### 4.1 Gadget-Daten (src/lib/gadgets/types.ts)

```typescript
interface GadgetData {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  tags: string[]
  status: 'stable' | 'wip'
  youtube?: string
  features: string[]
  howToUse: string[]
  permissions?: string[]
  disclaimerNotes?: string
  credits?: string
  download: {
    type: 'github' | 'local'
    apkUrl?: string
    apkPath?: string
    version?: string
    sha256?: string
  }
}

// Bilingual wrapper
interface Gadget {
  id: string
  en: GadgetData
  de: GadgetData
}
```

### 4.2 Kommentar-Daten (Firestore)

```typescript
interface Comment {
  id: string
  type: 'idea' | 'bug'
  gadgetId: string | null      // null für allgemeine Ideen
  content: string
  nickname: string             // "Anonym" wenn leer
  createdAt: Timestamp
  parentId: string | null      // für verschachtelte Antworten
  status: 'visible' | 'hidden'
}
```

---

## 5. Firebase-Konfiguration

### 5.1 Projekt-Details
- **Projekt-ID:** cosplay-gadgets-comments
- **Console:** https://console.firebase.google.com/project/cosplay-gadgets-comments

### 5.2 Config (src/lib/firebase.ts)
```typescript
const firebaseConfig = {
  apiKey: "AIzaSyBR49LPOPA5vQxBn-r6Ga17Rel3mJS1plA",
  authDomain: "cosplay-gadgets-comments.firebaseapp.com",
  projectId: "cosplay-gadgets-comments",
  storageBucket: "cosplay-gadgets-comments.firebasestorage.app",
  messagingSenderId: "160075053085",
  appId: "1:160075053085:web:8506326b28fc63f643eef4",
  measurementId: "G-1SEFS0DZNE"
}
```

### 5.3 Security Rules (in Firebase Console setzen!)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /comments/{commentId} {
      allow read: if resource.data.status == "visible";
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
  }
}
```

---

## 6. Hosting & Deployment

### 6.1 Railway
- **Dashboard:** https://railway.app/dashboard
- **Projekt:** cosplay-digital-gadget-page
- **Auto-Deploy:** Bei Push auf `main` Branch

### 6.2 Domain
- **Domain:** www.grinsel.online
- **Registrar:** Strato
- **Status:** Gekauft, DNS noch nicht konfiguriert

### 6.3 GitHub
- **Repository:** (im User-Account, Name nicht explizit genannt)
- **Branch:** main

---

## 7. Wichtige URLs

| Seite | Pfad |
|-------|------|
| Landing | `/` |
| Alle Gadgets | `/gadgets` |
| Gadget-Detail | `/gadgets/[id]` |
| Ideen | `/ideas` |
| Support/Spenden | `/support` |
| Disclaimer | `/disclaimer` |
| Impressum | `/impressum` |
| Datenschutz | `/privacy` |
| **Admin-Panel** | `/manage-gx7k9m` (GEHEIM!) |

---

## 8. Aktuelle Gadgets

| ID | Name | Status |
|----|------|--------|
| geiger-counter | Geiger Counter | stable |
| pip-boy-terminal | Pip-Boy Terminal | stable |
| motion-tracker | Motion Tracker | wip |
| neural-scanner | Neural Scanner | wip |
| biometric-scanner | Biometric Scanner | stable |
| quantum-analyzer | Quantum Analyzer | wip |

---

## 9. Ausstehende Aufgaben

### 9.1 Hohe Priorität
- [ ] **Firebase Admin-Account erstellen** - In Firebase Console unter Authentication → Users
- [ ] **Firestore Security Rules setzen** - Siehe Abschnitt 5.3
- [ ] **Domain konfigurieren** - DNS bei Strato auf Railway zeigen

### 9.2 Mittlere Priorität
- [ ] **APK-Downloads** - Echte APK-Links in Gadget-Daten eintragen
- [ ] **YouTube-Videos** - Video-URLs für alle Gadgets hinzufügen
- [ ] **Thumbnails** - Echte Bilder in `/public/gadgets/[id]/thumb.png`
- [ ] **Impressum ausfüllen** - Echte Kontaktdaten eintragen

### 9.3 Niedrige Priorität
- [ ] Spenden-Links einrichten (Ko-fi, Buy Me a Coffee)
- [ ] Weitere Gadgets hinzufügen
- [ ] Pagination für Kommentare bei vielen Einträgen

---

## 10. Neues Gadget hinzufügen

### Schritt 1: Datendatei erstellen
```typescript
// src/lib/gadgets/data/my-new-gadget.ts
import { Gadget } from '../types'

export const myNewGadget: Gadget = {
  id: 'my-new-gadget',
  en: {
    id: 'my-new-gadget',
    title: 'My New Gadget',
    subtitle: 'A cool new prop',
    description: 'Short description',
    longDescription: 'Full description...',
    tags: ['scanner', 'sci-fi'],
    status: 'wip',
    youtube: 'https://youtube.com/shorts/xxxxx',
    features: ['Feature 1', 'Feature 2'],
    howToUse: ['Step 1', 'Step 2'],
    permissions: ['CAMERA'],
    download: {
      type: 'github',
      apkUrl: '[GITHUB_RELEASE_URL]',
      version: '1.0.0'
    }
  },
  de: {
    // Deutsche Version...
  }
}
```

### Schritt 2: In Index registrieren
```typescript
// src/lib/gadgets/index.ts
import { myNewGadget } from './data/my-new-gadget'

const gadgets: Gadget[] = [
  // ... existing gadgets
  myNewGadget,
]
```

### Schritt 3: Thumbnail hinzufügen
```
public/gadgets/my-new-gadget/thumb.png
```

---

## 11. Übersetzungen hinzufügen

### Schritt 1: Types erweitern (falls neue Keys)
```typescript
// src/lib/i18n/types.ts
export interface Translations {
  mySection: {
    myKey: string
  }
}
```

### Schritt 2: In beiden Sprachen hinzufügen
```typescript
// src/lib/i18n/en.ts
mySection: {
  myKey: 'English text',
}

// src/lib/i18n/de.ts
mySection: {
  myKey: 'Deutscher Text',
}
```

---

## 12. Styling (Tailwind Custom Classes)

### Farben (tailwind.config.ts)
```typescript
colors: {
  'cyber-dark': '#0a0a0f',
  'cyber-darker': '#050508',
  'cyber-accent': '#00ff88',    // Grün
  'cyber-blue': '#00d4ff',      // Cyan
  'cyber-purple': '#bf00ff',
  'cyber-red': '#ff0055',
}
```

### Custom Classes (globals.css)
```css
.glow-green     /* Grüner Glow-Effekt */
.glow-blue      /* Blauer Glow-Effekt */
.text-glow-green /* Text mit grünem Glow */
.badge          /* Tag/Status Badge */
.badge-stable   /* Grüner Status */
.badge-wip      /* Gelber Status */
.badge-tag      /* Grauer Tag */
```

---

## 13. Entwicklung starten

```bash
cd C:\Users\marcj\git10\cosplay_digital_gadget_page

# Dependencies installieren
npm install

# Dev-Server starten
npm run dev

# Build erstellen
npm run build

# Produktions-Preview
npm start
```

---

## 14. Bot-Schutz Details

### Honeypot
- Verstecktes Feld `name="website"` in CommentForm
- CSS: `className="hidden"`, `tabIndex={-1}`
- Wenn ausgefüllt → Kommentar wird still verworfen (kein Fehler für Bot)

### Rate Limiting
- 60 Sekunden zwischen Kommentaren
- Gespeichert in `localStorage`
- Countdown wird im UI angezeigt

---

## 15. Kontakt & Support

### Projekt-Owner
- Windows-User: marcj
- Git-Verzeichnis: `C:\Users\marcj\git10\`

### Verwandte Projekte
- **grinsel_landing** - Landing Page für grinsel.online Root
  - Pfad: `C:\Users\marcj\git10\grinsel_landing`
  - Status: Grundgerüst erstellt

---

## 16. Bekannte Probleme

1. **"nul" Datei bei Git** - Windows-spezifisches Problem. Bei `git add` explizit Dateien auflisten statt `-A`

2. **YouTube Shorts** - Werden korrekt als 9:16 eingebettet, aber manche Browser zeigen schwarze Balken

3. **Mobile Menu** - LanguageSwitcher im Mobile-Menu könnte besser positioniert sein

---

## 17. Nächste Session - Quick Start

```bash
# 1. In Projektverzeichnis wechseln
cd C:\Users\marcj\git10\cosplay_digital_gadget_page

# 2. Dev-Server starten
npm run dev

# 3. Im Browser öffnen
# http://localhost:3000
```

### Offene User-Aktionen (Firebase Console)
1. Authentication → Email/Password aktivieren
2. Authentication → Users → Admin-Account erstellen
3. Firestore → Rules → Security Rules einfügen (Abschnitt 5.3)

---

*Ende des Übergabeprotokolls*
