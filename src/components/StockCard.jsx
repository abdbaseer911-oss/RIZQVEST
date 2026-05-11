import { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { screenStock } from '../utils/halalScreener';

const REFERENCE = {
  AAPL: { c: 211.45, change: 1.24 },
  MSFT: { c: 415.20, change: 0.87 },
  NVDA: { c: 1208.88, change: 3.21 },
  AMZN: { c: 224.19, change: 0.54 },
  TSLA: { c: 176.75, change: -1.89 },
  GOOGL: { c: 175.07, change: 0.62 },
};

const SECTOR_CONFIG = {
  Technology:       { color: '#3b82f6', icon: '💻' },
  Automotive:       { color: '#f97316', icon: '🚗' },
  Healthcare:       { color: '#22c55e', icon: '🏥' },
  Energy:           { color: '#f0b429', icon: '⚡' },
  Consumer:         { color: '#ec4899', icon: '🛍️' },
  Industrials:      { color: '#8b5cf6', icon: '🏭' },
  Telecom:          { color: '#0ed2c8', icon: '📡' },
  ETF:              { color: '#22c55e', icon: '📊' },
  'Islamic Banking':{ color: '#34d399', icon: '🌙' },
  'Real Estate':    { color: '#f97316', icon: '🏢' },
  Entertainment:    { color: '#a855f7', icon: '🎬' },
  Fintech:          { color: '#06b6d4', icon: '💳' },
  Defense:          { color: '#94a3b8', icon: '🛡️' },
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
  const [price, setPrice] = useState(REFERENCE[ticker]?.c || null);
  const [change, setChange] = useState(REFERENCE[ticker]?.change || null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useState(false);
  const screen = screenStock(ticker, sector, debtRatio);
  const isUp = (change || 0) >= 0;
  const cfg = SECTOR_CONFIG[sector] || { color: '#0ed2c8', icon: '📈' };

  useEffect(() => {
    const key = import.meta.env.VITE_ALPHA_KEY;
    if (!key || !ticker) { setLoading(false); return; }
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${key}`)
      .then(r => r.json())
      .then(json => {
        const q = json['Global Quote'];
        if (q && q['05. price']) {
          const p = parseFloat(q['05. price']);
          const c = parseFloat((q['10. change percent'] || '0').replace('%', ''));
          if (p > 0) {
            setPrice(p); setChange(isNaN(c) ? 0 : c); setIsLive(true);
            setFlash(true); setTimeout(() => setFlash(false), 1500);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [ticker]);

  return (
    <div
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, #0f1a2e 50%, ${cfg.color}10)`,
        border: `1px solid ${cfg.color}30`,
        borderRadius: 10, padding: '13px 14px',
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = `${cfg.color}70`;
        e.currentTarget.style.boxShadow = `0 8px 28px ${cfg.color}20`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = `${cfg.color}30`;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top color bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${cfg.color}, transparent)`,
      }} />

      {/* Glow orb */}
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 90, height: 90, borderRadius: '50%',
        background: `radial-gradient(circle, ${cfg.color}18, transparent 70%)`,
        pointerEvents: 'none'
      }} />

      {/* Flash overlay */}
      {flash && (
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 10,
          background: `${cfg.color}08`,
          animation: 'pulse 0.5s ease',
          pointerEvents: 'none'
        }} />
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7, flexShrink: 0,
            background: `${cfg.color}15`,
            border: `1px solid ${cfg.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13
          }}>
            {cfg.icon}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13 }}>
              {ticker}
            </div>
            <div style={{ fontSize: 9, color: cfg.color, marginTop: 1, fontWeight: 600 }}>
              {sector}
            </div>
          </div>
        </div>
        <span className={screen.status === 'halal' ? 'badge-halal' : 'badge-screen'}>
          {screen.status === 'halal' ? '✓ Halal' : '⚠'}
        </span>
      </div>

      {/* Company name */}
      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 8 }}>{name}</div>

      {/* Price */}
      {loading ? (
        <div style={{ height: 32, borderRadius: 6 }} className="shimmer" />
      ) : (
        <>
          <div style={{
            fontSize: 19, fontFamily: 'var(--font-display)', fontWeight: 700,
            marginBottom: 5, color: flash ? cfg.color : 'var(--text-primary)',
            transition: 'color 0.5s'
          }}>
            <AnimatedPrice value={price} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 3,
              color: isUp ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: 11
            }}>
              {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {change !== null ? `${change >= 0 ? '+' : ''}${Number(change).toFixed(2)}%` : '—'}
              <span style={{
                width: 5, height: 5, borderRadius: '50%', marginLeft: 2,
                background: isLive ? 'var(--accent-green)' : '#475569',
                animation: isLive ? 'pulse 2s infinite' : 'none'
              }} />
            </div>
            <span style={{ fontSize: 9, color: cfg.color, opacity: 0.7 }}>View →</span>
          </div>
        </>
      )}
    </div>
  );
}
