import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StockCard from '../components/StockCard';
import { RefreshCw } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const TRACKED_STOCKS = [
  { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Technology', debtRatio: 0.18 },
  { ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', debtRatio: 0.21 },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology', debtRatio: 0.12 },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', debtRatio: 0.08 },
  { ticker: 'AMZN', name: 'Amazon.com', sector: 'Consumer', debtRatio: 0.28 },
  { ticker: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive', debtRatio: 0.10 },
  { ticker: 'META', name: 'Meta Platforms', sector: 'Technology', debtRatio: 0.09 },
  { ticker: 'AMD', name: 'Advanced Micro Devices', sector: 'Technology', debtRatio: 0.11 },
  { ticker: 'NFLX', name: 'Netflix Inc.', sector: 'Entertainment', debtRatio: 0.31 },
  { ticker: 'PYPL', name: 'PayPal Holdings', sector: 'Fintech', debtRatio: 0.24 },
  { ticker: 'HLAL', name: 'Wahed Shariah ETF', sector: 'ETF', debtRatio: 0.0 },
  { ticker: 'TSM', name: 'Taiwan Semiconductor', sector: 'Technology', debtRatio: 0.14 },
];

const ETF_LIST = [
  { ticker: 'HLAL', name: 'Wahed FTSE USA Shariah ETF', aum: '$180M', ret: '+14.2%', region: '🇺🇸' },
  { ticker: 'SPUS', name: 'SP Funds S&P 500 Sharia', aum: '$720M', ret: '+22.1%', region: '🇺🇸' },
  { ticker: 'SPRE', name: 'SP Funds Global REITs Sharia', aum: '$95M', ret: '+8.7%', region: '🌍' },
  { ticker: 'UMMA', name: 'Saturna Al-Kawthar Global', aum: '$45M', ret: '+11.3%', region: '🌍' },
  { ticker: 'SPSK', name: 'SP Funds Dow Jones Global Sukuk', aum: '$38M', ret: '+4.2%', region: '🌍' },
  { ticker: 'AMANX', name: 'Amana Income Fund', aum: '$1.2B', ret: '+9.8%', region: '🇺🇸' },
  { ticker: 'AMAGX', name: 'Amana Growth Fund', aum: '$2.1B', ret: '+18.4%', region: '🇺🇸' },
  { ticker: 'ADJEX', name: 'Azzad Ethical Mid Cap Fund', aum: '$220M', ret: '+13.7%', region: '🇺🇸' },
];

const QUOTES = [
  { text: "Do not consume one another's wealth unjustly.", source: 'Quran 2:188' },
  { text: 'The truthful merchant will be with the prophets and the martyrs.', source: 'Prophet Muhammad ﷺ' },
  { text: 'Risk comes from not knowing what you are doing.', source: 'Warren Buffett' },
  { text: 'An investment in knowledge pays the best interest.', source: 'Benjamin Franklin' },
  { text: 'Allah has permitted trade and forbidden interest.', source: 'Quran 2:275' },
];

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const duration = 1500;
        const startTime = Date.now();
        const timer = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(target * eased));
          if (progress >= 1) clearInterval(timer);
        }, 16);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const STATS = [
  { label: 'Halal Stocks', target: 2847, color: 'var(--accent-teal)', icon: '✓' },
  { label: 'Global Markets', target: 42, color: 'var(--accent-gold)', icon: '🌍' },
  { label: 'Shariah ETFs', target: 18, color: 'var(--accent-green)', icon: '📊' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const quote = QUOTES[Math.floor(Date.now() / 86400000) % QUOTES.length];

  return (
    <div style={{ width: '100%', animation: 'fadeInUp 0.4s ease' }}>
      <Navbar title="Dashboard" />

      {/* TOP ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
        {/* Greeting */}
        <div style={{
          background: 'linear-gradient(135deg, #0f2027, #1a3a4a)',
          border: '1px solid rgba(14,210,200,0.15)',
          borderRadius: 10, padding: '16px 20px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: 10, top: '50%',
            transform: 'translateY(-50%)', fontSize: 55, opacity: 0.06,
            animation: 'float 8s ease-in-out infinite'
          }}>☽</div>
          <div style={{ fontSize: 10, color: 'var(--accent-teal)', marginBottom: 4 }}>
            بسم الله الرحمن الرحيم
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 17, marginBottom: 5 }}>
            Assalamu Alaikum 👋
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 11, lineHeight: 1.6 }}>
            Your Islamic finance terminal. All stocks screened against AAOIFI Shariah standards.
          </p>
        </div>

        {/* Quote + Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(240,180,41,0.06), rgba(14,210,200,0.03))',
            border: '1px solid rgba(240,180,41,0.2)',
            borderRadius: 10, padding: '10px 14px',
            display: 'flex', gap: 8, flex: 1,
          }}>
            <span style={{ fontSize: 16, marginTop: 1 }}>💬</span>
            <div>
              <div style={{ fontSize: 11, fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: 3 }}>
                "{quote.text}"
              </div>
              <div style={{ fontSize: 10, color: 'var(--accent-gold)', fontWeight: 600 }}>
                — {quote.source}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {STATS.map(({ label, target, color, icon }) => (
              <div key={label} className="card" style={{
                padding: '10px 12px', textAlign: 'center',
                background: `linear-gradient(135deg, var(--bg-card), ${color}08)`,
                border: `1px solid ${color}20`
              }}>
                <div style={{ fontSize: 18, marginBottom: 3 }}>{icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color }}>
                  <AnimatedCounter target={target} />
                </div>
                <div style={{ fontSize: 9, color: 'var(--text-secondary)', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ borderTop: '1px solid var(--border)', marginBottom: 10, position: 'relative' }}>
        <div style={{
          position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
          width: 60, height: 1,
          background: 'linear-gradient(90deg, transparent, var(--accent-teal), transparent)'
        }} />
      </div>

      {/* BOTTOM ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 10 }}>

        {/* Left — 12 Stocks in 4x3 grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13 }}>Market Watch</h3>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 1 }}>
                {lastUpdated.toLocaleTimeString()} · Click any card for chart
              </div>
            </div>
            <button
              onClick={() => setLastUpdated(new Date())}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 6, padding: '4px 8px',
                color: 'var(--text-secondary)', fontSize: 10, cursor: 'pointer',
                transition: 'all 0.15s'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-teal)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <RefreshCw size={10} /> Refresh
            </button>
          </div>

          {/* 4 columns x 3 rows = 12 stocks */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 8
          }} className="stagger">
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

        {/* Right — 8 ETFs + Gulf */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13 }}>
            Shariah-Compliant ETFs
          </h3>
          <div className="card" style={{ padding: 0, overflow: 'hidden', flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                  {['', 'Ticker', 'AUM', '1Y'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '6px 8px', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ETF_LIST.map(({ ticker, name, aum, ret, region }) => (
                  <tr
                    key={ticker}
                    style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    onClick={() => navigate(`/stock/${ticker}`)}
                    title={name}
                  >
                    <td style={{ padding: '6px 8px', fontSize: 12 }}>{region}</td>
                    <td style={{ padding: '6px 8px', fontWeight: 700, color: 'var(--accent-green)', fontSize: 11 }}>{ticker}</td>
                    <td style={{ padding: '6px 8px', color: 'var(--text-muted)', fontSize: 10 }}>{aum}</td>
                    <td style={{ padding: '6px 8px', color: 'var(--accent-green)', fontWeight: 600 }}>{ret}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: '6px 8px', background: 'rgba(34,197,94,0.04)', borderTop: '1px solid var(--border)', fontSize: 9, color: 'var(--text-muted)' }}>
              ✓ All ETFs screened per AAOIFI standards · Hover for full name
            </div>
          </div>

          {/* Gulf card */}
          <div
            onClick={() => navigate('/gulf')}
            style={{
              background: 'linear-gradient(135deg, #071a07, #0f2f1a)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: 10, padding: '10px 14px', cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent-green)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(34,197,94,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(34,197,94,0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-green)', marginBottom: 2 }}>
                🌙 Gulf Markets
              </div>
              <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>
                Saudi 🇸🇦 · UAE 🇦🇪 · Qatar 🇶🇦
              </div>
            </div>
            <div style={{ fontSize: 18, color: 'var(--accent-teal)' }}>→</div>
          </div>
        </div>
      </div>
    </div>
  );
}
