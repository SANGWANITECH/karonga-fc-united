'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { UploadCloud, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { uploadImage } from '@/lib/uploadImage'

const categories = ['Match Report', 'Club News', 'Player Updates', 'Youth Academy', 'Community']

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function NewsEditorPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const isNew = id === 'new'

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0])
  const [excerpt, setExcerpt] = useState('')
  const [body, setBody] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // If editing, load the existing article
  useEffect(() => {
    if (isNew) return
    const load = async () => {
      const { data, error } = await supabase.from('news').select('*').eq('id', id).single()
      if (error || !data) {
        setError('Could not load this article.')
        setLoading(false)
        return
      }
      setTitle(data.title)
      setCategory(data.category)
      setPublishDate(data.publish_date)
      setExcerpt(data.excerpt || '')
      setBody(data.body || '')
      setImageUrl(data.image_url || '')
      setLoading(false)
    }
    load()
  }, [id, isNew])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSave = async () => {
    setError('')

    if (!title.trim()) {
      setError('Please enter a title.')
      return
    }

    setSaving(true)

    try {
      // Upload new image if one was picked
      let finalImageUrl = imageUrl
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile, 'news')
      }

      const record = {
        title: title.trim(),
        slug: slugify(title),
        category,
        excerpt: excerpt.trim(),
        body: body.trim(),
        image_url: finalImageUrl,
        publish_date: publishDate,
      }

      if (isNew) {
        const { error } = await supabase.from('news').insert(record)
        if (error) throw error
      } else {
        const { error } = await supabase.from('news').update(record).eq('id', id)
        if (error) throw error
      }

      router.push('/admin/dashboard/news')
    } catch (err) {
      console.error(err)
      setError('Something went wrong while saving. Please try again.')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-12 text-center">
        <p className="text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Loading...
        </p>
      </div>
    )
  }

  const inputStyle = {
    background: '#0a0f1a',
    border: '1px solid rgba(255,255,255,0.12)',
  }
  const labelStyle = { color: 'rgba(255,255,255,0.6)' }

  const shownImage = imagePreview || imageUrl

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Back link */}
      <Link
        href="/admin/dashboard/news"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-club-yellow transition-colors"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        <ArrowLeft size={14} /> Back to News
      </Link>

      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl text-club-yellow uppercase mb-1">
          {isNew ? 'Create News Article' : 'Edit News Article'}
        </h1>
        <p className="text-sm uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Karonga United Official News
        </p>
      </div>

      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Article Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter headline..."
            className="w-full p-4 text-white outline-none focus:border-club-yellow transition-colors"
            style={inputStyle}
          />
        </div>

        {/* Category + Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 text-white outline-none focus:border-club-yellow transition-colors"
              style={inputStyle}
            >
              {categories.map((c) => (
                <option key={c} value={c} style={{ background: '#1a1f2e' }}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Publish Date</label>
            <input
              type="date"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="w-full p-4 text-white outline-none focus:border-club-yellow transition-colors"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Excerpt (short summary)</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="Brief summary shown on the news list..."
            className="w-full p-4 text-white outline-none focus:border-club-yellow transition-colors resize-none"
            style={inputStyle}
          />
        </div>

        {/* Body */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Body Content</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            placeholder="Write the full story here. Leave a blank line between paragraphs."
            className="w-full p-4 text-white outline-none focus:border-club-yellow transition-colors resize-none"
            style={inputStyle}
          />
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Tip: press Enter twice to start a new paragraph.
          </p>
        </div>

        {/* Image */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Featured Image</label>

          {shownImage && (
            <div className="relative w-full h-48 mb-3 overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              <Image src={shownImage} alt="Preview" fill className="object-cover" />
            </div>
          )}

          <label
            className="w-full h-32 border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:border-club-yellow"
            style={{ borderColor: 'rgba(255,255,255,0.15)', background: '#0a0f1a' }}
          >
            <UploadCloud size={28} style={{ color: 'rgba(255,255,255,0.4)' }} />
            <span className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {shownImage ? 'Click to change image' : 'Click to upload image (JPG, PNG)'}
            </span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {/* Error */}
        {error && (
          <div className="text-sm px-4 py-3" style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff9b9b' }}>
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link
            href="/admin/dashboard/news"
            className="px-6 py-3 font-heading uppercase tracking-wide text-white hover:text-club-yellow transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-club-yellow text-navy font-heading uppercase tracking-wide hover:bg-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Saving...
              </>
            ) : (
              'Save Article'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}