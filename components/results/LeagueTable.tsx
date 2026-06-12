'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Row {
  id: string
  club: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
  isCurrentClub: boolean
  position: number
}

function sortAndNumber(rows: any[]): Row[] {
  const sorted = [...rows].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    const gdA = a.goals_for - a.goals_against
    const gdB = b.goals_for - b.goals_against
    if (gdB !== gdA) return gdB - gdA
    return b.goals_for - a.goals_for
  })
  return sorted.map((r, i) => ({
    id: r.id,
    club: r.club,
    played: r.played,
    won: r.won,
    drawn: r.drawn,
    lost: r.lost,
    goalsFor: r.goals_for,
    goalsAgainst: r.goals_against,
    points: r.points,
    isCurrentClub: r.is_current_club,
    position: i + 1,
  }))
}

export default function LeagueTable() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('league_table').select('*')
      if (data) setRows(sortAndNumber(data))
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Loading table...</p>
      </div>
    )
  }

  if (rows.length === 0) {
    return (
      <div className="py-12 text-center" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Standings coming soon</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <table className="w-full" style={{ minWidth: '600px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {['#', 'Club', 'P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts'].map((h) => (
              <th
                key={h}
                className="text-xs font-bold uppercase tracking-widest py-4 px-3"
                style={{ color: 'rgba(255,255,255,0.4)', textAlign: h === 'Club' ? 'left' : 'center' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: row.isCurrentClub ? 'rgba(0,87,184,0.12)' : 'transparent',
              }}
            >
              <td className="py-4 px-3 text-center">
                <span className="font-heading text-lg" style={{ color: row.isCurrentClub ? '#FFC72C' : '#fff' }}>
                  {row.position}
                </span>
              </td>
              <td className="py-4 px-3">
                <span
                  className="font-heading text-base uppercase whitespace-nowrap"
                  style={{ color: row.isCurrentClub ? '#FFC72C' : '#fff' }}
                >
                  {row.club}
                </span>
              </td>
              {[row.played, row.won, row.drawn, row.lost, row.goalsFor, row.goalsAgainst].map((v, i) => (
                <td key={i} className="py-4 px-3 text-center text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {v}
                </td>
              ))}
              <td className="py-4 px-3 text-center text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {row.goalsFor - row.goalsAgainst > 0 ? '+' : ''}{row.goalsFor - row.goalsAgainst}
              </td>
              <td className="py-4 px-3 text-center">
                <span className="font-heading text-lg text-white">{row.points}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}