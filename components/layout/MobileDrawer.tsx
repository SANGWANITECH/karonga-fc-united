'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  X, Home, Users, Calendar, Trophy,
  Newspaper, Image as ImageIcon, Handshake, Info, Mail
} from 'lucide-react'
import { fixtures } from '@/data/fixtures'
import { leagueTable } from '@/data/leagueTable'

const iconMap: Record<string, React.ReactNode> = {
  '/': <Home size={18} />,
  '/team': <Users size={18} />,
  '/fixtures': <Calendar size={18} />,
  '/results': <Trophy size={18} />,
  '/news': <Newspaper size={18} />,
  '/sponsors': <Handshake size={18} />,
  '/gallery': <ImageIcon size={18} />,
  '/about': <Info size={18} />,
  '/contact': <Mail size={18} />,
}

interface Props {
  isOpen: boolean
  onClose: () => void
  navLinks: { label: string; href: string }[]
  pathname: string
}

export default function MobileDrawer({ isOpen, onClose, navLinks, pathname }: Props) {
  // Pull live data — ready for CMS later
  const clubRow = leagueTable.find((row) => row.isCurrentClub)
  const nextMatch = fixtures.find((f) => f.status === 'upcoming')

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <div
      className={[
        'fixed inset-0 z-50 lg:hidden transition-all duration-300',
        isOpen ? 'visible' : 'invisible pointer-events-none',
      ].join(' ')}
    >
      {/* Backdrop */}
      <div
        className={[
          'absolute inset-0 bg-black transition-opacity duration-300',
          isOpen ? 'opacity-80' : 'opacity-0',
        ].join(' ')}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={[
          'absolute left-0 top-0 h-full w-80 shadow-2xl flex flex-col transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        style={{ background: '#0F172A' }}
      >
        {/* Yellow top accent */}
        <div className="h-1 w-full bg-club-yellow" />

        {/* Header */}
        <div className="px-6 py-6 border-b border-white border-opacity-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="relative w-14 h-14 rounded-full border-2 border-club-yellow overflow-hidden flex-shrink-0"
                style={{ boxShadow: '0 0 20px rgba(255,199,44,0.25)' }}
              >
                <Image
                  src="/images/logo.avif"
                  alt="KUFC"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-heading text-2xl text-white uppercase leading-none">
                  The Crocodiles
                </div>
                <div className="text-xs text-club-yellow uppercase tracking-widest mt-1 font-bold">
                  Karonga United FC
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="text-white hover:text-club-yellow transition-colors p-2 cursor-pointer border border-white border-opacity-20 hover:border-club-yellow"
            >
              <X size={18} />
            </button>
          </div>

          {/* League position badge — from data */}
          {clubRow && (
            <div className="mt-4 flex items-center gap-3 bg-club-blue bg-opacity-20 border border-club-blue border-opacity-30 px-4 py-2">
              <div className="text-center">
                <div className="font-heading text-2xl text-club-yellow leading-none">
                  {clubRow.position}
                </div>
                <div className="text-xs text-white opacity-40 uppercase">Position</div>
              </div>
              <div className="w-px h-8 bg-white opacity-10" />
              <div className="text-center">
                <div className="font-heading text-2xl text-white leading-none">
                  {clubRow.points}
                </div>
                <div className="text-xs text-white opacity-40 uppercase">Points</div>
              </div>
              <div className="w-px h-8 bg-white opacity-10" />
              <div className="text-center">
                <div className="font-heading text-2xl text-white leading-none">
                  {clubRow.played}
                </div>
                <div className="text-xs text-white opacity-40 uppercase">Played</div>
              </div>
            </div>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                'flex items-center gap-4 px-6 py-4 transition-all duration-200 border-l-4',
                pathname === link.href
                  ? 'border-club-yellow bg-club-yellow bg-opacity-10 text-club-yellow'
                  : 'border-transparent text-white hover:border-club-yellow hover:bg-white hover:bg-opacity-5',
              ].join(' ')}
              style={{ opacity: pathname === link.href ? 1 : 0.7 }}
            >
              <span>{iconMap[link.href]}</span>
              <span className="text-xs font-bold uppercase tracking-widest">
                {link.label}
              </span>
              {pathname === link.href && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-club-yellow" />
              )}
            </Link>
          ))}

          {/* Contact — separate, own icon */}
          <Link
            href="/contact"
            className={[
              'flex items-center gap-4 px-6 py-4 transition-all duration-200 border-l-4',
              pathname === '/contact'
                ? 'border-club-yellow bg-club-yellow bg-opacity-10 text-club-yellow'
                : 'border-transparent text-white hover:border-club-yellow hover:bg-white hover:bg-opacity-5',
            ].join(' ')}
            style={{ opacity: pathname === '/contact' ? 1 : 0.7 }}
          >
            <span>{iconMap['/contact']}</span>
            <span className="text-xs font-bold uppercase tracking-widest">Contact</span>
            {pathname === '/contact' && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-club-yellow" />
            )}
          </Link>
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-white border-opacity-10">
          {/* Next match teaser — from data */}
          {nextMatch && (
            <div className="bg-club-blue bg-opacity-20 border border-club-blue border-opacity-30 px-4 py-3 mb-4">
              <div className="text-xs text-club-yellow uppercase tracking-widest font-bold mb-1">
                Next Match
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white font-bold">
                  vs {nextMatch.opponent}
                </span>
                <span className="text-xs text-white opacity-50 uppercase">
                  {nextMatch.venue}
                </span>
              </div>
            </div>
          )}
          <p className="text-xs text-white uppercase tracking-widest text-center"
            style={{ opacity: 0.2 }}>
            © 2026 Karonga United FC
          </p>
        </div>
      </div>
    </div>
  )
}