import type { Metadata } from 'next'
import './globals.css'
import PublicChrome from '@/components/layout/PublicChrome'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.karongaunitedfc.online'),
  title: {
    default: 'Karonga United FC — The Crocodiles of Karonga',
    template: '%s | Karonga United FC',
  },
  description:
    'Official website of Karonga United FC — The Crocodiles of Karonga (Ingwina Sya Mwa Karonga). A Malawi TNM Super League football club based at Karonga Boma. Fixtures, results, news, squad, and more.',
  keywords: [
    'Karonga United FC',
    'The Crocodiles',
    'Karonga football',
    'Malawi Super League',
    'TNM Super League',
    'Karonga Boma',
    'Ingwina Sya Mwa Karonga',
    'Malawi football',
  ],
  authors: [{ name: 'Karonga United FC' }],
  creator: 'Karonga United FC',
  publisher: 'Karonga United FC',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.karongaunitedfc.online',
    siteName: 'Karonga United FC',
    title: 'Karonga United FC — The Crocodiles of Karonga',
    description:
      'Official website of Karonga United FC — The Crocodiles of Karonga. Malawi TNM Super League football club based at Karonga Boma.',
    images: [
      {
        url: '/images/logo.avif',
        width: 800,
        height: 800,
        alt: 'Karonga United FC Crest',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Karonga United FC — The Crocodiles of Karonga',
    description:
      'Official website of Karonga United FC — The Crocodiles of Karonga. Malawi TNM Super League football club.',
    images: ['/images/logo.avif'],
  },
  icons: {
    icon: '/images/logo.avif',
    shortcut: '/images/logo.avif',
    apple: '/images/logo.avif',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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