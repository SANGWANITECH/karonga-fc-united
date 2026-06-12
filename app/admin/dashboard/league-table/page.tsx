'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Pencil, Trash2, ListOrdered } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Row {
  id: string
  club: string
  played: number
  won: number
  drawn: number
  lost: number
  goals_for: number
  goals_against: number
  points: number
  is_current_club: boolean
}

// Sort by points, then goal difference, then goals scored
function sortTable(rows: Row[]): Row[] {
  return [...rows].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    const gdA = a.goals_for - a.goals_against
    const gdB = b.goals_for - b.goals_against
    if (gdB !== gdA) return gdB - gdA
    return b.goals_for - a.goals_for
  })
}

export default function LeagueTableListPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  const loadRows = async () => {
    setLoading(true)
    const { data } = await supabase.from('league_table').select('*')
    if (data) setRows(sortTable(data))
    setLoading(false)
  }

  useEffect(() => {
    loadRows()
  }, [])

  const handleDelete = async (id: string, club: string) => {
    if (!confirm(`Remove ${club} from the table? This cannot be undone.`)) return
    setDeleting(id)
    const { error } = await supabase.from('league_table').delete().eq('id', id)
    setDeleting(null)
    if (error) {
      alert('Could not delete. Please try again.')
      return
    }
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  // Filter for display, but keep the true position from the full sorted list
  const visible = rows
    .map((r, i) => ({ ...r, position: i + 1 }))
    .filter((r) => r.club.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-white uppercase mb-1">League Table</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Standings sort automatically by points, goal difference, then goals.
          </p>
        </div>
        <Link
          href="/admin/dashboard/league-table/new"
          className="bg-club-yellow text-navy font-heading text-base uppercase px-6 py-3 flex items-center gap-2 hover:bg-white transition-colors self-start"
        >
          <Plus size={18} /> Add Club
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center p-4" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="relative ml-auto">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find club..."
            className="py-2 pl-10 pr-4 text-white outline-none focus:border-club-yellow transition-colors text-sm w-56"
            style={{ background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.1)' }}
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="p-12 text-center">
          <p className="text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Loading table...</p>
        </div>
      ) : visible.length === 0 ? (
        <div className="p-12 text-center" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
          <ListOrdered size={36} className="mx-auto mb-3 text-white" style={{ opacity: 0.15 }} />
          <p className="text-sm uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {search ? 'No matching clubs' : 'No clubs added yet'}
          </p>
          {!search && (
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Click "Add Club" to build the standings.</p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr style={{ background: 'rgba(0,87,184,0.15)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Pos</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Club</th>
                <th className="px-3 py-3 text-xs font-bold uppercase tracking-widest text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>P</th>
                <th className="px-3 py-3 text-xs font-bold uppercase tracking-widest text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>W</th>
                <th className="px-3 py-3 text-xs font-bold uppercase tracking-widest text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>D</th>
                <th className="px-3 py-3 text-xs font-bold uppercase tracking-widest text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>L</th>
                <th className="px-3 py-3 text-xs font-bold uppercase tracking-widest text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>GD</th>
                <th className="px-3 py-3 text-xs font-bold uppercase tracking-widest text-center text-club-yellow">Pts</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-right" style={{ color: 'rgba(255,255,255,0.4)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr
                  key={r.id}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: r.is_current_club ? 'rgba(255,199,44,0.06)' : 'transparent',
                    borderLeft: r.is_current_club ? '3px solid #FFC72C' : '3px solid transparent',
                  }}
                >
                  <td className="px-4 py-3">
                    <span className="font-heading text-lg" style={{ color: r.is_current_club ? '#FFC72C' : '#fff' }}>
                      {String(r.position).padStart(2, '0')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-heading text-base uppercase" style={{ color: r.is_current_club ? '#FFC72C' : '#fff' }}>
                      {r.club}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center text-white">{r.played}</td>
                  <td className="px-3 py-3 text-center text-white">{r.won}</td>
                  <td className="px-3 py-3 text-center text-white">{r.drawn}</td>
                  <td className="px-3 py-3 text-center text-white">{r.lost}</td>
                  <td className="px-3 py-3 text-center" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {r.goals_for - r.goals_against > 0 ? '+' : ''}{r.goals_for - r.goals_against}
                  </td>
                  <td className="px-3 py-3 text-center font-heading text-lg text-club-yellow">{r.points}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <Link
                        href={`/admin/dashboard/league-table/${r.id}`}
                        className="w-8 h-8 flex items-center justify-center transition-all hover:border-club-yellow hover:text-club-yellow"
                        style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                      >
                        <Pencil size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(r.id, r.club)}
                        disabled={deleting === r.id}
                        className="w-8 h-8 flex items-center justify-center transition-all hover:border-red-400 hover:text-red-400 cursor-pointer disabled:opacity-50"
                        style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}