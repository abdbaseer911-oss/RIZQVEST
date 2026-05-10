import { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STOCK_DATABASE = [
  { ticker: 'AAPL', name: 'Apple Inc.' },
  { ticker: 'MSFT', name: 'Microsoft Corp.' },
  { ticker: 'NVDA', name: 'NVIDIA Corp.' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.' },
  { ticker: 'AMZN', name: 'Amazon.com' },
  { ticker: 'TSLA', name: 'Tesla Inc.' },
  { ticker: 'META', name: 'Meta Platforms' },
  { ticker: 'AMD', name: 'Advanced Micro Devices' },
  { ticker: 'INTC', name: 'Intel Corp.' },
  { ticker: 'QCOM', name: 'Qualcomm Inc.' },
  { ticker: 'ADBE', name: 'Adobe Inc.' },
  { ticker: 'CRM', name: 'Salesforce Inc.' },
  { ticker: 'ORCL', name: 'Oracle Corp.' },
  { ticker: 'NOW', name: 'ServiceNow Inc.' },
  { ticker: 'SNOW', name: 'Snowflake Inc.' },
  { ticker: 'PLTR', name: 'Palantir Technologies' },
  { ticker: 'SHOP', name: 'Shopify Inc.' },
  { ticker: 'UBER', name: 'Uber Technologies' },
  { ticker: 'ABNB', name: 'Airbnb Inc.' },
  { ticker: 'NFLX', name: 'Netflix Inc.' },
  { ticker: 'DIS', name: 'Walt Disney Co.' },
  { ticker: 'PYPL', name: 'PayPal Holdings' },
  { ticker: 'NKE', name: 'Nike Inc.' },
  { ticker: 'SBUX', name: 'Starbucks Corp.' },
  { ticker: 'COST', name: 'Costco Wholesale' },
  { ticker: 'WMT', name: 'Walmart Inc.' },
  { ticker: 'JNJ', name: 'Johnson & Johnson' },
  { ticker: 'PFE', name: 'Pfizer Inc.' },
  { ticker: 'MRK', name: 'Merck & Co.' },
  { ticker: 'ABBV', name: 'AbbVie Inc.' },
  { ticker: 'AMGN', name: 'Amgen Inc.' },
  { ticker: 'ISRG', name: 'Intuitive Surgical' },
  { ticker: 'XOM', name: 'ExxonMobil Corp.' },
  { ticker: 'CVX', name: 'Chevron Corp.' },
  { ticker: 'COP', name: 'ConocoPhillips' },
  { ticker: 'BA', name: 'Boeing Co.' },
  { ticker: 'CAT', name: 'Caterpillar Inc.' },
  { ticker: 'HON', name: 'Honeywell International' },
  { ticker: 'UPS', name: 'United Parcel Service' },
  { ticker: 'FDX', name: 'FedEx Corp.' },
  { ticker: 'VZ', name: 'Verizon Communications' },
  { ticker: 'TMUS', name: 'T-Mobile US' },
  { ticker: 'AMT', name: 'American Tower' },
  { ticker: 'PLD', name: 'Prologis Inc.' },
  { ticker: 'TSM', name: 'Taiwan Semiconductor' },
  { ticker: 'ASML', name: 'ASML Holding' },
  { ticker: 'SAP', name: 'SAP SE' },
  { ticker: 'NOVO', name: 'Novo Nordisk' },
  { ticker: 'TM', name: 'Toyota Motor Corp.' },
  { ticker: 'SONY', name: 'Sony Group Corp.' },
  { ticker: 'BABA', name: 'Alibaba Group' },
  { ticker: 'HLAL', name: 'Wahed FTSE USA Shariah ETF' },
  { ticker: 'SPUS', name: 'SP Funds S&P 500 Sharia' },
  { ticker: 'SPRE', name: 'SP Funds Global REITs Sharia' },
  { ticker: 'CRWD', name: 'CrowdStrike Holdings' },
  { ticker: 'DDOG', name: 'Datadog Inc.' },
  { ticker: 'ZS', name: 'Zscaler Inc.' },
  { ticker: 'SPOT', name: 'Spotify Technology' },
  { ticker: 'SQ', name: 'Block Inc.' },
  { ticker: 'COIN', name: 'Coinbase Global' },
  { ticker: 'ETSY', name: 'Etsy Inc.' },
  { ticker: '2222.SR', name: 'Saudi Aramco' },
  { ticker: '1120.SR', name: 'Al Rajhi Bank' },
  { ticker: '2280.SR', name: 'Almarai' },
  { ticker: '7010.SR', name: 'STC Saudi Telecom' },
  { ticker: 'EMAAR.AE', name: 'Emaar Properties' },
  { ticker: 'DIB.AE', name: 'Dubai Islamic Bank' },
  { ticker: 'ADNOC.AE', name: 'ADNOC Distribution' },
  { ticker: 'MARK.QA', name: 'Masraf Al Rayan' },
  { ticker: 'ORDS.QA', name: 'Ooredoo' },
];

export default function Navbar({ title }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const results = query.length >= 1
    ? STOCK_DATABASE.filter(s =>
        s.ticker.toLowerCase().includes(query.toLowerCase()) ||
        s.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 7)
    : [];

  const handleSelect = (ticker) => {
    navigate(`/stock/${ticker}`);
    setQuery('');
    setShowResults(false);
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', marginBottom: 16
    }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700 }}>
        {title}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Search Box */}
        <div style={{ position: 'relative' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '7px 12px', width: 240,
            transition: 'border-color 0.2s'
          }}>
            <Search size={13} color="var(--text-muted)" />
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setShowResults(true); }}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              placeholder="Search any stock..."
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--text-primary)', fontSize: 12, width: '100%'
              }}
            />
            {query && (
              <span
                onClick={() => { setQuery(''); setShowResults(false); }}
                style={{ color: 'var(--text-muted)', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}
              >×</span>
            )}
          </div>

          {/* Dropdown Results */}
          {showResults && results.length > 0 && (
            <div style={{
              position: 'absolute', top: '110%', left: 0, right: 0,
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 8, zIndex: 999, overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
            }}>
              {results.map((s, i) => (
                <div
                  key={s.ticker}
                  onClick={() => handleSelect(s.ticker)}
                  style={{
                    padding: '9px 12px', cursor: 'pointer', fontSize: 12,
                    borderBottom: i < results.length - 1 ? '1px solid var(--border)' : 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: 'background 0.1s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontWeight: 700, color: 'var(--accent-teal)', minWidth: 70 }}>
                    {s.ticker}
                  </span>
                  <span style={{
                    color: 'var(--text-secondary)', fontSize: 11,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                  }}>
                    {s.name}
                  </span>
                </div>
              ))}
              <div style={{
                padding: '7px 12px', fontSize: 10,
                color: 'var(--text-muted)', borderTop: '1px solid var(--border)',
                background: 'rgba(0,0,0,0.2)'
              }}>
                {results.length} result{results.length !== 1 ? 's' : ''} · Press Enter or click to view chart
              </div>
            </div>
          )}

          {/* No results */}
          {showResults && query.length >= 2 && results.length === 0 && (
            <div style={{
              position: 'absolute', top: '110%', left: 0, right: 0,
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 8, zIndex: 999, padding: '12px',
              fontSize: 12, color: 'var(--text-muted)', textAlign: 'center'
            }}>
              No stocks found for "{query}"
            </div>
          )}
        </div>

        {/* Bell */}
        <button style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 8, padding: 7, color: 'var(--text-secondary)',
          display: 'flex', alignItems: 'center'
        }}>
          <Bell size={14} />
        </button>

        {/* Avatar */}
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-gold), #e67e00)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <User size={13} color="#000" />
        </div>
      </div>
    </div>
  );
}
