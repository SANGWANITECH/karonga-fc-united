'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Pencil, Trash2, Trophy } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Result {
  id: string
  opponent: string
  competition: string
  venue: string
  match_date: string
  our_score: number
  their_score: number
}

const competitions = ['All', 'Super League', 'FDH Bank Cup', 'Airtel Top 8', 'Friendly']

// Work out W / D / L from Karonga's perspective
function outcome(our: number, their: number) {
  if (our > their) return { letter: 'W', color: '#4ade80', bg: 'rgba(34,197,94,0.15)' }
  if (our < their) return { letter: 'L', color: '#f87171', bg: 'rgba(239,68,68,0.15)' }
  return { letter: 'D', color: '#fbbf24', bg: 'rgba(255,199,44,0.15)' }
}

export default function ResultsListPage() {
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeComp, setActiveComp] = useState('All')
  const [deleting, setDeleting] = useState<string | null>(null)

  const loadResults = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('results')
      .select('*')
      .order('match_date', { ascending: false })
    if (data) setResults(data)
    setLoading(false)
  }

  useEffect(() => {
    loadResults()
  }, [])

  const handleDelete = async (id: string, opponent: string) => {
    if (!confirm(`Delete the result vs ${opponent}? This cannot be undone.`)) return
    setDeleting(id)
    const { error } = await supabase.from('results').delete().eq('id', id)
    setDeleting(null)
    if (error) {
      alert('Could not delete. Please try again.')
      return
    }
    setResults((prev) => prev.filter((r) => r.id !== id))
  }

  const filtered = results
    .filter((r) => activeComp === 'All' || r.competition === activeComp)
    .filter((r) => r.opponent.toLowerCase().includes(search.toLowerCase()))

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-white uppercase mb-1">Results Manager</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Post and manage match results.
          </p>
        </div>
        <Link
          href="/admin/dashboard/results/new"
          className="bg-club-yellow text-navy font-heading text-base uppercase px-6 py-3 flex items-center gap-2 hover:bg-white transition-colors self-start"
        >
          <Plus size={18} /> Post New Result
        </Link>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-wrap items-center gap-3 p-4" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
        {competitions.map((comp) => (
          <button
            key={comp}
            onClick={() => setActiveComp(comp)}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
            style={{
              background: activeComp === comp ? '#FFC72C' : 'transparent',
              color: activeComp === comp ? '#0F172A' : 'rgba(255,255,255,0.5)',
              border: activeComp === comp ? '1px solid #FFC72C' : '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {comp}
          </button>
        ))}
        <div className="relative ml-auto">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search opponent..."
            className="py-2 pl-10 pr-4 text-white outline-none focus:border-club-yellow transition-colors text-sm w-48"
            style={{ background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.1)' }}
          />
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="p-12 text-center">
          <p className="text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Loading results...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
          <Trophy size={36} className="mx-auto mb-3 text-white" style={{ opacity: 0.15 }} />
          <p className="text-sm uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {search || activeComp !== 'All' ? 'No matching results' : 'No results yet'}
          </p>
          {!search && activeComp === 'All' && (
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Click "Post New Result" to add your first one.</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => {
            const o = outcome(r.our_score, r.their_score)
            return (
              <div
                key={r.id}
                className="group flex flex-col sm:flex-row sm:items-center gap-4 p-5 transition-all hover:border-club-yellow"
                style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {/* W/D/L badge */}
                <div
                  className="w-10 h-10 flex items-center justify-center font-heading text-lg flex-shrink-0"
                  style={{ background: o.bg, color: o.color }}
                >
                  {o.letter}
                </div>

                {/* Match info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-heading text-xl text-white uppercase leading-tight">
                      {r.venue === 'home' ? 'KUFC' : r.opponent}
                      <span className="text-club-yellow mx-2">{r.our_score >= 0 && r.venue === 'home' ? r.our_score : r.their_score}–{r.venue === 'home' ? r.their_score : r.our_score}</span>
                      {r.venue === 'home' ? r.opponent : 'KUFC'}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(0,87,184,0.15)', color: '#7eb0ff' }}>
                      {r.competition}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{r.venue === 'home' ? 'Home' : 'Away'}</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{formatDate(r.match_date)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/admin/dashboard/results/${r.id}`}
                    className="w-9 h-9 flex items-center justify-center transition-all hover:border-club-yellow hover:text-club-yellow"
                    style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(r.id, r.opponent)}
                    disabled={deleting === r.id}
                    className="w-9 h-9 flex items-center justify-center transition-all hover:border-red-400 hover:text-red-400 cursor-pointer disabled:opacity-50"
                    style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}