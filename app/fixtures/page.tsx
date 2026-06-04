'use client'

import { useState } from 'react'
import Image from 'next/image'
import { fixtures } from '@/data/fixtures'
import FixtureCard from '@/components/fixtures/FixtureCard'

const competitions = ['All', 'TNM Super League', 'FDH Bank Cup', 'Airtel Top 8 Cup']

function monthKey(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default function FixturesPage() {
  const [activeComp, setActiveComp] = useState('All')

  const filtered = activeComp === 'All'
    ? fixtures
    : fixtures.filter((f) => f.competition === activeComp)

  // Group by month
  const grouped = filtered.reduce((acc, fix) => {
    const key = monthKey(fix.date)
    if (!acc[key]) acc[key] = []
    acc[key].push(fix)
    return acc
  }, {} as Record<string, typeof fixtures>)

  return (
    <main style={{ background: '#0a0f1a' }}>

      {/* ── Hero ── */}
      <section className="relative h-80 sm:h-96 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1800&q=85"
            alt="Fixtures"
            fill
            className="object-cover"
            style={{ filter: 'grayscale(30%)' }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #0a0f1a 0%, rgba(10,15,26,0.85) 50%, rgba(10,15,26,0.4) 100%)',
            }}
          />
        </div>

        {/* Giant watermark */}
        <div
          className="absolute bottom-0 right-6 font-heading leading-none select-none pointer-events-none hidden lg:block"
          style={{ fontSize: '180px', color: 'rgba(255,255,255,0.03)' }}
        >
          KUFC
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-club-yellow mb-3 block">
              Official Club Schedule
            </span>
            <h1 className="font-heading text-5xl sm:text-7xl text-white uppercase leading-none mb-4">
              Match Center<br />
              <span className="text-club-blue-light">Fixtures</span>
            </h1>
            <p className="text-sm sm:text-base max-w-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
              The Crocodiles are ready for battle. Track every upcoming clash in the
              TNM Super League and national cups.
            </p>
          </div>
        </div>
      </section>

      {/* ── Competition Filter ── */}
      <div
        className="sticky top-16 z-40"
        style={{
          background: 'rgba(26,31,46,0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-6 overflow-x-auto scrollbar-hide">
          {competitions.map((comp) => (
            <button
              key={comp}
              onClick={() => setActiveComp(comp)}
              className="text-xs font-bold uppercase tracking-widest whitespace-nowrap py-2 transition-colors relative cursor-pointer"
              style={{
                color: activeComp === comp ? '#FFC72C' : 'rgba(255,255,255,0.45)',
              }}
            >
              {comp === 'TNM Super League' ? 'Super League' :
               comp === 'Airtel Top 8 Cup' ? 'Airtel Top 8' :
               comp === 'FDH Bank Cup' ? 'FDH Cup' : 'All'}
              {activeComp === comp && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-club-yellow" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Fixtures List ── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white uppercase tracking-widest" style={{ opacity: 0.4 }}>
              No fixtures in this competition
            </p>
          </div>
        ) : (
          <div className="space-y-14">
            {Object.entries(grouped).map(([month, matches]) => (
              <div key={month}>
                {/* Month header */}
                <div
                  className="flex items-center justify-between mb-6 pl-5"
                  style={{ borderLeft: '4px solid #FFC72C' }}
                >
                  <div>
                    <h2 className="font-heading text-2xl sm:text-3xl text-white uppercase">
                      {month}
                    </h2>
                    <p
                      className="text-xs font-bold uppercase tracking-widest mt-1"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                    >
                      {matches.length} {matches.length === 1 ? 'Match' : 'Matches'} Scheduled
                    </p>
                  </div>
                </div>

                {/* Match cards */}
                <div className="space-y-4">
                  {matches.map((fix) => (
                    <FixtureCard key={fix.id} fixture={fix} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </main>
  )
}