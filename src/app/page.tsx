import Link from 'next/link'
import { getFeaturedGadgets, getAllGadgets } from '@/lib/gadgets'
import GadgetCard from '@/components/GadgetCard'

export default function Home() {
  const featuredGadgets = getFeaturedGadgets(3)
  const totalGadgets = getAllGadgets().length

  return (
    <div className="grid-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-accent/5 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Gadget-Apps für</span>
            <br />
            <span className="text-cyber-accent text-glow-green">Cosplay & Roleplay</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Eine Sammlung interaktiver Prop-Apps: Scanner, Tracker, Timer, Terminals
            und mehr. Entwickelt als visuelle Simulation für Conventions, Fotoshoots
            und Live-Roleplay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gadgets"
              className="px-8 py-4 bg-cyber-accent text-cyber-dark font-bold rounded-lg hover:bg-cyber-accent/90 transition-all hover:scale-105 glow-green"
            >
              Alle {totalGadgets} Gadgets ansehen
            </Link>
            <Link
              href="/support"
              className="px-8 py-4 border border-cyber-accent text-cyber-accent font-bold rounded-lg hover:bg-cyber-accent/10 transition-all"
            >
              Projekt unterstützen
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-cyber-darker/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Was du hier findest
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon="🎬"
              title="Funktions-Videos"
              description="YouTube-Demos zu jedem Gadget"
            />
            <FeatureCard
              icon="📲"
              title="Freier Download"
              description="APK direkt herunterladen"
            />
            <FeatureCard
              icon="📖"
              title="Anleitungen"
              description="Hinweise zur Nutzung & Installation"
            />
            <FeatureCard
              icon="ℹ️"
              title="Transparente Info"
              description="Fan-Props, keine offiziellen Produkte"
            />
          </div>
        </div>
      </section>

      {/* Featured Gadgets */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              Ausgewählte Gadgets
            </h2>
            <Link
              href="/gadgets"
              className="text-cyber-accent hover:text-cyber-blue transition-colors"
            >
              Alle anzeigen →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGadgets.map(gadget => (
              <GadgetCard key={gadget.id} gadget={gadget} />
            ))}
          </div>
        </div>
      </section>

      {/* What It Is Section */}
      <section className="py-16 px-4 bg-cyber-darker/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Was sind diese Gadgets?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-cyber-accent font-bold mb-2">Was es ist</h3>
              <p className="text-gray-400 text-sm">
                Visuelle Gadget-Interfaces zur Simulation futuristischer Geräte.
                Sie sehen &quot;echt&quot; aus, sind aber bewusst Spielereien für Roleplay.
              </p>
            </div>
            <div>
              <h3 className="text-cyber-blue font-bold mb-2">Was es kann</h3>
              <p className="text-gray-400 text-sm">
                Interaktive Oberflächen mit Reaktionen auf Eingaben.
                Demo-Modi für Conventions und Vollbild ohne UI-Ballast.
              </p>
            </div>
            <div>
              <h3 className="text-cyber-purple font-bold mb-2">Wofür gedacht</h3>
              <p className="text-gray-400 text-sm">
                Cosplay-Props auf dem Handy. Convention-Showpieces.
                Immersives Roleplay und Fotoshoots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bereit für dein nächstes Cosplay?
          </h2>
          <p className="text-gray-400 mb-8">
            Alle Apps sind kostenlos verfügbar. Stöbere durch die Sammlung und
            finde das perfekte Gadget für dein Outfit.
          </p>
          <Link
            href="/gadgets"
            className="inline-block px-8 py-4 bg-cyber-accent text-cyber-dark font-bold rounded-lg hover:bg-cyber-accent/90 transition-all hover:scale-105 glow-green"
          >
            Gadgets entdecken
          </Link>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center p-6 bg-cyber-dark/50 rounded-lg border border-cyber-accent/10">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}
