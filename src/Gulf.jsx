import Navbar from '../components/Navbar';
import { TrendingUp, TrendingDown, Globe } from 'lucide-react';
import { formatPrice, formatChange } from '../utils/formatters';
import { useState } from 'react';

const GULF_MARKETS = {
  'Saudi Arabia 🇸🇦': [
    { ticker: '2222.SR', name: 'Saudi Aramco', sector: 'Energy', mcap: '$1.8T', price: 27.85, change: 0.54, halal: true },
    { ticker: '1120.SR', name: 'Al Rajhi Bank', sector: 'Islamic Banking', mcap: '$78B', price: 85.20, change: -0.32, halal: true },
    { ticker: '2280.SR', name: 'Almarai', sector: 'Food & Beverage', mcap: '$14B', price: 52.10, change: 1.12, halal: true },
    { ticker: '7010.SR', name: 'STC (Saudi Telecom)', sector: 'Telecom', mcap: '$48B', price: 44.30, change: 0.28, halal: true },
    { ticker: '1211.SR', name: 'Ma\'aden', sector: 'Mining', mcap: '$30B', price: 38.75, change: -1.05, halal: true },
    { ticker: '2010.SR', name: 'SABIC', sector: 'Petrochemicals', mcap: '$80B', price: 72.40, change: 0.88, halal: true },
  ],
  'UAE 🇦🇪': [
    { ticker: 'EMAAR.AE', name: 'Emaar Properties', sector: 'Real Estate', mcap: '$12B', price: 8.92, change: 1.34, halal: true },
    { ticker: 'FAB.AE', name: 'First Abu Dhabi Bank', sector: 'Banking', mcap: '$45B', price: 14.20, change: 0.42, halal: false },
    { ticker: 'ADNOC.AE', name: 'ADNOC Distribution', sector: 'Energy', mcap: '$18B', price: 4.35, change: -0.23, halal: true },
    { ticker: 'DIB.AE', name: 'Dubai Islamic Bank', sector: 'Islamic Banking', mcap: '$8B', price: 6.80, change: 0.88, halal: true },
    { ticker: 'ETISALAT.AE', name: 'e& (Etisalat)', sector: 'Telecom', mcap: '$40B', price: 22.50, change: 0.15, halal: true },
    { ticker: 'DU.AE', name: 'du (EITC)', sector: 'Telecom', mcap: '$6B', price: 7.15, change: -0.42, halal: true },
  ],
  'Qatar 🇶🇦': [
    { ticker: 'QNBK.QA', name: 'QNB Group', sector: 'Banking', mcap: '$42B', price: 18.20, change: 0.33, halal: false },
    { ticker: 'ORDS.QA', name: 'Ooredoo', sector: 'Telecom', mcap: '$7B', price: 8.45, change: -0.18, halal: true },
    { ticker: 'MARK.QA', name: 'Masraf Al Rayan', sector: 'Islamic Banking', mcap: '$8B', price: 1.92, change: 0.52, halal: true },
    { ticker: 'QEWS.QA', name: 'Qatar Electricity & Water', sector: 'Utilities', mcap: '$5B', price: 16.80, change: 0.71, halal: true },
  ],
};

const MARKET_STATS = [
  { label: 'Tadawul (Saudi)', value: 'SAR 11.2T', sub: 'Market Cap', color: 'var(--accent-green)' },
  { label: 'DFM (Dubai)', value: 'AED 780B', sub: 'Market Cap', color: 'var(--accent-teal)' },
  { label: 'ADX (Abu Dhabi)', value: 'AED 1.8T', sub: 'Market Cap', color: 'var(--accent-gold)' },
  { label: 'QSE (Qatar)', value: 'QAR 620B', sub: 'Market Cap', color: 'var(--accent-purple)' },
];

function GulfStockRow({ stock }) {
  const isUp = stock.change >= 0;
  return (
    <tr
      style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <td style={{ padding: '12px 14px' }}>
        <div style={{ fontWeight: 700, color: 'var(--accent-teal)', fontSize: 13 }}>{stock.ticker}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{stock.name}</div>
      </td>
      <td style={{ padding: '12px 14px', fontSize: 13, color: 'var(--text-secondary)' }}>{stock.sector}</td>
      <td style={{ padding: '12px 14px', fontSize: 13 }}>{stock.mcap}</td>
      <td style={{ padding: '12px 14px' }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>{formatPrice(stock.price)}</div>
      </td>
      <td style={{ padding: '12px 14px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          color: isUp ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: 13
        }}>
          {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {formatChange(stock.change)}
        </div>
      </td>
      <td style={{ padding: '12px 14px' }}>
        <span className={stock.halal ? 'badge-halal' : 'badge-screen'}>
          {stock.halal ? '✓ Halal' : '⚠ Review'}
        </span>
      </td>
    </tr>
  );
}

export default function Gulf() {
  const [activeMarket, setActiveMarket] = useState('Saudi Arabia 🇸🇦');

  return (
    <div>
      <Navbar title="Gulf Markets" />

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0a1f0a, #0f2f1f)',
        border: '1px solid #1a4a2a',
        borderRadius: 16, padding: '24px 28px', marginBottom: 24,
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', right: 24, top: '50%',
          transform: 'translateY(-50%)', fontSize: 70, opacity: 0.07
        }}>🌙</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Globe size={16} color="var(--accent-teal)" />
          <span style={{ fontSize: 12, color: 'var(--accent-teal)', letterSpacing: 1 }}>
            GULF COOPERATION COUNCIL
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 6 }}>
          GCC Markets Overview
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, maxWidth: 500 }}>
          Track Shariah-screened stocks across Saudi Arabia, UAE, Qatar and beyond.
          All prices in local currency. Reference data updated daily.
        </p>
      </div>

      {/* Market Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {MARKET_STATS.map(({ label, value, sub, color }) => (
          <div key={label} className="card">
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>{label}</div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 20,
              fontWeight: 700, color, marginBottom: 2
            }}>{value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Market Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {Object.keys(GULF_MARKETS).map(market => (
          <button
            key={market}
            onClick={() => setActiveMarket(market)}
            style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 13,
              border: activeMarket === market
                ? '1px solid var(--accent-teal)'
                : '1px solid var(--border)',
              background: activeMarket === market
                ? 'rgba(14,210,200,0.1)' : 'var(--bg-card)',
              color: activeMarket === market
                ? 'var(--accent-teal)' : 'var(--text-secondary)',
              cursor: 'pointer', fontWeight: activeMarket === market ? 600 : 400
            }}
          >
            {market}
          </button>
        ))}
      </div>

      {/* Stocks Table */}
      <div className="card" style={{ overflowX: 'auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 16
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15 }}>
            {activeMarket} Stocks
          </h3>
          <span style={{
            fontSize: 11, background: 'rgba(240,180,41,0.1)',
            color: 'var(--accent-gold)', border: '1px solid var(--accent-gold)',
            borderRadius: 6, padding: '3px 8px'
          }}>
            📊 Reference Prices
          </span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
              {['Stock', 'Sector', 'Market Cap', 'Price', 'Change', 'Shariah'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 14px', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GULF_MARKETS[activeMarket].map(stock => (
              <GulfStockRow key={stock.ticker} stock={stock} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Islamic Finance Note */}
      <div style={{
        marginTop: 20, padding: '16px 20px',
        background: 'rgba(34,197,94,0.05)',
        border: '1px solid rgba(34,197,94,0.2)',
        borderRadius: 10, fontSize: 13, color: 'var(--text-secondary)'
      }}>
        <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>💡 Note: </span>
        Gulf markets are among the most Shariah-compliant in the world. Islamic banks like
        Al Rajhi, Dubai Islamic Bank, and Masraf Al Rayan operate fully under Shariah supervision.
        Stocks marked ⚠ Review have conventional banking operations requiring further screening.
      </div>
    </div>
  );
}
