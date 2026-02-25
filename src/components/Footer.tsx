import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-cyber-darker border-t border-cyber-accent/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-cyber-accent font-bold text-lg mb-4">
              Cosplay Digital Gadgets
            </h3>
            <p className="text-gray-400 text-sm">
              Fan-Prop Apps für Conventions, Fotoshoots und Live-Roleplay.
              Keine offiziellen Produkte.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/gadgets" className="text-gray-400 hover:text-cyber-accent transition-colors">
                  Alle Gadgets
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-cyber-accent transition-colors">
                  Support / Spenden
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-400 hover:text-cyber-accent transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/impressum" className="text-gray-400 hover:text-cyber-accent transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-cyber-accent transition-colors">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cyber-accent/10 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Cosplay Digital Gadgets.
            Fan-Projekt, keine offizielle Verbindung zu Rechteinhabern.
          </p>
        </div>
      </div>
    </footer>
  )
}
