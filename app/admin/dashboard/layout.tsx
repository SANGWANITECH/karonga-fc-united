'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard, Newspaper, Users, Calendar,
  Trophy, ListOrdered, Image as ImageIcon,
  Settings, LogOut, Menu, X, ExternalLink,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'News', href: '/admin/dashboard/news', icon: Newspaper },
  { label: 'Players', href: '/admin/dashboard/players', icon: Users },
  { label: 'Fixtures', href: '/admin/dashboard/fixtures', icon: Calendar },
  { label: 'Results', href: '/admin/dashboard/results', icon: Trophy },
  { label: 'League Table', href: '/admin/dashboard/league-table', icon: ListOrdered },
  { label: 'Gallery', href: '/admin/dashboard/gallery', icon: ImageIcon },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Protect admin: redirect to login if not authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.replace('/admin')
      } else {
        setChecking(false)
      }
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/admin')
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0f1a' }}>
        <p className="text-white uppercase tracking-widest text-sm" style={{ opacity: 0.5 }}>
          Loading...
        </p>
      </div>
    )
  }

  const SidebarContent = () => (
    <>
      <div className="px-6 mb-8">
        <h1 className="font-heading text-2xl text-club-yellow uppercase tracking-wide leading-none">
          Karonga United
        </h1>
        <p className="text-xs uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
          CMS Admin
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-3 px-3 py-3 transition-all"
              style={{
                background: active ? 'rgba(255,199,44,0.1)' : 'transparent',
                borderLeft: active ? '2px solid #FFC72C' : '2px solid transparent',
                color: active ? '#FFC72C' : 'rgba(255,255,255,0.6)',
              }}
            >
              <Icon size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-6 px-3 space-y-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Link
          href="/admin/dashboard/settings"
          onClick={() => setDrawerOpen(false)}
          className="flex items-center gap-3 px-3 py-3 transition-all hover:bg-white hover:bg-opacity-5"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          <Settings size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">Settings</span>
        </Link>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-3 transition-all hover:bg-white hover:bg-opacity-5"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          <ExternalLink size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">View Website</span>
        </a>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 transition-all cursor-pointer hover:bg-white hover:bg-opacity-5"
          style={{ color: '#ff9b9b' }}
        >
          <LogOut size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">Logout</span>
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen" style={{ background: '#0a0f1a' }}>

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex w-64 h-screen fixed left-0 top-0 flex-col py-6 z-40"
        style={{ background: '#1a1f2e', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDrawerOpen(false)} />
          <aside
            className="relative w-64 h-full flex flex-col py-6"
            style={{ background: '#1a1f2e' }}
          >
            <button
              onClick={() => setDrawerOpen(false)}
              className="absolute top-4 right-4 text-white cursor-pointer"
            >
              <X size={22} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header
          className="h-16 flex items-center justify-between px-6 sticky top-0 z-30"
          style={{ background: '#0a0f1a', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden text-white cursor-pointer"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.7)' }}>
              CMS Administration
            </h2>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}