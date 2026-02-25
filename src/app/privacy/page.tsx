import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutz - Cosplay Digital Gadgets',
  description: 'Datenschutzerklärung der Cosplay Digital Gadgets Website',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Datenschutzerklärung</h1>

        <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-6 mb-8">
          <p className="text-cyber-blue">
            (Placeholder – Diese Seite muss vor Veröffentlichung mit einer korrekten
            Datenschutzerklärung befüllt werden)
          </p>
        </div>

        <div className="space-y-8">
          <Section title="1. Verantwortlicher">
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <code className="block mt-4 text-cyber-accent bg-cyber-dark px-4 py-2 rounded font-mono text-sm">
              [NAME UND KONTAKTDATEN - SIEHE IMPRESSUM]
            </code>
          </Section>

          <Section title="2. Hosting">
            <p>
              Diese Website wird als statische Seite gehostet bei:
            </p>
            <code className="block mt-4 text-cyber-accent bg-cyber-dark px-4 py-2 rounded font-mono text-sm">
              [HOSTING-ANBIETER, z.B. Vercel, Netlify, GitHub Pages]
            </code>
            <p className="mt-4 text-gray-400 text-sm">
              Der Hosting-Anbieter erhebt ggf. technisch notwendige Daten wie IP-Adressen
              in Server-Logfiles. Details findest du in der Datenschutzerklärung des Anbieters.
            </p>
          </Section>

          <Section title="3. Cookies und Tracking">
            <p>
              Diese Website verwendet:
            </p>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>• Keine Tracking-Cookies</li>
              <li>• Keine Analytics-Dienste</li>
              <li>• Keine Werbung</li>
            </ul>
            <p className="mt-4 text-gray-400 text-sm">
              Es werden nur technisch notwendige Cookies verwendet, falls erforderlich.
            </p>
          </Section>

          <Section title="4. Eingebettete Inhalte">
            <p>
              Diese Website bindet YouTube-Videos ein. Beim Laden dieser Videos werden
              Daten an YouTube/Google übertragen. Weitere Informationen findest du in der
              Datenschutzerklärung von Google:
            </p>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-cyber-accent hover:text-cyber-blue transition-colors"
            >
              https://policies.google.com/privacy
            </a>
          </Section>

          <Section title="5. Downloads">
            <p>
              APK-Downloads werden entweder direkt von dieser Website oder über externe
              Dienste (z.B. GitHub Releases) bereitgestellt. Bei externen Diensten gelten
              deren Datenschutzbestimmungen.
            </p>
          </Section>

          <Section title="6. Deine Rechte">
            <p>
              Du hast das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung
              der Verarbeitung deiner personenbezogenen Daten. Kontaktiere uns über die
              im Impressum angegebenen Kontaktdaten.
            </p>
          </Section>
        </div>

        <div className="bg-cyber-purple/10 border border-cyber-purple/30 rounded-lg p-6 mt-8">
          <h3 className="text-cyber-purple font-bold mb-2">Wichtiger Hinweis:</h3>
          <p className="text-gray-400 text-sm">
            Diese Vorlage ersetzt keine rechtliche Beratung. Für eine rechtssichere
            Datenschutzerklärung solltest du einen Datenschutzgenerator nutzen oder
            rechtliche Beratung in Anspruch nehmen.
          </p>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div className="text-gray-300 leading-relaxed">
        {children}
      </div>
    </section>
  )
}
