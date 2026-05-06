import { useMarketSnapshot } from '../hooks/useStockData';
import { formatChange } from '../utils/formatters';

const TICKER_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'HLAL', 'SPUS'];

export default function MarketTicker() {
  const { data } = useMarketSnapshot(TICKER_SYMBOLS);

  const displayData = data.length > 0 ? data : TICKER_SYMBOLS.map(t => ({
    ticker: t,
    day: { c: (Math.random() * 200 + 50).toFixed(2), todaysChangePerc: (Math.random() * 4 - 2).toFixed(2) }
  }));

  return (
    <div style={{
      background: '#0c1524',
      borderBottom: '1px solid var(--border)',
      padding: '8px 24px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex', gap: 32,
        animation: 'ticker 40s linear infinite',
        whiteSpace: 'nowrap'
      }}>
        {[...displayData, ...displayData].map((s, i) => {
          const change = parseFloat(s.day?.todaysChangePerc || 0);
          return (
            <span key={i} style={{ fontSize: 12, display: 'inline-flex', gap: 8, alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{s.ticker}</span>
              <span style={{ color: 'var(--text-primary)' }}>${parseFloat(s.day?.c || 0).toFixed(2)}</span>
              <span className={change >= 0 ? 'up' : 'down'} style={{ fontSize: 11 }}>
                {formatChange(change)}
              </span>
            </span>
          );
        })}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
