import { useState } from 'react';
import Navbar from '../components/Navbar';
import HalalBadge from '../components/HalalBadge';
import { screenStock } from '../utils/halalScreener';
import { useStockSearch } from '../hooks/useStockData';

const SAMPLE_STOCKS = [
  { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Technology', debtRatio: 0.18, pe: 28.4, mcap: '$2.9T' },
  { ticker: 'MSFT', name: 'Microsoft', sector: 'Technology', debtRatio: 0.21, pe: 34.1, mcap: '$3.1T' },
  { ticker: 'JPM', name: 'JPMorgan Chase', sector: 'Banks', debtRatio: 0.82, pe: 11.2, mcap: '$580B' },
  { ticker: 'NVDA', name: 'NVIDIA', sector: 'Technology', debtRatio: 0.12, pe: 65.3, mcap: '$2.1T' },
  { ticker: 'MO', name: 'Altria Group', sector: 'Tobacco', debtRatio: 0.90, pe: 9.8, mcap: '$72B' },
  { ticker: 'AMZN', name: 'Amazon', sector: 'Technology', debtRatio: 0.28, pe: 44.2, mcap: '$1.9T' },
  { ticker: 'TSLA', name: 'Tesla', sector: 'Automotive', debtRatio: 0.10, pe: 55.0, mcap: '$780B' },
  { ticker: 'BRK', name: 'Berkshire Hathaway', sector: 'Financial Services', debtRatio: 0.35, pe: 21.0, mcap: '$880B' },
];

export default function Screener() {
  const [filter, setFilter] = useState('all');

  const filtered = SAMPLE_STOCKS.filter(s => {
    const screen = screenStock(s.ticker, s.sector, s.debtRatio);
    if (filter === 'all') return true;
    return screen.status === filter;
  });

  return (
    <div>
      <Navbar title="Halal Stock Screener" />

      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '16px 20px', marginBottom: 20,
        display: 'flex', gap: 8, alignItems: 'center'
      }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginRight: 8 }}>Filter:</span>
        {['all', 'halal', 'questionable', 'haram'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 500,
            border: filter === f ? '1px solid var(--accent-teal)' : '1px solid var(--border)',
            background: filter === f ? 'rgba(14,210,200,0.1)' : 'transparent',
            color: filter === f ? 'var(--accent-teal)' : 'var(--text-secondary)',
            textTransform: 'capitalize'
          }}>
            {f === 'all' ? 'All Stocks' : f}
          </button>
        ))}
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
              {['Stock', 'Sector', 'Market Cap', 'P/E', 'Debt Ratio', 'Shariah Status'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => {
              const screen = screenStock(s.ticker, s.sector, s.debtRatio);
              return (
                <tr key={s.ticker}
                  style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-teal)' }}>{s.ticker}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.name}</div>
                  </td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{s.sector}</td>
                  <td style={{ padding: '12px 14px' }}>{s.mcap}</td>
                  <td style={{ padding: '12px 14px' }}>{s.pe}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ color: s.debtRatio > 0.33 ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                      {(s.debtRatio * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <HalalBadge status={screen.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
