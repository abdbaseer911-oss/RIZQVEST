import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StockCard from '../components/StockCard';
import { TrendingUp, DollarSign, BarChart2, RefreshCw } from 'lucide-react';
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
  { label: 'Halal Stocks', value: '2,847', icon: TrendingUp, color: 'var(--accent-teal)' },
  { label: 'Global Markets', value: '42', icon: BarChart2, color: 'var(--accent-gold)' },
  { label: 'Shariah ETFs', value: '18', icon: DollarSign, color: 'var(--accent-green)' },
];

const QUOTES = [
  { text: "Do not consume one another's wealth unjustly.", source: 'Quran 2:188' },
  { text: 'The truthful merchant will be with the prophets and the martyrs.', source: 'Prophet Muhammad ﷺ' },
  { text: 'Risk comes from not knowing what you are doing.', source: 'Warren Buffett' },
  { text: 'An investment in knowledge pays the best interest.', source: 'Benjamin Franklin' },
  { text: 'Allah has permitted trade and forbidden interest.', source: 'Quran 2:275' },
];

const ETF_LIST = [
  { ticker: 'HLAL', name: 'Wahed FTSE USA Shariah ETF', aum: '$180M', ret: '+14.2%' },
  { ticker: 'SPUS', name: 'SP Funds S&P 500 Sharia', aum: '$720M', ret: '+22.1%' },
  { ticker: 'SPRE', name: 'SP Funds Global REITs Sharia', aum: '$95M', ret: '+8.7%' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const quote = QUOTES[Math.floor(Date.now() / 86400000) % QUOTES.length];

  return (
    <div style={{ width: '100%' }}>
      <Navbar title="Dashboard" />

      {/* TOP ROW — Greeting + Quote + Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>

        {/* Greeting */}
        <div style={{
          background: 'linear-gradient(135deg, #0f2027, #1a3a4a)',
          border: '1px solid var(--border)',
          borderRadius: 8, padding: '14px 18px',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', right: 12, top: '50%',
            transform: 'translateY(-50%)', fontSize: 50, opacity: 0.07
          }}>☽</div>
          <div style={{ fontSize: 10, color: 'var(--accent-teal)', marginBottom: 3 }}>
            بسم الله الرحمن الرحيم
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 4 }}>
            Assalamu Alaikum 👋
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 11, lineHeight: 1.5 }}>
            Your Islamic finance terminal. All stocks screened against AAOIFI Shariah standards.
          </p>
        </div>

        {/* Quote + Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            background: 'rgba(240,180,41,0.05)',
            border: '1px solid rgba(240,180,41,0.2)',
            borderRadius: 8, padding: '10px 14px',
            display: 'flex', gap: 8, alignItems: 'flex-start', flex: 1
          }}>
            <span style={{ fontSize: 14 }}>💬</span>
            <div>
              <div style={{ fontSize: 11, fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 2 }}>
                "{quote.text}"
              </div>
              <div style={{ fontSize: 10, color: 'var(--accent-gold)', fontWeight: 600 }}>
                — {quote.source}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {STATS.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="card" style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 10px' }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 6,
                  background: `${color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Icon size={11} color={color} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700 }}>{value}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-secondary)' }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ borderTop: '1px solid var(--border)', marginBottom: 10 }} />

      {/* BOTTOM ROW — Stocks + ETFs */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 10 }}>

        {/* Left — 3x2 Stock Grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13 }}>Market Watch</h3>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 1 }}>
                {lastUpdated.toLocaleTimeString()} · Click for chart
              </div>
            </div>
            <button
              onClick={() => setLastUpdated(new Date())}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 5, padding: '3px 7px',
                color: 'var(--text-secondary)', fontSize: 10, cursor: 'pointer'
              }}
            >
              <RefreshCw size={9} /> Refresh
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {TRACKED_STOCKS.map(s => (
              <StockCard
                key={s.ticker}
                ticker={s.ticker}
                name={s.name}
                sector={s.sector}
                debtRatio={s.debtRatio}
                onClick={() => navigate(`/stock/${s.ticker}`)}
              />
            ))}
          </div>
        </div>

        {/* Right — ETF Table + Gulf Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13 }}>
            Shariah-Compliant ETFs
          </h3>
          <div className="card" style={{ padding: 0, overflow: 'hidden', flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
              <thead>
                <tr style={{
                  color: 'var(--text-muted)',
                  borderBottom: '1px solid var(--border)',
                  background: 'rgba(0,0,0,0.2)'
                }}>
                  {['Ticker', 'Name', 'AUM', 'Return'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '7px 10px', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ETF_LIST.map(({ ticker, name, aum, ret }) => (
                  <tr
                    key={ticker}
                    style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    onClick={() => navigate(`/stock/${ticker}`)}
                  >
                    <td style={{ padding: '8px 10px', fontWeight: 700, color: 'var(--accent-teal)' }}>{ticker}</td>
                    <td style={{ padding: '8px 10px', color: 'var(--text-secondary)', fontSize: 10 }}>{name}</td>
                    <td style={{ padding: '8px 10px' }}>{aum}</td>
                    <td style={{ padding: '8px 10px' }} className="up">{ret}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{
              padding: '8px 10px',
              background: 'rgba(34,197,94,0.04)',
              borderTop: '1px solid var(--border)',
              fontSize: 9, color: 'var(--text-muted)', lineHeight: 1.5
            }}>
              ✓ All ETFs Shariah screened per AAOIFI standards
            </div>
          </div>

          {/* Gulf Preview Card */}
          <div
            onClick={() => navigate('/gulf')}
            style={{
              background: 'linear-gradient(135deg, #0a1f0a, #0f2f1f)',
              border: '1px solid #1a4a2a',
              borderRadius: 8, padding: '10px 14px',
              cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-green)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#1a4a2a'}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-green)', marginBottom: 2 }}>
                🌙 Gulf Markets
              </div>
              <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>
                Saudi 🇸🇦 · UAE 🇦🇪 · Qatar 🇶🇦
              </div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--accent-teal)' }}>Explore →</div>
          </div>
        </div>
      </div>
    </div>
  );
}
