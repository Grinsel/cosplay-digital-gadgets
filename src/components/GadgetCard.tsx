'use client'

import Link from 'next/link'
import { Gadget } from '@/lib/types'
import { useTranslations } from '@/lib/i18n'

interface GadgetCardProps {
  gadget: Gadget
}

function getVideoId(youtube: string): string {
  let videoId = youtube
  if (youtube.includes('youtube.com')) {
    try {
      const url = new URL(youtube)
      if (url.pathname.includes('/shorts/')) {
        videoId = url.pathname.split('/shorts/')[1]
      } else {
        videoId = url.searchParams.get('v') || youtube
      }
    } catch {
      videoId = youtube
    }
  } else if (youtube.includes('youtu.be')) {
    try {
      videoId = new URL(youtube).pathname.slice(1)
    } catch {
      videoId = youtube
    }
  }
  return videoId
}

export default function GadgetCard({ gadget }: GadgetCardProps) {
  const t = useTranslations()

  return (
    <article className="bg-cyber-darker border border-cyber-accent/20 rounded-lg overflow-hidden card-hover h-full flex flex-col">
      {/* YouTube Short Video */}
      {gadget.youtube && (
        <div className="w-full aspect-[9/16] bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${getVideoId(gadget.youtube)}`}
            title={`${gadget.title} Demo`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}

      {/* Card Content */}
      <Link href={`/gadgets/${gadget.id}`} className="flex flex-col flex-grow p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-cyber-accent transition-colors">
              {gadget.title}
            </h3>
            <span className={`badge shrink-0 ${gadget.status === 'stable' ? 'badge-stable' : 'badge-wip'}`}>
              {gadget.status === 'stable' ? t.gadgets.stable : t.gadgets.wip}
            </span>
          </div>
          <p className="text-cyber-blue text-sm">{gadget.subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 flex-grow">
          {gadget.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {gadget.tags.slice(0, 4).map(tag => (
            <span key={tag} className="badge badge-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-cyber-accent/10">
          <span className="text-cyber-accent text-sm font-semibold">
            {t.gadgets.showDetails}
          </span>
          {gadget.download.version && (
            <span className="text-gray-500 text-xs">
              v{gadget.download.version}
            </span>
          )}
        </div>
      </Link>
    </article>
  )
}
