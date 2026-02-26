'use client'

import { useState, useEffect } from 'react'
import { incrementDownloadCount, subscribeToDownloadCount } from '@/lib/downloads'
import { useTranslations } from '@/lib/i18n'

interface Props {
  gadgetId: string
  downloadUrl: string
  version?: string
}

function formatCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  }
  return count.toString()
}

export default function DownloadButton({ gadgetId, downloadUrl, version }: Props) {
  const t = useTranslations()
  const [downloadCount, setDownloadCount] = useState<number | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    const unsubscribe = subscribeToDownloadCount(gadgetId, (count) => {
      setDownloadCount(count)
    })
    return () => unsubscribe()
  }, [gadgetId])

  const handleDownload = async () => {
    setIsDownloading(true)

    // Increment counter
    await incrementDownloadCount(gadgetId)

    // Open download in new tab
    window.open(downloadUrl, '_blank')

    setTimeout(() => setIsDownloading(false), 1000)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-6 py-3 bg-cyber-accent text-cyber-dark font-bold rounded-lg hover:bg-cyber-accent/90 transition-all hover:scale-105 glow-green inline-flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
        >
          <span>{isDownloading ? '⏳' : '📥'}</span>
          {t.gadgetDetail.downloadApk}
        </button>

        <div className="text-sm text-gray-400 flex items-center gap-4">
          {version && <span>Version {version}</span>}
        </div>
      </div>

      {/* Download Counter */}
      {downloadCount !== null && (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="text-cyber-blue">📊</span>
          <span>
            {formatCount(downloadCount)} {downloadCount === 1 ? t.gadgetDetail.downloadSingular : t.gadgetDetail.downloadPlural}
          </span>
        </div>
      )}
    </div>
  )
}
