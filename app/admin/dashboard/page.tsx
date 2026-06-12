'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, Newspaper, Calendar, Trophy, PlusCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const quickActions = [
  { label: 'Add News', href: '/admin/dashboard/news/new' },
  { label: 'Add Result', href: '/admin/dashboard/results/new' },
  { label: 'Add Player', href: '/admin/dashboard/players/new' },
]

interface Stats {
  players: number
  news: number
  upcoming: number
  latestResult: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    const load = async () => {
      const today = new Date().toISOString().split('T')[0]

      // Run all counts in parallel
      const [playersRes, newsRes, fixturesRes, resultsRes] = await Promise.all([
        supabase.from('players').select('id', { count: 'exact', head: true }),
        supabase.from('news').select('id', { count: 'exact', head: true }),
        supabase.from('fixtures').select('id', { count: 'exact', head: true }).gte('match_date', today),
        supabase.from('results').select('our_score, their_score, match_date').order('match_date', { ascending: false }).limit(1),
      ])

      // Build latest result label (e.g. "2-1 W")
      let latestResult = '—'
      if (resultsRes.data && resultsRes.data.length > 0) {
        const r = resultsRes.data[0]
        const outcome = r.our_score > r.their_score ? 'W' : r.our_score < r.their_score ? 'L' : 'D'
        latestResult = `${r.our_score}-${r.their_score} ${outcome}`
      }

      setStats({
        players: playersRes.count ?? 0,
        news: newsRes.count ?? 0,
        upcoming: fixturesRes.count ?? 0,
        latestResult,
      })
    }
    load()
  }, [])

  const statCards = [
    { label: 'Total Players', value: stats ? String(stats.players) : '—', icon: Users },
    { label: 'News Articles', value: stats ? String(stats.news) : '—', icon: Newspaper },
    { label: 'Upcoming Matches', value: stats ? String(stats.upcoming) : '—', icon: Calendar },
    { label: 'Latest Result', value: stats ? stats.latestResult : '—', icon: Trophy },
  ]

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <div className="pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="text-xs font-bold uppercase tracking-widest text-club-yellow block mb-2">
          Administration Dashboard
        </span>
        <h1 className="font-heading text-4xl text-white uppercase leading-none mb-2">
          Welcome Back
        </h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Manage your club's content from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              className="p-6 relative overflow-hidden"
              style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <Icon size={22} className="text-club-yellow mb-4" />
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {s.label}
              </p>
              <p className="font-heading text-4xl text-white">{s.value}</p>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-heading text-2xl text-white uppercase mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="flex items-center justify-between px-5 py-4 transition-all hover:bg-white hover:bg-opacity-5"
              style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="font-heading text-lg text-white uppercase">{a.label}</span>
              <PlusCircle size={20} className="text-club-yellow" />
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}