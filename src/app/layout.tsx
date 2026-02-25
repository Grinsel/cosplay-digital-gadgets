import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cosplay Digital Gadgets',
  description: 'Gadget-Apps für Cosplay & Roleplay - Scanner, Tracker, Timer und mehr',
  keywords: ['cosplay', 'roleplay', 'gadget', 'prop', 'app', 'android', 'convention'],
  authors: [{ name: 'Cosplay Digital Gadgets' }],
  openGraph: {
    title: 'Cosplay Digital Gadgets',
    description: 'Interaktive Prop-Apps für Conventions, Fotoshoots und Live-Roleplay',
    type: 'website',
    locale: 'de_DE',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
