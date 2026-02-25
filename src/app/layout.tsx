import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Cosplay Digital Gadgets',
  description: 'Gadget apps for cosplay & roleplay - Scanners, trackers, timers and more',
  keywords: ['cosplay', 'roleplay', 'gadget', 'prop', 'app', 'android', 'convention'],
  authors: [{ name: 'Cosplay Digital Gadgets' }],
  openGraph: {
    title: 'Cosplay Digital Gadgets',
    description: 'Interactive prop apps for conventions, photoshoots and live roleplay',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
