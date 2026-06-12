'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import NewsCard from '@/components/news/NewsCard'
import { formatDate } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

const catColor: Record<string, string> = {
  'Match Report': '#FFC72C',
  'Club News': '#0057B8',
  'Community': '#4ade80',
  'Academy': '#1a6fcc',
}

interface Article {
  id: string
  slug: string
  title: string
  category: string
  excerpt: string
  body: string
  image: string
  publishedAt: string
}

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string

  const [article, setArticle] = useState<Article | null>(null)
  const [related, setRelated] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const load = async () => {
      // Fetch the article by slug
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error || !data) {
        setNotFound(true)
        setLoading(false)
        return
      }

      const mapped: Article = {
        id: data.id,
        slug: data.slug,
        title: data.title,
        category: data.category,
        excerpt: data.excerpt || '',
        body: data.body || '',
        image: data.image_url || '',
        publishedAt: data.publish_date,
      }
      setArticle(mapped)

      // Fetch related (same category, exclude this one)
      const { data: rel } = await supabase
        .from('news')
        .select('id, slug, title, category, excerpt, image_url, publish_date')
        .neq('slug', slug)
        .order('publish_date', { ascending: false })
        .limit(3)

      if (rel) {
        setRelated(
          rel.map((a) => ({
            id: a.id,
            slug: a.slug,
            title: a.title,
            category: a.category,
            excerpt: a.excerpt || '',
            body: '',
            image: a.image_url || '',
            publishedAt: a.publish_date,
          }))
        )
      }

      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <main style={{ background: '#0a0f1a' }} className="min-h-screen flex items-center justify-center">
        <p className="text-white uppercase tracking-widest text-sm" style={{ opacity: 0.4 }}>
          Loading...
        </p>
      </main>
    )
  }

  if (notFound || !article) {
    return (
      <main style={{ background: '#0a0f1a' }} className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-white uppercase mb-3">Article Not Found</h1>
          <Link href="/news" className="text-xs font-bold uppercase tracking-widest text-club-yellow hover:text-white transition-colors">
            ← Back to All News
          </Link>
        </div>
      </main>
    )
  }

  // Split body into paragraphs on blank lines
  const paragraphs = article.body.split(/\n\s*\n/).filter((p) => p.trim())

  return (
    <main style={{ background: '#0a0f1a' }}>

      {/* ── Hero Image ── */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={article.image} alt={article.title} fill className="object-cover" priority />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, #0a0f1a 0%, rgba(10,15,26,0.5) 50%, rgba(10,15,26,0.2) 100%)' }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12 w-full">
          <span
            className="inline-block px-4 py-1 font-bold uppercase tracking-widest mb-5"
            style={{
              fontSize: '11px',
              background: catColor[article.category] ?? '#0057B8',
              color: article.category === 'Match Report' ? '#0F172A' : '#fff',
            }}
          >
            {article.category}
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl text-white uppercase leading-none">
            {article.title}
          </h1>
        </div>
      </section>

      {/* ── Article Body ── */}
      <article className="max-w-3xl mx-auto px-6 py-14">

        {/* Meta */}
        <div
          className="flex items-center gap-4 mb-10 pb-6"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-club-yellow">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        {/* Lead excerpt */}
        {article.excerpt && (
          <p className="text-lg sm:text-xl leading-relaxed mb-8 text-white" style={{ fontWeight: 500 }}>
            {article.excerpt}
          </p>
        )}

        {/* Body paragraphs */}
        <div className="space-y-6">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {para}
            </p>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-club-yellow hover:text-white transition-colors"
          >
            <span>←</span> Back to All News
          </Link>
        </div>
      </article>

      {/* ── Related Articles ── */}
      {related.length > 0 && (
        <section
          className="py-16"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#080d16' }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl text-white uppercase">
                More <span className="text-club-yellow">News</span>
              </h2>
              <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((a) => (
                <NewsCard key={a.id} article={a as never} />
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  )
}