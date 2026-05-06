import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice, formatChange } from '../utils/formatters';
import { screenStock } from '../utils/halalScreener';

export default function StockCard({ ticker, name, price, change, sector, debtRatio }) {
  const screen = screenStock(ticker, sector, debtRatio);
  const isUp = change >= 0;

  return (
    <div className="card" style={{ cursor: 'pointer' }}>
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
    </div>
  );
}
