import Image from 'next/image'
import Link from 'next/link'
import { players } from '@/data/players'

export default function FeaturedPlayers() {
  const featured = players.filter((p) => p.isFeatured)

  return (
    <section
      className="py-20 overflow-hidden"
      style={{ background: '#080e1a' }}
    >
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

      {/* Scrollable cards — full width */}
      <div className="px-6 max-w-7xl mx-auto">
        <div className="flex gap-5 overflow-x-auto pb-4 custom-scrollbar">
          {featured.map((player) => (
            <Link
              key={player.id}
              href={`/team`}
              className="group relative flex-shrink-0 w-56 sm:w-64 overflow-hidden"
              style={{ aspectRatio: '3/4' }}
            >
              {/* Player image */}
              <Image
                src={player.image}
                alt={player.name}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(8,14,26,0.98) 0%, rgba(8,14,26,0.5) 50%, rgba(8,14,26,0.1) 100%)',
                }}
              />

              {/* Jersey number — watermark */}
              <div
                className="absolute top-3 right-3 font-heading leading-none select-none"
                style={{
                  fontSize: '5rem',
                  color: 'rgba(255,255,255,0.06)',
                  lineHeight: 1,
                }}
              >
                {player.number}
              </div>

              {/* Club blue accent top */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-club-yellow transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

              {/* Player info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-1 text-club-yellow"
                >
                  {player.positionLabel}
                </div>
                <div className="font-heading text-white text-xl uppercase leading-tight group-hover:text-club-yellow transition-colors duration-200">
                  {player.name}
                </div>

                {/* Stats */}
                <div
                  className="flex items-center gap-4 mt-3 pt-3"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div>
                    <div className="font-heading text-xl text-white leading-none">
                      {player.stats.appearances}
                    </div>
                    <div
                      className="text-xs uppercase tracking-widest mt-0.5"
                      style={{ color: 'rgba(255,255,255,0.35)', fontSize: '9px' }}
                    >
                      Apps
                    </div>
                  </div>

                  {player.stats.goals !== undefined && (
                    <div>
                      <div className="font-heading text-xl text-club-yellow leading-none">
                        {player.stats.goals}
                      </div>
                      <div
                        className="text-xs uppercase tracking-widest mt-0.5"
                        style={{ color: 'rgba(255,255,255,0.35)', fontSize: '9px' }}
                      >
                        Goals
                      </div>
                    </div>
                  )}

                  {player.stats.saves !== undefined && (
                    <div>
                      <div className="font-heading text-xl text-club-yellow leading-none">
                        {player.stats.saves}
                      </div>
                      <div
                        className="text-xs uppercase tracking-widest mt-0.5"
                        style={{ color: 'rgba(255,255,255,0.35)', fontSize: '9px' }}
                      >
                        Saves
                      </div>
                    </div>
                  )}

                  {player.stats.tackles !== undefined && (
                    <div>
                      <div className="font-heading text-xl text-white leading-none">
                        {player.stats.tackles}
                      </div>
                      <div
                        className="text-xs uppercase tracking-widest mt-0.5"
                        style={{ color: 'rgba(255,255,255,0.35)', fontSize: '9px' }}
                      >
                        Tackles
                      </div>
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
            style={{
              aspectRatio: '3/4',
              background: 'rgba(0,87,184,0.1)',
              border: '1px solid rgba(0,87,184,0.3)',
            }}
          >
            <div
              className="w-14 h-14 rounded-full border-2 border-club-yellow flex items-center justify-center group-hover:bg-club-yellow transition-colors duration-200"
            >
              <span className="font-heading text-2xl text-club-yellow group-hover:text-navy transition-colors">
                →
              </span>
            </div>
            <div className="text-center">
              <div className="font-heading text-white text-xl uppercase">
                Full Squad
              </div>
              <div
                className="text-xs uppercase tracking-widest mt-1"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                View all players
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile link */}
      <div className="px-6 mt-6 sm:hidden max-w-7xl mx-auto">
        <Link
          href="/team"
          className="text-xs font-bold uppercase tracking-widest text-club-yellow"
        >
          Full Squad →
        </Link>
      </div>

    </section>
  )
}