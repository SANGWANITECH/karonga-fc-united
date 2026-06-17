'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search } from 'lucide-react'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import MobileDrawer from './MobileDrawer'
import SearchOverlay from './SearchOverlay'
import { formatShortDate } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Team', href: '/team' },
  { label: 'Fixtures', href: '/fixtures' },
  { label: 'Results', href: '/results' },
  { label: 'News', href: '/news' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
]

const socials = [
  { icon: <FaFacebookF size={13} />, label: 'Facebook', href: '#' },
  { icon: <FaTwitter size={13} />, label: 'Twitter', href: '#' },
  { icon: <FaInstagram size={13} />, label: 'Instagram', href: '#' },
  { icon: <FaYoutube size={13} />, label: 'YouTube', href: '#' },
]

function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

interface NextMatch {
  opponent: string
  venue: string
  date: string
}

interface ClubRow {
  position: number
  points: number
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [nextMatch, setNextMatch] = useState<NextMatch | null>(null)
  const [clubRow, setClubRow] = useState<ClubRow | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  // Load next match + league position from Supabase
  useEffect(() => {
    const load = async () => {
      // League position — find Karonga
      const { data: tableData } = await supabase.from('league_table').select('*')
      if (tableData && tableData.length > 0) {
        const sorted = [...tableData].sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points
          const gdA = a.goals_for - a.goals_against
          const gdB = b.goals_for - b.goals_against
          if (gdB !== gdA) return gdB - gdA
          return b.goals_for - a.goals_for
        })
        const idx = sorted.findIndex((r) => r.is_current_club)
        if (idx !== -1) {
          setClubRow({ position: idx + 1, points: sorted[idx].points })
        }
      }

      // Next match
      const today = new Date().toISOString().split('T')[0]
      const { data } = await supabase
        .from('fixtures')
        .select('opponent, venue, match_date, match_time')
        .gte('match_date', today)
        .order('match_date', { ascending: true })
        .limit(1)

      if (data && data.length > 0) {
        const f = data[0]
        setNextMatch({
          opponent: f.opponent,
          venue: f.venue,
          date: `${f.match_date}T${f.match_time || '15:00'}:00`,
        })
      }
    }
    load()
  }, [])

  return (
    <>
      {/* ── Top Info Bar — Desktop ── */}
      <div className="bg-club-blue hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">

          {/* Left — Live match + league data */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>
                FDH Bank Premiership
              </span>
            </div>

            {clubRow && (
              <>
                <div className="w-px h-3 bg-white opacity-20" />
                <span className="text-xs font-bold uppercase tracking-widest text-club-yellow">
                  {clubRow.position}{getOrdinal(clubRow.position)}
                  <span className="ml-1" style={{ color: 'rgba(255,255,255,0.5)' }}>·</span>
                  <span className="ml-1 text-white">{clubRow.points} Pts</span>
                </span>
              </>
            )}

            {nextMatch && (
              <>
                <div className="w-px h-3 bg-white opacity-20" />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Next:
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  vs {nextMatch.opponent}
                </span>
                <span
                  className="text-xs font-bold uppercase px-2 py-0.5 tracking-wider"
                  style={{
                    background: nextMatch.venue === 'home' ? 'rgba(255,199,44,0.2)' : 'rgba(255,255,255,0.1)',
                    color: nextMatch.venue === 'home' ? '#FFC72C' : 'rgba(255,255,255,0.6)',
                    fontSize: '10px',
                  }}
                >
                  {nextMatch.venue === 'home' ? 'HOME' : 'AWAY'}
                </span>
                <span className="text-xs uppercase tracking-widest font-bold" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>
                  {formatShortDate(nextMatch.date)}
                </span>
              </>
            )}
          </div>

          {/* Right — Social Icons */}
          <div className="flex items-center gap-0.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-7 h-7 flex items-center justify-center transition-all duration-200 hover:bg-white hover:bg-opacity-15"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                {s.icon}
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* ── Top Info Bar — Mobile Ticker ── */}
      <div className="bg-club-blue md:hidden overflow-hidden h-8 flex items-center">
        <div className="flex items-center whitespace-nowrap" style={{ animation: 'ticker 18s linear infinite' }}>
          {[0, 1].map((rep) => (
            <div key={rep} className="flex items-center gap-3 pl-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  FDH Bank Premiership
                </span>
              </div>

              {clubRow && (
                <>
                  <span className="text-white opacity-20">·</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-club-yellow">
                    {clubRow.position}{getOrdinal(clubRow.position)} · {clubRow.points} Pts
                  </span>
                </>
              )}

              {nextMatch && (
                <>
                  <span className="text-white opacity-20">·</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-white">
                    Next: vs {nextMatch.opponent}
                  </span>
                  <span
                    className="text-xs font-bold uppercase px-2 py-0.5"
                    style={{
                      background: nextMatch.venue === 'home' ? 'rgba(255,199,44,0.2)' : 'rgba(255,255,255,0.1)',
                      color: nextMatch.venue === 'home' ? '#FFC72C' : 'rgba(255,255,255,0.6)',
                      fontSize: '10px',
                    }}
                  >
                    {nextMatch.venue === 'home' ? 'HOME' : 'AWAY'} · {formatShortDate(nextMatch.date)}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── Main Navbar ── */}
      <header
        className={[
          'sticky top-0 w-full z-50 transition-all duration-300',
          scrolled ? 'bg-navy shadow-2xl' : 'bg-navy border-b border-white border-opacity-10',
        ].join(' ')}
        style={scrolled ? { borderBottom: '2px solid #FFC72C' } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

          {/* ── Logo + Club Name ── */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div
              className="relative w-11 h-11 rounded-full border-2 border-club-yellow overflow-hidden flex-shrink-0 transition-all duration-300 group-hover:border-white"
              style={{ boxShadow: '0 0 20px rgba(255,199,44,0.25)' }}
            >
              <Image src="/images/logo.avif" alt="Karonga United FC" fill className="object-cover" priority />
            </div>
            <div className="hidden sm:block">
              <div className="font-heading text-xl leading-none text-white uppercase" style={{ letterSpacing: '0.05em' }}>
                Karonga United
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-club-yellow uppercase tracking-widest font-bold" style={{ fontSize: '12px' }}>
                  The Crocodiles
                </span>
              </div>
            </div>
          </Link>

          {/* ── Desktop Nav — centered ── */}
          <nav className="hidden lg:flex items-center h-16 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'relative h-16 flex items-center px-3 font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap',
                  pathname === link.href ? 'text-club-yellow' : 'text-white hover:text-club-yellow',
                ].join(' ')}
                style={{ fontSize: '11px', opacity: pathname === link.href ? 1 : 0.8 }}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-club-yellow" />
                )}
              </Link>
            ))}
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-white hover:text-club-yellow transition-colors p-2 cursor-pointer"
              style={{ opacity: 0.7 }}
            >
              <Search size={17} />
            </button>

            <Link
              href="/contact"
              className="hidden md:flex items-center px-4 py-2 bg-club-yellow text-navy font-bold uppercase tracking-wider hover:bg-white transition-colors duration-200"
              style={{ fontSize: '11px' }}
            >
              Contact Us
            </Link>

            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="lg:hidden text-white p-2 cursor-pointer hover:text-club-yellow transition-colors"
            >
              <Menu size={22} />
            </button>
          </div>

        </div>
      </header>

      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navLinks={navLinks}
        pathname={pathname}
      />

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}