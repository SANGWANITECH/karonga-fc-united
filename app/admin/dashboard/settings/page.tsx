'use client'

import { useEffect, useState } from 'react'
import { Lock, Mail, Eye, EyeOff, Loader2, CheckCircle, ShieldAlert } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// Weak password detection
function checkStrength(pw: string): { score: number; label: string; color: string; issues: string[] } {
  const issues: string[] = []
  if (pw.length < 8) issues.push('At least 8 characters')
  if (!/[a-zA-Z]/.test(pw)) issues.push('Include letters')
  if (!/[0-9]/.test(pw)) issues.push('Include a number')

  const common = ['password', '12345678', 'qwerty', 'karonga', 'admin123', 'football']
  if (common.some((c) => pw.toLowerCase().includes(c))) {
    issues.push('Too common / easy to guess')
  }

  // Score 0–4
  let score = 0
  if (pw.length >= 8) score++
  if (pw.length >= 12) score++
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^a-zA-Z0-9]/.test(pw)) score++
  if (issues.length > 0) score = Math.min(score, 1)

  let label = 'Weak'
  let color = '#f87171'
  if (issues.length === 0 && score >= 4) { label = 'Strong'; color = '#4ade80' }
  else if (issues.length === 0 && score >= 2) { label = 'Fair'; color = '#FFC72C' }

  return { score: Math.min(score, 4), label, color, issues }
}

export default function SettingsPage() {
  const [email, setEmail] = useState('')

  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user?.email) setEmail(data.user.email)
    }
    load()
  }, [])

  const strength = checkStrength(newPw)
  const isAcceptable = newPw.length > 0 && strength.issues.length === 0 && strength.label !== 'Weak'

  const handleUpdate = async () => {
    setError('')
    setSuccess(false)

    if (!currentPw) { setError('Please enter your current password.'); return }
    if (!newPw) { setError('Please enter a new password.'); return }
    if (!isAcceptable) { setError('Your new password is too weak. ' + strength.issues.join(', ') + '.'); return }
    if (newPw !== confirmPw) { setError('New passwords do not match.'); return }
    if (newPw === currentPw) { setError('New password must be different from the current one.'); return }

    setSaving(true)
    try {
      // 1. Re-verify current password by re-authenticating
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: currentPw,
      })
      if (signInError) {
        setError('Your current password is incorrect.')
        setSaving(false)
        return
      }

      // 2. Update to the new password
      const { error: updateError } = await supabase.auth.updateUser({ password: newPw })
      if (updateError) throw updateError

      setSuccess(true)
      setCurrentPw('')
      setNewPw('')
      setConfirmPw('')
    } catch (err) {
      console.error(err)
      setError('Could not update password. Please try again.')
    }
    setSaving(false)
  }

  const inputStyle = { background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.12)' }
  const labelStyle = { color: 'rgba(255,255,255,0.6)' }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl text-white uppercase mb-1">Settings</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Manage your account and password.
        </p>
      </div>

      {/* Account Info */}
      <div className="p-6 relative" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute top-0 left-0 w-full" style={{ height: '2px', background: '#FFC72C' }} />
        <div className="flex items-center gap-2 mb-5">
          <Mail size={18} className="text-club-yellow" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-club-yellow">Account</h2>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Logged in as</label>
          <div className="p-3 text-white" style={{ background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.08)' }}>
            {email || '—'}
          </div>
          <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
            To change your email address, please contact the club administrator.
          </p>
        </div>
      </div>

      {/* Change Password */}
      <div className="p-6 relative" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute top-0 left-0 w-full" style={{ height: '2px', background: '#FFC72C' }} />
        <div className="flex items-center gap-2 mb-6">
          <Lock size={18} className="text-club-yellow" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-club-yellow">Change Password</h2>
        </div>

        <div className="space-y-5">
          {/* Current */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                className="w-full p-3 pr-11 text-white outline-none focus:border-club-yellow transition-colors"
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>New Password</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                className="w-full p-3 pr-11 text-white outline-none focus:border-club-yellow transition-colors"
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Strength meter */}
            {newPw.length > 0 && (
              <div className="mt-3">
                <div className="flex gap-1 mb-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 transition-all"
                      style={{ background: i < strength.score ? strength.color : 'rgba(255,255,255,0.1)' }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
                {strength.issues.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {strength.issues.map((issue) => (
                      <li key={issue} className="text-xs flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        <span style={{ color: '#f87171' }}>•</span> {issue}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Confirm */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={labelStyle}>Confirm New Password</label>
            <input
              type={showNew ? 'text' : 'password'}
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              className="w-full p-3 text-white outline-none focus:border-club-yellow transition-colors"
              style={inputStyle}
            />
            {confirmPw.length > 0 && newPw !== confirmPw && (
              <p className="text-xs mt-2" style={{ color: '#f87171' }}>Passwords do not match</p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm px-4 py-3 flex items-start gap-2" style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff9b9b' }}>
              <ShieldAlert size={16} className="flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="text-sm px-4 py-3 flex items-center gap-2" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80' }}>
              <CheckCircle size={16} className="flex-shrink-0" />
              Password updated successfully!
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleUpdate}
            disabled={saving}
            className="px-10 py-3 bg-club-yellow text-navy font-heading uppercase tracking-wide hover:bg-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {saving ? (<><Loader2 size={16} className="animate-spin" /> Updating...</>) : 'Update Password'}
          </button>
        </div>
      </div>
    </div>
  )
}