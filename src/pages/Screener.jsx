import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { screenStock } from '../utils/halalScreener';
import { Search, Filter } from 'lucide-react';

const ALL_STOCKS = [
  // Technology
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
  { ticker: 'COIN', name: 'Coinbase Global', sector: 'Technology', region: 'US', debtRatio: 0.18, pe: 0, mcap: '$45B' },
  { ticker: 'RBLX', name: 'Roblox Corp.', sector: 'Technology', region: 'US', debtRatio: 0.22, pe: 0, mcap: '$22B' },
  { ticker: 'U', name: 'Unity Software', sector: 'Technology', region: 'US', debtRatio: 0.15, pe: 0, mcap: '$12B' },

  // E-Commerce & Consumer
  { ticker: 'AMZN', name: 'Amazon.com', sector: 'Consumer', region: 'US', debtRatio: 0.28, pe: 44.2, mcap: '$1.9T' },
  { ticker: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive', region: 'US', debtRatio: 0.10, pe: 55.0, mcap: '$780B' },
  { ticker: 'NKE', name: 'Nike Inc.', sector: 'Consumer', region: 'US', debtRatio: 0.25, pe: 28.4, mcap: '$120B' },
  { ticker: 'SBUX', name: 'Starbucks Corp.', sector: 'Consumer', region: 'US', debtRatio: 0.30, pe: 22.1, mcap: '$98B' },
  { ticker: 'MCD', name: "McDonald's Corp.", sector: 'Consumer', region: 'US', debtRatio: 0.32, pe: 24.5, mcap: '$210B' },
  { ticker: 'COST', name: 'Costco Wholesale', sector: 'Consumer', region: 'US', debtRatio: 0.18, pe: 52.3, mcap: '$380B' },
  { ticker: 'WMT', name: 'Walmart Inc.', sector: 'Consumer', region: 'US', debtRatio: 0.22, pe: 32.1, mcap: '$520B' },
  { ticker: 'TGT', name: 'Target Corp.', sector: 'Consumer', region: 'US', debtRatio: 0.24, pe: 16.4, mcap: '$68B' },
  { ticker: 'ETSY', name: 'Etsy Inc.', sector: 'Consumer', region: 'US', debtRatio: 0.20, pe: 28.9, mcap: '$8B' },
  { ticker: 'EBAY', name: 'eBay Inc.', sector: 'Consumer', region: 'US', debtRatio: 0.26, pe: 12.4, mcap: '$26B' },

  // Healthcare
  { ticker: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', region: 'US', debtRatio: 0.20, pe: 16.2, mcap: '$380B' },
  { ticker: 'UNH', name: 'UnitedHealth Group', sector: 'Healthcare', region: 'US', debtRatio: 0.28, pe: 22.4, mcap: '$480B' },
  { ticker: 'PFE', name: 'Pfizer Inc.', sector: 'Healthcare', region: 'US', debtRatio: 0.24, pe: 12.1, mcap: '$160B' },
  { ticker: 'ABBV', name: 'AbbVie Inc.', sector: 'Healthcare', region: 'US', debtRatio: 0.30, pe: 18.4, mcap: '$310B' },
  { ticker: 'MRK', name: 'Merck & Co.', sector: 'Healthcare', region: 'US', debtRatio: 0.22, pe: 14.8, mcap: '$280B' },
  { ticker: 'BMY', name: 'Bristol-Myers Squibb', sector: 'Healthcare', region: 'US', debtRatio: 0.29, pe: 10.2, mcap: '$145B' },
  { ticker: 'AMGN', name: 'Amgen Inc.', sector: 'Healthcare', region: 'US', debtRatio: 0.31, pe: 16.8, mcap: '$162B' },
  { ticker: 'GILD', name: 'Gilead Sciences', sector: 'Healthcare', region: 'US', debtRatio: 0.27, pe: 14.2, mcap: '$95B' },
  { ticker: 'ISRG', name: 'Intuitive Surgical', sector: 'Healthcare', region: 'US', debtRatio: 0.08, pe: 68.4, mcap: '$148B' },
  { ticker: 'DXCM', name: 'Dexcom Inc.', sector: 'Healthcare', region: 'US', debtRatio: 0.18, pe: 85.2, mcap: '$38B' },

  // Energy
  { ticker: 'XOM', name: 'ExxonMobil Corp.', sector: 'Energy', region: 'US', debtRatio: 0.18, pe: 14.2, mcap: '$480B' },
  { ticker: 'CVX', name: 'Chevron Corp.', sector: 'Energy', region: 'US', debtRatio: 0.15, pe: 13.8, mcap: '$295B' },
  { ticker: 'COP', name: 'ConocoPhillips', sector: 'Energy', region: 'US', debtRatio: 0.16, pe: 12.4, mcap: '$142B' },
  { ticker: 'SLB', name: 'SLB (Schlumberger)', sector: 'Energy', region: 'US', debtRatio: 0.22, pe: 18.2, mcap: '$68B' },
  { ticker: 'EOG', name: 'EOG Resources', sector: 'Energy', region: 'US', debtRatio: 0.14, pe: 11.8, mcap: '$72B' },
  { ticker: 'PSX', name: 'Phillips 66', sector: 'Energy', region: 'US', debtRatio: 0.26, pe: 10.4, mcap: '$52B' },
  { ticker: 'VLO', name: 'Valero Energy', sector: 'Energy', region: 'US', debtRatio: 0.24, pe: 8.2, mcap: '$48B' },
  { ticker: 'MPC', name: 'Marathon Petroleum', sector: 'Energy', region: 'US', debtRatio: 0.28, pe: 9.1, mcap: '$58B' },
  { ticker: 'OXY', name: 'Occidental Petroleum', sector: 'Energy', region: 'US', debtRatio: 0.25, pe: 14.2, mcap: '$48B' },
  { ticker: 'HAL', name: 'Halliburton Co.', sector: 'Energy', region: 'US', debtRatio: 0.20, pe: 14.8, mcap: '$32B' },

  // Industrials
  { ticker: 'BA', name: 'Boeing Co.', sector: 'Industrials', region: 'US', debtRatio: 0.32, pe: 0, mcap: '$142B' },
  { ticker: 'CAT', name: 'Caterpillar Inc.', sector: 'Industrials', region: 'US', debtRatio: 0.28, pe: 18.4, mcap: '$185B' },
  { ticker: 'GE', name: 'GE Aerospace', sector: 'Industrials', region: 'US', debtRatio: 0.24, pe: 32.4, mcap: '$195B' },
  { ticker: 'HON', name: 'Honeywell International', sector: 'Industrials', region: 'US', debtRatio: 0.26, pe: 22.1, mcap: '$135B' },
  { ticker: 'MMM', name: '3M Company', sector: 'Industrials', region: 'US', debtRatio: 0.30, pe: 12.4, mcap: '$58B' },
  { ticker: 'UPS', name: 'United Parcel Service', sector: 'Industrials', region: 'US', debtRatio: 0.29, pe: 18.2, mcap: '$120B' },
  { ticker: 'FDX', name: 'FedEx Corp.', sector: 'Industrials', region: 'US', debtRatio: 0.27, pe: 14.8, mcap: '$68B' },
  { ticker: 'RTX', name: 'RTX Corp.', sector: 'Defense', region: 'US', debtRatio: 0.28, pe: 32.1, mcap: '$155B' },
  { ticker: 'LMT', name: 'Lockheed Martin', sector: 'Defense', region: 'US', debtRatio: 0.25, pe: 18.4, mcap: '$115B' },
  { ticker: 'DE', name: 'Deere & Company', sector: 'Industrials', region: 'US', debtRatio: 0.29, pe: 14.2, mcap: '$112B' },

  // Telecom
  { ticker: 'VZ', name: 'Verizon Communications', sector: 'Telecom', region: 'US', debtRatio: 0.32, pe: 8.4, mcap: '$168B' },
  { ticker: 'T', name: 'AT&T Inc.', sector: 'Telecom', region: 'US', debtRatio: 0.33, pe: 7.2, mcap: '$145B' },
  { ticker: 'TMUS', name: 'T-Mobile US', sector: 'Telecom', region: 'US', debtRatio: 0.31, pe: 22.4, mcap: '$198B' },
  { ticker: 'DISH', name: 'DISH Network', sector: 'Telecom', region: 'US', debtRatio: 0.32, pe: 0, mcap: '$2B' },

  // Real Estate
  { ticker: 'AMT', name: 'American Tower', sector: 'Real Estate', region: 'US', debtRatio: 0.30, pe: 42.1, mcap: '$92B' },
  { ticker: 'PLD', name: 'Prologis Inc.', sector: 'Real Estate', region: 'US', debtRatio: 0.28, pe: 38.4, mcap: '$112B' },
  { ticker: 'EQIX', name: 'Equinix Inc.', sector: 'Real Estate', region: 'US', debtRatio: 0.29, pe: 78.2, mcap: '$78B' },
  { ticker: 'CCI', name: 'Crown Castle Inc.', sector: 'Real Estate', region: 'US', debtRatio: 0.31, pe: 28.4, mcap: '$48B' },
  { ticker: 'SPG', name: 'Simon Property Group', sector: 'Real Estate', region: 'US', debtRatio: 0.32, pe: 22.1, mcap: '$58B' },

  // Halal ETFs
  { ticker: 'HLAL', name: 'Wahed FTSE USA Shariah ETF', sector: 'ETF', region: 'US', debtRatio: 0.0, pe: 22.1, mcap: '$180M' },
  { ticker: 'SPUS', name: 'SP Funds S&P 500 Sharia', sector: 'ETF', region: 'US', debtRatio: 0.0, pe: 24.5, mcap: '$720M' },
  { ticker: 'SPRE', name: 'SP Funds Global REITs Sharia', sector: 'ETF', region: 'US', debtRatio: 0.0, pe: 18.2, mcap: '$95M' },
  { ticker: 'UMMA', name: 'Saturna Al-Kawthar Global', sector: 'ETF', region: 'US', debtRatio: 0.0, pe: 20.4, mcap: '$45M' },

  // International
  { ticker: 'BABA', name: 'Alibaba Group', sector: 'Technology', region: 'Asia', debtRatio: 0.12, pe: 12.4, mcap: '$210B' },
  { ticker: 'TSM', name: 'Taiwan Semiconductor', sector: 'Technology', region: 'Asia', debtRatio: 0.14, pe: 22.4, mcap: '$680B' },
  { ticker: 'SONY', name: 'Sony Group Corp.', sector: 'Technology', region: 'Asia', debtRatio: 0.18, pe: 18.4, mcap: '$112B' },
  { ticker: 'TM', name: 'Toyota Motor Corp.', sector: 'Automotive', region: 'Asia', debtRatio: 0.22, pe: 9.2, mcap: '$248B' },
  { ticker: 'ASML', name: 'ASML Holding', sector: 'Technology', region: 'Europe', debtRatio: 0.10, pe: 48.4, mcap: '$295B' },
  { ticker: 'SAP', name: 'SAP SE', sector: 'Technology', region: 'Europe', debtRatio: 0.12, pe: 32.4, mcap: '$245B' },
  { ticker: 'NESN', name: 'Nestlé SA', sector: 'Consumer', region: 'Europe', debtRatio: 0.24, pe: 22.1, mcap: '$295B' },
  { ticker: 'NOVO', name: 'Novo Nordisk', sector: 'Healthcare', region: 'Europe', debtRatio: 0.08, pe: 38.4, mcap: '$520B' },
  { ticker: 'LVMH', name: 'LVMH Moët Hennessy', sector: 'Consumer', region: 'Europe', debtRatio: 0.20, pe: 22.4, mcap: '$385B' },
  { ticker: 'SIEGY', name: 'Siemens AG', sector: 'Industrials', region: 'Europe', debtRatio: 0.18, pe: 18.2, mcap: '$148B' },

  // Gulf Region
  { ticker: '2222.SR', name: 'Saudi Aramco', sector: 'Energy', region: 'Gulf', debtRatio: 0.12, pe: 12.4, mcap: '$1.8T' },
  { ticker: '1120.SR', name: 'Al Rajhi Bank', sector: 'Islamic Banking', region: 'Gulf', debtRatio: 0.15, pe: 18.2, mcap: '$78B' },
  { ticker: '2280.SR', name: 'Almarai', sector: 'Consumer', region: 'Gulf', debtRatio: 0.20, pe: 24.4, mcap: '$14B' },
  { ticker: '7010.SR', name: 'STC Saudi Telecom', sector: 'Telecom', region: 'Gulf', debtRatio: 0.18, pe: 16.2, mcap: '$48B' },
  { ticker: 'EMAAR.AE', name: 'Emaar Properties', sector: 'Real Estate', region: 'Gulf', debtRatio: 0.22, pe: 8.4, mcap: '$12B' },
  { ticker: 'DIB.AE', name: 'Dubai Islamic Bank', sector: 'Islamic Banking', region: 'Gulf', debtRatio: 0.18, pe: 10.2, mcap: '$8B' },
  { ticker: 'ADNOC.AE', name: 'ADNOC Distribution', sector: 'Energy', region: 'Gulf', debtRatio: 0.14, pe: 14.8, mcap: '$18B' },
  { ticker: 'QNBK.QA', name: 'QNB Group', sector: 'Banking', region: 'Gulf', debtRatio: 0.25, pe: 12.4, mcap: '$42B' },
  { ticker: 'MARK.QA', name: 'Masraf Al Rayan', sector: 'Islamic Banking', region: 'Gulf', debtRatio: 0.12, pe: 14.2, mcap: '$8B' },
  { ticker: 'ORDS.QA', name: 'Ooredoo', sector: 'Telecom', region: 'Gulf', debtRatio: 0.22, pe: 10.4, mcap: '$7B' },

  // More US
  { ticker: 'NFLX', name: 'Netflix Inc.', sector: 'Entertainment', region: 'US', debtRatio: 0.31, pe: 42.1, mcap: '$285B' },
  { ticker: 'DIS', name: 'Walt Disney Co.', sector: 'Entertainment', region: 'US', debtRatio: 0.29, pe: 72.4, mcap: '$198B' },
  { ticker: 'PYPL', name: 'PayPal Holdings', sector: 'Fintech', region: 'US', debtRatio: 0.24, pe: 18.4, mcap: '$68B' },
  { ticker: 'SQ', name: 'Block Inc.', sector: 'Fintech', region: 'US', debtRatio: 0.18, pe: 0, mcap: '$42B' },
  { ticker: 'SPOT', name: 'Spotify Technology', sector: 'Entertainment', region: 'US', debtRatio: 0.12, pe: 0, mcap: '$62B' },
  { ticker: 'ZOOM', name: 'Zoom Video Comm.', sector: 'Technology', region: 'US', debtRatio: 0.04, pe: 22.4, mcap: '$22B' },
  { ticker: 'TWLO', name: 'Twilio Inc.', sector: 'Technology', region: 'US', debtRatio: 0.14, pe: 0, mcap: '$12B' },
  { ticker: 'DDOG', name: 'Datadog Inc.', sector: 'Technology', region: 'US', debtRatio: 0.08, pe: 280.4, mcap: '$42B' },
  { ticker: 'CRWD', name: 'CrowdStrike Holdings', sector: 'Technology', region: 'US', debtRatio: 0.12, pe: 0, mcap: '$75B' },
  { ticker: 'ZS', name: 'Zscaler Inc.', sector: 'Technology', region: 'US', debtRatio: 0.15, pe: 0, mcap: '$32B' },
];

const SECTORS = ['All', 'Technology', 'Consumer', 'Healthcare', 'Energy', 'Industrials', 'Telecom', 'Real Estate', 'Automotive', 'Islamic Banking', 'ETF', 'Entertainment', 'Fintech', 'Defense'];
const REGIONS = ['All', 'US', 'Gulf', 'Asia', 'Europe'];
const STATUS = ['All', 'halal', 'questionable', 'haram'];

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

  return (
    <div style={{ width: '100%' }}>
      <Navbar title="Stock Screener" />

      {/* Filter Bar */}
      <div className="card" style={{ marginBottom: 12, padding: '12px 14px' }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>

          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'var(--bg-hover)', border: '1px solid var(--border)',
            borderRadius: 6, padding: '6px 10px', flex: 1, minWidth: 180
          }}>
            <Search size={12} color="var(--text-muted)" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search ticker or name..."
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--text-primary)', fontSize: 12, width: '100%'
              }}
            />
          </div>

          {/* Region */}
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            style={{
              background: 'var(--bg-hover)', border: '1px solid var(--border)',
              borderRadius: 6, padding: '6px 10px', color: 'var(--text-primary)',
              fontSize: 11, cursor: 'pointer', outline: 'none'
            }}
          >
            {REGIONS.map(r => <option key={r} value={r}>{r === 'All' ? '🌍 All Regions' : r}</option>)}
          </select>

          {/* Sector */}
          <select
            value={sector}
            onChange={e => setSector(e.target.value)}
            style={{
              background: 'var(--bg-hover)', border: '1px solid var(--border)',
              borderRadius: 6, padding: '6px 10px', color: 'var(--text-primary)',
              fontSize: 11, cursor: 'pointer', outline: 'none'
            }}
          >
            {SECTORS.map(s => <option key={s} value={s}>{s === 'All' ? '📊 All Sectors' : s}</option>)}
          </select>

          {/* Shariah Status */}
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            style={{
              background: 'var(--bg-hover)', border: '1px solid var(--border)',
              borderRadius: 6, padding: '6px 10px', color: 'var(--text-primary)',
              fontSize: 11, cursor: 'pointer', outline: 'none'
            }}
          >
            {STATUS.map(s => <option key={s} value={s}>{s === 'All' ? '☽ All Status' : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              background: 'var(--bg-hover)', border: '1px solid var(--border)',
              borderRadius: 6, padding: '6px 10px', color: 'var(--text-primary)',
              fontSize: 11, cursor: 'pointer', outline: 'none'
            }}
          >
            <option value="ticker">Sort: Ticker</option>
            <option value="name">Sort: Name</option>
            <option value="debt">Sort: Debt Ratio</option>
          </select>

          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>
            <Filter size={10} style={{ marginRight: 4 }} />
            {filtered.length} stocks
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: 'calc(100vh - 260px)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
              <tr style={{
                color: 'var(--text-muted)',
                borderBottom: '1px solid var(--border)',
                background: '#080d18'
              }}>
                {['Ticker', 'Company', 'Sector', 'Region', 'Market Cap', 'P/E', 'Debt %', 'Shariah'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '9px 12px', fontWeight: 500, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => {
                const screen = screenStock(s.ticker, s.sector, s.debtRatio);
                return (
                  <tr
                    key={s.ticker}
                    style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    onClick={() => navigate(`/stock/${s.ticker}`)}
                  >
                    <td style={{ padding: '9px 12px', fontWeight: 700, color: 'var(--accent-teal)', whiteSpace: 'nowrap' }}>
                      {s.ticker}
                    </td>
                    <td style={{ padding: '9px 12px', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                      {s.name}
                    </td>
                    <td style={{ padding: '9px 12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {s.sector}
                    </td>
                    <td style={{ padding: '9px 12px', whiteSpace: 'nowrap' }}>
                      <span style={{
                        fontSize: 10, padding: '2px 6px', borderRadius: 4,
                        background: s.region === 'Gulf' ? 'rgba(34,197,94,0.1)' :
                          s.region === 'US' ? 'rgba(14,210,200,0.1)' :
                            s.region === 'Asia' ? 'rgba(240,180,41,0.1)' : 'rgba(139,92,246,0.1)',
                        color: s.region === 'Gulf' ? 'var(--accent-green)' :
                          s.region === 'US' ? 'var(--accent-teal)' :
                            s.region === 'Asia' ? 'var(--accent-gold)' : 'var(--accent-purple)',
                      }}>
                        {s.region}
                      </span>
                    </td>
                    <td style={{ padding: '9px 12px', whiteSpace: 'nowrap' }}>{s.mcap}</td>
                    <td style={{ padding: '9px 12px', whiteSpace: 'nowrap' }}>
                      {s.pe > 0 ? s.pe : '—'}
                    </td>
                    <td style={{ padding: '9px 12px', whiteSpace: 'nowrap' }}>
                      <span style={{ color: s.debtRatio > 0.33 ? 'var(--accent-red)' : 'var(--accent-green)' }}>
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
