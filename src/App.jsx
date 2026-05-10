import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Sidebar from './components/Sidebar'
import MarketTicker from './components/MarketTicker'
import Dashboard from './pages/Dashboard'
import Screener from './pages/Screener'
import Portfolio from './pages/Portfolio'
import Learn from './pages/Learn'
import Gulf from './pages/Gulf'
import StockDetail from './pages/StockDetail'
import Auth from './pages/Auth'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-primary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--accent-teal)', fontFamily: 'var(--font-display)', fontSize: 18
    }}>
      ☽ Loading RizqVest...
    </div>
  )

  if (!session) return <Auth />

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar session={session} />
      <div style={{
        flex: 1, marginLeft: 180,
        display: 'flex', flexDirection: 'column',
        minHeight: '100vh', width: 'calc(100vw - 180px)', overflow: 'hidden'
      }}>
        <MarketTicker />
        <div style={{ padding: '14px 18px', flex: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/screener" element={<Screener />} />
            <Route path="/gulf" element={<Gulf />} />
            <Route path="/portfolio" element={<Portfolio session={session} />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/stock/:ticker" element={<StockDetail session={session} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
