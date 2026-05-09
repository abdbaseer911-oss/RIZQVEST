import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StockCard from '../components/StockCard';
import { TrendingUp, Users, DollarSign, BarChart2, RefreshCw } from 'lucide-react';
import { useState } from 'react';

const TRACKED_STOCKS = [
  { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Technology', debtRatio: 0.18 },
  { ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', debtRatio: 0.21 },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology', debtRatio: 0.12 },
  { ticker: 'AMZN', name: 'Amazon.com', sector: 'Technology', debtRatio: 0.28 },
  { ticker: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive', debtRatio: 0.10 },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', debtRatio: 0.08 },
];

const STATS = [
  { label: 'Halal Stocks Tracked', value: '2,847', icon: TrendingUp, color: 'var(--accent-teal)' },
  { label: 'Global Markets', value: '42', icon: BarChart2, color: 'var(--accent-gold)' },
  { label: 'Shariah ETFs', value: '18', icon: DollarSign, color: 'var(--accent-green)' },
  { label: 'Active Users', value: '12.4K', icon: Users, color: 'var(--accent-purple)' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState(new Date());

  return (
    <div>
      <Navbar title="Dashboard" />

      {/* Greeting Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f2027, #1a3a4a)',
        border: '1px solid var(--border)',
        borderRadius: 16, padding: '24px 28px', marginBottom: 24,
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', right: 20, top: '50%',
          transform: 'translateY(-50%)', fontSize: 80, opacity: 0.08
        }}>☽</div>
        <div style={{ fontSize: 13, color: 'var(--accent-teal)', marginBottom: 4 }}>
          بسم الله الرحمن الرحيم
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 6 }}>
          Assalamu Alaikum 👋
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 500 }}>
          Your Islamic finance terminal. All stocks screened against AAOIFI Shariah standards.
          Invest with confidence and conscience.
        </p>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10,
              background: `${color}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Icon size={18} color={color} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700 }}>
                {value}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Market Watch Header */}
      <div style={{
        marginBottom: 16,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>Market Watch</h3>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
            Updated: {lastUpdated.toLocaleTimeString()} · Click any stock for details
          </div>
        </div>
        <button
          onClick={() => setLastUpdated(new Date())}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '6px 12px',
            color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer'
          }}
        >
          <RefreshCw size={12} /> Refresh
        </button>
      </div>

      {/* Stock Cards */}
      <div className="grid-3">
        {TRACKED_STOCKS.map(s => (
          <StockCard
            key={s.ticker}
            {...s}
            onClick={() => navigate(`/stock/${s.ticker}`)}
          />
        ))}
      </div>

      {/* Halal ETFs Table */}
      <div style={{ marginTop: 28 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 14 }}>
          Shariah-Compliant ETFs
        </h3>
        <div className="card" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                {['Ticker', 'Name', 'Status', 'AUM', '1Y Return'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['HLAL', 'Wahed FTSE USA Shariah ETF', '$180M', '+14.2%'],
                ['SPUS', 'SP Funds S&P 500 Sharia', '$720M', '+22.1%'],
                ['SPRE', 'SP Funds Global REITs Sharia', '$95M', '+8.7%'],
              ].map(([ticker, name, aum, ret]) => (
                <tr
                  key={ticker}
                  style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  onClick={() => navigate(`/stock/${ticker}`)}
                >
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--accent-teal)' }}>
                    {ticker}
                  </td>
                  <td style={{ padding: '12px' }}>{name}</td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge-halal">✓ Halal</span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{aum}</td>
                  <td style={{ padding: '12px' }} className="up">{ret}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
