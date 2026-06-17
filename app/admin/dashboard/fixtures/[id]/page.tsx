'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2, ArrowLeft, Shield, Trophy } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const competitions = ['FDH Bank Premiership', 'Castel Cup', 'FDH Bank Cup', 'Airtel Top 8', 'Friendly']

export default function FixtureEditorPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const isNew = id === 'new'

  const [opponent, setOpponent] = useState('')
  const [competition, setCompetition] = useState(competitions[0])
  const [venue, setVenue] = useState('home')
  const [matchDate, setMatchDate] = useState('')
  const [matchTime, setMatchTime] = useState('15:00')

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isNew) return
    const load = async () => {
      const { data, error } = await supabase.from('fixtures').select('*').eq('id', id).single()
      if (error || !data) {
        setError('Could not load this fixture.')
        setLoading(false)
        return
      }
      setOpponent(data.opponent)
      setCompetition(data.competition)
      setVenue(data.venue)
      setMatchDate(data.match_date)
      setMatchTime(data.match_time || '15:00')
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
        match_time: matchTime,
        status: 'upcoming',
      }

      if (isNew) {
        const { error } = await supabase.from('fixtures').insert(record)
        if (error) throw error
      } else {
        const { error } = await supabase.from('fixtures').update(record).eq('id', id)
        if (error) throw error
      }

      router.push('/admin/dashboard/fixtures')
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
        href="/admin/dashboard/fixtures"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-club-yellow transition-colors"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        <ArrowLeft size={14} /> Back to Fixtures
      </Link>

      {/* Header */}
      <h1 className="font-heading text-3xl text-club-yellow uppercase">
        {isNew ? 'Schedule Match' : 'Edit Match'}
      </h1>

      <div className="p-6 relative" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute top-0 left-0 w-full" style={{ height: '2px', background: '#FFC72C' }} />

        <div className="space-y-6">
          {/* Opponent + Competition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Opponent Team</label>
              <div className="relative">
                <Shield size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                <input
                  type="text"
                  value={opponent}
                  onChange={(e) => setOpponent(e.target.value)}
                  placeholder="e.g. Nyasa Big Bullets"
                  className="w-full py-3 pl-11 pr-4 text-white outline-none focus:border-club-yellow transition-colors"
                  style={inputStyle}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Competition</label>
              <div className="relative">
                <Trophy size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                <select
                  value={competition}
                  onChange={(e) => setCompetition(e.target.value)}
                  className="w-full py-3 pl-11 pr-4 text-white outline-none focus:border-club-yellow transition-colors"
                  style={inputStyle}
                >
                  {competitions.map((c) => (
                    <option key={c} value={c} style={{ background: '#1a1f2e' }}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Match Date</label>
              <input
                type="date"
                value={matchDate}
                onChange={(e) => setMatchDate(e.target.value)}
                className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Kick-off Time</label>
              <input
                type="time"
                value={matchTime}
                onChange={(e) => setMatchTime(e.target.value)}
                className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Venue — Home / Away */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={labelStyle}>Venue</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setVenue('home')}
                className="p-4 text-left transition-all cursor-pointer"
                style={{
                  background: venue === 'home' ? 'rgba(255,199,44,0.1)' : '#0a0f1a',
                  border: venue === 'home' ? '1px solid #FFC72C' : '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-lg text-white uppercase">Home</span>
                  {venue === 'home' && <span className="text-club-yellow text-xs font-bold uppercase">Selected</span>}
                </div>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Karonga Stadium</p>
              </button>

              <button
                type="button"
                onClick={() => setVenue('away')}
                className="p-4 text-left transition-all cursor-pointer"
                style={{
                  background: venue === 'away' ? 'rgba(255,199,44,0.1)' : '#0a0f1a',
                  border: venue === 'away' ? '1px solid #FFC72C' : '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-lg text-white uppercase">Away</span>
                  {venue === 'away' && <span className="text-club-yellow text-xs font-bold uppercase">Selected</span>}
                </div>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Opponent's ground</p>
              </button>
            </div>
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
        <Link href="/admin/dashboard/fixtures" className="px-8 py-3 font-heading uppercase tracking-wide text-white hover:text-club-yellow transition-colors">
          Cancel
        </Link>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-10 py-3 bg-club-yellow text-navy font-heading uppercase tracking-wide hover:bg-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {saving ? (<><Loader2 size={16} className="animate-spin" /> Saving...</>) : 'Save Match'}
        </button>
      </div>
    </div>
  )
}