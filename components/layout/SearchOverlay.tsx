'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { X, Search, ArrowRight } from 'lucide-react'
import { players } from '@/data/players'
import { newsArticles } from '@/data/news'

// Static pages people might search for
const pages = [
  { label: 'Home', href: '/', keywords: 'home main' },
  { label: 'Team', href: '/team', keywords: 'squad players roster first team' },
  { label: 'Fixtures', href: '/fixtures', keywords: 'matches schedule upcoming games' },
  { label: 'Results', href: '/results', keywords: 'scores past matches league table standings' },
  { label: 'News', href: '/news', keywords: 'articles updates stories' },
  { label: 'Sponsors', href: '/sponsors', keywords: 'partners commercial' },
  { label: 'Gallery', href: '/gallery', keywords: 'photos images media pictures' },
  { label: 'About', href: '/about', keywords: 'history story club mission' },
  { label: 'Contact', href: '/contact', keywords: 'email phone address get in touch' },
]

interface Props {
  isOpen: boolean
  onClose: () => void
}

interface Result {
  type: 'Player' | 'News' | 'Page'
  title: string
  subtitle: string
  href: string
}

export default function SearchOverlay({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  // Build searchable results from query
  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []

    const matches: Result[] = []

    // Players
    players.forEach((p) => {
      if (
        p.name.toLowerCase().includes(q) ||
        p.positionLabel.toLowerCase().includes(q) ||
        p.position.toLowerCase().includes(q)
      ) {
        matches.push({
          type: 'Player',
          title: p.name,
          subtitle: `#${p.number} · ${p.positionLabel}`,
          href: '/team',
        })
      }
    })

    // News
    newsArticles.forEach((a) => {
      if (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      ) {
        matches.push({
          type: 'News',
          title: a.title,
          subtitle: a.category,
          href: `/news/${a.slug}`,
        })
      }
    })

    // Pages
    pages.forEach((p) => {
      if (
        p.label.toLowerCase().includes(q) ||
        p.keywords.includes(q)
      ) {
        matches.push({
          type: 'Page',
          title: p.label,
          subtitle: 'Page',
          href: p.href,
        })
      }
    })

    return matches
  }, [query])

  // Reset + scroll lock + escape key
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      return
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const goTo = (href: string) => {
    router.push(href)
    onClose()
  }

  const typeColor: Record<string, string> = {
    Player: '#FFC72C',
    News: '#0057B8',
    Page: '#4ade80',
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ background: 'rgba(10,15,26,0.98)' }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-4 px-6 py-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <Search size={22} className="text-club-yellow flex-shrink-0" />
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search players, news, pages..."
          className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-white placeholder:opacity-30"
        />
        <button
          onClick={onClose}
          aria-label="Close search"
          className="text-white hover:text-club-yellow transition-colors p-2 cursor-pointer flex-shrink-0"
        >
          <X size={24} />
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-3xl mx-auto">

          {/* Prompt */}
          {query.trim().length < 2 && (
            <div className="text-center py-20">
              <Search size={40} className="mx-auto mb-4 text-white" style={{ opacity: 0.15 }} />
              <p className="text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Type at least 2 characters to search
              </p>
            </div>
          )}

          {/* No results */}
          {query.trim().length >= 2 && results.length === 0 && (
            <div className="text-center py-20">
              <p className="text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                No results for "{query}"
              </p>
            </div>
          )}

          {/* Results list */}
          {results.length > 0 && (
            <>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {results.length} {results.length === 1 ? 'Result' : 'Results'}
              </p>
              <div className="space-y-2">
                {results.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(r.href)}
                    className="group w-full flex items-center gap-4 p-4 text-left transition-all cursor-pointer hover:bg-white hover:bg-opacity-5"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    {/* Type badge */}
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-2 py-1 flex-shrink-0"
                      style={{ background: `${typeColor[r.type]}22`, color: typeColor[r.type], fontSize: '9px' }}
                    >
                      {r.type}
                    </span>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="font-heading text-white uppercase leading-tight group-hover:text-club-yellow transition-colors truncate">
                        {r.title}
                      </div>
                      <div className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {r.subtitle}
                      </div>
                    </div>

                    <ArrowRight size={16} className="text-white opacity-20 group-hover:opacity-100 group-hover:text-club-yellow transition-all flex-shrink-0" />
                  </button>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}