# Übergabeprotokoll: Cosplay Digital Gadgets

**Erstellt:** 2026-02-26
**Letzte Aktualisierung:** 2026-02-27
**Projekt:** Cosplay Digital Gadget Page + Grinsel Landing (integriert)
**Status:** Produktionsbereit

---

## CHANGELOG Session 2026-02-27

### Haupt-Änderung: Landing Page Integration

Die separate `grinsel_landing` App wurde in die `cosplay_digital_gadget_page` integriert:

| Vorher | Nachher |
|--------|---------|
| 2 separate Railway-Services | 1 kombinierter Service |
| `basePath: '/gadgets'` | kein basePath |
| Landing unter eigener Domain | Landing unter `/` |
| Gadgets unter `/gadgets/` (mit basePath) | Gadgets unter `/gadgets/` (echtes Verzeichnis) |

### Durchgeführte Änderungen

1. **Dateien verschoben nach `/gadgets/`:**
   - `ideas/`, `support/`, `disclaimer/`, `impressum/`, `privacy/`, `manage-gx7k9m/`

2. **Neue Landing Page:** `src/app/page.tsx`
   - Kopiert von grinsel_landing
   - Links korrigiert (relative Pfade statt Railway-URLs)

3. **Nested Layout erstellt:** `src/app/gadgets/layout.tsx`
   - Header, Footer, Providers für Gadgets-Bereich

4. **Root Layout vereinfacht:** `src/app/layout.tsx`
   - Minimal, ohne Header/Footer
   - OG-Image und Icon für Landing

5. **next.config.js:** `basePath` entfernt

6. **Alle Links aktualisiert:**
   - Header.tsx, Footer.tsx, GadgetDetailClient.tsx, ideas/page.tsx

7. **SEO aktualisiert:**
   - sitemap.ts: Alle URLs unter `grinsel.online`
   - robots.ts: Sitemap-URL korrigiert

8. **Assets kopiert:**
   - `public/icon.svg`
   - `public/og_image.png`

### Weitere Fixes dieser Session

- **YouTube iframe lazy loading:** `loading="lazy"` hinzugefügt (Performance)
- **React.memo:** GadgetCard, CommentItem optimiert
- **getVideoId Utility:** Nach `src/lib/utils.ts` extrahiert
- **Focus-visible States:** CSS für Accessibility
- **DownloadButton:** Bessere Fehlerbehandlung
- **Rate-Limit Interval:** Cleanup-Bug behoben

### Commits

```
2875e6d Integrate landing page into gadgets app
74cfa19 Add handover documentation
2805a8c Add anonymous comment system with Firebase
e075278 Configure basePath /gadgets + SEO optimization
...
```

---

## 1. Projektübersicht

Eine Next.js Website für Cosplay-Gadget-Apps (Android APKs) mit integrierter Landing Page. Die Apps sind visuelle Simulationen für Conventions, Fotoshoots und Live-Roleplay.

### Kernfunktionen
- **Landing Page** (Grinsel-Übersicht) unter `/`
- **Gadgets-App** unter `/gadgets/` mit allen Features
- Bilingual (Deutsch/Englisch) mit automatischer Browser-Erkennung
- Gadget-Katalog mit Filterung nach Tags und Status
- Detailseiten mit YouTube-Video, Download, Features
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
| Domain | www.grinsel.online (Strato) |

---

## 3. Projektstruktur (AKTUALISIERT)

```
cosplay_digital_gadget_page/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing Page (Grinsel)
│   │   ├── layout.tsx                  # Root Layout (minimal)
│   │   ├── globals.css                 # Tailwind + Custom CSS
│   │   ├── not-found.tsx               # 404 Seite
│   │   ├── error.tsx                   # Error Boundary
│   │   ├── sitemap.ts                  # Kombinierte Sitemap
│   │   ├── robots.ts                   # robots.txt
│   │   ├── api/
│   │   │   └── download/route.ts       # Download-Tracking API
│   │   │
│   │   └── gadgets/                    # ← GADGETS-BEREICH
│   │       ├── layout.tsx              # Nested Layout (Header/Footer/Providers)
│   │       ├── page.tsx                # Gadget-Übersicht
│   │       ├── [id]/
│   │       │   ├── page.tsx            # Server Component (Metadata)
│   │       │   └── GadgetDetailClient.tsx
│   │       ├── ideas/page.tsx
│   │       ├── support/page.tsx
│   │       ├── disclaimer/page.tsx
│   │       ├── impressum/page.tsx
│   │       ├── privacy/page.tsx
│   │       └── manage-gx7k9m/page.tsx  # Admin (GEHEIM!)
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── GadgetCard.tsx              # mit React.memo
│   │   ├── LanguageSwitcher.tsx
│   │   ├── CommentForm.tsx
│   │   ├── CommentItem.tsx             # mit React.memo
│   │   ├── CommentList.tsx
│   │   ├── DownloadButton.tsx
│   │   └── Providers.tsx
│   │
│   └── lib/
│       ├── gadgets/
│       │   ├── index.ts
│       │   ├── types.ts
│       │   └── data/*.ts
│       ├── i18n/
│       │   ├── index.tsx
│       │   ├── types.ts
│       │   ├── en.ts
│       │   └── de.ts
│       ├── firebase.ts
│       ├── comments.ts
│       ├── downloads.ts
│       └── utils.ts                    # getVideoId, formatDate
│
├── public/
│   ├── icon.svg                        # NEU: Favicon
│   ├── og_image.png                    # NEU: OG Image
│   ├── apk/                            # APK Downloads
│   └── gadgets/[id]/thumb.png
│
├── next.config.js                      # KEIN basePath mehr!
├── tailwind.config.ts
└── HANDOVER.md
```

---

## 4. URL-Struktur (AKTUALISIERT)

| Seite | Pfad |
|-------|------|
| **Landing** | `/` |
| Alle Gadgets | `/gadgets/` |
| Gadget-Detail | `/gadgets/[id]/` |
| Ideen | `/gadgets/ideas/` |
| Support/Spenden | `/gadgets/support/` |
| Disclaimer | `/gadgets/disclaimer/` |
| Impressum | `/gadgets/impressum/` |
| Datenschutz | `/gadgets/privacy/` |
| **Admin-Panel** | `/gadgets/manage-gx7k9m/` (GEHEIM!) |

---

## 5. Hosting & Domain

### Railway Service
- **Dashboard:** https://railway.app/dashboard
- **Service-Name:** cosplay-digital-gadgets
- **Auto-Deploy:** Bei Push auf `master` Branch
- **Domain:** www.grinsel.online

### DNS (Strato)
```
CNAME  www  →  a3ez7r76.up.railway.app
TXT    _railway-verify.www  →  [verification code]
```

**Hinweis:** Apex-Domain (grinsel.online ohne www) funktioniert NICHT, da Strato keine ALIAS-Records unterstützt.

### GitHub
- **Repository:** https://github.com/Grinsel/cosplay-digital-gadgets
- **Branch:** master

---

## 6. Firebase-Konfiguration

### Projekt-Details
- **Projekt-ID:** cosplay-gadgets-comments
- **Console:** https://console.firebase.google.com/project/cosplay-gadgets-comments

### Security Rules (WICHTIG - in Firebase Console setzen!)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /comments/{commentId} {
      allow read: if resource.data.status == "visible";
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
    match /downloads/{gadgetId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

---

## 7. Aktuelle Gadgets

| ID | Name | Status |
|----|------|--------|
| alien-motion-tracker | Alien Motion Tracker | stable |
| cyberpunk-hacker | Cyberpunk Hacker Terminal | stable |
| nod-ops-device | NOD Ops Device | wip |
| fallout-pip-boy | Fallout Pip-Boy | wip |
| star-trek-tricorder | Star Trek Tricorder | wip |

---

## 8. Erledigte Aufgaben (diese Session)

- [x] Landing Page in Gadgets-App integriert
- [x] basePath entfernt, nested Layout erstellt
- [x] Alle Links aktualisiert
- [x] Sitemap/robots.txt korrigiert
- [x] OG-Image und Icon hinzugefügt
- [x] Firestore Security Rules (vom User in Console gesetzt)
- [x] www.grinsel.online Domain konfiguriert
- [x] YouTube iframe lazy loading
- [x] Performance-Optimierungen (React.memo, etc.)
- [x] Build erfolgreich getestet

---

## 9. Ausstehende Aufgaben

### Nach Deployment
- [ ] grinsel-landing Railway-Service deaktivieren/löschen
- [ ] Testen: www.grinsel.online/
- [ ] Testen: www.grinsel.online/gadgets/
- [ ] Alle Navigation-Links prüfen
- [ ] Mobile Menu testen
- [ ] Kommentare testen
- [ ] Admin-Panel testen

### Mittlere Priorität
- [ ] YouTube-Videos für alle Gadgets
- [ ] Thumbnails für alle Gadgets
- [ ] Google Search Console: Sitemap einreichen

### Niedrige Priorität
- [ ] grinsel_landing Repository archivieren
- [ ] Weitere Gadgets hinzufügen
- [ ] Ko-fi/PayPal Spenden-Links testen

---

## 10. Entwicklung starten

```bash
cd C:\Users\marcj\git10\cosplay_digital_gadget_page

# Dependencies installieren
npm install

# Dev-Server starten
npm run dev

# Build erstellen
npm run build

# Im Browser
http://localhost:3000        # Landing
http://localhost:3000/gadgets/  # Gadgets
```

---

## 11. Neues Gadget hinzufügen

### Schritt 1: Datendatei erstellen
```typescript
// src/lib/gadgets/data/my-new-gadget.ts
import { Gadget } from '../types'

export const myNewGadget: Gadget = {
  id: 'my-new-gadget',
  en: { /* ... */ },
  de: { /* ... */ }
}
```

### Schritt 2: In Index registrieren
```typescript
// src/lib/gadgets/index.ts
import { myNewGadget } from './data/my-new-gadget'
```

### Schritt 3: Optional - Thumbnail
```
public/gadgets/my-new-gadget/thumb.png
```

---

## 12. Styling (Tailwind Custom Classes)

### Farben
```typescript
'cyber-dark': '#0a0a0f',
'cyber-darker': '#050508',
'cyber-accent': '#00ff88',
'cyber-blue': '#00d4ff',
'cyber-purple': '#bf00ff',
'cyber-red': '#ff0055',
```

### Custom Classes
```css
.glow-green, .glow-blue    /* Glow-Effekte */
.text-glow-green           /* Text mit Glow */
.card-hover                /* Hover-Animation */
.badge, .badge-stable, .badge-wip, .badge-tag
```

---

## 13. Bekannte Einschränkungen

1. **Apex-Domain nicht möglich:** `grinsel.online` (ohne www) funktioniert nicht, da Strato keine ALIAS-Records unterstützt. Nur `www.grinsel.online` ist aktiv.

2. **TableCast Link extern:** Der Link zu TableCast VTT auf der Landing Page zeigt noch auf die Railway-URL. Falls TableCast eine eigene Domain bekommt, muss der Link aktualisiert werden.

3. **i18n auf Root-Seiten:** Die Landing Page (`/`) und 404-Seite haben keine Sprachumschaltung (absichtlich einfach gehalten).

---

## 14. Rollback-Plan

Falls etwas schiefgeht:

```bash
# Git zurücksetzen
cd C:\Users\marcj\git10\cosplay_digital_gadget_page
git reset --hard HEAD~1
git push --force

# Oder in Railway: vorheriges Deployment wiederherstellen
```

---

## 15. Kontakt & Verwandte Projekte

### Projekt-Owner
- **User:** marcj
- **Verzeichnis:** `C:\Users\marcj\git10\`

### Verwandte Projekte
- **grinsel_landing** - OBSOLET nach Integration
  - Pfad: `C:\Users\marcj\git10\grinsel_landing`
  - Status: Kann archiviert/gelöscht werden

- **TableCast VTT**
  - URL: https://git07-production.up.railway.app/
  - Status: Separates Projekt

---

*Ende des Übergabeprotokolls - Session 2026-02-27*
