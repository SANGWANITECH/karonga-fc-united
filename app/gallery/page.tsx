'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryImages } from '@/data/gallery'

const categories = ['All', 'Match Action', 'Training', 'Fans', 'Team']

const catColor: Record<string, string> = {
  'Match Action': '#FFC72C',
  'Training': '#1a6fcc',
  'Fans': '#4ade80',
  'Team': '#0057B8',
}

export default function GalleryPage() {
  const [activeCat, setActiveCat] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeCat === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCat)

  // Lightbox controls
  const openLightbox = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))
  const next = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length))

  // Keyboard nav + scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, filtered.length])

  const activeImg = lightboxIndex !== null ? filtered[lightboxIndex] : null

  // Bento span helper
  const spanClass = (size?: string) => {
    if (size === 'large') return 'sm:col-span-2 sm:row-span-2'
    if (size === 'wide') return 'sm:col-span-2'
    return ''
  }

  return (
    <main style={{ background: '#0a0f1a' }}>

      {/* ── Hero ── */}
      <section className="relative h-80 sm:h-96 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1800&q=85"
            alt="Gallery"
            fill
            className="object-cover"
            style={{ filter: 'grayscale(30%)' }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, #0a0f1a 0%, rgba(10,15,26,0.6) 50%, rgba(10,15,26,0.3) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
          <span className="text-xs font-bold uppercase tracking-widest text-club-yellow mb-3 block">
            Official Multimedia Hub
          </span>
          <h1 className="font-heading text-5xl sm:text-7xl text-white uppercase leading-none">
            Media <span className="text-club-yellow">Center</span>
          </h1>
          <p className="text-sm sm:text-base mt-3 max-w-xl" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Every frame tells the story of the Crocodiles the intensity, the roar, the glory.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* ── Header + Filter ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl text-white uppercase">
              Visual <span className="text-club-yellow">Archives</span>
            </h2>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              The season captured in high definition.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className="px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                style={{
                  background: activeCat === cat ? '#FFC72C' : 'rgba(255,255,255,0.05)',
                  color: activeCat === cat ? '#0F172A' : 'rgba(255,255,255,0.5)',
                  border: activeCat === cat ? '1px solid #FFC72C' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Bento Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white uppercase tracking-widest" style={{ opacity: 0.4 }}>
              No photos in this category
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            style={{ gridAutoRows: '180px' }}
          >
            {filtered.map((img, i) => (
              <button
                key={img.id}
                onClick={() => openLightbox(i)}
                className={[
                  'group relative overflow-hidden cursor-pointer',
                  spanClass(img.size),
                ].join(' ')}
                style={{ background: '#1a1f2e' }}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  style={{ filter: 'grayscale(60%)' }}
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: catColor[img.category] }}
                  >
                    {img.category}
                  </span>
                  <h3 className="font-heading text-base sm:text-lg text-white uppercase leading-tight">
                    {img.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {activeImg && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute top-5 right-5 z-10 text-white hover:text-club-yellow transition-colors p-2"
          >
            <X size={28} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous"
            className="absolute left-2 sm:left-6 z-10 text-white hover:text-club-yellow transition-colors p-2"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-4xl mx-12 sm:mx-16"
            style={{ height: '80vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImg.src}
              alt={activeImg.title}
              fill
              className="object-contain"
            />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 text-center pb-2">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: catColor[activeImg.category] }}
              >
                {activeImg.category}
              </span>
              <h3 className="font-heading text-xl text-white uppercase mt-1">
                {activeImg.title}
              </h3>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next"
            className="absolute right-2 sm:right-6 z-10 text-white hover:text-club-yellow transition-colors p-2"
          >
            <ChevronRight size={36} />
          </button>

          {/* Counter */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-widest"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {lightboxIndex! + 1} / {filtered.length}
          </div>
        </div>
      )}

    </main>
  )
}