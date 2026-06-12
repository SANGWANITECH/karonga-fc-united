import type { Metadata } from 'next'
import './globals.css'
import PublicChrome from '@/components/layout/PublicChrome'

export const metadata: Metadata = {
  title: {
    default: 'Karonga United FC — The Crocodiles of Karonga',
    template: '%s | Karonga United FC',
  },
  description: 'Official website of Karonga United FC — The Crocodiles of Karonga. Malawi Super League football club based in Karonga.',
}





export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-navy">
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  )
}