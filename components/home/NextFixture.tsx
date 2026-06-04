'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, Calendar } from 'lucide-react'
import { fixtures } from '@/data/fixtures'
import { formatDate, formatTime, getTimeUntil } from '@/lib/utils'

function Countdown({ dateString }: { dateString: string }) {
  const [time, setTime] = useState(getTimeUntil(dateString))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeUntil(dateString))
    }, 1000)
    return () => clearInterval(interval)
  }, [dateString])

  if (time.isPast) return null

  const parts = [
    { value: time.days, label: 'Days' },
    { value: time.hours, label: 'Hrs' },
    { value: time.minutes, label: 'Min' },
    { value: time.seconds, label: 'Sec' },
  ]

  return (
    <div className="flex items-center gap-3">
      {parts.map(({ value, label }, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="text-center">
            <div className="font-heading text-4xl sm:text-5xl text-club-yellow tabular-nums leading-none">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-xs uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {label}
            </div>
          </div>
          {i < parts.length - 1 && (
            <div className="font-heading text-3xl text-club-yellow mb-4">:</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function NextFixture() {
  const next = fixtures.find((f) => f.status === 'upcoming')
  if (!next) return null

  return (
    <section className="py-16 sm:py-24 gradient-club relative overflow-hidden">
      {/* Decorative pitch pattern */}
      <div className="absolute inset-0 pitch-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-0.5 h-4 bg-club-yellow" />
          <span className="text-xs font-bold uppercase tracking-widest text-club-yellow">
            Next Match
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Match info */}
          <div>
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-white px-3 py-1 mb-6 border"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)' }}>
              {next.competition}
            </div>

            {/* Teams */}
            <div className="flex items-center gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-club-yellow bg-navy-800 flex items-center justify-center mb-3">
                  <span className="font-heading text-club-yellow text-2xl">KU</span>
                </div>
                <div className="font-heading text-white text-lg uppercase tracking-wide">Karonga Utd</div>
              </div>

              <div className="text-center flex-shrink-0">
                <div className="font-heading text-4xl sm:text-5xl text-white opacity-30">VS</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white bg-navy-800 flex items-center justify-center mb-3"
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                  <span className="font-heading text-white text-2xl opacity-60">
                    {next.opponent.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="font-heading text-white text-lg uppercase tracking-wide">{next.opponent}</div>
              </div>
            </div>

            {/* Date & venue */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <Calendar size={14} className="text-club-yellow flex-shrink-0" />
                <span>{formatDate(next.date)} · {formatTime(next.date)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <MapPin size={14} className="text-club-yellow flex-shrink-0" />
                <span>{next.stadium}</span>
                <span
                  className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 ${
                    next.venue === 'home'
                      ? 'bg-club-yellow text-navy'
                      : 'border text-white'
                  }`}
                  style={next.venue !== 'home' ? { borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.5)' } : {}}
                >
                  {next.venue}
                </span>
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Kick-off in
            </div>
            <Countdown dateString={next.date} />

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/fixtures"
                className="px-6 py-3 bg-club-yellow text-navy text-xs font-bold uppercase tracking-widest hover:bg-club-yellow-dark transition-colors"
              >
                All Fixtures
              </Link>
              <Link
                href="/stadium"
                className="px-6 py-3 border text-xs font-bold uppercase tracking-widest hover:border-club-yellow hover:text-club-yellow transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.7)' }}
              >
                Stadium Info
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
