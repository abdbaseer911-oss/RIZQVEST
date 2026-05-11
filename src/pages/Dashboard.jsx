import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StockCard from '../components/StockCard';
import { TrendingUp, DollarSign, BarChart2, RefreshCw } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const TRACKED_STOCKS = [
  { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Technology', debtRatio: 0.18 },
  { ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', debtRatio: 0.21 },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology', debtRatio: 0.12 },
  { ticker: 'AMZN', name: 'Amazon.com', sector: 'Consumer', debtRatio: 0.28 },
  { ticker: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive', debtRatio: 0.10 },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', debtRatio: 0.08 },
];

const ETF_LIST = [
  { ticker: 'HLAL', name: 'Wahed FTSE USA Shariah ETF', aum: '$180M', ret: '+14.2%' },
  { ticker: 'SPUS', name: 'SP Funds S&P 500 Sharia', aum: '$720M', ret: '+22.1%' },
  { ticker: 'SPRE', name: 'SP Funds Global REITs Sharia', aum: '$95M', ret: '+8.7%' },
];

const QUOTES = [
  { text: "Do not consume one another's wealth unjustly.", source: 'Quran 2:188' },
  { text: 'The truthful merchant will be with the prophets and the martyrs.', source: 'Prophet Muhammad ﷺ' },
  { text: 'Risk comes from not knowing what you are doing.', source: 'Warren Buffett' },
  { text: 'An investment in knowledge pays the best interest.', source: 'Benjamin Franklin' },
  { text: 'Allah has permitted trade and forbidden interest.', source: 'Quran 2:275' },
];

function AnimatedCounter({ target, suffix = '', prefix = '' }) {
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

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const STATS = [
  { label: 'Halal Stocks', target: 2847, suffix: '', icon: TrendingUp, color: 'var(--accent-teal)' },
  { label: 'Global Markets', target: 42, suffix: '', icon: BarChart2, color: 'var(--accent-gold)' },
  { label: 'Shariah ETFs', target: 18, suffix: '', icon: DollarSign, color: 'var(--accent-green)' },
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
          animation: 'fadeInLeft 0.4s ease'
        }}>
          <div style={{
            position: 'absolute', right: 10, top: '50%',
            transform: 'translateY(-50%)', fontSize: 55, opacity: 0.06,
            animation: 'float 8s ease-in-out infinite'
          }}>☽</div>
          <div style={{ fontSize: 10, color: 'var(--accent-teal)', marginBottom: 4, letterSpacing: 0.5 }}>
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
            animation: 'fadeInUp 0.4s ease 0.1s both'
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

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
            animation: 'fadeInUp 0.4s ease 0.2s both'
          }}>
            {STATS.map(({ label, target, suffix, icon: Icon, color }) => (
              <div key={label} className="card" style={{
                display: 'flex', gap: 8, alignItems: 'center', padding: '8px 10px',
                background: `linear-gradient(135deg, var(--bg-card), ${color}08)`,
                border: `1px solid ${color}20`
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 6,
                  background: `${color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Icon size={12} color={color} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color }}>
                    <AnimatedCounter target={target} suffix={suffix} />
                  </div>
                  <div style={{ fontSize: 9, color: 'var(--text-secondary)' }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{
        borderTop: '1px solid var(--border)', marginBottom: 10,
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
          width: 60, height: 1,
          background: 'linear-gradient(90deg, transparent, var(--accent-teal), transparent)'
        }} />
      </div>

      {/* BOTTOM ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 10 }}>

        {/* Left — Stocks */}
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }} className="stagger">
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

        {/* Right — ETFs + Gulf */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13 }}>
            Shariah-Compliant ETFs
          </h3>
          <div className="card" style={{ padding: 0, overflow: 'hidden', flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                  {['Ticker', 'Name', 'AUM', '1Y'].map(h => (
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
                    <td style={{ padding: '8px 10px', fontWeight: 700, color: 'var(--accent-green)' }}>{ticker}</td>
                    <td style={{ padding: '8px 10px', color: 'var(--text-muted)', fontSize: 10 }}>{name}</td>
                    <td style={{ padding: '8px 10px' }}>{aum}</td>
                    <td style={{ padding: '8px 10px' }} className="up">{ret}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: '7px 10px', background: 'rgba(34,197,94,0.04)', borderTop: '1px solid var(--border)', fontSize: 9, color: 'var(--text-muted)' }}>
              ✓ All ETFs screened per AAOIFI standards
            </div>
          </div>

          <div
            onClick={() => navigate('/gulf')}
            style={{
              background: 'linear-gradient(135deg, #071a07, #0f2f1a)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: 10, padding: '12px 14px', cursor: 'pointer',
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
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-green)', marginBottom: 3 }}>
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
