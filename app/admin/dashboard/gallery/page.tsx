'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { UploadCloud, Trash2, ImageIcon, Loader2, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { uploadImage } from '@/lib/uploadImage'

interface Photo {
  id: string
  image_url: string
  caption: string | null
  category: string
}

const categories = ['General', 'Matchday', 'Training', 'Fans', 'Community']

export default function GalleryManagerPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  // Upload form state
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState('General')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const loadPhotos = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setPhotos(data)
    setLoading(false)
  }

  useEffect(() => {
    loadPhotos()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setError('')
  }

  const clearForm = () => {
    setFile(null)
    setPreview('')
    setCaption('')
    setCategory('General')
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please choose a photo first.')
      return
    }
    setError('')
    setUploading(true)
    try {
      const url = await uploadImage(file, 'gallery')
      const { error } = await supabase.from('gallery').insert({
        image_url: url,
        caption: caption.trim(),
        category,
      })
      if (error) throw error
      clearForm()
      await loadPhotos()
    } catch (err) {
      console.error(err)
      setError('Upload failed. Please try again.')
    }
    setUploading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this photo? This cannot be undone.')) return
    setDeleting(id)
    const { error } = await supabase.from('gallery').delete().eq('id', id)
    setDeleting(null)
    if (error) {
      alert('Could not delete. Please try again.')
      return
    }
    setPhotos((prev) => prev.filter((p) => p.id !== id))
  }

  const inputStyle = { background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.12)' }
  const labelStyle = { color: 'rgba(255,255,255,0.6)' }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl text-white uppercase mb-1">Gallery</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Upload club photos. Images are automatically compressed before saving.
        </p>
      </div>

      {/* Upload Card */}
      <div className="p-6 relative" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute top-0 left-0 w-full" style={{ height: '2px', background: '#FFC72C' }} />
        <h2 className="text-xs font-bold uppercase tracking-widest text-club-yellow mb-5">Add New Photo</h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Image picker / preview */}
          <div className="md:col-span-4">
            <label
              className="relative block cursor-pointer overflow-hidden transition-all hover:border-club-yellow"
              style={{ aspectRatio: '4/3', background: '#0a0f1a', border: '1px dashed rgba(255,255,255,0.2)' }}
            >
              {preview ? (
                <Image src={preview} alt="Preview" fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <UploadCloud size={28} className="text-club-yellow" />
                  <span className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Choose Photo
                  </span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {preview && (
              <button
                onClick={clearForm}
                className="mt-2 text-xs flex items-center gap-1 hover:text-club-yellow transition-colors cursor-pointer"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                <X size={12} /> Clear
              </button>
            )}
          </div>

          {/* Fields */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Caption (optional)</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Victory vs Big Bullets, 2024"
                className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors"
                style={inputStyle}
              >
                {categories.map((c) => (
                  <option key={c} value={c} style={{ background: '#1a1f2e' }}>{c}</option>
                ))}
              </select>
            </div>

            {error && (
              <div className="text-sm px-4 py-2" style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff9b9b' }}>
                {error}
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-8 py-3 bg-club-yellow text-navy font-heading uppercase tracking-wide hover:bg-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {uploading ? (<><Loader2 size={16} className="animate-spin" /> Uploading...</>) : (<><UploadCloud size={16} /> Upload Photo</>)}
            </button>
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-heading text-xl text-white uppercase">All Photos</h2>
          {!loading && (
            <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
            </span>
          )}
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <p className="text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Loading photos...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="p-12 text-center" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
            <ImageIcon size={36} className="mx-auto mb-3 text-white" style={{ opacity: 0.15 }} />
            <p className="text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>No photos yet</p>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Upload your first one above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((p) => (
              <div
                key={p.id}
                className="group relative overflow-hidden"
                style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                <Image src={p.image_url} alt={p.caption || 'Gallery photo'} fill unoptimized className="object-cover" />
                  {/* Delete overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(10,15,26,0.7)' }}
                  >
                    <button
                      onClick={() => handleDelete(p.id)}
                      disabled={deleting === p.id}
                      className="px-4 py-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-red-400 text-red-400 hover:bg-red-400 hover:text-navy transition-all cursor-pointer disabled:opacity-50"
                    >
                      {deleting === p.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      Delete
                    </button>
                  </div>
                  {/* Category badge */}
                  <span
                    className="absolute top-2 left-2 text-xs font-bold uppercase tracking-widest px-2 py-0.5"
                    style={{ background: 'rgba(0,87,184,0.85)', color: '#fff', fontSize: '9px' }}
                  >
                    {p.category}
                  </span>
                </div>
                {p.caption && (
                  <div className="p-3">
                    <p className="text-xs leading-snug" style={{ color: 'rgba(255,255,255,0.6)' }}>{p.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}