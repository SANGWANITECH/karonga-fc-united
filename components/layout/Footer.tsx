import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail } from 'lucide-react'
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import { contactInfo } from '@/data/contact'

const clubLinks = [
  { label: 'About the Club', href: '/about' },
  { label: 'The Team', href: '/team' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Contact', href: '/contact' },
]

const footballLinks = [
  { label: 'Fixtures', href: '/fixtures' },
  { label: 'Results', href: '/results' },
  { label: 'News', href: '/news' },
  { label: 'Gallery', href: '/gallery' },
]

const socials = [
  { icon: <FaFacebookF size={14} />, label: 'Facebook', href: contactInfo.facebook },
  { icon: <FaWhatsapp size={14} />, label: 'WhatsApp', href: contactInfo.whatsapp },
]

export default function Footer() {
  return (
    <footer className="bg-navy" style={{ borderTop: '3px solid #FFC72C' }}>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="relative w-14 h-14 rounded-full border-2 border-club-yellow overflow-hidden flex-shrink-0"
                style={{ boxShadow: '0 0 24px rgba(255,199,44,0.2)' }}
              >
                <Image src="/images/logo.avif" alt="KUFC" fill className="object-cover" />
              </div>
              <div>
                <div className="font-heading text-2xl text-white uppercase leading-none">
                  Karonga United
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-club-yellow uppercase tracking-widest font-bold">
                    The Crocodiles
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Representing the strength and spirit of Karonga since 2016.
              The Crocodiles are the pride of the North, fighting for
              glory in the FDH Bank Premiership.
            </p>

            {/* Social Links */}
            <div className="flex gap-2">
              {socials.map((s) => (
                
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200 hover:bg-club-yellow hover:text-navy"
                  style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Club Links */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-5 bg-club-yellow" />
              <h5 className="text-xs font-bold uppercase tracking-widest text-white">The Club</h5>
            </div>
            <ul className="space-y-3">
              {clubLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-club-yellow transition-colors duration-200 flex items-center gap-2 group"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-club-yellow transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Football Links */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-5 bg-club-yellow" />
              <h5 className="text-xs font-bold uppercase tracking-widest text-white">Football</h5>
            </div>
            <ul className="space-y-3">
              {footballLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-club-yellow transition-colors duration-200 flex items-center gap-2 group"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-club-yellow transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-5 bg-club-yellow" />
              <h5 className="text-xs font-bold uppercase tracking-widest text-white">Contact Us</h5>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <MapPin size={14} className="text-club-yellow mt-0.5 flex-shrink-0" />
                <span>P.O. Box 50,<br />Karonga, Malawi</span>
              </li>
              <li className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <Phone size={14} className="text-club-yellow flex-shrink-0" />
                <a href="tel:+265994676444" className="hover:text-club-yellow transition-colors">
                  +265 994 676 444
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <Mail size={14} className="text-club-yellow flex-shrink-0" />
                <a href="mailto:karongautdfc@gmail.com" className="hover:text-club-yellow transition-colors">
                  karongautdfc@gmail.com
                </a>
              </li>
            </ul>

            {/* Competition Badge */}
            <div
              className="mt-6 px-4 py-3 border border-club-blue border-opacity-40"
              style={{ background: 'rgba(0,87,184,0.1)' }}
            >
              <div className="text-xs text-white opacity-40 uppercase tracking-widest mb-1">
                Current Competition
              </div>
              <div className="text-sm font-bold text-white uppercase">FDH Bank Premiership</div>
              <div className="text-xs text-club-yellow font-bold mt-0.5">2025 / 26 Season</div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <p className="text-xs uppercase tracking-widest text-center" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2026 Karonga United FC · All rights reserved
          </p>
          <span className="hidden sm:inline" style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
          <Link
            href="/admin"
            className="text-xs uppercase tracking-widest hover:text-club-yellow transition-colors"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Staff Login
          </Link>
        </div>
      </div>


    </footer>
  )
}