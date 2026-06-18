'use client'

import Image from 'next/image'
import type { Player } from '@/types'

interface Props {
  player: Player
}

const positionAbbr: Record<string, string> = {
  Goalkeeper: 'GK',
  Defender: 'DEF',
  Midfielder: 'MID',
  Forward: 'FWD',
}

export default function PlayerCard({ player }: Props) {
  return (
    <div
      className="group relative overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        background: '#1a1f2e',
        border: '1px solid rgba(0,87,184,0.2)',
      }}
    >
      {/* ── Photo ── */}
      <div className="aspect-[3/4] relative overflow-hidden">
        <Image
          src={player.image}
          alt={player.name}
          fill
          className="object-cover object-top transition-all duration-500 group-hover:scale-105"
          style={{ filter: 'grayscale(80%)' }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(16,20,21,1) 0%, rgba(16,20,21,0.4) 40%, transparent 100%)',
          }}
        />

        {/* Jersey number */}
        <div
          className="absolute top-3 right-3 font-heading leading-none"
          style={{
            fontSize: '2.5rem',
            color: '#FFC72C',
            opacity: 0.85,
          }}
        >
          {String(player.number).padStart(2, '0')}
        </div>

        {/* Position watermark */}
        <div
          className="absolute -bottom-2 -left-2 font-heading uppercase select-none pointer-events-none"
          style={{
            fontSize: '4.5rem',
            WebkitTextStroke: '1px rgba(173,199,255,0.08)',
            color: 'transparent',
            lineHeight: 1,
          }}
        >
          {positionAbbr[player.position]}
        </div>

        {/* Yellow border on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ border: '2px solid #FFC72C' }}
        />
      </div>

      {/* ── Info ── */}
      <div className="p-4 relative">
        {/* Position label */}
        <div
          className="font-bold uppercase tracking-widest mb-1 text-club-yellow"
          style={{ fontSize: '10px' }}
        >
          {player.positionLabel}
        </div>

        {/* Name */}
        <div className="font-heading text-white text-lg uppercase leading-tight group-hover:text-club-yellow transition-colors duration-200">
          {player.name}
        </div>

        {/* Stats row — wraps + shrinks so all stats fit on narrow mobile cards */}
        <div
          className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-3 pt-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Appearances — always show */}
          <div className="min-w-0">
            <div className="font-heading text-base sm:text-lg text-white leading-none">
              {player.stats.appearances}
            </div>
            <div
              className="uppercase tracking-wider mt-0.5 whitespace-nowrap"
              style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}
            >
              Apps
            </div>
          </div>

          {/* Goals */}
          {player.stats.goals !== undefined && (
            <div className="min-w-0">
              <div className="font-heading text-base sm:text-lg text-club-yellow leading-none">
                {player.stats.goals}
              </div>
              <div
                className="uppercase tracking-wider mt-0.5 whitespace-nowrap"
                style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}
              >
                Goals
              </div>
            </div>
          )}

          {/* Assists */}
          {player.stats.assists !== undefined && (
            <div className="min-w-0">
              <div className="font-heading text-base sm:text-lg text-white leading-none">
                {player.stats.assists}
              </div>
              <div
                className="uppercase tracking-wider mt-0.5 whitespace-nowrap"
                style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}
              >
                Assists
              </div>
            </div>
          )}

          {/* Clean Sheets — goalkeepers only */}
          {player.position === 'Goalkeeper' && player.stats.cleanSheets !== undefined && (
            <div className="min-w-0">
              <div className="font-heading text-base sm:text-lg text-club-yellow leading-none">
                {player.stats.cleanSheets}
              </div>
              <div
                className="uppercase tracking-wider mt-0.5 whitespace-nowrap"
                style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}
              >
                Clean Sheets
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}