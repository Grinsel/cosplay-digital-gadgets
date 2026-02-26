/**
 * Extract YouTube video ID from various URL formats
 */
export function getVideoId(youtube: string): string {
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

/**
 * Memoized date formatter for German locale
 */
const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export function formatDate(date: Date): string {
  return dateFormatter.format(date)
}
