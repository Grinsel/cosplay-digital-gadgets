import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: {
    default: 'Cosplay Digital Gadgets',
    template: '%s | Cosplay Digital Gadgets',
  },
  description: 'Free Android gadget apps for cosplay & roleplay - Motion trackers, scanners, hacking terminals and more. Interactive props for conventions and photoshoots.',
  keywords: ['cosplay', 'roleplay', 'gadget', 'prop', 'app', 'android', 'convention', 'cosplay apps', 'roleplay gadgets', 'sci-fi props'],
  openGraph: {
    title: 'Cosplay Digital Gadgets',
    description: 'Free interactive prop apps for conventions, photoshoots and live roleplay. Motion trackers, scanners, hacking terminals and more.',
    url: 'https://grinsel.online/gadgets',
    siteName: 'Cosplay Digital Gadgets',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cosplay Digital Gadgets',
    description: 'Free Android gadget apps for cosplay & roleplay',
  },
  alternates: {
    canonical: 'https://grinsel.online/gadgets',
  },
}

export default function GadgetsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </Providers>
  )
}
