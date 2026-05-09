import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import { screenStock } from '../utils/halalScreener';

const ALPHA_KEY = import.meta.env.VITE_ALPHA_KEY;

const REFERENCE = {
  AAPL: { c: 211.45, change: 1.24 },
  MSFT: { c: 415.20, change: 0.87 },
  NVDA: { c: 1208.88, change: 3.21 },
  AMZN: { c: 224.19, change: 0.54 },
  TSLA: { c: 176.75, change: -1.89 },
  GOOGL: { c: 175.07, change: 0.62 },
  META: { c: 512.45, change: 1.45 },
  NFLX: { c: 645.30, change: 0.32 },
  AMD: { c: 178.90, change: 2.10 },
  INTC: { c: 42.30, change: -0.54 },
  HLAL: { c: 34.80, change: 0.73 },
  SPUS: { c: 58.20, change: 0.55 },
};

export default function StockCard({ ticker, name, sector, debtRatio, onClick }) {
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const screen = screenStock(ticker, sector, debtRatio);

  useEffect(() => {
    let cancelled = false;
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${ALPHA_KEY}`
        );
        const json = await res.json();
        const quote = json['Global Quote'];
        if (quote && quote['05. price']) {
          const p = parseFloat(quote['05. price']);
          const c = parseFloat(quote['10. change percent'].replace('%', ''));
          if (!cancelled && p > 0) {
            setPrice(p);
            setChange(isNaN(c) ? 0 : c);
            setIsLive(true);
          }
        } else {
          throw new Error('No data');
        }
      } catch {
        const ref = REFERENCE[ticker];
        if (ref && !cancelled) {
          setPrice(ref.c);
          setChange(ref.change);
          setIsLive(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchPrice();
    return () => { cancelled = true; };
  }, [ticker]);

  const isUp = (change || 0) >= 0;

  return (
    <div
      className="card"
      onClick={onClick}
      style={{ cursor: 'pointer', transition: 'all 0.15s' }}
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
      {/* Top Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14 }}>
            {ticker}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 1 }}>
            {name}
          </div>
        </div>
        <span className={screen.status === 'halal' ? 'badge-halal' : 'badge-screen'}>
          {screen.status === 'halal' ? '✓ Halal' : '⚠ Review'}
        </span>
      </div>

      {/* Price Row */}
      {loading ? (
        <div style={{
          height: 36, background: 'var(--bg-hover)',
          borderRadius: 6, animation: 'pulse 1.5s infinite'
        }} />
      ) : (
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 20, fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              {formatPrice(price)}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4, marginTop: 3,
              color: isUp ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: 12
            }}>
              {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {change !== null ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : '—'}
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                {isLive ? '🟢 live' : '🔴 ref'}
              </span>
            </div>
          </div>
          <div style={{
            width: 44, height: 26,
            background: isUp
              ? 'linear-gradient(to right, transparent, rgba(34,197,94,0.15))'
              : 'linear-gradient(to right, transparent, rgba(239,68,68,0.15))',
            borderRadius: 4
          }} />
        </div>
      )}

      {/* View Chart Hint */}
      <div style={{ marginTop: 8, fontSize: 10, color: 'var(--text-muted)', textAlign: 'right' }}>
        View chart →
      </div>
    </div>
  );
}
