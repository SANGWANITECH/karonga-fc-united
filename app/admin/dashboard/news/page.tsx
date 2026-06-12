'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Search, Pencil, Trash2, Newspaper } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface NewsRow {
  id: string
  title: string
  category: string
  image_url: string | null
  publish_date: string
}

export default function NewsListPage() {
  const [articles, setArticles] = useState<NewsRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  // Load articles from Supabase
  const loadArticles = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('news')
      .select('id, title, category, image_url, publish_date')
      .order('publish_date', { ascending: false })

    if (!error && data) setArticles(data)
    setLoading(false)
  }

  useEffect(() => {
    loadArticles()
  }, [])

  // Delete an article
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(id)
    const { error } = await supabase.from('news').delete().eq('id', id)
    setDeleting(null)
    if (error) {
      alert('Could not delete. Please try again.')
      return
    }
    setArticles((prev) => prev.filter((a) => a.id !== id))
  }

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-white uppercase mb-1">News Manager</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Create, edit, and publish club news articles.
          </p>
        </div>
        <Link
          href="/admin/dashboard/news/new"
          className="bg-club-yellow text-navy font-heading text-base uppercase px-6 py-3 flex items-center gap-2 hover:bg-white transition-colors self-start"
        >
          <Plus size={18} /> Add New Article
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full py-3 pl-12 pr-4 text-white outline-none focus:border-club-yellow transition-colors text-sm"
          style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)' }}
        />
      </div>

      {/* Table */}
      <div style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
        {loading ? (
          <div className="p-12 text-center">
            <p className="text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Loading articles...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Newspaper size={36} className="mx-auto mb-3 text-white" style={{ opacity: 0.15 }} />
            <p className="text-sm uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {search ? 'No matching articles' : 'No articles yet'}
            </p>
            {!search && (
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Click "Add New Article" to create your first one.
              </p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>Image</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>Title</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest hidden sm:table-cell" style={{ color: 'rgba(255,255,255,0.5)' }}>Category</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest hidden md:table-cell" style={{ color: 'rgba(255,255,255,0.5)' }}>Date</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-widest text-right" style={{ color: 'rgba(255,255,255,0.5)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    {/* Image */}
                    <td className="p-4">
                      <div className="relative w-16 h-12 overflow-hidden flex-shrink-0" style={{ background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {a.image_url ? (
                          <Image src={a.image_url} alt={a.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Newspaper size={16} style={{ color: 'rgba(255,255,255,0.2)' }} />
                          </div>
                        )}
                      </div>
                    </td>
                    {/* Title */}
                    <td className="p-4">
                      <span className="font-heading text-white">{a.title}</span>
                    </td>
                    {/* Category */}
                    <td className="p-4 hidden sm:table-cell">
                      <span className="px-2 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(0,87,184,0.15)', color: '#7eb0ff' }}>
                        {a.category}
                      </span>
                    </td>
                    {/* Date */}
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{formatDate(a.publish_date)}</span>
                    </td>
                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/dashboard/news/${a.id}`}
                          aria-label="Edit"
                          className="w-9 h-9 flex items-center justify-center transition-all hover:border-club-yellow hover:text-club-yellow"
                          style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(a.id, a.title)}
                          disabled={deleting === a.id}
                          aria-label="Delete"
                          className="w-9 h-9 flex items-center justify-center transition-all hover:border-red-400 hover:text-red-400 cursor-pointer disabled:opacity-50"
                          style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}