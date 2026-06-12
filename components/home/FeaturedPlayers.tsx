'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Player {
  id: string
  name: string
  number: number | null
  positionLabel: string
  image: string
  stats: {
    appearances: number
    goals?: number
    assists?: number
  }
}

const codeToLabel: Record<string, string> = {
  GK: 'Goalkeeper',
  DEF: 'Defender',
  MID: 'Midfielder',
  FWD: 'Forward',
}

export default function FeaturedPlayers() {
  const [featured, setFeatured] = useState<Player[]>([])

  useEffect(() => {
    const load = async () => {
      // Show first 6 players as "featured"
      const { data } = await supabase
        .from('players')
        .select('*')
        .order('number', { ascending: true })
        .limit(6)

      if (data) {
        setFeatured(
          data.map((p) => ({
            id: p.id,
            name: p.name,
            number: p.number,
            positionLabel: p.position_label || codeToLabel[p.position] || p.position,
            image: p.image_url || '',
            stats: {
              appearances: p.appearances ?? 0,
              goals: p.goals ?? 0,
              assists: p.assists ?? 0,
            },
          }))
        )
      }
    }
    load()
  }, [])

  // Don't render the section if there are no players yet
  if (featured.length === 0) return null

  return (
    <section className="py-20 overflow-hidden" style={{ background: '#080e1a' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-0.5 h-4 bg-club-yellow" />
              <span className="text-xs font-bold uppercase tracking-widest text-club-yellow">
                Season 2026
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase">
              The First <span className="text-club-yellow">Team</span>
            </h2>
          </div>
          <Link
            href="/team"
            className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Full Squad
            <span className="text-club-yellow">→</span>
          </Link>
        </div>

      </div>

      {/* Scrollable cards */}
      <div className="px-6 max-w-7xl mx-auto">
        <div className="flex gap-5 overflow-x-auto pb-4 custom-scrollbar">
          {featured.map((player) => (
            <Link
              key={player.id}
              href="/team"
              className="group relative flex-shrink-0 w-56 sm:w-64 overflow-hidden"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src={player.image}
                alt={player.name}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(8,14,26,0.98) 0%, rgba(8,14,26,0.5) 50%, rgba(8,14,26,0.1) 100%)' }}
              />
              <div
                className="absolute top-3 right-3 font-heading leading-none select-none"
                style={{ fontSize: '5rem', color: 'rgba(255,255,255,0.06)', lineHeight: 1 }}
              >
                {player.number}
              </div>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-club-yellow transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-xs font-bold uppercase tracking-widest mb-1 text-club-yellow">
                  {player.positionLabel}
                </div>
                <div className="font-heading text-white text-xl uppercase leading-tight group-hover:text-club-yellow transition-colors duration-200">
                  {player.name}
                </div>
                <div className="flex items-center gap-4 mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <div className="font-heading text-xl text-white leading-none">{player.stats.appearances}</div>
                    <div className="text-xs uppercase tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '9px' }}>Apps</div>
                  </div>
                  {player.stats.goals !== undefined && (
                    <div>
                      <div className="font-heading text-xl text-club-yellow leading-none">{player.stats.goals}</div>
                      <div className="text-xs uppercase tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '9px' }}>Goals</div>
                    </div>
                  )}
                  {player.stats.assists !== undefined && (
                    <div>
                      <div className="font-heading text-xl text-white leading-none">{player.stats.assists}</div>
                      <div className="text-xs uppercase tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '9px' }}>Assists</div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}

          {/* View all card */}
          <Link
            href="/team"
            className="group relative flex-shrink-0 w-56 sm:w-64 flex flex-col items-center justify-center gap-4 transition-all duration-200"
            style={{ aspectRatio: '3/4', background: 'rgba(0,87,184,0.1)', border: '1px solid rgba(0,87,184,0.3)' }}
          >
            <div className="w-14 h-14 rounded-full border-2 border-club-yellow flex items-center justify-center group-hover:bg-club-yellow transition-colors duration-200">
              <span className="font-heading text-2xl text-club-yellow group-hover:text-navy transition-colors">→</span>
            </div>
            <div className="text-center">
              <div className="font-heading text-white text-xl uppercase">Full Squad</div>
              <div className="text-xs uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>View all players</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile link */}
      <div className="px-6 mt-6 sm:hidden max-w-7xl mx-auto">
        <Link href="/team" className="text-xs font-bold uppercase tracking-widest text-club-yellow">
          Full Squad →
        </Link>
      </div>

    </section>
  )
}