'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import AppShell from './AppShell'

export default function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  // Admin pages: no navbar, footer, or loading screen
  if (isAdmin) {
    return <>{children}</>
  }

  // Public pages: full chrome
  return (
    <AppShell>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </AppShell>
  )
}