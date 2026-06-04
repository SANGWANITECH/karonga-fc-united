import Link from 'next/link'
import Image from 'next/image'
import { newsArticles } from '@/data/news'
import { leagueTable } from '@/data/leagueTable'
import { formatDate } from '@/lib/utils'

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Match Report': { bg: 'rgba(0,87,184,0.8)', text: '#fff' },
  'Club News': { bg: 'rgba(255,199,44,0.9)', text: '#0F172A' },
  'Transfer': { bg: 'rgba(147,51,234,0.8)', text: '#fff' },
  'Academy': { bg: 'rgba(34,197,94,0.8)', text: '#0F172A' },
  'Community': { bg: 'rgba(249,115,22,0.8)', text: '#fff' },
  'Interview': { bg: 'rgba(236,72,153,0.8)', text: '#fff' },
}

const formColor: Record<string, { bg: string; text: string }> = {
  W: { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
  D: { bg: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.6)' },
  L: { bg: 'rgba(239,68,68,0.2)', text: '#f87171' },
}

export default function NewsAndTable() {
  const featured = newsArticles.find((n) => n.isFeatured) ?? newsArticles[0]
  const secondary = newsArticles.filter((n) => n.id !== featured.id).slice(0, 2)

  return (
    <section
      className="py-20"
      style={{ background: '#0d1424' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ── News — 8 cols ── */}
          <div className="lg:col-span-8">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-0.5 h-4 bg-club-yellow" />
                  <span
                    className="text-xs font-bold uppercase tracking-widest text-club-yellow"
                  >
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

            {/* Featured Article */}
            <Link href={`/news/${featured.slug}`} className="group block mb-5">
              <div className="relative h-72 sm:h-96 overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(15,23,42,0.97) 0%, rgba(15,23,42,0.5) 50%, transparent 100%)',
                  }}
                />
                {/* Content */}
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
                  <p
                    className="text-sm mt-2 line-clamp-2"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {featured.excerpt}
                  </p>
                  <p
                    className="text-xs mt-3 font-bold uppercase tracking-widest"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    {formatDate(featured.publishedAt)}
                  </p>
                </div>
              </div>
            </Link>

            {/* Secondary Articles */}
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
                    <p
                      className="text-xs mt-2 uppercase tracking-widest font-bold"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                      {formatDate(article.publishedAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

          </div>

          {/* ── League Table — 4 cols ── */}
          <div className="lg:col-span-4">

            {/* Header */}
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

            {/* Table */}
            <div
              className="overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Table header */}
              <div
                className="grid grid-cols-12 px-4 py-3 text-xs font-bold uppercase tracking-widest"
                style={{
                  background: 'rgba(0,87,184,0.2)',
                  color: 'rgba(255,255,255,0.35)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span className="col-span-1 text-center">#</span>
                <span className="col-span-5 pl-2">Club</span>
                <span className="col-span-1 text-center">P</span>
                <span className="col-span-1 text-center">GD</span>
                <span className="col-span-2 text-center">Pts</span>
                <span className="col-span-2 text-center">Form</span>
              </div>

              {leagueTable.map((row) => (
                <div
                  key={row.position}
                  className="grid grid-cols-12 px-4 py-3 items-center transition-colors"
                  style={{
                    background: row.isCurrentClub
                      ? 'rgba(0,87,184,0.2)'
                      : 'transparent',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    borderLeft: row.isCurrentClub
                      ? '3px solid #FFC72C'
                      : '3px solid transparent',
                  }}
                >
                  {/* Position */}
                  <div className="col-span-1 text-center">
                    <span
                      className="text-xs font-bold"
                      style={{
                        color: row.isCurrentClub
                          ? '#FFC72C'
                          : row.position <= 2
                          ? '#FFC72C'
                          : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {row.position}
                    </span>
                  </div>

                  {/* Club Name */}
                  <div className="col-span-5 pl-2">
                    <span
                      className="text-xs font-bold uppercase tracking-wide"
                      style={{
                        color: row.isCurrentClub ? '#FFC72C' : 'rgba(255,255,255,0.85)',
                      }}
                    >
                      {row.isCurrentClub ? 'KUFC' : row.club.split(' ').slice(0, 2).join(' ')}
                    </span>
                  </div>

                  {/* Played */}
                  <div className="col-span-1 text-center">
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {row.played}
                    </span>
                  </div>

                  {/* GD */}
                  <div className="col-span-1 text-center">
                    <span
                      className="text-xs"
                      style={{
                        color: row.goalDifference > 0
                          ? '#4ade80'
                          : row.goalDifference < 0
                          ? '#f87171'
                          : 'rgba(255,255,255,0.45)',
                      }}
                    >
                      {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                    </span>
                  </div>

                  {/* Points */}
                  <div className="col-span-2 text-center">
                    <span
                      className="text-sm font-bold"
                      style={{
                        color: row.isCurrentClub ? '#FFC72C' : 'rgba(255,255,255,0.85)',
                      }}
                    >
                      {row.points}
                    </span>
                  </div>

                  {/* Form */}
                  <div className="col-span-2 flex items-center justify-center gap-0.5">
                    {(row.form ?? []).slice(-3).map((f, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 flex items-center justify-center text-xs font-bold rounded-full"
                        style={{
                          background: formColor[f]?.bg ?? 'rgba(255,255,255,0.08)',
                          color: formColor[f]?.text ?? 'rgba(255,255,255,0.5)',
                          fontSize: '8px',
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Full table link */}
            <Link
              href="/results"
              className="flex items-center justify-center gap-2 w-full py-3 mt-4 text-xs font-bold uppercase tracking-widest transition-colors duration-200 hover:text-white"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.4)',
              }}
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