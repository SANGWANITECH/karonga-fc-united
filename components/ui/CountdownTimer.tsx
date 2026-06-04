'use client'

import { useState, useEffect } from 'react'
import { getTimeUntil } from '@/lib/utils'

interface CountdownTimerProps {
  targetDate: string
  matchLabel: string
}

export default function CountdownTimer({ targetDate, matchLabel }: CountdownTimerProps) {
  const [time, setTime] = useState(getTimeUntil(targetDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeUntil(targetDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const pad = (n: number) => String(n).padStart(2, '0')

  if (time.isPast) return null

  return (
    <div
      className="px-6 py-5 w-full"
      style={{
        background: 'rgba(0,87,184,0.3)',
        border: '1px solid rgba(0,87,184,0.5)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="text-xs font-bold uppercase tracking-widest mb-4 text-center"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        Next Match vs {matchLabel}
      </div>
      <div className="flex items-center justify-center gap-3">
        {[
          { value: pad(time.days), label: 'Days' },
          { value: pad(time.hours), label: 'Hrs' },
          { value: pad(time.minutes), label: 'Mins' },
          { value: pad(time.seconds), label: 'Secs' },
        ].map((unit, i, arr) => (
          <div key={unit.label} className="flex items-center gap-3">
            <div className="text-center">
              <div className="font-heading text-4xl text-club-yellow leading-none">
                {unit.value}
              </div>
              <div
                className="text-xs uppercase tracking-widest mt-1"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {unit.label}
              </div>
            </div>
            {i < arr.length - 1 && (
              <span
                className="font-heading text-2xl -mt-4"
                style={{ color: 'rgba(255,255,255,0.2)' }}
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}