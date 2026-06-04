'use client'

import { useState } from 'react'
import Image from 'next/image'
import { results } from '@/data/results'
import { leagueTable } from '@/data/leagueTable'
import ResultCard from '@/components/results/ResultCard'
import LeagueTable from '@/components/results/LeagueTable'

const filters = ['All', 'League', 'Cup']

export default function ResultsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = results.filter((r) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'League') return r.competition === 'TNM Super League'
    return r.competition !== 'TNM Super League'
  })

  const latest = results[0]
  const clubRow = leagueTable.find((r) => r.isCurrentClub)

  // Season stats
  const wins = results.filter((r) => r.kuScore > r.opponentScore).length
  const goals = results.reduce((sum, r) => sum + r.kuScore, 0)
  const cleanSheets = results.filter((r) => r.opponentScore === 0).length

  const latestOutcome =
    latest.kuScore > latest.opponentScore ? 'WIN' :
    latest.kuScore < latest.opponentScore ? 'LOSS' : 'DRAW'

  return (
    <main style={{ background: '#0a0f1a' }}>

      {/* ── Featured Latest Result ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1800&q=85"
            alt="Latest Result"
            fill
            className="object-cover"
            style={{ filter: 'grayscale(40%)', opacity: 0.4 }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #0a0f1a 0%, rgba(10,15,26,0.85) 50%, rgba(10,15,26,0.5) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 sm:py-28">
          <span
            className="inline-block bg-club-yellow text-navy text-xs font-bold uppercase tracking-widest px-3 py-1 mb-5"
          >
            Latest Result
          </span>
          <p className="text-xs font-bold uppercase tracking-widest text-club-blue-light mb-6">
            {latest.competition} · {latest.venue === 'home' ? 'Karonga Stadium' : 'Away'}
          </p>

          {/* Score */}
          <div className="flex items-center gap-6 sm:gap-10">
            <div className="text-center">
              <div className="font-heading text-2xl sm:text-3xl text-white uppercase mb-1">Karonga</div>
              <span className="text-xs font-bold uppercase tracking-widest text-club-yellow">Crocodiles</span>
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
              <span className="font-heading text-5xl sm:text-7xl text-club-yellow leading-none">
                {latest.kuScore}
              </span>
              <span className="font-heading text-3xl" style={{ color: 'rgba(255,255,255,0.3)' }}>—</span>
              <span className="font-heading text-5xl sm:text-7xl text-white leading-none">
                {latest.opponentScore}
              </span>
            </div>

            <div className="text-center">
              <div className="font-heading text-2xl sm:text-3xl text-white uppercase mb-1">
                {latest.opponent}
              </div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {latestOutcome === 'WIN' ? 'Defeated' : latestOutcome === 'LOSS' ? 'Victors' : 'Draw'}
              </span>
            </div>
          </div>

          {/* Scorers */}
          {latest.scorers && latest.scorers.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-1">
              {latest.scorers.map((s, i) => (
                <span key={i} className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  ⚽ {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* ── Filter + heading ── */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-5 mb-10">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl text-white uppercase">
              Previous <span className="text-club-yellow">Results</span>
            </h2>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Season 2026 · All Competitions
            </p>
          </div>

          <div className="flex gap-1 p-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                style={{
                  background: activeFilter === f ? '#FFC72C' : 'transparent',
                  color: activeFilter === f ? '#0F172A' : 'rgba(255,255,255,0.5)',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── Results grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-20">
          {filtered.map((r) => (
            <ResultCard key={r.id} result={r} />
          ))}
        </div>

        {/* ── Season So Far ── */}
        <div
          className="mb-20 p-8 sm:p-10"
          style={{
            background: 'linear-gradient(135deg, rgba(0,87,184,0.12) 0%, rgba(255,199,44,0.06) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <h3 className="font-heading text-2xl sm:text-3xl text-white uppercase mb-8">
            The Season So Far
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="font-heading text-4xl sm:text-5xl text-club-yellow leading-none">
                {wins}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Wins
              </div>
            </div>
            <div>
              <div className="font-heading text-4xl sm:text-5xl text-white leading-none">
                {goals}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Goals
              </div>
            </div>
            <div>
              <div className="font-heading text-4xl sm:text-5xl text-white leading-none">
                {String(cleanSheets).padStart(2, '0')}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Clean Sheets
              </div>
            </div>
          </div>
        </div>

        {/* ── League Table ── */}
        <div>
          <div
            className="flex items-center justify-between mb-6 pl-5"
            style={{ borderLeft: '4px solid #FFC72C' }}
          >
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl text-white uppercase">
                League Standings
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                TNM Super League · 2026
              </p>
            </div>
          </div>

          <div className="lg:hidden mb-3">
            <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
              ← Swipe to see all columns →
            </span>
          </div>

          <LeagueTable />
        </div>

      </div>
    </main>
  )
}