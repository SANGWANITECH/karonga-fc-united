import { formatDate } from '@/lib/utils'
import type { Result } from '@/types'

const compAbbr: Record<string, string> = {
  'Super League': 'MSL',
  'FDH Bank Cup': 'FDH CUP',
  'Airtel Top 8': 'TOP 8',
  'Friendly': 'FRIENDLY',
}

export default function ResultCard({ result }: { result: Result }) {
  const { kuScore, opponentScore } = result
  const isHome = result.venue === 'home'

  // Outcome
  let outcome: 'WIN' | 'DRAW' | 'LOSS' = 'DRAW'
  if (kuScore > opponentScore) outcome = 'WIN'
  else if (kuScore < opponentScore) outcome = 'LOSS'

  const outcomeColor =
    outcome === 'WIN' ? '#4ade80' :
    outcome === 'DRAW' ? '#FFC72C' : '#f87171'

  const outcomeBg =
    outcome === 'WIN' ? 'rgba(34,197,94,0.12)' :
    outcome === 'DRAW' ? 'rgba(255,199,44,0.12)' : 'rgba(239,68,68,0.12)'

  // KU listed first if home, else opponent first
  const leftName = isHome ? 'KUFC' : result.opponent
  const leftScore = isHome ? kuScore : opponentScore
  const leftIsKU = isHome
  const rightName = isHome ? result.opponent : 'KUFC'
  const rightScore = isHome ? opponentScore : kuScore
  const rightIsKU = !isHome

  return (
    <div
      className="group relative overflow-hidden transition-all duration-300"
      style={{
        background: '#1a1f2e',
        border: '1px solid rgba(255,255,255,0.08)',
        borderLeft: `4px solid ${outcomeColor}`,
      }}
    >
      <div className="p-5 sm:p-6">

        {/* Top row — outcome + date */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <span
              className="text-xs font-bold uppercase tracking-widest px-2 py-1"
              style={{ background: outcomeBg, color: outcomeColor }}
            >
              {outcome}
            </span>
            <div
              className="text-xs uppercase tracking-wide mt-2 font-bold"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              {formatDate(result.date)}
            </div>
          </div>
          <span
            className="text-xs font-bold uppercase px-2 py-0.5"
            style={{
              fontSize: '9px',
              background: result.competition === 'Super League'
              ? 'rgba(255,255,255,0.08)' : '#0057B8',
            color: result.competition === 'Super League'
              ? 'rgba(255,255,255,0.6)' : '#fff',
            }}
          >
            {compAbbr[result.competition] ?? 'CUP'}
          </span>
        </div>

        {/* Score row */}
        <div className="flex items-center justify-between gap-3 mb-5">
          {/* Left team */}
          <div className="text-right flex-1">
            <div
              className="font-heading text-lg sm:text-xl uppercase leading-tight"
              style={{ color: leftIsKU ? '#FFC72C' : '#fff' }}
            >
              {leftName}
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="font-heading text-3xl sm:text-4xl text-white leading-none">
              {leftScore}
            </span>
            <span className="font-heading text-xl" style={{ color: 'rgba(255,255,255,0.25)' }}>
              —
            </span>
            <span className="font-heading text-3xl sm:text-4xl text-white leading-none">
              {rightScore}
            </span>
          </div>

          {/* Right team */}
          <div className="text-left flex-1">
            <div
              className="font-heading text-lg sm:text-xl uppercase leading-tight"
              style={{ color: rightIsKU ? '#FFC72C' : '#fff' }}
            >
              {rightName}
            </div>
          </div>
        </div>

        {/* Scorers */}
        {result.scorers && result.scorers.length > 0 && (
          <div
            className="pt-4 flex flex-wrap items-center gap-x-4 gap-y-1 justify-center"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'rgba(255,199,44,0.6)' }}
            >
              ⚽ Scorers
            </span>
            {result.scorers.map((s, i) => (
              <span
                key={i}
                className="text-xs"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {s}
              </span>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}