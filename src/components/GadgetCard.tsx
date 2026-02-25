import Link from 'next/link'
import { Gadget } from '@/lib/types'

interface GadgetCardProps {
  gadget: Gadget
}

export default function GadgetCard({ gadget }: GadgetCardProps) {
  return (
    <Link href={`/gadgets/${gadget.id}`}>
      <article className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 card-hover h-full flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-cyber-accent transition-colors">
              {gadget.title}
            </h3>
            <span className={`badge shrink-0 ${gadget.status === 'stable' ? 'badge-stable' : 'badge-wip'}`}>
              {gadget.status === 'stable' ? 'Stable' : 'WIP'}
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
            Details anzeigen →
          </span>
          {gadget.download.version && (
            <span className="text-gray-500 text-xs">
              v{gadget.download.version}
            </span>
          )}
        </div>
      </article>
    </Link>
  )
}
