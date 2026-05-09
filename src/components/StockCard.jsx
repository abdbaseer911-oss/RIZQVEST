import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
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
        const current = meta.regularMarketPrice;
        const prev = meta.previousClose;
        if (current && prev && prev !== 0) {
          setPrice(current);
          setChange(((current - prev) / prev) * 100);
          setIsLive(true);
        } else {
          throw new Error('Invalid data');
        }
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
      style={{ cursor: 'pointer' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(14,210,200,0.4)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14 }}>{ticker}</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 1 }}>{name}</div>
        </div>
        <span className={screen.status === 'halal' ? 'badge-halal' : 'badge-screen'}>
          {screen.status === 'halal' ? '✓ Halal' : '⚠ Review'}
        </span>
      </div>

      {loading ? (
        <div style={{ height: 36, background: 'var(--bg-hover)', borderRadius: 6, animation: 'pulse 1.5s infinite' }} />
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
              <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>
                {isLive ? '🟢' : '🔴'}
              </span>
            </div>
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>View chart →</div>
        </div>
      )}
    </div>
  );
}
