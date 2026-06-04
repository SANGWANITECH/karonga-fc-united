'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { fixtures } from '@/data/fixtures'
import { leagueTable } from '@/data/leagueTable'

function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const clubRow = leagueTable.find((r) => r.isCurrentClub)
  const nextMatch = fixtures.find((f) => f.status === 'upcoming')

  useEffect(() => { setLoaded(true) }, [])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1800&q=85"
          alt="Karonga United FC"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Heavy dark overlay left, lighter right */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, rgba(15,23,42,0.97) 0%, rgba(15,23,42,0.85) 40%, rgba(15,23,42,0.4) 70%, rgba(15,23,42,0.2) 100%)',
          }}
        />
        {/* Bottom fade into page */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{ background: 'linear-gradient(to top, #0F172A 0%, transparent 100%)' }}
        />
        {/* Pitch texture */}
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
              <span
                className="block text-white"
                style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', opacity: 0.9 }}
              >
                Karonga
              </span>
              <span
                className="block text-club-yellow"
                style={{
                  fontSize: 'clamp(4.5rem, 18vw, 10rem)',
                  lineHeight: 0.85,
                  textShadow: '0 0 80px rgba(255,199,44,0.3)',
                }}
              >
                United FC
              </span>
              <span
                className="block text-white mt-2 sm:mt-3"
                style={{
                  fontSize: 'clamp(0.65rem, 3.5vw, 2rem)',
                  letterSpacing: '0.35em',
                  opacity: 0.45,
                }}
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
              <div
                className="pt-6 sm:pt-8"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">

                  {/* Position */}
                  <div>
                    <div className="font-heading text-4xl sm:text-5xl text-club-yellow leading-none">
                      {clubRow.position}{getOrdinal(clubRow.position)}
                    </div>
                    <div
                      className="text-xs uppercase tracking-widest mt-2 font-bold"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                    >
                      League Position
                    </div>
                  </div>

                  {/* Points */}
                  <div>
                    <div className="font-heading text-4xl sm:text-5xl text-white leading-none">
                      {clubRow.points}
                    </div>
                    <div
                      className="text-xs uppercase tracking-widest mt-2 font-bold"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                    >
                      Points
                    </div>
                  </div>

                  {/* Goals */}
                  <div>
                    <div className="font-heading text-4xl sm:text-5xl text-white leading-none">
                      {clubRow.goalsFor}
                    </div>
                    <div
                      className="text-xs uppercase tracking-widest mt-2 font-bold"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                    >
                      Goals Scored
                    </div>
                  </div>

                  {/* Form */}
                  {clubRow.form && (
                    <div>
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        {clubRow.form.map((r, i) => (
                          <div
                            key={i}
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold"
                            style={{
                              fontSize: '11px',
                              background: r === 'W'
                                ? 'rgba(34,197,94,0.25)'
                                : r === 'D'
                                ? 'rgba(255,255,255,0.1)'
                                : 'rgba(239,68,68,0.25)',
                              color: r === 'W'
                                ? '#4ade80'
                                : r === 'D'
                                ? 'rgba(255,255,255,0.6)'
                                : '#f87171',
                              border: `1px solid ${
                                r === 'W'
                                  ? 'rgba(34,197,94,0.3)'
                                  : r === 'D'
                                  ? 'rgba(255,255,255,0.1)'
                                  : 'rgba(239,68,68,0.3)'
                              }`,
                            }}
                          >
                            {r}
                          </div>
                        ))}
                      </div>
                      <div
                        className="text-xs uppercase tracking-widest mt-2 font-bold"
                        style={{ color: 'rgba(255,255,255,0.35)' }}
                      >
                        Recent Form
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>
        </div>
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