import { leagueTable } from '@/data/leagueTable'

const formColor: Record<string, string> = {
  W: '#4ade80',
  D: '#FFC72C',
  L: '#f87171',
}

export default function LeagueTable() {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <table className="w-full" style={{ minWidth: '640px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {['#', 'Club', 'P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts', 'Form'].map((h) => (
              <th
                key={h}
                className="text-xs font-bold uppercase tracking-widest py-4 px-3"
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  textAlign: h === 'Club' ? 'left' : 'center',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leagueTable.map((row) => (
            <tr
              key={row.position}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: row.isCurrentClub ? 'rgba(0,87,184,0.12)' : 'transparent',
              }}
            >
              {/* Position */}
              <td className="py-4 px-3 text-center">
                <span
                  className="font-heading text-lg"
                  style={{ color: row.isCurrentClub ? '#FFC72C' : '#fff' }}
                >
                  {row.position}
                </span>
              </td>

              {/* Club */}
              <td className="py-4 px-3">
                <span
                  className="font-heading text-base uppercase whitespace-nowrap"
                  style={{ color: row.isCurrentClub ? '#FFC72C' : '#fff' }}
                >
                  {row.club}
                </span>
              </td>

              {/* Stats */}
              {[row.played, row.won, row.drawn, row.lost, row.goalsFor, row.goalsAgainst].map((v, i) => (
                <td
                  key={i}
                  className="py-4 px-3 text-center text-sm"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  {v}
                </td>
              ))}

              {/* GD */}
              <td className="py-4 px-3 text-center text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {row.goalDifference > 0 ? '+' : ''}{row.goalDifference}
              </td>

              {/* Points */}
              <td className="py-4 px-3 text-center">
                <span className="font-heading text-lg text-white">{row.points}</span>
              </td>

              {/* Form */}
              <td className="py-4 px-3">
                <div className="flex items-center gap-1 justify-center">
                {row.form?.map((f, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 flex items-center justify-center font-bold"
                      style={{
                        fontSize: '10px',
                        background: `${formColor[f]}22`,
                        color: formColor[f],
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}