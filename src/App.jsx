import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MarketTicker from './components/MarketTicker'
import Dashboard from './pages/Dashboard'
import Screener from './pages/Screener'
import Portfolio from './pages/Portfolio'
import Learn from './pages/Learn'
import Gulf from './pages/Gulf'

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div style={{ flex: 1, marginLeft: 220 }}>
        <MarketTicker />
        <div className="main-content" style={{ marginLeft: 0 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/screener" element={<Screener />} />
            <Route path="/gulf" element={<Gulf />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/learn" element={<Learn />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
