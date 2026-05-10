import { useState, useEffect } from 'react';
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

export default function StockCard({ ticker, name, sector, debtRatio, onClick }) {
  const [price, setPrice] = useState(REFERENCE[ticker]?.c || null);
  const [change, setChange] = useState(REFERENCE[ticker]?.change || null);
  const [isLive, setIsLive] = useState(false);
  const screen = screenStock(ticker, sector, debtRatio);
  const isUp = (change || 0) >= 0;

  useEffect(() => {
    const key = import.meta.env.VITE_ALPHA_KEY;
    if (!key || !ticker) return;
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${key}`
    )
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
          }
        }
      })
      .catch(() => {});
  }, [ticker]);

  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: 16,
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(14,210,200,0.4)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14 }}>
            {ticker}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
            {name}
          </div>
        </div>
        <span className={screen.status === 'halal' ? 'badge-halal' : 'badge-screen'}>
          {screen.status === 'halal' ? '✓ Halal' : '⚠ Review'}
        </span>
      </div>

      <div style={{
        fontSize: 20,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        marginBottom: 6
      }}>
        ${price ? Number(price).toFixed(2) : '—'}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          color: isUp ? 'var(--accent-green)' : 'var(--accent-red)',
          fontSize: 12
        }}>
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change !== null ? `${change >= 0 ? '+' : ''}${Number(change).toFixed(2)}%` : '—'}
          <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>
            {isLive ? '🟢' : '🔴'}
          </span>
        </div>
        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>View chart →</span>
      </div>
    </div>
  );
}
