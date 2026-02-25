import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support - Cosplay Digital Gadgets',
  description: 'Unterstütze die Entwicklung der Cosplay Digital Gadgets',
}

export default function SupportPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Support / Spenden</h1>

        <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <p className="text-gray-300 leading-relaxed mb-6">
            Wenn dir die Gadgets gefallen und du die Entwicklung unterstützen möchtest,
            kannst du spenden. Spenden sind freiwillig und nicht erstattungsfähig.
          </p>

          <p className="text-gray-400 text-sm mb-8">
            Alle Apps bleiben kostenlos verfügbar. Deine Unterstützung hilft bei der
            Weiterentwicklung und dem Hinzufügen neuer Features.
          </p>

          <h2 className="text-xl font-bold text-white mb-6">Spenden-Optionen</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DonationOption
              name="Ko-fi"
              description="Einmalige oder wiederkehrende Unterstützung"
              link="#"
              color="text-pink-400"
            />
            <DonationOption
              name="Buy Me a Coffee"
              description="Schnell und unkompliziert"
              link="#"
              color="text-yellow-400"
            />
            <DonationOption
              name="Patreon"
              description="Monatliche Unterstützung"
              link="#"
              color="text-orange-400"
            />
            <DonationOption
              name="PayPal"
              description="Alternative Zahlungsmethode"
              link="#"
              color="text-blue-400"
            />
          </div>
        </section>

        <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Andere Wege zu helfen</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-cyber-accent">⭐</span>
              <span>Teile die Apps mit anderen Cosplayern</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-accent">📸</span>
              <span>Zeige deine Fotos/Videos mit den Gadgets in Social Media</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-accent">💬</span>
              <span>Gib Feedback und Verbesserungsvorschläge</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-accent">🐛</span>
              <span>Melde Bugs und Probleme</span>
            </li>
          </ul>
        </section>

        <section className="bg-cyber-purple/10 border border-cyber-purple/30 rounded-lg p-6">
          <h2 className="text-lg font-bold text-cyber-purple mb-4">Hinweis</h2>
          <p className="text-gray-300 text-sm">
            Für &quot;anonyme&quot; Spenden sind in der Praxis Ko-fi oder Buy Me a Coffee
            angenehmer als eine direkt sichtbare PayPal-Adresse. Die Links werden
            eingerichtet, sobald die entsprechenden Accounts erstellt sind.
          </p>
        </section>
      </div>
    </div>
  )
}

function DonationOption({
  name,
  description,
  link,
  color
}: {
  name: string
  description: string
  link: string
  color: string
}) {
  const isPlaceholder = link === '#'

  return (
    <div className={`p-4 bg-cyber-dark border border-cyber-accent/20 rounded-lg ${isPlaceholder ? 'opacity-60' : 'hover:border-cyber-accent transition-colors'}`}>
      <h3 className={`font-bold ${color} mb-1`}>{name}</h3>
      <p className="text-gray-400 text-sm mb-3">{description}</p>
      {isPlaceholder ? (
        <span className="text-gray-500 text-sm">Link folgt...</span>
      ) : (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyber-accent hover:text-cyber-blue transition-colors text-sm"
        >
          Unterstützen →
        </a>
      )}
    </div>
  )
}
