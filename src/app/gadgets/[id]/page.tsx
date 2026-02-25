import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllGadgets, getGadgetById } from '@/lib/gadgets'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const gadgets = getAllGadgets()
  return gadgets.map((gadget) => ({
    id: gadget.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const gadget = getGadgetById(id)

  if (!gadget) {
    return { title: 'Gadget nicht gefunden' }
  }

  return {
    title: `${gadget.title} - Cosplay Digital Gadgets`,
    description: gadget.shortDescription,
    openGraph: {
      title: gadget.title,
      description: gadget.shortDescription,
      type: 'article',
    },
  }
}

export default async function GadgetPage({ params }: Props) {
  const { id } = await params
  const gadget = getGadgetById(id)

  if (!gadget) {
    notFound()
  }

  const downloadUrl = gadget.download.type === 'local'
    ? gadget.download.apkPath
    : gadget.download.apkUrl

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/gadgets" className="text-cyber-accent hover:text-cyber-blue transition-colors">
            ← Zurück zur Übersicht
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {gadget.title}
              </h1>
              <p className="text-cyber-blue text-lg">{gadget.subtitle}</p>
            </div>
            <span className={`badge shrink-0 ${gadget.status === 'stable' ? 'badge-stable' : 'badge-wip'}`}>
              {gadget.status === 'stable' ? 'Stable' : 'WIP'}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {gadget.tags.map(tag => (
              <span key={tag} className="badge badge-tag">{tag}</span>
            ))}
          </div>
        </header>

        {/* YouTube Video */}
        {gadget.youtube && (
          <section className="mb-8">
            <div className="aspect-video bg-cyber-darker rounded-lg overflow-hidden border border-cyber-accent/20">
              <iframe
                src={`https://www.youtube.com/embed/${gadget.youtube.includes('youtube.com') ? new URL(gadget.youtube).searchParams.get('v') : gadget.youtube}`}
                title={`${gadget.title} Demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </section>
        )}

        {/* Video Placeholder */}
        {!gadget.youtube && (
          <section className="mb-8">
            <div className="aspect-video bg-cyber-darker rounded-lg border border-cyber-accent/20 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">🎬</div>
                <p>Video folgt...</p>
              </div>
            </div>
          </section>
        )}

        {/* Download Section */}
        <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Download</h2>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {downloadUrl && downloadUrl !== '[GITHUB_RELEASE_URL]' ? (
              <a
                href={downloadUrl}
                className="px-6 py-3 bg-cyber-accent text-cyber-dark font-bold rounded-lg hover:bg-cyber-accent/90 transition-all hover:scale-105 glow-green inline-flex items-center gap-2"
              >
                <span>📥</span>
                APK herunterladen
              </a>
            ) : (
              <span className="px-6 py-3 bg-gray-700 text-gray-400 font-bold rounded-lg cursor-not-allowed inline-flex items-center gap-2">
                <span>📥</span>
                Download folgt...
              </span>
            )}
            <div className="text-sm text-gray-400">
              {gadget.download.version && <span>Version {gadget.download.version}</span>}
              {gadget.download.sha256 && (
                <span className="ml-4 font-mono text-xs">SHA256: {gadget.download.sha256.slice(0, 16)}...</span>
              )}
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Beschreibung</h2>
          <p className="text-gray-300 leading-relaxed">{gadget.longDescription}</p>
        </section>

        {/* Features */}
        <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Features</h2>
          <ul className="space-y-2">
            {gadget.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <span className="text-cyber-accent mt-1">▸</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How to Use */}
        <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Bedienung</h2>
          <ol className="space-y-2 list-decimal list-inside">
            {gadget.howToUse.map((step, index) => (
              <li key={index} className="text-gray-300">
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* Permissions */}
        {gadget.permissions && gadget.permissions.length > 0 && (
          <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Berechtigungen</h2>
            <div className="flex flex-wrap gap-2">
              {gadget.permissions.map(perm => (
                <span key={perm} className="px-3 py-1 bg-cyber-dark border border-cyber-blue/30 rounded text-cyber-blue text-sm font-mono">
                  {perm}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Installation Hints */}
        <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Installation</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• APK herunterladen und auf Android installieren</li>
            <li>• Bei Bedarf &quot;Unbekannte Apps installieren&quot; für deinen Browser erlauben</li>
            <li>• Empfehlung: Installation nur von Quellen, denen du vertraust</li>
            <li>• Für bestes Ergebnis: &quot;Show Mode&quot; aktivieren (Vollbild)</li>
          </ul>
        </section>

        {/* Disclaimer Notes */}
        {gadget.disclaimerNotes && (
          <section className="bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-cyber-red mb-4">Hinweise</h2>
            <p className="text-gray-300">{gadget.disclaimerNotes}</p>
          </section>
        )}

        {/* Credits */}
        {gadget.credits && (
          <section className="text-center text-gray-500 text-sm">
            <p>{gadget.credits}</p>
          </section>
        )}
      </div>
    </div>
  )
}
