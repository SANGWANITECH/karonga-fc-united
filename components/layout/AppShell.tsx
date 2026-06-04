'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from './LoadingScreen'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   
    const timer = setTimeout(() => setLoading(false), 7000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {loading && <LoadingScreen />}
      {children}
    </>
  )
}