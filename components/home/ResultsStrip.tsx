import { results } from '@/data/results'
import { fixtures } from '@/data/fixtures'
import { leagueTable } from '@/data/leagueTable'
import { formatShortDate } from '@/lib/utils'

function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

export default function ResultsStrip() {
  const lastResult = results[0]
  const nextMatch = fixtures.find((f) => f.status === 'upcoming')
  const clubRow = leagueTable.find((r) => r.isCurrentClub)

  const resultLabel =
    lastResult.kuScore > lastResult.opponentScore
      ? 'W'
      : lastResult.kuScore < lastResult.opponentScore
      ? 'L'
      : 'D'

  const resultColor =
    resultLabel === 'W'
      ? '#4ade80'
      : resultLabel === 'L'
      ? '#f87171'
      : 'rgba(255,255,255,0.6)'

  return (
    <div
      className="w-full"
      style={{ background: '#0a0f1a', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white divide-opacity-5">

          {/* Last Result */}
          <div className="flex items-center gap-6 py-5 md:pr-8">
            <div
              className="w-1 h-12 flex-shrink-0"
              style={{ background: resultColor }}
            />
            <div>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Last Result · {lastResult.competition}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  KUFC
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-heading text-3xl text-club-yellow leading-none">
                    {lastResult.kuScore}
                  </span>
                  <span
                    className="font-heading text-xl leading-none"
                    style={{ color: 'rgba(255,255,255,0.2)' }}
                  >
                    —
                  </span>
                  <span className="font-heading text-3xl text-white leading-none">
                    {lastResult.opponentScore}
                  </span>
                </div>
                <span className="text-sm font-bold text-white uppercase tracking-wide"
                  style={{ opacity: 0.7 }}>
                  {lastResult.opponent}
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5"
                  style={{
                    background: resultLabel === 'W'
                      ? 'rgba(34,197,94,0.15)'
                      : resultLabel === 'L'
                      ? 'rgba(239,68,68,0.15)'
                      : 'rgba(255,255,255,0.08)',
                    color: resultColor,
                  }}
                >
                  {resultLabel}
                </span>
              </div>
            </div>
          </div>

          {/* League Position */}
          {clubRow && (
            <div className="flex items-center gap-6 py-5 md:px-8">
              <div
                className="w-1 h-12 flex-shrink-0 bg-club-blue"
              />
              <div>
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  League Standing
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-4xl text-club-yellow leading-none">
                    {clubRow.position}{getOrdinal(clubRow.position)}
                  </span>
                  <span
                    className="text-xs uppercase tracking-widest font-bold"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    Played {clubRow.played} · {clubRow.points} Pts
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Next Fixture */}
          {nextMatch && (
            <div className="flex items-center gap-6 py-5 md:pl-8">
              <div
                className="w-1 h-12 flex-shrink-0 bg-club-yellow"
              />
              <div className="flex-1">
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  Next Match · {nextMatch.competition}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-white uppercase tracking-wide">
                      vs {nextMatch.opponent}
                    </span>
                    <div
                      className="text-xs mt-0.5 uppercase tracking-widest"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                    >
                      {nextMatch.stadium}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-club-yellow font-bold text-sm">
                      {formatShortDate(nextMatch.date)}
                    </div>
                    <span
                      className="text-xs font-bold uppercase px-2 py-0.5 mt-1 inline-block"
                      style={{
                        background: nextMatch.venue === 'home'
                          ? 'rgba(255,199,44,0.15)'
                          : 'rgba(255,255,255,0.08)',
                        color: nextMatch.venue === 'home'
                          ? '#FFC72C'
                          : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {nextMatch.venue === 'home' ? 'HOME' : 'AWAY'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}