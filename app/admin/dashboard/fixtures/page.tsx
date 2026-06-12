'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Pencil, Trash2, Calendar, MapPin } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Fixture {
  id: string
  opponent: string
  competition: string
  venue: string
  match_date: string
  match_time: string | null
}

const competitions = ['All', 'Super League', 'FDH Bank Cup', 'Airtel Top 8', 'Friendly']

export default function FixturesListPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeComp, setActiveComp] = useState('All')
  const [deleting, setDeleting] = useState<string | null>(null)

  const loadFixtures = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('fixtures')
      .select('*')
      .order('match_date', { ascending: true })
    if (data) setFixtures(data)
    setLoading(false)
  }

  useEffect(() => {
    loadFixtures()
  }, [])

  const handleDelete = async (id: string, opponent: string) => {
    if (!confirm(`Delete the match vs ${opponent}? This cannot be undone.`)) return
    setDeleting(id)
    const { error } = await supabase.from('fixtures').delete().eq('id', id)
    setDeleting(null)
    if (error) {
      alert('Could not delete. Please try again.')
      return
    }
    setFixtures((prev) => prev.filter((f) => f.id !== id))
  }

  const filtered = fixtures
    .filter((f) => activeComp === 'All' || f.competition === activeComp)
    .filter((f) => f.opponent.toLowerCase().includes(search.toLowerCase()))

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-white uppercase mb-1">Fixtures Manager</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Schedule and manage upcoming matches.
          </p>
        </div>
        <Link
          href="/admin/dashboard/fixtures/new"
          className="bg-club-yellow text-navy font-heading text-base uppercase px-6 py-3 flex items-center gap-2 hover:bg-white transition-colors self-start"
        >
          <Plus size={18} /> Schedule Match
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
          <p className="text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Loading fixtures...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
          <Calendar size={36} className="mx-auto mb-3 text-white" style={{ opacity: 0.15 }} />
          <p className="text-sm uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {search || activeComp !== 'All' ? 'No matching fixtures' : 'No fixtures yet'}
          </p>
          {!search && activeComp === 'All' && (
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Click "Schedule Match" to add your first one.</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((f) => (
            <div
              key={f.id}
              className="group flex flex-col sm:flex-row sm:items-center gap-4 p-5 transition-all hover:border-club-yellow"
              style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Date block */}
              <div
                className="flex flex-col items-center justify-center px-4 py-2 min-w-[90px]"
                style={{
                  background: f.venue === 'home' ? 'rgba(255,199,44,0.1)' : 'rgba(255,255,255,0.04)',
                  border: f.venue === 'home' ? '1px solid rgba(255,199,44,0.3)' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <span className="font-heading text-lg text-white leading-none">
                  {new Date(f.match_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </span>
                <span className="text-xs text-club-yellow mt-1">{f.match_time || 'TBD'}</span>
              </div>

              {/* Match info */}
              <div className="flex-1">
                <p className="font-heading text-xl text-white uppercase leading-tight">
                  {f.venue === 'home' ? 'KUFC' : f.opponent} <span style={{ opacity: 0.3 }}>vs</span> {f.venue === 'home' ? f.opponent : 'KUFC'}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="text-xs flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <MapPin size={12} /> {f.venue === 'home' ? 'Home' : 'Away'}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                  <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(0,87,184,0.15)', color: '#7eb0ff' }}>
                    {f.competition}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{formatDate(f.match_date)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/admin/dashboard/fixtures/${f.id}`}
                  className="w-9 h-9 flex items-center justify-center transition-all hover:border-club-yellow hover:text-club-yellow"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(f.id, f.opponent)}
                  disabled={deleting === f.id}
                  className="w-9 h-9 flex items-center justify-center transition-all hover:border-red-400 hover:text-red-400 cursor-pointer disabled:opacity-50"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}