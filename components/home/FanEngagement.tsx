import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import { Users, Heart, Trophy } from 'lucide-react'

const socials = [
  { icon: <FaFacebookF size={16} />, label: 'Facebook', handle: '@KarongaUnitedFC', href: '#', color: '#1877F2' },
  { icon: <FaTwitter size={16} />, label: 'Twitter / X', handle: '@KarongaUnited', href: '#', color: '#1DA1F2' },
  { icon: <FaInstagram size={16} />, label: 'Instagram', handle: '@karongaunitedfc', href: '#', color: '#E1306C' },
  { icon: <FaYoutube size={16} />, label: 'YouTube', handle: 'Karonga United FC', href: '#', color: '#FF0000' },
]

const stats = [
  { icon: <Users size={18} />, value: '500+', label: 'Youth Players' },
  { icon: <Heart size={18} />, value: '12', label: 'Communities' },
  { icon: <Trophy size={18} />, value: '2016', label: 'Founded' },
]

export default function FanEngagement() {
  return (
    <>
      {/* ── Section A — Community ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#0a0f1a' }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(255,199,44,0.2), transparent)',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — Image */}
            <div className="relative">
              {/* Main image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <Image
                  src="/images/gallery/fans2.jpeg"
                  alt="Karonga United FC Fans"
                  fill
                  className="object-cover"
                />
                {/* Blue tint */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(0,87,184,0.15)' }}
                />
              </div>

              {/* Floating stat card */}
              <div
                className="absolute -bottom-6 -right-4 sm:-right-8 px-6 py-4 z-10"
                style={{
                  background: '#0F172A',
                  border: '1px solid rgba(255,199,44,0.3)',
                  borderLeft: '3px solid #FFC72C',
                }}
              >
                <div className="font-heading text-4xl text-club-yellow leading-none">
                  8+
                </div>
                <div
                  className="text-xs uppercase tracking-widest mt-1 font-bold"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  Seasons Strong
                </div>
              </div>

              {/* Yellow accent corner */}
              <div
                className="absolute top-0 left-0 w-12 h-12"
                style={{
                  borderTop: '3px solid #FFC72C',
                  borderLeft: '3px solid #FFC72C',
                }}
              />
            </div>

            {/* Right — Content */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                
                <span className="text-xs font-bold uppercase tracking-widest text-club-yellow">
                  The Crocodiles Family
                </span>
              </div>

              <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase leading-none mb-6">
                More Than<br />
                <span className="text-club-yellow">A Football Club</span>
              </h2>

              <p
                className="text-base leading-relaxed mb-10"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Karonga United FC is woven into the fabric of the North.
                From youth academies to community outreach  we invest
                in the people who make this club what it is.
              </p>

              

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="px-6 py-3 bg-club-yellow text-navy text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors duration-200"
                >
                  Our Story
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-navy transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  Get Involved
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Section B — Social Strip ── */}
      
    </>
  )
}