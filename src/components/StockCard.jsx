import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { useStockQuote } from '../hooks/useStockData';
import { formatPrice, formatChange } from '../utils/formatters';
import { screenStock } from '../utils/halalScreener';

export default function StockCard({ ticker, name, sector, debtRatio, onClick }) {
  const { data, loading, refetch } = useStockQuote(ticker);

  const price = data?.c || null;
  const change = data?.todaysChangePerc || null;
  const isUp = change >= 0;
  const screen = screenStock(ticker, sector, debtRatio);

  return (
    <div className="card" style={{ cursor: 'pointer' }} onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>
            {ticker}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
            {name}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <span className={screen.status === 'halal' ? 'badge-halal' : 'badge-screen'}>
            {screen.status === 'halal' ? '✓ Halal' : '⚠ Review'}
          </span>
          <button
            onClick={e => { e.stopPropagation(); refetch(); }}
            style={{
              background: 'transparent', border: 'none',
              color: 'var(--text-muted)', cursor: 'pointer', padding: 0
            }}
          >
            <RefreshCw size={11} />
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{
          height: 40, background: 'var(--bg-hover)',
          borderRadius: 6, animation: 'pulse 1.5s infinite'
        }} />
      ) : price ? (
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
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Market closed or price unavailable
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
