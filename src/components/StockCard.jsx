import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice, formatChange } from '../utils/formatters';
import { screenStock } from '../utils/halalScreener';

const FALLBACK = {
  AAPL: { c: 211.45, change: 1.24 },
  MSFT: { c: 415.20, change: 0.87 },
  NVDA: { c: 1208.88, change: 3.21 },
  AMZN: { c: 224.19, change: 0.54 },
  TSLA: { c: 176.75, change: -1.89 },
  GOOGL: { c: 175.07, change: 0.62 },
};

export default function StockCard({ ticker, name, sector, debtRatio, onClick }) {
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const screen = screenStock(ticker, sector, debtRatio);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=2d`
          )}`
        );
        const json = await res.json();
        const data = JSON.parse(json.contents);
        const meta = data.chart.result[0].meta;
        setPrice(meta.regularMarketPrice);
        setChange(((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100);
        setIsLive(true);
      } catch (e) {
        const fb = FALLBACK[ticker];
        if (fb) { setPrice(fb.c); setChange(fb.change); setIsLive(false); }
      } finally {
        setLoading(false);
      }
    };
    fetchPrice();
  }, [ticker]);

  const isUp = (change || 0) >= 0;

  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        transition: 'border-color 0.2s, transform 0.1s'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent-teal)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Header */}
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

      {/* Price */}
      {loading ? (
        <div style={{
          height: 40, background: 'var(--bg-hover)',
          borderRadius: 6, animation: 'pulse 1.5s infinite'
        }}>
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 22, fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              {formatPrice(price)}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4, marginTop: 4,
              color: isUp ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: 13
            }}>
              {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {formatChange(change)}
              <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                {isLive ? '🟢 live' : '🔴 ref'}
              </span>
            </div>
          </div>
          <div style={{
            width: 48, height: 28,
            background: isUp
              ? 'linear-gradient(to right, transparent, rgba(34,197,94,0.15))'
              : 'linear-gradient(to right, transparent, rgba(239,68,68,0.15))',
            borderRadius: 4
          }} />
        </div>
      )}

      {/* Click hint */}
      <div style={{
        marginTop: 10, fontSize: 11,
        color: 'var(--text-muted)', textAlign: 'right'
      }}>
        View chart →
      </div>
    </div>
  );
}
