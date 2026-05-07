import { useState } from 'react';
import Navbar from '../components/Navbar';
import { TrendingUp, TrendingDown, Users, DollarSign, BarChart2, RefreshCw } from 'lucide-react';
import { useMarketSnapshot } from '../hooks/useStockData';
import { screenStock } from '../utils/halalScreener';
import { formatPrice, formatChange } from '../utils/formatters';

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

function LiveStockCard({ ticker, name, sector, debtRatio, snapData }) {
  const snap = snapData?.find(s => s.ticker === ticker);
  const price = snap?.day?.c || snap?.prevDay?.c || null;
  const change = snap?.todaysChangePerc || null;
  const isUp = change >= 0;
  const screen = screenStock(ticker, sector, debtRatio);

  return (
    <div className="card" style={{ cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>
            {ticker}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
            {name}
          </div>
        </div>
        <span className={screen.status === 'halal' ? 'badge-halal' : 'badge-screen'}>
          {screen.status === 'halal' ? '✓ Halal' : '⚠ Review'}
        </span>
      </div>

      {price ? (
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 22, fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              {formatPrice(price)}
            </div>
            {change !== null && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 4, marginTop: 4,
                color: isUp ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: 13
              }}>
                {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {formatChange(change)}
                <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>today</span>
              </div>
            )}
          </div>
          <div style={{
            width: 48, height: 28,
            background: isUp
              ? 'linear-gradient(to right, transparent, rgba(34,197,94,0.15))'
              : 'linear-gradient(to right, transparent, rgba(239,68,68,0.15))',
            borderRadius: 4
          }} />
        </div>
      ) : (
        <div style={{
          height: 40, background: 'var(--bg-hover)',
          borderRadius: 6, animation: 'pulse 1.5s infinite'
        }}>
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.4; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const tickers = TRACKED_STOCKS.map(s => s.ticker);
  const { data: snapshots, loading, refetch } = useMarketSnapshot(tickers);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = () => {
    refetch();
    setLastUpdated(new Date());
  };

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

      {/* Market Watch */}
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>Market Watch</h3>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
            Updated: {lastUpdated.toLocaleTimeString()} · Auto-refreshes every 60s
          </div>
        </div>
        <button onClick={handleRefresh} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 8, padding: '6px 12px',
          color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer'
        }}>
          <RefreshCw size={12} /> Refresh
        </button>
      </div>

      <div className="grid-3">
        {TRACKED_STOCKS.map(s => (
          <LiveStockCard
            key={s.ticker}
            {...s}
            snapData={snapshots}
          />
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
                ['HLAL', 'Wahed FTSE USA Shariah ETF', '$180M', '+14.2%'],
                ['SPUS', 'SP Funds S&P 500 Sharia', '$720M', '+22.1%'],
                ['SPRE', 'SP Funds Global REITs Sharia', '$95M', '+8.7%'],
              ].map(([ticker, name, aum, ret]) => (
                <tr key={ticker}
                  style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
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
