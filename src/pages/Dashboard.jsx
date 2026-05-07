import Navbar from '../components/Navbar';
import StockCard from '../components/StockCard';
import { TrendingUp, Users, DollarSign, BarChart2 } from 'lucide-react';

const DEMO_STOCKS = [
  { ticker: 'AAPL', name: 'Apple Inc.', price: 189.30, change: 1.24, sector: 'Technology' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', price: 415.20, change: 0.87, sector: 'Technology' },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', price: 875.40, change: 3.21, sector: 'Technology' },
  { ticker: 'AMZN', name: 'Amazon.com', price: 178.50, change: -0.54, sector: 'Consumer' },
  { ticker: 'TSLA', name: 'Tesla Inc.', price: 245.10, change: -1.89, sector: 'Automotive' },
  { ticker: 'JPM', name: 'JPMorgan Chase', price: 198.40, change: 0.32, sector: 'Banks' },
];

const STATS = [
  { label: 'Halal Stocks Tracked', value: '2,847', icon: TrendingUp, color: 'var(--accent-teal)' },
  { label: 'Global Markets', value: '42', icon: BarChart2, color: 'var(--accent-gold)' },
  { label: 'Shariah ETFs', value: '18', icon: DollarSign, color: 'var(--accent-green)' },
  { label: 'Active Users', value: '12.4K', icon: Users, color: 'var(--accent-purple)' },
];

export default function Dashboard() {
  return (
    <div>
      <Navbar title="Dashboard" />

      {/* Greeting */}
      <div style={{
        background: 'linear-gradient(135deg, #0f2027, #1a3a4a)',
        border: '1px solid var(--border)',
        borderRadius: 16, padding: '24px 28px', marginBottom: 24,
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
          fontSize: 80, opacity: 0.08
        }}>☽</div>
        <div style={{ fontSize: 13, color: 'var(--accent-teal)', marginBottom: 4 }}>
          بسم الله الرحمن الرحيم
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 6 }}>
          Assalamu Alaikum 👋
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 500 }}>
          Your Islamic finance terminal. All stocks are screened against AAOIFI Shariah standards.
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
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700 }}>{value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Stocks */}
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>Market Watch</h3>
        <span style={{ fontSize: 12, color: 'var(--accent-teal)', cursor: 'pointer' }}>View All →</span>
      </div>
      <div className="grid-3">
        {DEMO_STOCKS.map(s => (
          <StockCard key={s.ticker} {...s} />
        ))}
      </div>

      {/* Halal ETFs */}
      <div style={{ marginTop: 28 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 14 }}>
          Shariah-Compliant ETFs
        </h3>
        <div className="card" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                {['Ticker', 'Name', 'Status', 'AUM', '1Y Return'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['HLAL', 'Wahed FTSE USA Shariah ETF', 'halal', '$180M', '+14.2%'],
                ['SPUS', 'SP Funds S&P 500 Sharia', 'halal', '$720M', '+22.1%'],
                ['SPRE', 'SP Funds Global REITs Sharia', 'halal', '$95M', '+8.7%'],
              ].map(([ticker, name, status, aum, ret]) => (
                <tr key={ticker} style={{ borderBottom: '1px solid var(--border)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--accent-teal)' }}>{ticker}</td>
                  <td style={{ padding: '12px' }}>{name}</td>
                  <td style={{ padding: '12px' }}><span className="badge-halal">✓ Halal</span></td>
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
