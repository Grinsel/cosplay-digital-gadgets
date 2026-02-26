'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getGadgetById } from '@/lib/gadgets'
import { useLanguage, useTranslations } from '@/lib/i18n'
import { getVideoId } from '@/lib/utils'
import CommentList from '@/components/CommentList'
import DownloadButton from '@/components/DownloadButton'

interface Props {
  id: string
}

export default function GadgetDetailClient({ id }: Props) {
  const { language } = useLanguage()
  const t = useTranslations()
  const gadget = getGadgetById(id, language)

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
          <Link href="/gadgets/" className="text-cyber-accent hover:text-cyber-blue transition-colors">
            {t.gadgetDetail.backToOverview}
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
              {gadget.status === 'stable' ? t.gadgets.stable : t.gadgets.wip}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {gadget.tags.map(tag => (
              <span key={tag} className="badge badge-tag">{tag}</span>
            ))}
          </div>
        </header>

        {/* YouTube Video (Shorts format 9:16) */}
        {gadget.youtube && (
          <section className="mb-8">
            <div className="flex justify-center">
              <div className="w-full max-w-sm aspect-[9/16] bg-cyber-darker rounded-lg overflow-hidden border border-cyber-accent/20">
                <iframe
                  src={`https://www.youtube.com/embed/${getVideoId(gadget.youtube)}`}
                  title={`${gadget.title} Demo`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
            </div>
          </section>
        )}

        {/* Video Placeholder */}
        {!gadget.youtube && (
          <section className="mb-8">
            <div className="aspect-video bg-cyber-darker rounded-lg border border-cyber-accent/20 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">🎬</div>
                <p>{t.gadgetDetail.videoComingSoon}</p>
              </div>
            </div>
          </section>
        )}

        {/* Download Section */}
        <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">{t.gadgetDetail.download}</h2>
          {downloadUrl && downloadUrl !== '[GITHUB_RELEASE_URL]' ? (
            <DownloadButton
              gadgetId={id}
              downloadUrl={downloadUrl}
              version={gadget.download.version}
            />
          ) : (
            <span className="px-6 py-3 bg-gray-700 text-gray-400 font-bold rounded-lg cursor-not-allowed inline-flex items-center gap-2">
              <span>📥</span>
              {t.gadgetDetail.downloadComingSoon}
            </span>
          )}
        </section>

        {/* Description */}
        <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">{t.gadgetDetail.description}</h2>
          <p className="text-gray-300 leading-relaxed">{gadget.longDescription}</p>
        </section>

        {/* Features */}
        <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">{t.gadgetDetail.features}</h2>
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
          <h2 className="text-xl font-bold text-white mb-4">{t.gadgetDetail.howToUse}</h2>
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
            <h2 className="text-xl font-bold text-white mb-4">{t.gadgetDetail.permissions}</h2>
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
          <h2 className="text-xl font-bold text-white mb-4">{t.gadgetDetail.installation}</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• {t.gadgetDetail.installStep1}</li>
            <li>• {t.gadgetDetail.installStep2}</li>
            <li>• {t.gadgetDetail.installStep3}</li>
            <li>• {t.gadgetDetail.installStep4}</li>
          </ul>
        </section>

        {/* Disclaimer Notes */}
        {gadget.disclaimerNotes && (
          <section className="bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-cyber-red mb-4">{t.gadgetDetail.notes}</h2>
            <p className="text-gray-300">{gadget.disclaimerNotes}</p>
          </section>
        )}

        {/* Feedback & Bug Reports */}
        <CommentList type="bug" gadgetId={id} />

        {/* Credits */}
        {gadget.credits && (
          <section className="text-center text-gray-500 text-sm mt-8">
            <p>{gadget.credits}</p>
          </section>
        )}
      </div>
    </div>
  )
}
