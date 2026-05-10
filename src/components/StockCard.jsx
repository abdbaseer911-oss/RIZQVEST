import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { screenStock } from '../utils/halalScreener';

const REFERENCE = {
  AAPL: { c: 211.45, change: 1.24, sector: 'Technology' },
  MSFT: { c: 415.20, change: 0.87, sector: 'Technology' },
  NVDA: { c: 1208.88, change: 3.21, sector: 'Technology' },
  AMZN: { c: 224.19, change: 0.54, sector: 'Consumer' },
  TSLA: { c: 176.75, change: -1.89, sector: 'Automotive' },
  GOOGL: { c: 175.07, change: 0.62, sector: 'Technology' },
};

const SECTOR_COLORS = {
  Technology: '#3b82f6',
  Automotive: '#ef4444',
  Healthcare: '#22c55e',
  Energy: '#f0b429',
  Consumer: '#ec4899',
  Industrials: '#8b5cf6',
  Telecom: '#0ed2c8',
  ETF: '#22c55e',
  'Islamic Banking': '#22c55e',
  'Real Estate': '#f97316',
  Entertainment: '#8b5cf6',
  Fintech: '#3b82f6',
  Defense: '#94a3b8',
};

export default function StockCard({ ticker, name, sector, debtRatio, onClick }) {
  const [price, setPrice] = useState(REFERENCE[ticker]?.c || null);
  const [change, setChange] = useState(REFERENCE[ticker]?.change || null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [priceUpdated, setPriceUpdated] = useState(false);
  const screen = screenStock(ticker, sector, debtRatio);
  const isUp = (change || 0) >= 0;
  const sectorColor = SECTOR_COLORS[sector] || 'var(--accent-teal)';
  const sectorClass = `sector-${sector?.replace(/\s+/g, '-')}`;

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
            setPrice(p);
            setChange(isNaN(c) ? 0 : c);
            setIsLive(true);
            setPriceUpdated(true);
            setTimeout(() => setPriceUpdated(false), 2000);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [ticker]);

  return (
    <div
      onClick={onClick}
      className={`card ${sectorClass}`}
      style={{
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Sector color top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${sectorColor}, transparent)`,
      }} />

      {/* Sector glow background */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 80, height: 80, borderRadius: '50%',
        background: `radial-gradient(circle, ${sectorColor}15, transparent 70%)`,
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, position: 'relative' }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
            color: 'var(--text-primary)'
          }}>
            {ticker}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 1 }}>
            {name}
          </div>
          <div style={{
            fontSize: 9, color: sectorColor, marginTop: 2,
            fontWeight: 600, letterSpacing: 0.3
          }}>
            {sector}
          </div>
        </div>
        <span className={screen.status === 'halal' ? 'badge-halal' : 'badge-screen'}>
          {screen.status === 'halal' ? '✓ Halal' : '⚠ Review'}
        </span>
      </div>

      {/* Price */}
      {loading ? (
        <div style={{ height: 36, borderRadius: 6 }} className="shimmer" />
      ) : (
        <div style={{ position: 'relative' }}>
          <div style={{
            fontSize: 20, fontFamily: 'var(--font-display)', fontWeight: 700,
            marginBottom: 4,
            animation: priceUpdated ? 'pricePulse 1s ease' : 'none',
            color: priceUpdated ? 'var(--accent-teal)' : 'var(--text-primary)',
            transition: 'color 0.3s'
          }}>
            ${price ? Number(price).toFixed(2) : '—'}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 3,
              color: isUp ? 'var(--accent-green)' : 'var(--accent-red)',
              fontSize: 11
            }}>
              {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {change !== null ? `${change >= 0 ? '+' : ''}${Number(change).toFixed(2)}%` : '—'}
              <span style={{
                width: 6, height: 6, borderRadius: '50%', marginLeft: 2,
                background: isLive ? 'var(--accent-green)' : '#475569',
                animation: isLive ? 'pulse 2s infinite' : 'none'
              }} />
            </div>
            <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>
              View →
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
