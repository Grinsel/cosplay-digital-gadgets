import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://grinsel.online'),
  title: {
    default: 'Grinsel - Digital Projects',
    template: '%s | Grinsel',
  },
  description: 'Digital projects by Marc Schmelzer - Apps, tools and creative software',
  authors: [{ name: 'Marc Schmelzer' }],
  creator: 'Marc Schmelzer',
  publisher: 'Grinsel',
  icons: { icon: '/icon.svg' },
  openGraph: {
    title: 'Grinsel - Digital Projects',
    description: 'Digital projects by Marc Schmelzer - Apps, tools and creative software',
    url: 'https://grinsel.online',
    siteName: 'Grinsel',
    images: [{ url: '/og_image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grinsel - Digital Projects',
    description: 'Digital projects by Marc Schmelzer',
    images: ['/og_image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-cyber-dark">
        {children}
      </body>
    </html>
  )
}
