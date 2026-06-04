import Image from 'next/image'
import Link from 'next/link'
import { Star, Users, TrendingUp, Mail, Check } from 'lucide-react'
import { sponsors } from '@/data/sponsors'

const packages = [
  {
    name: 'Platinum',
    highlight: false,
    perks: ['Front of shirt branding', 'Stadium naming rights option', 'Full digital integration'],
  },
  {
    name: 'Gold',
    highlight: true,
    perks: ['Sleeve / back of shirt branding', 'Pitch-side advertising', 'VIP matchday hospitality'],
  },
  {
    name: 'Silver',
    highlight: false,
    perks: ['Training kit branding', 'Matchday programme presence', 'Social media features'],
  },
]

const benefits = [
  {
    icon: <Star size={20} />,
    title: 'Brand Visibility',
    text: 'Reach passionate supporters across the Northern Region through our matchdays, digital platforms, and TNM Super League coverage.',
  },
  {
    icon: <Users size={20} />,
    title: 'Community Impact',
    text: 'Our community and youth academy programmes give partners genuine, meaningful engagement with the people of Karonga.',
  },
  {
    icon: <TrendingUp size={20} />,
    title: 'Growth Partnership',
    text: 'Align your brand with one of the most ambitious and fastest-growing football clubs in Malawi.',
  },
]

export default function SponsorsPage() {
  const titleSponsor = sponsors.find((s) => s.tier === 'Title Sponsor')
  const otherSponsors = sponsors.filter((s) => s.tier !== 'Title Sponsor')

  return (
    <main style={{ background: '#0a0f1a' }}>

      {/* ── Hero ── */}
      <section className="relative h-80 sm:h-96 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1800&q=85"
            alt="Sponsors"
            fill
            className="object-cover"
            style={{ filter: 'grayscale(40%)', opacity: 0.4 }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, #0a0f1a 0%, rgba(10,15,26,0.7) 50%, rgba(10,15,26,0.4) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <span className="inline-block bg-club-yellow text-navy text-xs font-bold uppercase tracking-widest px-4 py-1 mb-5">
              Partnership Excellence
            </span>
            <h1 className="font-heading text-4xl sm:text-6xl text-white uppercase leading-none mb-4">
              The Power Behind<br />
              <span className="text-club-yellow">The Crocodiles</span>
            </h1>
            <p className="text-sm sm:text-base max-w-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Building a legacy of Malawian football excellence through strategic
              local and national partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* ── Title Sponsor ── */}
      {titleSponsor && (
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-club-yellow mb-3">
                Main Club Partner
              </h2>
           
            </div>

            <div
              className="p-8 sm:p-12 flex flex-col md:flex-row items-center gap-10 transition-all duration-500 group"
              style={{
                background: '#1a1f2e',
                border: '1px solid rgba(0,87,184,0.25)',
              }}
            >
              {/* Logo */}
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="relative w-full" style={{ height: '90px', maxWidth: '240px' }}>
                  <Image
                    src={titleSponsor.logo}
                    alt={titleSponsor.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="font-heading text-2xl sm:text-3xl text-white uppercase mb-4">
                  {titleSponsor.name}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {titleSponsor.blurb}
                </p>
                <a
                  href={titleSponsor.href}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-club-yellow hover:gap-4 transition-all"
                >
                  Visit Website →
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Official Partners ── */}
      <section className="py-16 sm:py-20" style={{ background: '#080d16' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-club-yellow mb-2">
              Official Partners
            </h2>
            <h3 className="font-heading text-3xl sm:text-4xl text-white uppercase">
              Driving Performance
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {otherSponsors.map((s) => (
              
              <a
                key={s.id}
                href={s.href}
                className="group flex flex-col items-center justify-center p-8 h-44 transition-all duration-300"
                style={{
                  background: '#1a1f2e',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="relative w-full flex-1 mb-3" style={{ maxHeight: '70px' }}>
                  <Image
                    src={s.logo}
                    alt={s.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{
                    color: s.tier === 'Gold Partner' ? '#FFC72C' : 'rgba(255,255,255,0.4)',
                    fontSize: '9px',
                  }}
                >
                  {s.tier}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Partner (benefits) ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-club-yellow mb-2">
              Partner Benefits
            </h2>
            <h3 className="font-heading text-3xl sm:text-4xl text-white uppercase">
              More Than a Logo on a Shirt
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="p-7"
                style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="text-club-yellow mb-4">{b.icon}</div>
                <h4 className="font-heading text-xl text-white uppercase mb-3">{b.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section className="py-16 sm:py-20" style={{ background: '#080d16' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-heading text-3xl sm:text-4xl text-club-yellow uppercase mb-4">
              Partner With Us
            </h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Join the most progressive football club in the North. We offer tailored
              packages designed to meet your brand objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="relative p-8 flex flex-col transition-transform duration-300 hover:-translate-y-2"
                style={{
                  background: pkg.highlight ? '#1f2740' : '#1a1f2e',
                  borderTop: `4px solid ${pkg.highlight ? '#FFC72C' : '#0057B8'}`,
                  border: pkg.highlight
                    ? '1px solid rgba(255,199,44,0.3)'
                    : '1px solid rgba(255,255,255,0.06)',
                  borderTopWidth: '4px',
                }}
              >
                {pkg.highlight && (
                  <div className="absolute top-0 right-0 bg-club-yellow text-navy px-3 py-1 text-xs font-bold uppercase" style={{ fontSize: '9px' }}>
                    Most Popular
                  </div>
                )}
                <h3
                  className="font-heading text-2xl uppercase mb-6"
                  style={{ color: pkg.highlight ? '#FFC72C' : '#fff' }}
                >
                  {pkg.name}
                </h3>
                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <Check size={16} className="text-club-yellow flex-shrink-0 mt-0.5" />
                      <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="w-full text-center py-3 text-xs font-bold uppercase tracking-widest transition-colors"
                  style={{
                    background: pkg.highlight ? '#FFC72C' : '#0057B8',
                    color: pkg.highlight ? '#0F172A' : '#fff',
                  }}
                >
                  Inquire Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="p-8 sm:p-12 flex flex-col md:flex-row gap-8 justify-between items-center"
            style={{
              background: 'linear-gradient(135deg, rgba(0,87,184,0.15) 0%, rgba(255,199,44,0.06) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="max-w-xl text-center md:text-left">
              <h2 className="font-heading text-3xl sm:text-4xl text-white uppercase mb-3">
                Start The Conversation
              </h2>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Ready to elevate your brand alongside the most resilient team in the North?
                Our commercial team is ready to build your custom package.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto flex-shrink-0">
              <a
                href="mailto:commercial@karongaunited.mw"
                className="flex items-center justify-center gap-3 bg-club-yellow text-navy px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                <Mail size={16} />
                commercial@karongaunited.mw
              </a>
              <p className="text-center text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
                +265 (0) 999 000 000
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}