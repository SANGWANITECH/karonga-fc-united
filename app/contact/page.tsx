'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Mail, Phone, Send, ExternalLink } from 'lucide-react'
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import { contactInfo, faqs } from '@/data/contact'

const socials = [
  { icon: <FaFacebookF size={16} />, label: 'Facebook', href: contactInfo.facebook },
  { icon: <FaWhatsapp size={16} />, label: 'WhatsApp', href: contactInfo.whatsapp },
]

const subjects = [
  'General Inquiry',
  'Supporter Relations',
  'Media & Press',
  'Sponsorship Opportunities',
  'Youth Academy',
]

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState(subjects[0])
  const [message, setMessage] = useState('')

  const handleSend = () => {
    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`
    const mailto = `mailto:karongautdfc@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`
    window.location.href = mailto
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
  }

  return (
    <main style={{ background: '#0a0f1a' }}>

      {/* ── Hero ── */}
      <section className="relative h-72 sm:h-96 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/fc9.jpeg"
            alt="Contact"
            fill
            className="object-cover"
            style={{ filter: 'grayscale(40%)', opacity: 0.4 }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, #0a0f1a 0%, rgba(10,15,26,0.8) 50%, rgba(10,15,26,0.4) 100%)' }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-club-yellow mb-3 block">
              Communication Hub
            </span>
            <h1 className="font-heading text-5xl sm:text-7xl text-white uppercase leading-none mb-4">
              Get In <span className="text-club-yellow">Touch</span>
            </h1>
            <p className="text-sm sm:text-base max-w-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Connect with the Crocodiles. Whether you're a supporter, sponsor, or media 
              our team is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Grid ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Left — Details */}
            <div className="lg:col-span-5 space-y-10">
              <div>
                <h3 className="font-heading text-2xl sm:text-3xl text-white uppercase mb-7">
                  Club Headquarters
                </h3>
                <div className="space-y-4">
                  {/* Visit */}
                  <div className="flex items-start gap-4 p-5" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <MapPin size={26} className="text-club-yellow flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-white mb-1">Visit Us</p>
                      {contactInfo.address.map((line, i) => (
                        <p key={i} className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{line}</p>
                      ))}
                    </div>
                  </div>
                  {/* Email */}
                  <div className="flex items-start gap-4 p-5" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Mail size={26} className="text-club-yellow flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-white mb-1">Email Us</p>
                      {contactInfo.emails.map((e, i) => (
                        <a key={i} href={`mailto:${e}`} className="block text-sm hover:text-club-yellow transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>{e}</a>
                      ))}
                    </div>
                  </div>
                  {/* Call */}
                  <div className="flex items-start gap-4 p-5" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Phone size={26} className="text-club-yellow flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-white mb-1">Call Us</p>
                      {contactInfo.phones.map((p, i) => (
                        <p key={i} className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{p}</p>
                      ))}
                      <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{contactInfo.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
                  Follow The Crocodiles
                </h4>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-11 h-11 flex items-center justify-center transition-all hover:bg-club-yellow hover:text-navy"
                      style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10" style={{ background: '#1a1f2e', border: '1px solid rgba(0,87,184,0.2)' }}>
                <h3 className="font-heading text-2xl sm:text-3xl text-white uppercase mb-7">
                  Send a Message
                </h3>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 text-white outline-none focus:border-club-yellow transition-colors text-sm"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 text-white outline-none focus:border-club-yellow transition-colors text-sm"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 text-white outline-none focus:border-club-yellow transition-colors text-sm"
                      style={inputStyle}
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s} style={{ background: '#1a1f2e' }}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 text-white outline-none focus:border-club-yellow transition-colors resize-none text-sm"
                      style={inputStyle}
                    />
                  </div>

                  <button
                    onClick={handleSend}
                    className="w-full bg-club-yellow text-navy font-bold uppercase tracking-widest py-4 text-xs hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Send Message <Send size={15} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="relative h-80 sm:h-96 overflow-hidden" style={{ background: '#1a1f2e' }}>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1800&q=85"
            alt="Map"
            fill
            className="object-cover transition-all duration-700"
            style={{ filter: 'grayscale(80%)', opacity: 0.5 }}
          />
        </div>

        {/* Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <MapPin size={56} className="text-club-yellow" fill="#FFC72C" />
          </div>
        </div>

        {/* Location card */}
        <div
          className="absolute bottom-6 left-6 z-20 p-6 max-w-sm hidden md:block"
          style={{ background: 'rgba(15,23,42,0.92)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <h4 className="font-heading text-xl text-club-yellow uppercase mb-2">Find Us</h4>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Based in Karonga, the pride of the North. Reach out anytime.
          </p>
          <a
            href={contactInfo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-club-yellow hover:text-white transition-colors"
          >
            Open in Google Maps <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl sm:text-5xl text-white uppercase mb-4">
              Frequently <span className="text-club-yellow">Asked</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="p-6 transition-colors hover:border-club-yellow"
                style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <h5 className="font-heading text-xl text-club-yellow uppercase mb-3">{faq.q}</h5>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}