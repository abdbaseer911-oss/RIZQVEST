import { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { screenStock } from '../utils/halalScreener';

const REFERENCE = {
  AAPL: { c: 207.15, change: 0.82 },
  MSFT: { c: 415.20, change: 0.87 },
  NVDA: { c: 121.44, change: 2.15 },
  AMZN: { c: 203.19, change: 0.94 },
  TSLA: { c: 248.05, change: -1.23 },
  GOOGL: { c: 165.27, change: 0.42 },
  META: { c: 584.45, change: 1.85 },
  NFLX: { c: 1145.30, change: 0.72 },
  AMD: { c: 108.90, change: 1.10 },
  INTC: { c: 21.30, change: -0.54 },
  HLAL: { c: 34.80, change: 0.73 },
  SPUS: { c: 58.20, change: 0.55 },
  TSM: { c: 172.40, change: 1.23 },
  PYPL: { c: 68.45, change: 0.23 },
};

const SECTOR_CONFIG = {
  Technology: { color: '#3b82f6', icon: '💻' },
  Automotive: { color: '#f97316', icon: '🚗' },
  Healthcare: { color: '#22c55e', icon: '🏥' },
  Energy: { color: '#f0b429', icon: '⚡' },
  Consumer: { color: '#ec4899', icon: '🛍️' },
  Industrials: { color: '#8b5cf6', icon: '🏭' },
  Telecom: { color: '#0ed2c8', icon: '📡' },
  ETF: { color: '#22c55e', icon: '📊' },
  'Islamic Banking': { color: '#34d399', icon: '🌙' },
  'Real Estate': { color: '#f97316', icon: '🏢' },
  Entertainment: { color: '#a855f7', icon: '🎬' },
  Fintech: { color: '#06b6d4', icon: '💳' },
  Defense: { color: '#94a3b8', icon: '🛡️' },
};

function AnimatedPrice({ value }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    if (!value || value === prevRef.current) return;
    const start = prevRef.current || value;
    const end = value;
    const duration = 800;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + (end - start) * eased);
      if (progress >= 1) {
        clearInterval(timer);
        prevRef.current = end;
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return <>${display ? display.toFixed(2) : '—'}</>;
}

export default function StockCard({ ticker, name, sector, debtRatio, onClick }) {
  const [price, setPrice] = useState(REFERENCE[ticker] ? REFERENCE[ticker].c : null);
  const [change, setChange] = useState(REFERENCE[ticker] ? REFERENCE[ticker].change : null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useState(false);

  const screen = screenStock(ticker, sector, debtRatio);
  const isUp = (change || 0) >= 0;
  const cfg = SECTOR_CONFIG[sector] || { color: '#0ed2c8', icon: '📈' };

  useEffect(() => {
    const key = import.meta.env.VITE_ALPHA_KEY;
    if (!key || !ticker) {
      setLoading(false);
      return;
    }
    fetch(
      'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' +
      ticker + '&apikey=' + key
    )
      .then(function(r) { return r.json(); })
      .then(function(json) {
        var q = json['Global Quote'];
        if (q && q['05. price']) {
          var p = parseFloat(q['05. price']);
          var rawChange = q['10. change percent'] || '0';
          var c = parseFloat(rawChange.replace('%', ''));
          if (p > 0) {
            setPrice(p);
            setChange(isNaN(c) ? 0 : c);
            setIsLive(true);
            setFlash(true);
            setTimeout(function() { setFlash(false); }, 1500);
          }
        }
      })
      .catch(function() {})
      .finally(function() { setLoading(false); });
  }, [ticker]);

  return (
    <div
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, #0f1a2e 50%, ' + cfg.color + '10)',
        border: '1px solid ' + cfg.color + '30',
        borderRadius: 10,
        padding: '11px 12px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={function(e) {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = cfg.color + '70';
        e.currentTarget.style.boxShadow = '0 8px 28px ' + cfg.color + '20';
      }}
      onMouseLeave={function(e) {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = cfg.color + '30';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top color bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, ' + cfg.color + ', transparent)',
      }} />

      {/* Glow orb */}
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 80, height: 80, borderRadius: '50%',
        background: 'radial-gradient(circle, ' + cfg.color + '18, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 24, height: 24, borderRadius: 6, flexShrink: 0,
            background: cfg.color + '15',
            border: '1px solid ' + cfg.color + '30',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11,
          }}>
            {cfg.icon}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12 }}>
              {ticker}
            </div>
            <div style={{ fontSize: 8, color: cfg.color, fontWeight: 600 }}>
              {sector}
            </div>
          </div>
        </div>
        <span className={screen.status === 'halal' ? 'badge-halal' : screen.status === 'haram' ? 'badge-haram' : 'badge-screen'}>
          {screen.status === 'halal' ? '✓' : screen.status === 'haram' ? '✗' : '⚠'}
        </span>
      </div>

      {/* Name */}
      <div style={{ fontSize: 9, color: 'var(--text-muted)', marginBottom: 7 }}>{name}</div>

      {/* Price */}
      {loading ? (
        <div style={{ height: 30, borderRadius: 5 }} className="shimmer" />
      ) : (
        <div>
          <div style={{
            fontSize: 17, fontFamily: 'var(--font-display)', fontWeight: 700,
            marginBottom: 4,
            color: flash ? cfg.color : 'var(--text-primary)',
            transition: 'color 0.5s',
          }}>
            <AnimatedPrice value={price} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 3,
              color: isUp ? 'var(--accent-green)' : 'var(--accent-red)',
              fontSize: 10,
            }}>
              {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {change !== null ? (change >= 0 ? '+' : '') + Number(change).toFixed(2) + '%' : '—'}
              <span style={{
                width: 5, height: 5, borderRadius: '50%', marginLeft: 2,
                background: isLive ? 'var(--accent-green)' : '#475569',
                animation: isLive ? 'pulse 2s infinite' : 'none',
              }} />
            </div>
            <span style={{ fontSize: 8, color: cfg.color, opacity: 0.7 }}>View →</span>
          </div>
        </div>
      )}
    </div>
  );
}
