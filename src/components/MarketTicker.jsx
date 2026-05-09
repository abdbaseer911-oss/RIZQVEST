import { useEffect, useState } from 'react';

const TICKERS = ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'TSLA', 'GOOGL', 'META', 'HLAL', 'SPUS'];

const FALLBACK = [
  { ticker: 'AAPL', price: 211.45, change: 1.24 },
  { ticker: 'MSFT', price: 415.20, change: 0.87 },
  { ticker: 'NVDA', price: 1208.88, change: 3.21 },
  { ticker: 'AMZN', price: 224.19, change: 0.54 },
  { ticker: 'TSLA', price: 176.75, change: -1.89 },
  { ticker: 'GOOGL', price: 175.07, change: 0.62 },
  { ticker: 'META', price: 512.45, change: 1.45 },
  { ticker: 'HLAL', price: 34.80, change: 0.73 },
  { ticker: 'SPUS', price: 58.20, change: 0.55 },
];

export default function MarketTicker() {
  const [stocks, setStocks] = useState(FALLBACK);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_POLYGON_API_KEY;
    const fetchTicker = async () => {
      try {
        const tickerStr = TICKERS.join(',');
        const res = await fetch(
          `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${tickerStr}&apiKey=${API_KEY}`
        );
        const json = await res.json();
        const data = (json.tickers || []).map(s => ({
          ticker: s.ticker,
          price: s.day?.c || s.prevDay?.c || 0,
          change: s.todaysChangePerc || 0,
        })).filter(s => s.price > 0);
        if (data.length > 0) setStocks(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchTicker();
    const interval = setInterval(fetchTicker, 60000);
    return () => clearInterval(interval);
  }, []);

  const display = [...stocks, ...stocks];

  return (
    <div style={{
      background: '#060b14',
      borderBottom: '1px solid var(--border)',
      padding: '7px 0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }}>
      <div style={{
        display: 'inline-flex', gap: 32,
        animation: 'ticker 50s linear infinite',
      }}>
        {display.map((s, i) => {
          const isUp = s.change >= 0;
          return (
            <span key={i} style={{ fontSize: 12, display: 'inline-flex', gap: 6, alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{s.ticker}</span>
              <span style={{ color: 'var(--text-primary)' }}>${Number(s.price).toFixed(2)}</span>
              <span style={{ color: isUp ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: 11 }}>
                {isUp ? '+' : ''}{Number(s.change).toFixed(2)}%
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
