'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

// Rotating hero background images — add/remove freely
const heroImages = [
  '/images/gallery/fc1.jpeg',
  '/images/gallery/fc8.jpeg',
  '/images/gallery/fc11.jpeg',
  '/images/gallery/fc5.jpeg',
]

interface ClubRow {
  position: number
  points: number
  goalsFor: number
}

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [clubRow, setClubRow] = useState<ClubRow | null>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    setLoaded(true)
    const load = async () => {
      const { data } = await supabase.from('league_table').select('*')
      if (data && data.length > 0) {
        const sorted = [...data].sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points
          const gdA = a.goals_for - a.goals_against
          const gdB = b.goals_for - b.goals_against
          if (gdB !== gdA) return gdB - gdA
          return b.goals_for - a.goals_for
        })
        const idx = sorted.findIndex((r) => r.is_current_club)
        if (idx !== -1) {
          setClubRow({
            position: idx + 1,
            points: sorted[idx].points,
            goalsFor: sorted[idx].goals_for,
          })
        }
      }
    }
    load()
  }, [])

  // Rotate background every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Background — crossfading images ── */}
      <div className="absolute inset-0">
        {heroImages.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={src}
              alt="Karonga United FC"
              fill
              className="object-cover object-top"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Overlays — sit above the images, below the content */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, rgba(15,23,42,0.97) 0%, rgba(15,23,42,0.85) 40%, rgba(15,23,42,0.4) 70%, rgba(15,23,42,0.2) 100%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{ background: 'linear-gradient(to top, #0F172A 0%, transparent 100%)' }}
        />
        <div className="absolute inset-0 pitch-pattern" style={{ opacity: 0.15 }} />
      </div>

      {/* ── Yellow top accent ── */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-club-yellow z-10" />

      {/* ── Main Content ── */}
      <div className="relative z-10 flex-1 flex items-start sm:items-center">
        <div className="max-w-7xl mx-auto px-6 w-full pt-20 pb-16 sm:pt-32 sm:pb-24">
          <div
            className={[
              'max-w-3xl transition-all duration-1000',
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            ].join(' ')}
          >

            {/* Main Heading */}
            <h1 className="font-heading uppercase leading-none mb-6 sm:mb-8">
              <span className="block text-white" style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', opacity: 0.9 }}>
                Karonga
              </span>
              <span
                className="block text-club-yellow"
                style={{ fontSize: 'clamp(4.5rem, 18vw, 10rem)', lineHeight: 0.85, textShadow: '0 0 80px rgba(255,199,44,0.3)' }}
              >
                United FC
              </span>
              <span
                className="block text-white mt-2 sm:mt-3"
                style={{ fontSize: 'clamp(0.65rem, 3.5vw, 2rem)', letterSpacing: '0.35em', opacity: 0.45 }}
              >
                INGWINA SHA MWA KARONGA
              </span>
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
              <Link
                href="/fixtures"
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-club-yellow text-navy text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors duration-200"
              >
                View Fixtures
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/news"
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-navy transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.2)' }}
              >
                Latest News
              </Link>
            </div>

            {/* ── Stats Row ── */}
            {clubRow && (
              <div className="pt-6 sm:pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="grid grid-cols-3 gap-5 sm:gap-6">

                  {/* Position */}
                  <div>
                    <div className="font-heading text-4xl sm:text-5xl text-club-yellow leading-none">
                      {clubRow.position}{getOrdinal(clubRow.position)}
                    </div>
                    <div className="text-xs uppercase tracking-widest mt-2 font-bold" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      League Position
                    </div>
                  </div>

                  {/* Points */}
                  <div>
                    <div className="font-heading text-4xl sm:text-5xl text-white leading-none">
                      {clubRow.points}
                    </div>
                    <div className="text-xs uppercase tracking-widest mt-2 font-bold" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      Points
                    </div>
                  </div>

                  {/* Goals */}
                  <div>
                    <div className="font-heading text-4xl sm:text-5xl text-white leading-none">
                      {clubRow.goalsFor}
                    </div>
                    <div className="text-xs uppercase tracking-widest mt-2 font-bold" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      Goals Scored
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ── Image indicator dots ── */}
      <div className="absolute bottom-8 right-8 z-10 hidden sm:flex items-center gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Show image ${i + 1}`}
            className="transition-all duration-300 cursor-pointer"
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === current ? '#FFC72C' : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>

      {/* ── Scroll Indicator ── */}
      <button
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        style={{ color: 'rgba(255,255,255,0.3)' }}
        aria-label="Scroll down"
      >
        <ChevronDown size={20} className="animate-bounce" />
      </button>

    </section>
  )
}