'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NewsCard from '@/components/news/NewsCard'
import { supabase } from '@/lib/supabase'

const categories = ['All', 'Match Report', 'Club News', 'Community', 'Academy']

const catColor: Record<string, string> = {
  'Match Report': '#FFC72C',
  'Club News': '#0057B8',
  'Community': '#4ade80',
  'Academy': '#1a6fcc',
}

// The shape NewsCard + this page expect
interface Article {
  id: string
  slug: string
  title: string
  category: string
  excerpt: string
  image: string
  publishedAt: string
}

export default function NewsPage() {
  const [activeCat, setActiveCat] = useState('All')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('news')
        .select('id, slug, title, category, excerpt, image_url, publish_date')
        .order('publish_date', { ascending: false })

      if (data) {
        // Map Supabase fields → the shape our components use
        const mapped: Article[] = data.map((a) => ({
          id: a.id,
          slug: a.slug,
          title: a.title,
          category: a.category,
          excerpt: a.excerpt || '',
          image: a.image_url || '',
          publishedAt: a.publish_date,
        }))
        setArticles(mapped)
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <main style={{ background: '#0a0f1a' }} className="min-h-screen flex items-center justify-center">
        <p className="text-white uppercase tracking-widest text-sm" style={{ opacity: 0.4 }}>
          Loading news...
        </p>
      </main>
    )
  }

  if (articles.length === 0) {
    return (
      <main style={{ background: '#0a0f1a' }} className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-white uppercase mb-3">News</h1>
          <p className="text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
            No articles published yet
          </p>
        </div>
      </main>
    )
  }

  const featured = articles[0]
  const rest = articles.slice(1)

  const filtered = activeCat === 'All'
    ? rest
    : rest.filter((a) => a.category === activeCat)

  return (
    <main style={{ background: '#0a0f1a' }}>

      {/* ── Featured Hero ── */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            className="object-cover"
            style={{ filter: 'grayscale(20%)' }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, #0a0f1a 0%, rgba(10,15,26,0.6) 50%, transparent 100%)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <div className="max-w-3xl">
            <span
              className="inline-block px-4 py-1 font-bold uppercase tracking-widest mb-5"
              style={{
                fontSize: '11px',
                background: catColor[featured.category] ?? '#0057B8',
                color: featured.category === 'Match Report' ? '#0F172A' : '#fff',
              }}
            >
              {featured.category}
            </span>
            <h1 className="font-heading text-4xl sm:text-6xl text-white uppercase leading-none mb-5">
              {featured.title}
            </h1>
            <p
              className="text-sm sm:text-base leading-relaxed mb-7 max-w-2xl line-clamp-3"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {featured.excerpt}
            </p>
            <Link
              href={`/news/${featured.slug}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-club-yellow text-navy text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors group"
            >
              Read Full Report
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* ── Filter ── */}
        <div
          className="flex flex-wrap gap-2 mb-12 pb-8"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
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

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white uppercase tracking-widest" style={{ opacity: 0.4 }}>
              No articles in this category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <NewsCard key={article.id} article={article as never} />
            ))}
          </div>
        )}

      </div>
    </main>
  )
}