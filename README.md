# Cosplay Digital Gadgets Website

Eine Showcase-Website für Cosplay/Roleplay Gadget-Apps mit APK-Downloads, YouTube-Demos und detaillierten Beschreibungen.

## Tech-Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Static Export (Vercel/Netlify kompatibel)

## Setup & Entwicklung

### Voraussetzungen

- Node.js 18+
- npm oder yarn

### Installation

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die Website ist dann unter `http://localhost:3000` erreichbar.

### Build

```bash
# Produktions-Build erstellen
npm run build

# Build lokal testen
npm run start
```

Der Static Export liegt dann im `out/` Verzeichnis.

## Struktur

```
├── content/
│   └── gadgets.json          # Alle Gadget-Daten
├── public/
│   └── apks/                 # Lokale APK-Dateien (optional)
├── src/
│   ├── app/                  # Next.js App Router Pages
│   │   ├── page.tsx          # Landing Page
│   │   ├── gadgets/          # Galerie & Detail-Seiten
│   │   ├── support/          # Spenden-Seite
│   │   ├── disclaimer/       # Haftungsausschluss
│   │   ├── impressum/        # Impressum
│   │   └── privacy/          # Datenschutz
│   ├── components/           # React-Komponenten
│   └── lib/                  # Utilities & Types
└── tailwind.config.ts        # Tailwind-Konfiguration
```

## Neues Gadget hinzufügen

1. Öffne `content/gadgets.json`
2. Füge ein neues Objekt hinzu:

```json
{
  "id": "mein-gadget",
  "title": "Mein Gadget",
  "subtitle": "Kurze Beschreibung",
  "status": "stable",
  "tags": ["scanner", "sci-fi"],
  "shortDescription": "1-2 Sätze für die Kartenansicht",
  "longDescription": "Ausführliche Beschreibung für die Detailseite...",
  "features": [
    "Feature 1",
    "Feature 2"
  ],
  "howToUse": [
    "Schritt 1",
    "Schritt 2"
  ],
  "youtube": "VIDEO_ID_ODER_URL",
  "download": {
    "type": "external",
    "apkUrl": "https://github.com/.../releases/download/.../app.apk",
    "version": "1.0"
  },
  "permissions": ["WAKE_LOCK", "VIBRATE"]
}
```

## APK-Hosting

### Option 1: Externe Links (empfohlen)

Verwende GitHub Releases oder einen anderen CDN:

```json
"download": {
  "type": "external",
  "apkUrl": "https://github.com/user/repo/releases/download/v1.0/app.apk",
  "version": "1.0"
}
```

**Vorteile:**
- Repository bleibt klein
- Bessere Download-Geschwindigkeit
- Versionierung über Releases

### Option 2: Lokale Dateien

Lege APKs in `public/apks/`:

```json
"download": {
  "type": "local",
  "apkPath": "/apks/mein-gadget.apk",
  "version": "1.0"
}
```

**Hinweis:** Große Dateien (>50MB) sollten via Git LFS oder extern gehostet werden.

## Deployment

### Vercel (empfohlen)

1. Repository auf GitHub pushen
2. Bei Vercel importieren
3. Automatisches Deployment bei Push

### Netlify

1. Repository auf GitHub pushen
2. Bei Netlify importieren
3. Build Command: `npm run build`
4. Publish Directory: `out`

### Manuell

```bash
npm run build
# Upload des 'out' Verzeichnisses zu beliebigem Static Host
```

## Anpassungen

### Farben

Die Cyber-Farben sind in `tailwind.config.ts` definiert:

```ts
colors: {
  'cyber-dark': '#0a0a0f',
  'cyber-accent': '#00ff88',
  'cyber-blue': '#00d4ff',
  // ...
}
```

### Rechtliche Seiten

Ersetze die Platzhalter in:
- `/src/app/impressum/page.tsx`
- `/src/app/privacy/page.tsx`
- `/src/app/support/page.tsx` (Spenden-Links)

## Lizenz

Private Nutzung. Apps sind Fan-Projekte ohne offizielle Verbindung zu Rechteinhabern.
