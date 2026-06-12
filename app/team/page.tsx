'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { staff, boardMembers } from '@/data/staff'
import PlayerCard from '@/components/team/PlayerCard'
import { supabase } from '@/lib/supabase'

type FullPosition = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward'
type Filter = 'All' | FullPosition

const filters: Filter[] = ['All', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward']

const positionGroups: { position: FullPosition; label: string }[] = [
  { position: 'Goalkeeper', label: 'Goalkeepers' },
  { position: 'Defender', label: 'Defenders' },
  { position: 'Midfielder', label: 'Midfielders' },
  { position: 'Forward', label: 'Forwards' },
]

const codeToFull: Record<string, FullPosition> = {
  GK: 'Goalkeeper',
  DEF: 'Defender',
  MID: 'Midfielder',
  FWD: 'Forward',
}

interface PlayerShape {
  id: string
  name: string
  number: number
  position: FullPosition
  positionLabel: string
  image: string
  stats: {
    appearances: number
    goals?: number
    assists?: number
  }
}

// Photo for the lightbox
interface LightboxPhoto {
  image: string
  name: string
  role: string
}

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const [players, setPlayers] = useState<PlayerShape[]>([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState<LightboxPhoto | null>(null)
  const headCoach = staff[0]

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('players')
        .select('*')
        .order('number', { ascending: true })

      if (data) {
        const mapped: PlayerShape[] = data.map((p) => ({
          id: p.id,
          name: p.name,
          number: p.number ?? 0,
          position: codeToFull[p.position] ?? 'Midfielder',
          positionLabel: p.position_label || codeToFull[p.position] || p.position,
          image: p.image_url || '',
          stats: {
            appearances: p.appearances ?? 0,
            goals: p.goals ?? 0,
            assists: p.assists ?? 0,
          },
        }))
        setPlayers(mapped)
      }
      setLoading(false)
    }
    load()
  }, [])

  // Lightbox: scroll lock + escape to close
  useEffect(() => {
    if (!lightbox) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  const filteredPlayers = activeFilter === 'All'
    ? players
    : players.filter((p) => p.position === activeFilter)

  return (
    <main style={{ background: '#0a0f1a' }}>

      {/* ── Page Hero ── */}
      <section className="relative h-72 sm:h-80 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1800&q=85"
            alt="Team"
            fill
            className="object-cover object-top"
            style={{ filter: 'grayscale(30%)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(10,15,26,1) 0%, rgba(10,15,26,0.7) 50%, rgba(10,15,26,0.3) 100%)' }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 w-full">
          <div className="pl-6" style={{ borderLeft: '4px solid #FFC72C' }}>
            <h1 className="font-heading text-4xl sm:text-6xl text-white uppercase leading-none">
              First Team <span className="text-club-yellow">Roster</span>
            </h1>
            <p className="text-sm sm:text-base mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              The Crocodiles of Karonga · Season 2026
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* ── Position Filter Tabs ── */}
        <div className="flex flex-wrap gap-2 mb-14 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer"
              style={{
                background: activeFilter === f ? '#FFC72C' : 'rgba(255,255,255,0.05)',
                color: activeFilter === f ? '#0F172A' : 'rgba(255,255,255,0.5)',
                border: activeFilter === f ? '1px solid #FFC72C' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {f === 'All' ? `All Players (${players.length})` : f}
            </button>
          ))}
        </div>

        {/* ── Players ── */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-white uppercase tracking-widest text-sm" style={{ opacity: 0.4 }}>Loading squad...</p>
          </div>
        ) : players.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white uppercase tracking-widest" style={{ opacity: 0.4 }}>Squad coming soon</p>
          </div>
        ) : activeFilter === 'All' ? (
          <div className="space-y-16">
            {positionGroups.map(({ position, label }) => {
              const group = players.filter((p) => p.position === position)
              if (group.length === 0) return null
              return (
                <div key={position}>
                  <div className="flex items-center gap-4 mb-8 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <h2 className="font-heading text-2xl sm:text-3xl text-white uppercase">{label}</h2>
                    <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {group.length} Players
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
                    {group.map((player) => (
                      <PlayerCard key={player.id} player={player as never} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player as never} />
            ))}
          </div>
        )}

        {/* ── Head Coach Feature ── */}
        <div
          className="mt-20 mb-16 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
          style={{
            background: 'rgba(0,87,184,0.08)',
            border: '1px solid rgba(0,87,184,0.2)',
            borderLeftWidth: '6px',
            borderLeftColor: '#0057B8',
          }}
        >
          <button
            onClick={() => setLightbox({ image: headCoach.image, name: headCoach.name, role: headCoach.role })}
            className="relative overflow-hidden cursor-pointer group block w-full"
            style={{ aspectRatio: '4/5' }}
          >
            <Image src={headCoach.image} alt={headCoach.name} fill className="object-cover object-top transition-transform duration-500 group-hover:scale-105" style={{ filter: 'grayscale(20%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,15,26,0.8) 0%, transparent 60%)' }} />
          </button>
          <div className="lg:col-span-2">
            <span className="text-xs font-bold uppercase tracking-widest text-club-yellow mb-3 block">Technical Leadership</span>
            <h2 className="font-heading text-3xl sm:text-5xl text-white uppercase leading-none mb-3">{headCoach.name}</h2>
            <p className="text-xs font-bold uppercase tracking-widest mb-6 text-club-blue-light">{headCoach.role}</p>
            {headCoach.bio && (
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{headCoach.bio}</p>
            )}
          </div>
        </div>

        {/* ── Technical Staff ── */}
        <div className="mb-16 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl text-white uppercase">Technical Staff</h2>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {staff.slice(1).map((member) => (
              <div key={member.id} className="group text-center p-4 transition-all duration-200" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  onClick={() => setLightbox({ image: member.image, name: member.name, role: member.role })}
                  className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-transparent group-hover:border-club-yellow transition-colors cursor-pointer block"
                  aria-label={`View photo of ${member.name}`}
                >
                  <Image src={member.image} alt={member.name} fill className="object-cover" style={{ filter: 'grayscale(30%)' }} />
                </button>
                <div className="text-xs font-bold uppercase tracking-widest text-club-yellow mb-1" style={{ fontSize: '9px' }}>{member.role}</div>
                <div className="font-heading text-sm text-white uppercase leading-tight">{member.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Executive Team ── */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl text-white uppercase">The Executive Team</h2>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {boardMembers.map((member) => (
              <div key={member.id} className="group p-5 transition-all duration-200" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-xs font-bold uppercase tracking-widest text-club-yellow mb-2" style={{ fontSize: '10px' }}>{member.role}</div>
                <div className="font-heading text-base sm:text-lg text-white uppercase leading-tight group-hover:text-club-yellow transition-colors">{member.name}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-5 right-5 z-10 text-white hover:text-club-yellow transition-colors p-2"
          >
            <X size={28} />
          </button>

          {/* Framed image */}
          <div
            className="relative"
            style={{ maxWidth: '90vw', maxHeight: '85vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative"
              style={{
                width: 'min(500px, 90vw)',
                aspectRatio: '3/4',
                border: '1px solid rgba(255,199,44,0.3)',
                background: '#1a1f2e',
              }}
            >
              <Image src={lightbox.image} alt={lightbox.name} fill className="object-cover" />
              {/* Caption bar */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5"
                style={{ background: 'linear-gradient(to top, rgba(10,15,26,0.95) 0%, transparent 100%)' }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-club-yellow mb-1">{lightbox.role}</p>
                <h3 className="font-heading text-2xl text-white uppercase leading-tight">{lightbox.name}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}