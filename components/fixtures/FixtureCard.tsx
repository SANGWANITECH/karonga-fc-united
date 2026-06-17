import { MapPin } from 'lucide-react'
import { formatTime } from '@/lib/utils'
import type { Fixture } from '@/types'

const compAbbr: Record<string, string> = {
 'FDH Bank Premiership': 'FDH',
  'Castel Cup': 'CASTEL',
  'FDH Bank Cup': 'FDH CUP',
  'Airtel Top 8': 'TOP 8',
  'Friendly': 'FRIENDLY',
}

export default function FixtureCard({ fixture }: { fixture: Fixture }) {
  const isHome = fixture.venue === 'home'
  const d = new Date(fixture.date)
  const day = d.getDate()
  const month = d.toLocaleDateString('en-US', { month: 'short' })
  const weekday = d.toLocaleDateString('en-US', { weekday: 'short' })

  // Karonga is always one side; opponent the other. Home = KU listed first.
  const homeTeam = isHome ? 'Karonga Utd' : fixture.opponent
  const awayTeam = isHome ? fixture.opponent : 'Karonga Utd'
  const homeIsKU = isHome
  const awayIsKU = !isHome

  return (
    <div
      className="group relative overflow-hidden transition-all duration-300"
      style={{
        background: '#1a1f2e',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Soccer ball watermark */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none select-none"
        style={{ fontSize: '140px', lineHeight: 1 }}
      >
        ⚽
      </div>

      {/* Hover border accent */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ border: '1px solid rgba(255,199,44,0.4)' }}
      />

      <div className="flex flex-col md:flex-row items-stretch relative">

        {/* ── Date block ── */}
        <div
          className="p-5 md:w-44 flex flex-row md:flex-col items-center justify-center gap-3 md:gap-0 flex-shrink-0"
          style={{
            background: isHome ? '#0057B8' : 'rgba(255,255,255,0.05)',
          }}
        >
          <span className="font-heading text-4xl md:text-5xl leading-none text-white">
            {day}
          </span>
          <div className="flex flex-col items-center">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: isHome ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)' }}
            >
              {month} · {weekday}
            </span>
            <span
              className="text-xs font-bold uppercase tracking-widest mt-1"
              style={{ color: isHome ? '#FFC72C' : 'rgba(255,255,255,0.4)' }}
            >
              {formatTime(fixture.date)}
            </span>
          </div>
        </div>

        {/* ── Match details ── */}
        <div className="flex-grow p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Teams */}
          <div className="flex items-center gap-4 sm:gap-6 flex-1 w-full md:w-auto justify-center md:justify-start">
            {/* Home team */}
            <div className="text-center md:text-right flex-1">
              <h4 className="font-heading text-lg sm:text-xl uppercase leading-tight text-white">
                {homeTeam}
              </h4>
              {homeIsKU && (
                <span className="text-xs font-bold uppercase tracking-widest text-club-yellow">
                  The Crocodiles
                </span>
              )}
            </div>

            {/* VS + competition */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <span className="font-heading text-2xl sm:text-3xl" style={{ color: 'rgba(255,255,255,0.2)' }}>
                VS
              </span>
              <span
                className="px-2 py-0.5 font-bold uppercase"
                style={{
                  fontSize: '9px',
                  background: fixture.competition === 'FDH Bank Premiership'
                    ? 'rgba(255,255,255,0.08)'
                    : '#0057B8',
                 color: fixture.competition === 'FDH Bank Premiership'
                    ? 'rgba(255,255,255,0.6)'
                    : '#fff',
                }}
              >
                {compAbbr[fixture.competition] ?? 'CUP'}
              </span>
            </div>

            {/* Away team */}
            <div className="text-center md:text-left flex-1">
              <h4 className="font-heading text-lg sm:text-xl uppercase leading-tight text-white">
                {awayTeam}
              </h4>
              {awayIsKU && (
                <span className="text-xs font-bold uppercase tracking-widest text-club-yellow">
                  The Crocodiles
                </span>
              )}
            </div>
          </div>

          {/* Venue */}
          <div className="flex flex-col items-center md:items-end gap-1 w-full md:w-auto flex-shrink-0">
            <div className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <MapPin size={13} className="flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wide text-center md:text-right">
                {fixture.stadium}
              </span>
            </div>
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 mt-1"
              style={{
                background: isHome ? 'rgba(255,199,44,0.15)' : 'rgba(255,255,255,0.05)',
                color: isHome ? '#FFC72C' : 'rgba(255,255,255,0.4)',
              }}
            >
              {isHome ? 'Home' : 'Away'}
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}