import Image from 'next/image'
import Link from 'next/link'
import { Eye, Target, Trophy, Medal, Award } from 'lucide-react'
import { clubInfo, milestones, leadership, trophies } from '@/data/about'

export default function AboutPage() {
  return (
    <main style={{ background: '#0a0f1a' }}>

      {/* ── Hero ── */}
      <section className="relative min-h-[500px] sm:h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
             src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1800&q=85"
            alt="About"
            fill
            className="object-cover"
            style={{ filter: 'grayscale(30%)', opacity: 0.45 }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, #0a0f1a 0%, rgba(10,15,26,0.8) 50%, rgba(10,15,26,0.4) 100%)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <span className="inline-block bg-club-blue text-white text-xs font-bold uppercase tracking-widest px-4 py-1 mb-6">
              Est. {clubInfo.founded}
            </span>
            <h1 className="font-heading text-5xl sm:text-7xl text-white uppercase leading-none mb-5">
              Our <span className="text-club-yellow">Story</span>
            </h1>
            <p className="text-sm sm:text-base max-w-lg" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Forged in the northern heartland, Karonga United FC  The Crocodiles 
              represents the resilience and untamed spirit of our community.
            </p>
          </div>
        </div>
      </section>

      {/* ── Club History ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Image */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <Image
                   src="/images/gallery/fc10.jpeg"
                  alt="Club heritage"
                  fill
                  className="object-cover"
                  style={{ border: '1px solid rgba(0,87,184,0.2)' }}
                />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-club-yellow px-7 py-5 hidden sm:block">
                <p className="font-heading text-4xl text-navy leading-none">{clubInfo.yearsActive}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-navy mt-1">Years of Pride</p>
              </div>
            </div>

            {/* Text */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <h2 className="font-heading text-3xl sm:text-4xl text-white uppercase mb-7 pl-6" style={{ borderLeft: '4px solid #FFC72C' }}>
                The Rise of the Crocodiles
              </h2>
              <div className="space-y-5">
                {clubInfo.story.map((para, i) => (
                  <p key={i} className="text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="py-16 sm:py-20" style={{ background: '#1a1f2e' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Vision */}
            <div className="p-8 sm:p-10" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Eye size={40} className="text-club-yellow mb-6" />
              <h3 className="font-heading text-2xl text-white uppercase mb-4">Our Vision</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {clubInfo.vision}
              </p>
            </div>

            {/* Mission */}
            <div className="md:col-span-2 p-8 sm:p-10 relative overflow-hidden" style={{ background: '#0057B8' }}>
              <Target size={40} className="text-white mb-6" />
              <h3 className="font-heading text-2xl text-white uppercase mb-5">Our Mission</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {clubInfo.mission.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Milestones Timeline ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl sm:text-5xl text-white uppercase">
              Milestones & <span className="text-club-yellow">Glory</span>
            </h2>
          </div>

          <div className="relative">
            {/* Center line (desktop) */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            />

            <div className="space-y-10 md:space-y-16">
              {milestones.map((m, i) => {
                const leftSide = i % 2 === 0
                return (
                  <div
                    key={m.year}
                    className={`relative flex flex-col md:flex-row items-center ${leftSide ? '' : 'md:flex-row-reverse'}`}
                  >
                    {/* Text */}
                    <div className={`flex-1 ${leftSide ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'} mb-4 md:mb-0`}>
                      <span className="font-heading text-3xl text-club-yellow block mb-1">{m.year}</span>
                      <h4 className="font-heading text-xl text-white uppercase mb-2">{m.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {m.text}
                      </p>
                    </div>

                    {/* Dot */}
                    <div
                      className="w-5 h-5 rounded-full z-10 flex-shrink-0"
                      style={{ background: '#0a0f1a', border: '3px solid #FFC72C' }}
                    />

                    <div className="flex-1 hidden md:block" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="py-16 sm:py-20" style={{ background: '#080d16' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl sm:text-5xl text-white uppercase">
              Club <span className="text-club-yellow">Leadership</span>
            </h2>
            <p className="text-sm mt-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
              The strategic minds steering the Crocodiles toward the future.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {leadership.map((person) => (
              <div key={person.id} className="group">
                <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                    style={{ filter: 'grayscale(70%)' }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'linear-gradient(to top, rgba(10,15,26,0.5), transparent)' }}
                  />
                </div>
                <h4 className="font-heading text-lg text-white uppercase leading-tight">{person.name}</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-club-yellow mt-1">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trophy Cabinet ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="font-heading text-3xl sm:text-5xl text-white uppercase">
              Trophy <span className="text-club-yellow">Cabinet</span>
            </h2>
            <p className="text-sm mt-2 max-w-md" style={{ color: 'rgba(255,255,255,0.4)' }}>
              The physical evidence of our commitment to success on the pitch.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trophies.map((t, i) => (
              <div
                key={t.id}
                className="p-7 text-center transition-transform hover:-translate-y-2 duration-300"
                style={{
                  background: '#1a1f2e',
                  borderBottom: `3px solid ${i % 2 === 0 ? '#FFC72C' : '#0057B8'}`,
                }}
              >
                <div className="flex justify-center mb-4 text-club-yellow">
                  {i % 3 === 0 ? <Trophy size={40} /> : i % 3 === 1 ? <Medal size={40} /> : <Award size={40} />}
                </div>
                <h5 className="font-heading text-lg text-white uppercase mb-1">{t.result}</h5>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {t.competition}
                </p>
                <p className="font-heading text-2xl text-club-yellow">{t.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Youth Academy ── */}
      <section className="py-16 sm:py-24" style={{ background: '#080d16' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ background: '#1a1f2e' }}>
            {/* Image */}
            <div className="relative min-h-[300px] lg:min-h-0">
              <Image
                src="/images/gallery/fc5.jpeg"
                alt="Youth Academy"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-club-yellow mb-4">
                Future Crocodiles
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-white uppercase leading-tight mb-5">
                The Karonga United<br />Youth Academy
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Our youth academy is the bedrock of the club. We invest in scouting and
                developing the next generation of stars from the northern region — with
                quality coaching, nutrition, and educational support.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="font-heading text-4xl text-club-yellow leading-none">120+</p>
                  <p className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Active Players</p>
                </div>
                <div>
                  <p className="font-heading text-4xl text-club-yellow leading-none">15</p>
                  <p className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Pro Graduates</p>
                </div>
              </div>

              <Link
                href="/contact"
                className="self-start px-8 py-4 bg-club-yellow text-navy text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                Academy Info
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}