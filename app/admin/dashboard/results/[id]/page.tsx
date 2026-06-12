'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2, ArrowLeft, Info, Activity } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const competitions = ['Super League', 'FDH Bank Cup', 'Airtel Top 8', 'Friendly']

export default function ResultEditorPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const isNew = id === 'new'

  const [opponent, setOpponent] = useState('')
  const [competition, setCompetition] = useState(competitions[0])
  const [venue, setVenue] = useState('home')
  const [matchDate, setMatchDate] = useState('')
  const [ourScore, setOurScore] = useState('0')
  const [theirScore, setTheirScore] = useState('0')
  const [scorers, setScorers] = useState('')

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isNew) return
    const load = async () => {
      const { data, error } = await supabase.from('results').select('*').eq('id', id).single()
      if (error || !data) {
        setError('Could not load this result.')
        setLoading(false)
        return
      }
      setOpponent(data.opponent)
      setCompetition(data.competition)
      setVenue(data.venue)
      setMatchDate(data.match_date)
      setOurScore(data.our_score.toString())
      setTheirScore(data.their_score.toString())
      setScorers(data.scorers || '')
      setLoading(false)
    }
    load()
  }, [id, isNew])

  const handleSave = async () => {
    setError('')
    if (!opponent.trim()) {
      setError('Please enter the opponent name.')
      return
    }
    if (!matchDate) {
      setError('Please select a match date.')
      return
    }

    setSaving(true)
    try {
      const record = {
        opponent: opponent.trim(),
        competition,
        venue,
        match_date: matchDate,
        our_score: parseInt(ourScore) || 0,
        their_score: parseInt(theirScore) || 0,
        scorers: scorers.trim(),
      }

      if (isNew) {
        const { error } = await supabase.from('results').insert(record)
        if (error) throw error
      } else {
        const { error } = await supabase.from('results').update(record).eq('id', id)
        if (error) throw error
      }

      router.push('/admin/dashboard/results')
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

  // Live W/D/L preview
  const us = parseInt(ourScore) || 0
  const them = parseInt(theirScore) || 0
  const resultLabel = us > them ? 'WIN' : us < them ? 'LOSS' : 'DRAW'
  const resultColor = us > them ? '#4ade80' : us < them ? '#f87171' : '#fbbf24'

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Back */}
      <Link
        href="/admin/dashboard/results"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-club-yellow transition-colors"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        <ArrowLeft size={14} /> Back to Results
      </Link>

      {/* Header */}
      <h1 className="font-heading text-3xl text-club-yellow uppercase">
        {isNew ? 'Post New Result' : 'Edit Result'}
      </h1>

      {/* Match Info */}
      <div className="p-6 relative" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute top-0 left-0 w-full" style={{ height: '2px', background: '#FFC72C' }} />
        <div className="flex items-center gap-2 mb-6">
          <Info size={16} className="text-club-yellow" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-club-yellow">Match Info</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Match Date</label>
            <input type="date" value={matchDate} onChange={(e) => setMatchDate(e.target.value)}
              className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Competition</label>
            <select value={competition} onChange={(e) => setCompetition(e.target.value)}
              className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors" style={inputStyle}>
              {competitions.map((c) => (
                <option key={c} value={c} style={{ background: '#1a1f2e' }}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Venue</label>
            <select value={venue} onChange={(e) => setVenue(e.target.value)}
              className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors" style={inputStyle}>
              <option value="home" style={{ background: '#1a1f2e' }}>Home</option>
              <option value="away" style={{ background: '#1a1f2e' }}>Away</option>
            </select>
          </div>
        </div>
      </div>

      {/* Scoreline */}
      <div className="p-6 relative" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute top-0 left-0 w-full" style={{ height: '2px', background: '#FFC72C' }} />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-club-yellow" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-club-yellow">Scoreline</h2>
          </div>
          {/* Live result preview */}
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: resultColor }}>
            {resultLabel}
          </span>
        </div>

        <div className="flex items-end gap-6">
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-center" style={labelStyle}>KUFC Goals</label>
            <input type="number" min="0" value={ourScore} onChange={(e) => setOurScore(e.target.value)}
              className="w-full text-center py-4 text-white outline-none focus:border-club-yellow transition-colors font-heading text-3xl" style={inputStyle} />
          </div>
          <div className="pb-4">
            <span className="font-heading text-3xl" style={{ color: 'rgba(255,255,255,0.3)' }}>:</span>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-center" style={labelStyle}>Opponent Goals</label>
            <input type="number" min="0" value={theirScore} onChange={(e) => setTheirScore(e.target.value)}
              className="w-full text-center py-4 text-white outline-none focus:border-club-yellow transition-colors font-heading text-3xl" style={inputStyle} />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Opponent Team</label>
          <input type="text" value={opponent} onChange={(e) => setOpponent(e.target.value)} placeholder="e.g. Nyasa Big Bullets"
            className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors" style={inputStyle} />
        </div>
      </div>

      {/* Scorers */}
      <div className="p-6 relative" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute top-0 left-0 w-full" style={{ height: '2px', background: '#FFC72C' }} />
        <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Goalscorers (optional)</label>
        <textarea
          value={scorers}
          onChange={(e) => setScorers(e.target.value)}
          rows={2}
          placeholder="e.g. Mwaungulu 23', Idana 67', Chirwa 81'"
          className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors resize-none"
          style={inputStyle}
        />
        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Separate scorers with commas.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm px-4 py-3" style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff9b9b' }}>
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        <Link href="/admin/dashboard/results" className="px-8 py-3 font-heading uppercase tracking-wide text-white hover:text-club-yellow transition-colors">
          Cancel
        </Link>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-10 py-3 bg-club-yellow text-navy font-heading uppercase tracking-wide hover:bg-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {saving ? (<><Loader2 size={16} className="animate-spin" /> Saving...</>) : 'Save Result'}
        </button>
      </div>
    </div>
  )
}