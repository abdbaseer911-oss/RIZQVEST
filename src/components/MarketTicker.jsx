import { useEffect, useState } from 'react';

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
  { ticker: 'AMD', price: 178.90, change: 2.10 },
];

export default function MarketTicker() {
  const [stocks, setStocks] = useState(FALLBACK);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_POLYGON_API_KEY;
    const tickers = FALLBACK.map(s => s.ticker).join(',');
    fetch(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${tickers}&apiKey=${API_KEY}`)
      .then(r => r.json())
      .then(json => {
        const data = (json.tickers || []).map(s => ({
          ticker: s.ticker,
          price: s.day?.c || s.prevDay?.c || 0,
          change: s.todaysChangePerc || 0,
        })).filter(s => s.price > 0);
        if (data.length > 0) setStocks(data);
      })
      .catch(() => {});
  }, []);

  const display = [...stocks, ...stocks, ...stocks];

  return (
    <div style={{
      background: 'linear-gradient(90deg, #060b14, #0a1020, #060b14)',
      borderBottom: '1px solid var(--border)',
      padding: '6px 0',
      overflow: 'hidden',
      flexShrink: 0,
      position: 'relative'
    }}>
      {/* Left fade */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 60,
        background: 'linear-gradient(90deg, #060b14, transparent)',
        zIndex: 2, pointerEvents: 'none'
      }} />
      {/* Right fade */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 60,
        background: 'linear-gradient(270deg, #060b14, transparent)',
        zIndex: 2, pointerEvents: 'none'
      }} />

      <div style={{
        display: 'inline-flex', gap: 0,
        animation: 'ticker 60s linear infinite',
        whiteSpace: 'nowrap'
      }}>
        {display.map((s, i) => {
          const isUp = s.change >= 0;
          return (
            <span key={i} style={{
              fontSize: 11, display: 'inline-flex',
              alignItems: 'center', gap: 6,
              padding: '0 20px',
              borderRight: '1px solid rgba(255,255,255,0.05)'
            }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>
                {isUp ? '▲' : '▼'}
              </span>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: 11 }}>
                {s.ticker}
              </span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                ${Number(s.price).toFixed(2)}
              </span>
              <span style={{
                color: isUp ? 'var(--accent-green)' : 'var(--accent-red)',
                fontSize: 10, fontWeight: 600
              }}>
                {isUp ? '+' : ''}{Number(s.change).toFixed(2)}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
