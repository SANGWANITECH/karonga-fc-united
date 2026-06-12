'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2, ArrowLeft, Shield } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function LeagueTableEditorPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const isNew = id === 'new'

  const [club, setClub] = useState('')
  const [won, setWon] = useState('0')
  const [drawn, setDrawn] = useState('0')
  const [lost, setLost] = useState('0')
  const [goalsFor, setGoalsFor] = useState('0')
  const [goalsAgainst, setGoalsAgainst] = useState('0')
  const [isCurrentClub, setIsCurrentClub] = useState(false)

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isNew) return
    const load = async () => {
      const { data, error } = await supabase.from('league_table').select('*').eq('id', id).single()
      if (error || !data) {
        setError('Could not load this club.')
        setLoading(false)
        return
      }
      setClub(data.club)
      setWon(data.won.toString())
      setDrawn(data.drawn.toString())
      setLost(data.lost.toString())
      setGoalsFor(data.goals_for.toString())
      setGoalsAgainst(data.goals_against.toString())
      setIsCurrentClub(data.is_current_club)
      setLoading(false)
    }
    load()
  }, [id, isNew])

  // Auto-calculated values
  const w = parseInt(won) || 0
  const d = parseInt(drawn) || 0
  const l = parseInt(lost) || 0
  const gf = parseInt(goalsFor) || 0
  const ga = parseInt(goalsAgainst) || 0
  const played = w + d + l
  const points = w * 3 + d
  const gd = gf - ga

  const handleSave = async () => {
    setError('')
    if (!club.trim()) {
      setError('Please enter the club name.')
      return
    }

    setSaving(true)
    try {
      const record = {
        club: club.trim(),
        played,
        won: w,
        drawn: d,
        lost: l,
        goals_for: gf,
        goals_against: ga,
        points,
        is_current_club: isCurrentClub,
      }

      if (isNew) {
        const { error } = await supabase.from('league_table').insert(record)
        if (error) throw error
      } else {
        const { error } = await supabase.from('league_table').update(record).eq('id', id)
        if (error) throw error
      }

      router.push('/admin/dashboard/league-table')
    } catch (err) {
      console.error(err)
      setError('Something went wrong while saving. Please try again.')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-12 text-center">
        <p className="text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Loading...</p>
      </div>
    )
  }

  const inputStyle = { background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.12)' }
  const labelStyle = { color: 'rgba(255,255,255,0.6)' }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Back */}
      <Link
        href="/admin/dashboard/league-table"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-club-yellow transition-colors"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        <ArrowLeft size={14} /> Back to Table
      </Link>

      {/* Header */}
      <h1 className="font-heading text-3xl text-club-yellow uppercase">
        {isNew ? 'Add Club' : 'Edit Club'}
      </h1>

      {/* Identity */}
      <div className="p-6 relative" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute top-0 left-0 w-full" style={{ height: '2px', background: '#FFC72C' }} />
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Club Name</label>
          <div className="relative">
            <Shield size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
            <input type="text" value={club} onChange={(e) => setClub(e.target.value)} placeholder="e.g. Silver Strikers"
              className="w-full py-3 pl-11 pr-4 text-white outline-none focus:border-club-yellow transition-colors" style={inputStyle} />
          </div>
        </div>

        {/* Is this Karonga? */}
        <label className="flex items-center gap-3 mt-5 cursor-pointer">
          <input type="checkbox" checked={isCurrentClub} onChange={(e) => setIsCurrentClub(e.target.checked)} className="w-4 h-4 accent-club-yellow" />
          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>This is Karonga United (highlight this row)</span>
        </label>

        <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Position is worked out automatically from points, goal difference, and goals scored.
        </p>
      </div>

      {/* Auto-calculated summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 text-center" style={{ background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Played</p>
          <p className="font-heading text-3xl text-white">{played}</p>
        </div>
        <div className="p-4 text-center" style={{ background: 'rgba(255,199,44,0.08)', border: '1px solid rgba(255,199,44,0.2)' }}>
          <p className="text-xs uppercase tracking-widest mb-1 text-club-yellow">Points</p>
          <p className="font-heading text-3xl text-club-yellow">{points}</p>
        </div>
        <div className="p-4 text-center" style={{ background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Goal Diff</p>
          <p className="font-heading text-3xl text-white">{gd > 0 ? '+' : ''}{gd}</p>
        </div>
      </div>

      {/* Stats inputs */}
      <div className="p-6 relative" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute top-0 left-0 w-full" style={{ height: '2px', background: '#FFC72C' }} />
        <h2 className="text-xs font-bold uppercase tracking-widest text-club-yellow mb-6">Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Wins</label>
            <input type="number" min="0" value={won} onChange={(e) => setWon(e.target.value)}
              className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors font-heading text-xl" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Draws</label>
            <input type="number" min="0" value={drawn} onChange={(e) => setDrawn(e.target.value)}
              className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors font-heading text-xl" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Losses</label>
            <input type="number" min="0" value={lost} onChange={(e) => setLost(e.target.value)}
              className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors font-heading text-xl" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Goals For</label>
            <input type="number" min="0" value={goalsFor} onChange={(e) => setGoalsFor(e.target.value)}
              className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors font-heading text-xl" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Goals Against</label>
            <input type="number" min="0" value={goalsAgainst} onChange={(e) => setGoalsAgainst(e.target.value)}
              className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors font-heading text-xl" style={inputStyle} />
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm px-4 py-3" style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff9b9b' }}>
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        <Link href="/admin/dashboard/league-table" className="px-8 py-3 font-heading uppercase tracking-wide text-white hover:text-club-yellow transition-colors">
          Cancel
        </Link>
        <button onClick={handleSave} disabled={saving}
          className="px-10 py-3 bg-club-yellow text-navy font-heading uppercase tracking-wide hover:bg-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-70">
          {saving ? (<><Loader2 size={16} className="animate-spin" /> Saving...</>) : 'Save Club'}
        </button>
      </div>
    </div>
  )
}