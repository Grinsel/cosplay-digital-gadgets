'use client'

import { memo, useState } from 'react'
import Link from 'next/link'
import { Gadget } from '@/lib/types'
import { useTranslations } from '@/lib/i18n'
import { getVideoId } from '@/lib/utils'

interface GadgetCardProps {
  gadget: Gadget
}

export default memo(function GadgetCard({ gadget }: GadgetCardProps) {
  const t = useTranslations()
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoId = gadget.youtube ? getVideoId(gadget.youtube) : null

  return (
    <article className="bg-cyber-darker border border-cyber-accent/20 rounded-lg overflow-hidden card-hover h-full flex flex-col">
      {/* YouTube Short Video - Lazy loaded on click */}
      {videoId && (
        <div className="w-full aspect-[9/16] bg-black relative">
          {videoLoaded ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={`${gadget.title} Demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <button
              onClick={() => setVideoLoaded(true)}
              className="w-full h-full relative group cursor-pointer"
              aria-label={`Play ${gadget.title} video`}
            >
              {/* YouTube Thumbnail */}
              <img
                src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                alt={`${gadget.title} thumbnail`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-cyber-accent/90 rounded-full flex items-center justify-center group-hover:bg-cyber-accent group-hover:scale-110 transition-all">
                  <svg className="w-8 h-8 text-cyber-dark ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          )}
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
})
