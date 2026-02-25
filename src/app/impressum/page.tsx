import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum - Cosplay Digital Gadgets',
  description: 'Impressum der Cosplay Digital Gadgets Website',
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Impressum</h1>

        <div className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <p className="text-cyber-blue mb-6">
            (Placeholder – bitte ausfüllen/ersetzen)
          </p>

          <Section title="Angaben gemäß § 5 TMG">
            <Placeholder label="Name" value="[DEIN NAME ODER ANBIETERNAME]" />
            <Placeholder label="Anschrift" value="[STRASSE, PLZ, ORT, LAND]" />
            <Placeholder label="Kontakt" value="[E-MAIL]" />
          </Section>

          <Section title="Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV/MStV">
            <Placeholder label="Name, Anschrift" value="[NAME, ANSCHRIFT]" />
          </Section>
        </div>

        <div className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Hinweis</h2>
          <p className="text-gray-300">
            Diese Seite ist ein privates Projekt für Cosplay/Roleplay-Simulationen.
          </p>
        </div>

        <div className="bg-cyber-purple/10 border border-cyber-purple/30 rounded-lg p-6 mt-8">
          <h3 className="text-cyber-purple font-bold mb-2">Zum Ausfüllen:</h3>
          <p className="text-gray-400 text-sm mb-4">
            In Deutschland ist ein Impressum für gewerbliche Websites und solche mit
            journalistisch-redaktionellen Inhalten Pflicht. Für rein private Websites
            kann unter Umständen darauf verzichtet werden.
          </p>
          <p className="text-gray-400 text-sm">
            Ersetze die Platzhalter oben mit deinen echten Daten, bevor du die Website
            öffentlich machst. Bei Unsicherheit konsultiere einen Rechtsanwalt.
          </p>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-white mb-4">{title}</h2>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  )
}

function Placeholder({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <span className="text-gray-400 sm:w-32">{label}:</span>
      <code className="text-cyber-accent bg-cyber-dark px-3 py-1 rounded font-mono text-sm">
        {value}
      </code>
    </div>
  )
}
