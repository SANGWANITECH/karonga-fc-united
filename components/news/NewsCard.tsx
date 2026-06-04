import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { NewsArticle } from '@/types'

const catColor: Record<string, string> = {
  'Match Report': '#FFC72C',
  'Club News': '#0057B8',
  'Community': '#4ade80',
  'Academy': '#1a6fcc',
}

export default function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex flex-col transition-all duration-300"
      style={{
        background: '#1a1f2e',
        borderBottom: '3px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(26,31,46,0.6) 0%, transparent 60%)' }}
        />
        {/* Category badge */}
        <div className="absolute top-0 left-0">
          <span
            className="inline-block px-3 py-1 font-bold uppercase tracking-widest"
            style={{
              fontSize: '10px',
              background: catColor[article.category] ?? '#0057B8',
              color: article.category === 'Match Report' ? '#0F172A' : '#fff',
            }}
          >
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <span
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: 'rgba(255,199,44,0.7)' }}
        >
          {formatDate(article.publishedAt)}
        </span>
        <h3 className="font-heading text-xl text-white uppercase leading-tight mb-3 group-hover:text-club-yellow transition-colors">
          {article.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-5 line-clamp-3"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          {article.excerpt}
        </p>
        <div className="mt-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-club-yellow inline-flex items-center gap-2">
            Read More
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}