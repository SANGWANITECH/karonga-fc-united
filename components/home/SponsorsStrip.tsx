'use client'

import Image from 'next/image'
import Link from 'next/link'

import { sponsors } from '@/data/sponsors'

const allSponsors = [...sponsors, ...sponsors, ...sponsors]

export default function SponsorsStrip() {
  return (
    <section
      className="py-14 overflow-hidden"
      style={{
        background: '#060b14',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-6 mb-10 flex items-center justify-between">
        <h2 className="font-heading text-2xl sm:text-3xl text-white uppercase">
          Club <span className="text-club-yellow">Sponsors</span>
        </h2>
        <Link
          href="/sponsors"
          className="text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          Become a Partner →
        </Link>
      </div>

      {/* ── Marquee Track ── */}
      <div
        className="relative w-full py-6"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #060b14, transparent)' }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #060b14, transparent)' }}
        />

        {/* Scrolling logos */}
        <div
          className="flex items-center gap-20 w-max"
          style={{ animation: 'marquee 30s linear infinite' }}
        >
          {allSponsors.map((s, i) => (
            <a
              key={`${s.name}-${i}`}
              href={s.href}
              className="group relative flex-shrink-0 flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
              style={{ width: '110px', height: '48px' }}
            >
              <Image
                src={s.logo}
                alt={s.name}
                fill
                className="object-contain"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Marquee keyframe */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>

    </section>
  )
}