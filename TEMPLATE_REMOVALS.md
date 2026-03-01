# Template-Texte Entfernt (2026-03-01)

Diese Datei dokumentiert welche Template-Hinweise aus der Website entfernt wurden.
Falls du noch Inhalte nachtragen musst, findest du hier die betroffenen Stellen.

---

## Entfernte Hinweise

### 1. Disclaimer-Seite (`/gadgets/disclaimer/`)

**Datei:** `src/app/gadgets/disclaimer/page.tsx`

**Entfernt:** Lila Info-Box am Ende der Seite mit dem Text:
- DE: "Hinweis: Dieser Text ist eine Vorlage. Für rechtssichere Formulierungen – besonders in Deutschland – solltest du ihn ggf. juristisch prüfen lassen."
- EN: "Note: This text is a template. For legally secure formulations, you should have it reviewed by a lawyer."

**Status:** Der Disclaimer-Inhalt selbst ist vollständig und wurde nicht geändert.

---

### 2. Privacy-Seite (`/gadgets/privacy/`)

**Datei:** `src/app/gadgets/privacy/page.tsx`

**Entfernt:** Lila Info-Box am Ende der Seite mit dem Text:
- DE: "Diese Vorlage ersetzt keine rechtliche Beratung. Für eine rechtssichere Datenschutzerklärung solltest du einen Datenschutzgenerator nutzen oder rechtliche Beratung in Anspruch nehmen."
- EN: "This template does not replace legal advice. For a legally compliant privacy policy, you should use a privacy policy generator or seek legal advice."

**Status:** Die Datenschutzerklärung enthält bereits:
- Verantwortlicher: Marc Schmelzer, Marienstr. 1, Neunkirchen
- Hosting-Info: Railway + Strato mit Links zu deren Datenschutz
- Cookies/Tracking: Keine
- YouTube-Einbettung: Hinweis auf Google-Datenschutz
- Downloads: Info zu APK-Quellen
- Rechte: Auskunft, Berichtigung, Löschung

---

### 3. Impressum-Seite (`/gadgets/impressum/`)

**Datei:** `src/app/gadgets/impressum/page.tsx`

**Entfernt (aus i18n, war nie sichtbar auf der Seite):**
- `placeholder`: "(Placeholder – bitte ausfüllen/ersetzen)"
- `fillInTitle`: "Zum Ausfüllen:"
- `fillInText1`: Info über Impressumspflicht in Deutschland
- `fillInText2`: "Ersetze die Platzhalter oben mit deinen echten Daten..."

**Status:** Das Impressum ist vollständig ausgefüllt mit:
- Name: Marc Schmelzer
- Adresse: Marienstr. 1, Neunkirchen, Germany
- Kontakt: cosplay.gadget@gmail.com

---

## Noch zu prüfen / Evtl. nachtragen

### Datenschutzerklärung
- [ ] Prüfen ob Firebase/Firestore erwähnt werden sollte (Kommentarsystem)
- [ ] Prüfen ob GitHub als APK-Quelle explizit genannt werden sollte

### Impressum
- [ ] Telefonnummer hinzufügen? (optional für private Seiten)
- [ ] USt-IdNr. falls gewerblich? (aktuell als privates Projekt deklariert)

### Disclaimer
- [ ] Inhalt ist generisch gehalten - ggf. spezifische App-Hinweise ergänzen?

---

## Betroffene Dateien (für Änderungen)

| Bereich | Datei |
|---------|-------|
| Disclaimer-Seite | `src/app/gadgets/disclaimer/page.tsx` |
| Privacy-Seite | `src/app/gadgets/privacy/page.tsx` |
| Impressum-Seite | `src/app/gadgets/impressum/page.tsx` |
| Deutsche Texte | `src/lib/i18n/de.ts` |
| Englische Texte | `src/lib/i18n/en.ts` |
| Type-Definitionen | `src/lib/i18n/types.ts` |

---

*Erstellt: 2026-03-01*
