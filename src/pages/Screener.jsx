import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { screenStock } from '../utils/halalScreener';
import { Search, Filter, TrendingUp, TrendingDown } from 'lucide-react';

const SECTOR_COLORS = {
  Technology: '#3b82f6', Automotive: '#f97316', Healthcare: '#22c55e',
  Energy: '#f0b429', Consumer: '#ec4899', Industrials: '#8b5cf6',
  Telecom: '#0ed2c8', ETF: '#22c55e', 'Islamic Banking': '#34d399',
  'Real Estate': '#f97316', Entertainment: '#a855f7', Fintech: '#06b6d4',
  Defense: '#94a3b8',
};

const SECTOR_ICONS = {
  Technology: '💻', Automotive: '🚗', Healthcare: '🏥', Energy: '⚡',
  Consumer: '🛍️', Industrials: '🏭', Telecom: '📡', ETF: '📊',
  'Islamic Banking': '🌙', 'Real Estate': '🏢', Entertainment: '🎬',
  Fintech: '💳', Defense: '🛡️',
};

const ALL_STOCKS = [
  { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Technology', region: 'US', debtRatio: 0.18, pe: 28.4, mcap: '$2.9T' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', region: 'US', debtRatio: 0.21, pe: 34.1, mcap: '$3.1T' },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology', region: 'US', debtRatio: 0.12, pe: 65.3, mcap: '$2.1T' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', region: 'US', debtRatio: 0.08, pe: 25.1, mcap: '$1.9T' },
  { ticker: 'META', name: 'Meta Platforms', sector: 'Technology', region: 'US', debtRatio: 0.09, pe: 24.3, mcap: '$1.2T' },
  { ticker: 'AMD', name: 'Advanced Micro Devices', sector: 'Technology', region: 'US', debtRatio: 0.11, pe: 38.5, mcap: '$280B' },
  { ticker: 'INTC', name: 'Intel Corp.', sector: 'Technology', region: 'US', debtRatio: 0.29, pe: 12.4, mcap: '$180B' },
  { ticker: 'QCOM', name: 'Qualcomm Inc.', sector: 'Technology', region: 'US', debtRatio: 0.22, pe: 18.2, mcap: '$185B' },
  { ticker: 'ADBE', name: 'Adobe Inc.', sector: 'Technology', region: 'US', debtRatio: 0.19, pe: 45.6, mcap: '$220B' },
  { ticker: 'CRM', name: 'Salesforce Inc.', sector: 'Technology', region: 'US', debtRatio: 0.14, pe: 52.1, mcap: '$290B' },
  { ticker: 'ORCL', name: 'Oracle Corp.', sector: 'Technology', region: 'US', debtRatio: 0.31, pe: 32.4, mcap: '$340B' },
  { ticker: 'NOW', name: 'ServiceNow Inc.', sector: 'Technology', region: 'US', debtRatio: 0.10, pe: 78.2, mcap: '$185B' },
  { ticker: 'SNOW', name: 'Snowflake Inc.', sector: 'Technology', region: 'US', debtRatio: 0.05, pe: 0, mcap: '$52B' },
  { ticker: 'PLTR', name: 'Palantir Technologies', sector: 'Technology', region: 'US', debtRatio: 0.04, pe: 180.2, mcap: '$48B' },
  { ticker: 'SHOP', name: 'Shopify Inc.', sector: 'Technology', region: 'US', debtRatio: 0.08, pe: 95.4, mcap: '$92B' },
  { ticker: 'UBER', name: 'Uber Technologies', sector: 'Technology', region: 'US', debtRatio: 0.28, pe: 0, mcap: '$142B' },
  { ticker: 'ABNB', name: 'Airbnb Inc.', sector: 'Technology', region: 'US', debtRatio: 0.12, pe: 42.1, mcap: '$85B' },
  { ticker: 'CRWD', name: 'CrowdStrike Holdings', sector: 'Technology', region: 'US', debtRatio: 0.12, pe: 0, mcap: '$75B' },
  { ticker: 'DDOG', name: 'Datadog Inc.', sector: 'Technology', region: 'US', debtRatio: 0.08, pe: 280.4, mcap: '$42B' },
  { ticker: 'ZS', name: 'Zscaler Inc.', sector: 'Technology', region: 'US', debtRatio: 0.15, pe: 0, mcap: '$32B' },
  { ticker: 'AMZN', name: 'Amazon.com', sector: 'Consumer', region: 'US', debtRatio: 0.28, pe: 44.2, mcap: '$1.9T' },
  { ticker: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive', region: 'US', debtRatio: 0.10, pe: 55.0, mcap: '$780B' },
  { ticker: 'NKE', name: 'Nike Inc.', sector: 'Consumer', region: 'US', debtRatio: 0.25, pe: 28.4, mcap: '$120B' },
  { ticker: 'SBUX', name: 'Starbucks Corp.', sector: 'Consumer', region: 'US', debtRatio: 0.30, pe: 22.1, mcap: '$98B' },
  { ticker: 'COST', name: 'Costco Wholesale', sector: 'Consumer', region: 'US', debtRatio: 0.18, pe: 52.3, mcap: '$380B' },
  { ticker: 'WMT', name: 'Walmart Inc.', sector: 'Consumer', region: 'US', debtRatio: 0.22, pe: 32.1, mcap: '$520B' },
  { ticker: 'TGT', name: 'Target Corp.', sector: 'Consumer', region: 'US', debtRatio: 0.24, pe: 16.4, mcap: '$68B' },
  { ticker: 'ETSY', name: 'Etsy Inc.', sector: 'Consumer', region: 'US', debtRatio: 0.20, pe: 28.9, mcap: '$8B' },
  { ticker: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', region: 'US', debtRatio: 0.20, pe: 16.2, mcap: '$380B' },
  { ticker: 'UNH', name: 'UnitedHealth Group', sector: 'Healthcare', region: 'US', debtRatio: 0.28, pe: 22.4, mcap: '$480B' },
  { ticker: 'PFE', name: 'Pfizer Inc.', sector: 'Healthcare', region: 'US', debtRatio: 0.24, pe: 12.1, mcap: '$160B' },
  { ticker: 'ABBV', name: 'AbbVie Inc.', sector: 'Healthcare', region: 'US', debtRatio: 0.30, pe: 18.4, mcap: '$310B' },
  { ticker: 'MRK', name: 'Merck & Co.', sector: 'Healthcare', region: 'US', debtRatio: 0.22, pe: 14.8, mcap: '$280B' },
  { ticker: 'AMGN', name: 'Amgen Inc.', sector: 'Healthcare', region: 'US', debtRatio: 0.31, pe: 16.8, mcap: '$162B' },
  { ticker: 'ISRG', name: 'Intuitive Surgical', sector: 'Healthcare', region: 'US', debtRatio: 0.08, pe: 68.4, mcap: '$148B' },
  { ticker: 'XOM', name: 'ExxonMobil Corp.', sector: 'Energy', region: 'US', debtRatio: 0.18, pe: 14.2, mcap: '$480B' },
  { ticker: 'CVX', name: 'Chevron Corp.', sector: 'Energy', region: 'US', debtRatio: 0.15, pe: 13.8, mcap: '$295B' },
  { ticker: 'COP', name: 'ConocoPhillips', sector: 'Energy', region: 'US', debtRatio: 0.16, pe: 12.4, mcap: '$142B' },
  { ticker: 'OXY', name: 'Occidental Petroleum', sector: 'Energy', region: 'US', debtRatio: 0.25, pe: 14.2, mcap: '$48B' },
  { ticker: 'BA', name: 'Boeing Co.', sector: 'Industrials', region: 'US', debtRatio: 0.32, pe: 0, mcap: '$142B' },
  { ticker: 'CAT', name: 'Caterpillar Inc.', sector: 'Industrials', region: 'US', debtRatio: 0.28, pe: 18.4, mcap: '$185B' },
  { ticker: 'HON', name: 'Honeywell International', sector: 'Industrials', region: 'US', debtRatio: 0.26, pe: 22.1, mcap: '$135B' },
  { ticker: 'UPS', name: 'United Parcel Service', sector: 'Industrials', region: 'US', debtRatio: 0.29, pe: 18.2, mcap: '$120B' },
  { ticker: 'DE', name: 'Deere & Company', sector: 'Industrials', region: 'US', debtRatio: 0.29, pe: 14.2, mcap: '$112B' },
  { ticker: 'VZ', name: 'Verizon Communications', sector: 'Telecom', region: 'US', debtRatio: 0.32, pe: 8.4, mcap: '$168B' },
  { ticker: 'TMUS', name: 'T-Mobile US', sector: 'Telecom', region: 'US', debtRatio: 0.31, pe: 22.4, mcap: '$198B' },
  { ticker: 'AMT', name: 'American Tower', sector: 'Real Estate', region: 'US', debtRatio: 0.30, pe: 42.1, mcap: '$92B' },
  { ticker: 'PLD', name: 'Prologis Inc.', sector: 'Real Estate', region: 'US', debtRatio: 0.28, pe: 38.4, mcap: '$112B' },
  { ticker: 'HLAL', name: 'Wahed FTSE USA Shariah ETF', sector: 'ETF', region: 'US', debtRatio: 0.0, pe: 22.1, mcap: '$180M' },
  { ticker: 'SPUS', name: 'SP Funds S&P 500 Sharia', sector: 'ETF', region: 'US', debtRatio: 0.0, pe: 24.5, mcap: '$720M' },
  { ticker: 'SPRE', name: 'SP Funds Global REITs Sharia', sector: 'ETF', region: 'US', debtRatio: 0.0, pe: 18.2, mcap: '$95M' },
  { ticker: 'NFLX', name: 'Netflix Inc.', sector: 'Entertainment', region: 'US', debtRatio: 0.31, pe: 42.1, mcap: '$285B' },
  { ticker: 'PYPL', name: 'PayPal Holdings', sector: 'Fintech', region: 'US', debtRatio: 0.24, pe: 18.4, mcap: '$68B' },
  { ticker: 'SQ', name: 'Block Inc.', sector: 'Fintech', region: 'US', debtRatio: 0.18, pe: 0, mcap: '$42B' },
  { ticker: 'COIN', name: 'Coinbase Global', sector: 'Fintech', region: 'US', debtRatio: 0.18, pe: 0, mcap: '$45B' },
  { ticker: 'TSM', name: 'Taiwan Semiconductor', sector: 'Technology', region: 'Asia', debtRatio: 0.14, pe: 22.4, mcap: '$680B' },
  { ticker: 'ASML', name: 'ASML Holding', sector: 'Technology', region: 'Europe', debtRatio: 0.10, pe: 48.4, mcap: '$295B' },
  { ticker: 'SAP', name: 'SAP SE', sector: 'Technology', region: 'Europe', debtRatio: 0.12, pe: 32.4, mcap: '$245B' },
  { ticker: 'NOVO', name: 'Novo Nordisk', sector: 'Healthcare', region: 'Europe', debtRatio: 0.08, pe: 38.4, mcap: '$520B' },
  { ticker: 'BABA', name: 'Alibaba Group', sector: 'Technology', region: 'Asia', debtRatio: 0.12, pe: 12.4, mcap: '$210B' },
  { ticker: 'TM', name: 'Toyota Motor Corp.', sector: 'Automotive', region: 'Asia', debtRatio: 0.22, pe: 9.2, mcap: '$248B' },
  { ticker: '2222.SR', name: 'Saudi Aramco', sector: 'Energy', region: 'Gulf', debtRatio: 0.12, pe: 12.4, mcap: '$1.8T' },
  { ticker: '1120.SR', name: 'Al Rajhi Bank', sector: 'Islamic Banking', region: 'Gulf', debtRatio: 0.15, pe: 18.2, mcap: '$78B' },
  { ticker: '2280.SR', name: 'Almarai', sector: 'Consumer', region: 'Gulf', debtRatio: 0.20, pe: 24.4, mcap: '$14B' },
  { ticker: '7010.SR', name: 'STC Saudi Telecom', sector: 'Telecom', region: 'Gulf', debtRatio: 0.18, pe: 16.2, mcap: '$48B' },
  { ticker: 'EMAAR.AE', name: 'Emaar Properties', sector: 'Real Estate', region: 'Gulf', debtRatio: 0.22, pe: 8.4, mcap: '$12B' },
  { ticker: 'DIB.AE', name: 'Dubai Islamic Bank', sector: 'Islamic Banking', region: 'Gulf', debtRatio: 0.18, pe: 10.2, mcap: '$8B' },
  { ticker: 'ADNOC.AE', name: 'ADNOC Distribution', sector: 'Energy', region: 'Gulf', debtRatio: 0.14, pe: 14.8, mcap: '$18B' },
  { ticker: 'QNBK.QA', name: 'QNB Group', sector: 'Islamic Banking', region: 'Gulf', debtRatio: 0.25, pe: 12.4, mcap: '$42B' },
  { ticker: 'MARK.QA', name: 'Masraf Al Rayan', sector: 'Islamic Banking', region: 'Gulf', debtRatio: 0.12, pe: 14.2, mcap: '$8B' },
  { ticker: 'ORDS.QA', name: 'Ooredoo', sector: 'Telecom', region: 'Gulf', debtRatio: 0.22, pe: 10.4, mcap: '$7B' },
];

const SECTORS = ['All', ...new Set(ALL_STOCKS.map(s => s.sector))];
const REGIONS = ['All', 'US', 'Gulf', 'Asia', 'Europe'];

export default function Screener() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('All');
  const [region, setRegion] = useState('All');
  const [status, setStatus] = useState('All');
  const [sortBy, setSortBy] = useState('ticker');

  const filtered = useMemo(() => {
    return ALL_STOCKS
      .filter(s => {
        const screen = screenStock(s.ticker, s.sector, s.debtRatio);
        const matchSearch = s.ticker.toLowerCase().includes(search.toLowerCase()) ||
          s.name.toLowerCase().includes(search.toLowerCase());
        const matchSector = sector === 'All' || s.sector === sector;
        const matchRegion = region === 'All' || s.region === region;
        const matchStatus = status === 'All' || screen.status === status;
        return matchSearch && matchSector && matchRegion && matchStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'ticker') return a.ticker.localeCompare(b.ticker);
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'debt') return a.debtRatio - b.debtRatio;
        return 0;
      });
  }, [search, sector, region, status, sortBy]);

  const halalCount = filtered.filter(s => screenStock(s.ticker, s.sector, s.debtRatio).status === 'halal').length;

  return (
    <div style={{ width: '100%' }}>
      <Navbar title="Stock Screener" />

      {/* Stats bar */}
      <div style={{
        display: 'flex', gap: 10, marginBottom: 12,
        animation: 'fadeInUp 0.4s ease'
      }}>
        {[
          { label: 'Total Stocks', value: ALL_STOCKS.length, color: 'var(--accent-teal)' },
          { label: 'Showing', value: filtered.length, color: 'var(--accent-gold)' },
          { label: 'Halal', value: halalCount, color: 'var(--accent-green)' },
          { label: 'Needs Review', value: filtered.length - halalCount, color: 'var(--accent-red)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card" style={{
            display: 'flex', gap: 8, alignItems: 'center',
            padding: '8px 14px', flex: 1
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color }}>{value}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: 12, padding: '10px 12px' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'var(--bg-hover)', border: '1px solid var(--border)',
            borderRadius: 7, padding: '6px 10px', flex: 1, minWidth: 160
          }}>
            <Search size={12} color="var(--text-muted)" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search ticker or company..."
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--text-primary)', fontSize: 12, width: '100%'
              }}
            />
            {search && (
              <span onClick={() => setSearch('')} style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: 14 }}>×</span>
            )}
          </div>

          {[
            { value: region, setter: setRegion, options: REGIONS, prefix: '🌍' },
            { value: sector, setter: setSector, options: SECTORS, prefix: '📊' },
            { value: status, setter: setStatus, options: ['All', 'halal', 'questionable'], prefix: '☽' },
            { value: sortBy, setter: setSortBy, options: [{ v: 'ticker', l: 'A-Z' }, { v: 'name', l: 'Name' }, { v: 'debt', l: 'Debt' }], prefix: '↕' },
          ].map((f, i) => (
            <select
              key={i}
              value={f.value}
              onChange={e => f.setter(e.target.value)}
              style={{
                background: 'var(--bg-hover)', border: '1px solid var(--border)',
                borderRadius: 7, padding: '6px 10px', color: 'var(--text-primary)',
                fontSize: 11, cursor: 'pointer', outline: 'none'
              }}
            >
              {f.options.map(o => {
                const val = typeof o === 'string' ? o : o.v;
                const label = typeof o === 'string' ? o : o.l;
                return <option key={val} value={val}>{val === 'All' ? `${f.prefix} All` : label}</option>;
              })}
            </select>
          ))}

          <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
            <Filter size={10} />
            {filtered.length} stocks
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: 'calc(100vh - 280px)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
              <tr style={{ background: '#080d18', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                {['Stock', 'Sector', 'Region', 'Mkt Cap', 'P/E', 'Debt', 'Shariah'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '9px 12px', fontWeight: 500, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, idx) => {
                const screen = screenStock(s.ticker, s.sector, s.debtRatio);
                const color = SECTOR_COLORS[s.sector] || '#0ed2c8';
                const icon = SECTOR_ICONS[s.sector] || '📈';
                return (
                  <tr
                    key={s.ticker}
                    style={{
                      borderBottom: '1px solid var(--border)', cursor: 'pointer',
                      animation: `fadeInUp 0.3s ease ${idx * 0.01}s both`
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    onClick={() => navigate(`/stock/${s.ticker}`)}
                  >
                    <td style={{ padding: '9px 12px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                          background: `${color}15`, border: `1px solid ${color}30`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 12
                        }}>{icon}</div>
                        <div>
                          <div style={{ fontWeight: 700, color: color, fontSize: 12 }}>{s.ticker}</div>
                          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{s.name}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '9px 12px', whiteSpace: 'nowrap' }}>
                      <span style={{
                        fontSize: 10, padding: '2px 7px', borderRadius: 4,
                        background: `${color}12`, color, border: `1px solid ${color}25`,
                        fontWeight: 500
                      }}>
                        {s.sector}
                      </span>
                    </td>
                    <td style={{ padding: '9px 12px', whiteSpace: 'nowrap' }}>
                      <span style={{
                        fontSize: 10, padding: '2px 7px', borderRadius: 4,
                        background: s.region === 'Gulf' ? 'rgba(34,197,94,0.1)' :
                          s.region === 'US' ? 'rgba(14,210,200,0.1)' :
                          s.region === 'Asia' ? 'rgba(240,180,41,0.1)' : 'rgba(139,92,246,0.1)',
                        color: s.region === 'Gulf' ? 'var(--accent-green)' :
                          s.region === 'US' ? 'var(--accent-teal)' :
                          s.region === 'Asia' ? 'var(--accent-gold)' : 'var(--accent-purple)',
                      }}>
                        {s.region === 'Gulf' ? '🌙' : s.region === 'US' ? '🇺🇸' : s.region === 'Asia' ? '🌏' : '🇪🇺'} {s.region}
                      </span>
                    </td>
                    <td style={{ padding: '9px 12px', whiteSpace: 'nowrap', fontSize: 11 }}>{s.mcap}</td>
                    <td style={{ padding: '9px 12px', whiteSpace: 'nowrap', fontSize: 11 }}>{s.pe > 0 ? s.pe : '—'}</td>
                    <td style={{ padding: '9px 12px', whiteSpace: 'nowrap' }}>
                      <span style={{
                        fontSize: 11, fontWeight: 600,
                        color: s.debtRatio > 0.33 ? 'var(--accent-red)' : 'var(--accent-green)'
                      }}>
                        {(s.debtRatio * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td style={{ padding: '9px 12px', whiteSpace: 'nowrap' }}>
                      <span className={screen.status === 'halal' ? 'badge-halal' : 'badge-screen'}>
                        {screen.status === 'halal' ? '✓ Halal' : '⚠ Review'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
