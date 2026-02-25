import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer - Cosplay Digital Gadgets',
  description: 'Haftungsausschluss und rechtliche Hinweise zu den Cosplay Digital Gadgets',
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Disclaimer / Haftungsausschluss</h1>

        <div className="space-y-8">
          <Section title="Haftungsausschluss (Cosplay/Roleplay-Simulation)">
            <p>
              Diese Apps sind private Fan-/Prop-Software für Cosplay, Conventions und Roleplay.
              Sie sind nicht als sicherheitskritische Anwendungen gedacht, ersetzen keine echten
              Mess- oder Sicherheitsgeräte und liefern keine verlässlichen Messdaten.
            </p>
          </Section>

          <Section title="Nutzung auf eigene Verantwortung">
            <p>
              Die Nutzung der Apps erfolgt auf eigene Gefahr. Soweit gesetzlich zulässig, wird
              keine Haftung für Schäden übernommen, die direkt oder indirekt aus der Installation,
              Nutzung, Fehlfunktion oder Nichtverfügbarkeit entstehen (z. B. Datenverlust,
              Geräteschäden, Nutzungsausfälle).
            </p>
          </Section>

          <Section title="Keine Gewährleistung">
            <p>
              Die Apps werden &quot;wie gesehen&quot; bereitgestellt. Es besteht keine Gewährleistung
              für Fehlerfreiheit, bestimmte Funktionen, Kompatibilität oder dauerhafte Verfügbarkeit.
            </p>
          </Section>

          <Section title="Drittanbieter-Inhalte und externe Links">
            <p>
              Eingebundene Inhalte (z. B. YouTube-Videos) und externe Links unterliegen den
              Bedingungen der jeweiligen Anbieter. Für Inhalte Dritter wird keine Verantwortung
              übernommen.
            </p>
          </Section>

          <Section title="Marken- und Rechtehinweis">
            <p>
              Alle genannten Produkt-, Marken- und Firmennamen können Eigentum der jeweiligen
              Rechteinhaber sein. Diese Website und die Apps stehen in keiner offiziellen
              Verbindung zu Rechteinhabern und werden nicht von ihnen unterstützt oder beauftragt.
            </p>
            <p className="mt-4">
              Die Gestaltung ist &quot;inspired-by&quot; und verwendet keine offiziellen Logos oder
              geschützte Kennzeichen im UI.
            </p>
          </Section>

          <Section title="Sicherheits-Hinweis zur Installation">
            <div className="bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-4">
              <ul className="space-y-2 text-gray-300">
                <li>• Installiere APKs nur, wenn du der Quelle vertraust.</li>
                <li>• Prüfe nach Möglichkeit Prüfsummen/Signaturen.</li>
                <li>• Aktiviere &quot;Unbekannte Apps installieren&quot; nur, wenn nötig, und deaktiviere es danach wieder.</li>
              </ul>
            </div>
          </Section>

          <div className="bg-cyber-purple/10 border border-cyber-purple/30 rounded-lg p-6 mt-8">
            <p className="text-gray-400 text-sm">
              <strong className="text-cyber-purple">Hinweis:</strong> Dieser Text ist eine Vorlage.
              Für rechtssichere Formulierungen – besonders in Deutschland – solltest du ihn ggf.
              juristisch prüfen lassen.
            </p>
          </div>
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
