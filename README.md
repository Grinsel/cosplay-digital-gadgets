# grinsel.online – Website der Cosplay Digital Gadgets

Stand: 21.11.2026.

Die Website <https://www.grinsel.online> zeigt Android-Apps für Cosplay und Rollenspiel, jeweils
mit Beschreibung, Video und APK-Download. Sie ist zweisprachig (Deutsch/Englisch).

| | |
|---|---|
| Ordner | `C:\Users\marcj\git10\cosplay_digital_gadget_page` |
| GitHub | `Grinsel/cosplay-digital-gadgets`, Branch `master` (öffentlich) |
| Hosting | Railway, Dienst `cosplay-digital-gadgets` |
| Adresse | `https://www.grinsel.online` (nur mit `www`) |
| Technik | Next.js 14 (App Router), TypeScript, Tailwind CSS, Firebase |

**Jeder Push auf `master` wird von Railway automatisch gebaut und ist nach etwa einer bis drei
Minuten öffentlich.** Es gibt keine Zwischenstufe.

Weitere Dokumente: `HANDOVER.md` (Verlauf und Hosting-Details aus dem Februar 2026),
`docs/ARCHITECTURE.md`, `docs/CONTRIBUTING.md`, `TEMPLATE_REMOVALS.md`.

## Die Apps auf der Seite

| ID | Titel | Version |
|---|---|---|
| `alien-motion-tracker` | Motion Tracker | 1.1 |
| `cyberpunk-hacker` | Cyberpunk Hacker | 1.0 |
| `nod-ops-device` | NOD OPS Field Device | 1.0 |
| `predator-countdown` | Predator Countdown | 1.0 |
| `tactical-scanner` | Tactical Scanner | 2.0 |
| `rain-charge` | Rain Charge (animierte Ladebildschirme) | 0.7 |

Rain Charge hat als einzige App noch kein Video. Ihr Quelltext liegt in
`C:\Users\marcj\git10\rain_charge` (eigene `README.md`).

## Lokal starten und bauen

```
npm install
npm run dev        (http://localhost:3000)
npm run build      (Prüfung vor jedem Push)
```

## Aufbau

```
content/gadgets.json        alle Apps: Texte (de/en), Tags, Video, Download
public/apk/                 die APK-Dateien
public/icon.svg, og_image.png
src/app/page.tsx            Startseite
src/app/gadgets/            Übersicht, Detailseite [id], Ideen, Support, Disclaimer,
                            Impressum, Datenschutz, Verwaltung der Kommentare
src/app/sitemap.ts, robots.ts
src/components/             Kopf, Fuß, Karten, Download-Knopf, Kommentare
src/lib/gadgets.ts          liest gadgets.json und löst die Sprache auf
src/lib/types.ts            Datenformat einer App
src/lib/site.ts             SITE_URL, die einzige Stelle für die öffentliche Adresse
src/lib/i18n/               Oberflächentexte de/en
src/lib/firebase.ts, comments.ts, downloads.ts
templates/                  Vorlagen für neue Einträge und Seiten
```

Der Ordner `public/apks/` (mit s) ist leer und wird nicht benutzt.

## Eine App aktualisieren

1. Die neue APK nach `public/apk/<id>.apk` kopieren. Sie überschreibt die alte; es wird immer nur
   eine Version angeboten.
2. In `content/gadgets.json` beim Eintrag die `download.version` hochsetzen und bei Bedarf
   `features` und `howToUse` anpassen (immer `de` und `en`).
3. `npm run build`.
4. Committen und `git push origin master`.
5. Nach dem Deploy prüfen: die Detailseite zeigt die neue Version, und der Download liefert die
   neue Datei.

## Eine neue App hinzufügen

1. APK nach `public/apk/<id>.apk`.
2. In `content/gadgets.json` einen Eintrag anfügen (Vorlage: `templates/gadget-template.json`,
   Format: `src/lib/types.ts`):

```json
{
  "id": "meine-app",
  "title": "Meine App",
  "subtitle": { "en": "…", "de": "…" },
  "status": "stable",
  "tags": ["scanner"],
  "shortDescription": { "en": "…", "de": "…" },
  "longDescription": { "en": "…", "de": "…" },
  "features": [{ "en": "…", "de": "…" }],
  "howToUse": [{ "en": "…", "de": "…" }],
  "youtube": "VIDEO_ID",
  "download": {
    "type": "external",
    "apkUrl": "https://github.com/Grinsel/cosplay-digital-gadgets/raw/master/public/apk/meine-app.apk",
    "version": "1.0"
  },
  "permissions": ["WAKE_LOCK"]
}
```

   `status` ist `stable` oder `wip`. `youtube`, `credits`, `disclaimerNotes` und `permissions`
   sind freiwillig.
3. Bauen, committen, pushen wie oben. Detailseite und Sitemap entstehen aus dem Eintrag von
   selbst.

## Wie der Download funktioniert

Die Download-Links zeigen auf die Rohdatei im GitHub-Repo (`…/raw/master/public/apk/<id>.apk`),
nicht auf Railway. Eine neue APK ist deshalb sofort nach dem Push abrufbar, auch bevor der Deploy
fertig ist. Das Repo muss dafür öffentlich bleiben.

Der Download-Knopf zählt jeden Klick in Firebase (Sammlung `downloads`). Kommentare liegen in der
Sammlung `comments` und werden über die Verwaltungsseite moderiert. Firebase-Projekt:
`cosplay-gadgets-comments`; die Zugriffsregeln stehen in `HANDOVER.md`, Abschnitt 6.

## Bekannte Grenzen

- **Nur `www`:** `grinsel.online` ohne `www` funktioniert nicht (Strato kennt keine
  ALIAS-Einträge). Absolute Adressen im Code kommen deshalb nur aus `src/lib/site.ts`.
- **Alte APKs in der Git-Geschichte:** Jede APK-Version bleibt in der Versionsgeschichte und lässt
  das Repo wachsen (derzeit rund 60 MB an aktuellen APKs).
- **Debug-signierte Apps:** Die APKs sind Test-Builds für Freunde, nicht für den Play Store.
- **Startseite und 404-Seite** haben keine Sprachumschaltung.

## Rechtliches

Die Apps sind Fan-Projekte ohne offizielle Verbindung zu den Rechteinhabern. Impressum,
Datenschutz und Disclaimer liegen unter `src/app/gadgets/`.
