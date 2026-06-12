'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Search, Pencil, Trash2, Users, UserPlus } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Player {
  id: string
  name: string
  number: number | null
  position: string
  position_label: string | null
  image_url: string | null
  appearances: number
  goals: number
  assists: number
}

const positions = ['All', 'GK', 'DEF', 'MID', 'FWD']
const posFullName: Record<string, string> = {
  All: 'All Players',
  GK: 'Goalkeepers',
  DEF: 'Defenders',
  MID: 'Midfielders',
  FWD: 'Forwards',
}

export default function PlayersListPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activePos, setActivePos] = useState('All')
  const [deleting, setDeleting] = useState<string | null>(null)

  const loadPlayers = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('players')
      .select('*')
      .order('number', { ascending: true })
    if (data) setPlayers(data)
    setLoading(false)
  }

  useEffect(() => {
    loadPlayers()
  }, [])

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove ${name} from the squad? This cannot be undone.`)) return
    setDeleting(id)
    const { error } = await supabase.from('players').delete().eq('id', id)
    setDeleting(null)
    if (error) {
      alert('Could not delete. Please try again.')
      return
    }
    setPlayers((prev) => prev.filter((p) => p.id !== id))
  }

  const filtered = players
    .filter((p) => activePos === 'All' || p.position === activePos)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-white uppercase mb-1">Squad Roster</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Manage players, photos, and season statistics.
          </p>
        </div>
        <Link
          href="/admin/dashboard/players/new"
          className="bg-club-yellow text-navy font-heading text-base uppercase px-6 py-3 flex items-center gap-2 hover:bg-white transition-colors self-start"
        >
          <Plus size={18} /> Add Player
        </Link>
      </div>

      {/* Filters + Search */}
      <div
        className="flex flex-wrap items-center gap-3 p-4"
        style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {positions.map((pos) => (
          <button
            key={pos}
            onClick={() => setActivePos(pos)}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
            style={{
              background: activePos === pos ? 'rgba(255,199,44,0.1)' : 'transparent',
              borderBottom: activePos === pos ? '2px solid #FFC72C' : '2px solid transparent',
              color: activePos === pos ? '#FFC72C' : 'rgba(255,255,255,0.5)',
            }}
          >
            {posFullName[pos]}
          </button>
        ))}

        <div className="relative ml-auto">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search player..."
            className="py-2 pl-10 pr-4 text-white outline-none focus:border-club-yellow transition-colors text-sm w-48"
            style={{ background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.1)' }}
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="p-12 text-center">
          <p className="text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Loading players...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
          <Users size={36} className="mx-auto mb-3 text-white" style={{ opacity: 0.15 }} />
          <p className="text-sm uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {search || activePos !== 'All' ? 'No matching players' : 'No players yet'}
          </p>
          {!search && activePos === 'All' && (
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Click "Add Player" to register your first one.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="group relative overflow-hidden transition-all"
              style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {/* Photo */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', background: '#0a0f1a' }}>
                {p.image_url ? (
                  <Image src={p.image_url} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Users size={40} style={{ color: 'rgba(255,255,255,0.15)' }} />
                  </div>
                )}
                {/* Number */}
                <div className="absolute top-3 right-3">
                  <span className="font-heading text-3xl text-club-yellow" style={{ opacity: 0.85 }}>
                    {p.number ?? '–'}
                  </span>
                </div>
                {/* Action overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(10,15,26,0.85)' }}
                >
                  <Link
                    href={`/admin/dashboard/players/${p.id}`}
                    className="w-36 py-2 text-center text-xs font-bold uppercase tracking-widest border border-club-yellow text-club-yellow hover:bg-club-yellow hover:text-navy transition-all"
                  >
                    Edit Details
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id, p.name)}
                    disabled={deleting === p.id}
                    className="w-36 py-2 text-center text-xs font-bold uppercase tracking-widest border border-red-400 text-red-400 hover:bg-red-400 hover:text-navy transition-all cursor-pointer disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-club-yellow mb-1">
                  {p.position_label || p.position}
                </p>
                <h3 className="font-heading text-lg text-white uppercase leading-tight">{p.name}</h3>

                <div className="flex items-center gap-4 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex-1">
                    <p className="text-xs uppercase" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>Apps</p>
                    <p className="font-heading text-lg text-white">{p.appearances}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>Goals</p>
                    <p className="font-heading text-lg text-club-yellow">{p.goals}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>Assists</p>
                    <p className="font-heading text-lg text-white">{p.assists}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add card */}
          <Link
            href="/admin/dashboard/players/new"
            className="group flex flex-col items-center justify-center p-12 cursor-pointer transition-all hover:bg-white hover:bg-opacity-5"
            style={{ background: '#1a1f2e', border: '1px dashed rgba(255,255,255,0.2)' }}
          >
            <div className="w-14 h-14 rounded-full border border-club-yellow flex items-center justify-center mb-3 text-club-yellow group-hover:bg-club-yellow group-hover:text-navy transition-all">
              <UserPlus size={26} />
            </div>
            <h3 className="font-heading text-base uppercase text-club-yellow">Add New Player</h3>
          </Link>
        </div>
      )}
    </div>
  )
}