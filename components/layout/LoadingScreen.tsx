'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Fill 0 → 100 over ~9 seconds (100 steps × 90ms)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 90)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => setDone(true), 500)
      return () => clearTimeout(timeout)
    }
  }, [progress])

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700"
      style={{
        background: '#0F172A',
        opacity: done ? 0 : 1,
        pointerEvents: done ? 'none' : 'auto',
      }}
    >
      {/* Pitch texture */}
      <div className="absolute inset-0 pitch-pattern" style={{ opacity: 0.1 }} />

      {/* ── Logo + Orbiting Ball ── */}
      <div className="relative mb-12" style={{ width: '160px', height: '160px' }}>

        {/* Logo center */}
        <div
          className="absolute top-1/2 left-1/2 rounded-full overflow-hidden border-2 border-club-yellow"
          style={{
            width: '90px',
            height: '90px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Image
            src="/images/logo.avif"
            alt="Karonga United FC"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Orbiting football */}
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            width: '160px',
            height: '160px',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit 2s linear infinite',
            animationDelay: '0s',
            willChange: 'transform',
          }}
        >
          <div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              width: '28px',
              height: '28px',
              top: '-14px',
              left: '50%',
              marginLeft: '-14px',
              background: '#FFC72C',
              boxShadow: '0 0 16px rgba(255,199,44,0.8)',
              fontSize: '16px',
            }}
          >
            ⚽
          </div>
        </div>
      </div>

      {/* ── Club Name ── */}
      <div className="font-heading text-3xl sm:text-4xl text-white uppercase tracking-wide mb-2">
        Karonga United FC
      </div>
      <div
        className="text-xs uppercase tracking-widest mb-10"
        style={{ color: 'rgba(255,199,44,0.7)', letterSpacing: '0.3em' }}
      >
        INGWINA SHAMU KARONGA
      </div>

      {/* ── Progress Bar ── */}
      <div
        className="relative overflow-hidden"
        style={{
          width: '200px',
          height: '3px',
          background: 'rgba(255,255,255,0.1)',
        }}
      >
        <div
          className="absolute top-0 left-0 h-full bg-club-yellow"
          style={{
            width: `${progress}%`,
            boxShadow: '0 0 10px rgba(255,199,44,0.8)',
            transition: 'width 90ms linear',
          }}
        />
      </div>

      {/* Percentage */}
      <div
        className="text-xs font-bold mt-3 tabular-nums"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        {progress}%
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes orbit {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  )
}