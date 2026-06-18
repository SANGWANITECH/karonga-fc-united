'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { UploadCloud, Loader2, ArrowLeft, User, BarChart3 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { uploadImage } from '@/lib/uploadImage'

// Position dropdown → maps to short code + label
const positionOptions = [
  { value: 'GK', label: 'Goalkeeper' },
  { value: 'DEF', label: 'Defender' },
  { value: 'MID', label: 'Midfielder' },
  { value: 'FWD', label: 'Forward' },
]

export default function PlayerEditorPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const isNew = id === 'new'

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [position, setPosition] = useState('FWD')
  const [nationality, setNationality] = useState('Malawian')
  const [age, setAge] = useState('')
  const [appearances, setAppearances] = useState('0')
  const [goals, setGoals] = useState('0')
  const [assists, setAssists] = useState('0')
  const [cleanSheets, setCleanSheets] = useState('0')
  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isNew) return
    const load = async () => {
      const { data, error } = await supabase.from('players').select('*').eq('id', id).single()
      if (error || !data) {
        setError('Could not load this player.')
        setLoading(false)
        return
      }
      setName(data.name)
      setNumber(data.number?.toString() ?? '')
      setPosition(data.position)
      setNationality(data.nationality ?? 'Malawian')
      setAge(data.age?.toString() ?? '')
      setAppearances(data.appearances?.toString() ?? '0')
      setGoals(data.goals?.toString() ?? '0')
      setAssists(data.assists?.toString() ?? '0')
      setCleanSheets(data.clean_sheets?.toString() ?? '0')
      setImageUrl(data.image_url ?? '')
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
    if (!name.trim()) {
      setError('Please enter the player name.')
      return
    }

    setSaving(true)
    try {
      let finalImageUrl = imageUrl
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile, 'players')
      }

      const label = positionOptions.find((p) => p.value === position)?.label ?? position

      const record = {
        name: name.trim(),
        number: number ? parseInt(number) : null,
        position,
        position_label: label,
        nationality: nationality.trim(),
        age: age ? parseInt(age) : null,
        appearances: parseInt(appearances) || 0,
        goals: parseInt(goals) || 0,
        assists: parseInt(assists) || 0,
        clean_sheets: parseInt(cleanSheets) || 0,
        image_url: finalImageUrl,
      }

      if (isNew) {
        const { error } = await supabase.from('players').insert(record)
        if (error) throw error
      } else {
        const { error } = await supabase.from('players').update(record).eq('id', id)
        if (error) throw error
      }

      router.push('/admin/dashboard/players')
    } catch (err) {
      console.error(err)
      setError('Something went wrong while saving. Please try again.')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-12 text-center">
        <p className="text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Loading...</p>
      </div>
    )
  }

  const inputStyle = { background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.12)' }
  const labelStyle = { color: 'rgba(255,255,255,0.6)' }
  const shownImage = imagePreview || imageUrl

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Back */}
      <Link
        href="/admin/dashboard/players"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-club-yellow transition-colors"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        <ArrowLeft size={14} /> Back to Squad
      </Link>

      {/* Header */}
      <h1 className="font-heading text-3xl text-club-yellow uppercase">
        {isNew ? 'Add New Player' : 'Edit Player'}
      </h1>

      {/* Section 1 — Identity */}
      <div className="p-6 relative" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute top-0 left-0 w-full" style={{ height: '2px', background: '#FFC72C' }} />
        <div className="flex items-center gap-3 mb-6">
          <User size={20} className="text-club-yellow" />
          <h2 className="font-heading text-xl text-white uppercase">Personal Identity</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Photo */}
          <div className="md:col-span-4 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-widest" style={labelStyle}>Player Photo</label>
            <label
              className="relative block cursor-pointer overflow-hidden transition-all hover:border-club-yellow"
              style={{ aspectRatio: '3/4', background: '#0a0f1a', border: '1px dashed rgba(255,255,255,0.2)' }}
            >
              {shownImage ? (
                <Image src={shownImage} alt="Player" fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <UploadCloud size={28} className="text-club-yellow" />
                  <span className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Upload Photo
                  </span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            <p className="text-xs uppercase" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px' }}>
              Best: portrait photo in kit
            </p>
          </div>

          {/* Fields */}
          <div className="md:col-span-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Player name"
                  className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors" style={inputStyle} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Jersey Number</label>
                <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="10"
                  className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors" style={inputStyle} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Position</label>
                <select value={position} onChange={(e) => setPosition(e.target.value)}
                  className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors" style={inputStyle}>
                  {positionOptions.map((p) => (
                    <option key={p.value} value={p.value} style={{ background: '#1a1f2e' }}>{p.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Nationality</label>
                <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)}
                  className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors" style={inputStyle} />
              </div>
            </div>

            <div className="md:w-1/2">
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="24"
                className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors" style={inputStyle} />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 — Stats */}
      <div className="p-6" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 size={20} className="text-club-yellow" />
          <h2 className="font-heading text-xl text-white uppercase">Season Statistics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Appearances</label>
            <input type="number" value={appearances} onChange={(e) => setAppearances(e.target.value)}
              className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors font-heading text-xl" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Goals</label>
            <input type="number" value={goals} onChange={(e) => setGoals(e.target.value)}
              className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors font-heading text-xl" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Assists</label>
            <input type="number" value={assists} onChange={(e) => setAssists(e.target.value)}
              className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors font-heading text-xl" style={inputStyle} />
          </div>
        </div>

        {/* Clean Sheets — goalkeepers only */}
        {position === 'GK' && (
          <div className="mt-6 md:w-1/3">
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Clean Sheets</label>
            <input type="number" value={cleanSheets} onChange={(e) => setCleanSheets(e.target.value)}
              className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors font-heading text-xl" style={inputStyle} />
            <p className="text-xs uppercase mt-2" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px' }}>
              Shown for goalkeepers only
            </p>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm px-4 py-3" style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff9b9b' }}>
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-2">
        <Link href="/admin/dashboard/players" className="px-8 py-3 font-heading uppercase tracking-wide text-white hover:text-club-yellow transition-colors">
          Cancel
        </Link>
        <button onClick={handleSave} disabled={saving}
          className="px-10 py-3 bg-club-yellow text-navy font-heading uppercase tracking-wide hover:bg-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-70">
          {saving ? (<><Loader2 size={16} className="animate-spin" /> Saving...</>) : 'Save Player'}
        </button>
      </div>
    </div>
  )
}