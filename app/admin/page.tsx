'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Mail, Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    setError('')

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    setLoading(false)

    if (error) {
      setError('Invalid email or password. Please try again.')
      return
    }

    // Success → go to dashboard
    router.push('/admin/dashboard')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative"
      style={{ background: '#0a0f1a' }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo + Brand */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="relative w-16 h-16 rounded-full border-2 border-club-yellow overflow-hidden mb-4"
            style={{ boxShadow: '0 0 25px rgba(255,199,44,0.25)' }}
          >
            <Image src="/images/logo.avif" alt="Karonga United FC" fill className="object-cover" priority />
          </div>
          <h1 className="font-heading text-3xl text-club-yellow uppercase tracking-wide text-center leading-none">
            Karonga United FC
          </h1>
          <p className="text-xs uppercase tracking-widest mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
            CMS Administration
          </p>
        </div>

        {/* Login Card */}
        <div
          className="p-8 sm:p-10"
          style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.4)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="name@karongaunited.mw"
                  className="w-full py-3 pl-11 pr-4 text-white outline-none focus:border-club-yellow transition-colors text-sm"
                  style={{ background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.15)' }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.4)' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="••••••••"
                  className="w-full py-3 pl-11 pr-4 text-white outline-none focus:border-club-yellow transition-colors text-sm"
                  style={{ background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.15)' }}
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div
                className="text-sm px-4 py-3"
                style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff9b9b' }}
              >
                {error}
              </div>
            )}

            {/* Login button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-club-yellow text-navy font-heading text-lg uppercase tracking-wide py-3.5 hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Authenticating...
                </>
              ) : (
                <>
                  Log In <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

          {/* Secure indicator */}
          <div className="mt-8 pt-6 flex items-center justify-center gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <ShieldCheck size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Secure Administrator Gateway
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}