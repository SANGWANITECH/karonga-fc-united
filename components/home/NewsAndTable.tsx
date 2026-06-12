'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Match Report': { bg: 'rgba(0,87,184,0.8)', text: '#fff' },
  'Club News': { bg: 'rgba(255,199,44,0.9)', text: '#0F172A' },
  'Transfer': { bg: 'rgba(147,51,234,0.8)', text: '#fff' },
  'Academy': { bg: 'rgba(34,197,94,0.8)', text: '#0F172A' },
  'Community': { bg: 'rgba(249,115,22,0.8)', text: '#fff' },
  'Interview': { bg: 'rgba(236,72,153,0.8)', text: '#fff' },
}

interface Article {
  id: string
  slug: string
  title: string
  category: string
  excerpt: string
  image: string
  publishedAt: string
}

interface TableRow {
  id: string
  club: string
  played: number
  goalDifference: number
  points: number
  isCurrentClub: boolean
  position: number
}

export default function NewsAndTable() {
  const [articles, setArticles] = useState<Article[]>([])
  const [table, setTable] = useState<TableRow[]>([])

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('news')
        .select('id, slug, title, category, excerpt, image_url, publish_date')
        .order('publish_date', { ascending: false })
        .limit(3)

      if (data) {
        setArticles(
          data.map((a) => ({
            id: a.id,
            slug: a.slug,
            title: a.title,
            category: a.category,
            excerpt: a.excerpt || '',
            image: a.image_url || '',
            publishedAt: a.publish_date,
          }))
        )
      }
    }
    load()
  }, [])

  useEffect(() => {
    const loadTable = async () => {
      const { data } = await supabase.from('league_table').select('*')
      if (data) {
        const sorted = [...data].sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points
          const gdA = a.goals_for - a.goals_against
          const gdB = b.goals_for - b.goals_against
          if (gdB !== gdA) return gdB - gdA
          return b.goals_for - a.goals_for
        })
        setTable(
          sorted.map((r, i) => ({
            id: r.id,
            club: r.club,
            played: r.played,
            goalDifference: r.goals_for - r.goals_against,
            points: r.points,
            isCurrentClub: r.is_current_club,
            position: i + 1,
          }))
        )
      }
    }
    loadTable()
  }, [])

  const featured = articles[0]
  const secondary = articles.slice(1, 3)

  return (
    <section className="py-20" style={{ background: '#0d1424' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ── News — 8 cols ── */}
          <div className="lg:col-span-8">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-0.5 h-4 bg-club-yellow" />
                  <span className="text-xs font-bold uppercase tracking-widest text-club-yellow">
                    Latest from KUFC
                  </span>
                </div>
                <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase">
                  News &amp; Updates
                </h2>
              </div>
              <Link
                href="/news"
                className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                All News
                <span className="text-club-yellow">→</span>
              </Link>
            </div>

            {/* No articles yet */}
            {!featured ? (
              <div
                className="flex items-center justify-center h-72"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  No news published yet
                </p>
              </div>
            ) : (
              <>
                {/* Featured Article */}
                <Link href={`/news/${featured.slug}`} className="group block mb-5">
                  <div className="relative h-72 sm:h-96 overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to top, rgba(15,23,42,0.97) 0%, rgba(15,23,42,0.5) 50%, transparent 100%)',
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      {(() => {
                        const c = categoryColors[featured.category] ?? { bg: 'rgba(255,199,44,0.9)', text: '#0F172A' }
                        return (
                          <span
                            className="text-xs font-bold uppercase tracking-widest px-3 py-1 mb-3 inline-block"
                            style={{ background: c.bg, color: c.text }}
                          >
                            {featured.category}
                          </span>
                        )
                      })()}
                      <h3 className="font-heading text-white text-2xl sm:text-3xl uppercase leading-tight group-hover:text-club-yellow transition-colors duration-200">
                        {featured.title}
                      </h3>
                      <p className="text-sm mt-2 line-clamp-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {featured.excerpt}
                      </p>
                      <p className="text-xs mt-3 font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {formatDate(featured.publishedAt)}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Secondary Articles */}
                {secondary.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {secondary.map((article) => (
                      <Link
                        key={article.id}
                        href={`/news/${article.slug}`}
                        className="group flex gap-4 p-4 transition-all duration-200 hover:border-club-yellow"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          {(() => {
                            const c = categoryColors[article.category] ?? { bg: 'rgba(255,199,44,0.9)', text: '#0F172A' }
                            return (
                              <span
                                className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 mb-2 inline-block"
                                style={{ background: c.bg, color: c.text, fontSize: '9px' }}
                              >
                                {article.category}
                              </span>
                            )
                          })()}
                          <h4 className="text-sm font-bold text-white leading-snug group-hover:text-club-yellow transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-xs mt-2 uppercase tracking-widest font-bold" style={{ color: 'rgba(255,255,255,0.3)' }}>
                            {formatDate(article.publishedAt)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}

          </div>

          {/* ── League Table — 4 cols (from Supabase) ── */}
          <div className="lg:col-span-4">

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-0.5 h-5 bg-club-yellow" />
                <span className="text-xs font-bold uppercase tracking-widest text-club-yellow">
                  TNM Super League
                </span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase">
                Standings
              </h2>
            </div>

            {table.length === 0 ? (
              <div className="p-8 text-center" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Standings coming soon
                </p>
              </div>
            ) : (
              <div className="overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                <div
                  className="grid grid-cols-12 px-4 py-3 text-xs font-bold uppercase tracking-widest"
                  style={{
                    background: 'rgba(0,87,184,0.2)',
                    color: 'rgba(255,255,255,0.35)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span className="col-span-1 text-center">#</span>
                  <span className="col-span-6 pl-2">Club</span>
                  <span className="col-span-1 text-center">P</span>
                  <span className="col-span-2 text-center">GD</span>
                  <span className="col-span-2 text-center">Pts</span>
                </div>

                {table.map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-12 px-4 py-3 items-center transition-colors"
                    style={{
                      background: row.isCurrentClub ? 'rgba(0,87,184,0.2)' : 'transparent',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      borderLeft: row.isCurrentClub ? '3px solid #FFC72C' : '3px solid transparent',
                    }}
                  >
                    <div className="col-span-1 text-center">
                      <span
                        className="text-xs font-bold"
                        style={{
                          color: row.isCurrentClub ? '#FFC72C' : row.position <= 2 ? '#FFC72C' : 'rgba(255,255,255,0.4)',
                        }}
                      >
                        {row.position}
                      </span>
                    </div>
                    <div className="col-span-6 pl-2">
                      <span
                        className="text-xs font-bold uppercase tracking-wide"
                        style={{ color: row.isCurrentClub ? '#FFC72C' : 'rgba(255,255,255,0.85)' }}
                      >
                        {row.isCurrentClub ? 'KUFC' : row.club.split(' ').slice(0, 2).join(' ')}
                      </span>
                    </div>
                    <div className="col-span-1 text-center">
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{row.played}</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span
                        className="text-xs"
                        style={{
                          color: row.goalDifference > 0 ? '#4ade80' : row.goalDifference < 0 ? '#f87171' : 'rgba(255,255,255,0.45)',
                        }}
                      >
                        {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span
                        className="text-sm font-bold"
                        style={{ color: row.isCurrentClub ? '#FFC72C' : 'rgba(255,255,255,0.85)' }}
                      >
                        {row.points}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Link
              href="/results"
              className="flex items-center justify-center gap-2 w-full py-3 mt-4 text-xs font-bold uppercase tracking-widest transition-colors duration-200 hover:text-white"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
            >
              Full Standings
              <span className="text-club-yellow">→</span>
            </Link>

          </div>

        </div>
      </div>
    </section>
  )
}