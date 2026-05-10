import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MarketTicker from './components/MarketTicker'
import Dashboard from './pages/Dashboard'
import Screener from './pages/Screener'
import Portfolio from './pages/Portfolio'
import Learn from './pages/Learn'
import Gulf from './pages/Gulf'
import StockDetail from './pages/StockDetail'

export default function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar />
      <div style={{
        flex: 1,
        marginLeft: 180,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: 'calc(100vw - 180px)',
        overflow: 'hidden'
      }}>
        <MarketTicker />
        <div style={{ padding: '14px 18px', flex: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/screener" element={<Screener />} />
            <Route path="/gulf" element={<Gulf />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/stock/:ticker" element={<StockDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
