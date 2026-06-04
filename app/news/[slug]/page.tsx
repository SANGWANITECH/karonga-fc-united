import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { newsArticles } from '@/data/news'
import NewsCard from '@/components/news/NewsCard'
import { formatDate } from '@/lib/utils'

const catColor: Record<string, string> = {
  'Match Report': '#FFC72C',
  'Club News': '#0057B8',
  'Community': '#4ade80',
  'Academy': '#1a6fcc',
}

// Generate all article pages at build time
export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }))
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = newsArticles.find((a) => a.slug === slug)

  if (!article) notFound()

  // Related — same category, exclude current, max 3
  const related = newsArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3)

  // Fallback: if no same-category, show any 3 others
  const relatedFinal = related.length > 0
    ? related
    : newsArticles.filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <main style={{ background: '#0a0f1a' }}>

      {/* ── Hero Image ── */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
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
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
            By {article.author}
          </span>
        </div>

        {/* Lead excerpt */}
        <p className="text-lg sm:text-xl leading-relaxed mb-8 text-white" style={{ fontWeight: 500 }}>
          {article.excerpt}
        </p>

        {/* Body paragraphs */}
        <div className="space-y-6">
          {article.content.map((para, i) => (
            <p
              key={i}
              className="text-base leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
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
      {relatedFinal.length > 0 && (
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
              {relatedFinal.map((a) => (
                <NewsCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  )
}