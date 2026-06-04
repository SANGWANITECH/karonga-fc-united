import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Users, Star } from 'lucide-react'

const facts = [
  { icon: <Users size={16} />, value: '15,000', label: 'Capacity' },
  { icon: <MapPin size={16} />, value: 'Karonga', label: 'Location' },
  { icon: <Star size={16} />, value: '2016', label: 'Est. Year' },
]

export default function StadiumHighlight() {
  return (
    <section className="relative py-28 sm:py-40 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1800&q=85"
          alt="Karonga Community Stadium"
          fill
          className="object-cover object-center"
        />
        {/* Blue tint overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,87,184,0.75)', mixBlendMode: 'multiply' }}
        />
        {/* Dark gradient left */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.7) 50%, rgba(15,23,42,0.3) 100%)',
          }}
        />
        <div className="absolute inset-0 pitch-pattern" style={{ opacity: 0.2 }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">

          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-0.5 h-4 bg-club-yellow" />
            <span className="text-xs font-bold uppercase tracking-widest text-club-yellow">
              Our Home
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-heading uppercase leading-none text-white mb-6">
            <span
              className="block"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
            >
              Enter The
            </span>
            <span
              className="block text-club-yellow"
              style={{ fontSize: 'clamp(3rem, 9vw, 7rem)', lineHeight: 0.85 }}
            >
              Swamp
            </span>
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed mb-10"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Karonga Community Stadium is more than a pitch.
            It is the beating heart of the North where legends
            are forged, rivals are tamed, and the Crocodiles roar.
          </p>

          {/* Stadium facts */}
          <div
            className="flex flex-wrap gap-8 mb-10 pb-10"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
          >
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-center gap-3">
                <div className="text-club-yellow opacity-70">{fact.icon}</div>
                <div>
                  <div className="font-heading text-2xl text-white leading-none">
                    {fact.value}
                  </div>
                  <div
                    className="text-xs uppercase tracking-widest mt-0.5"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {fact.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/stadium"
              className="px-8 py-4 bg-club-yellow text-navy text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors duration-200"
            >
              Stadium Info
            </Link>
            <Link
              href="/fixtures"
              className="px-8 py-4 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-navy transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.3)' }}
            >
              Match Schedule
            </Link>
          </div>

        </div>
      </div>

    </section>
  )
}