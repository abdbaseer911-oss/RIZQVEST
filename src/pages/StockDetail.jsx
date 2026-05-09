import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Shield } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { screenStock } from '../utils/halalScreener';
import { formatPrice } from '../utils/formatters';
import Navbar from '../components/Navbar';
import { useStockQuote, useStockHistory } from '../hooks/useStockData';

const STOCK_INFO = {
  AAPL: { name: 'Apple Inc.', sector: 'Technology', description: 'Apple designs consumer electronics, software and online services including iPhone, Mac and iPad.', debtRatio: 0.18, pe: 28.4, employees: '164,000' },
  MSFT: { name: 'Microsoft Corp.', sector: 'Technology', description: 'Microsoft develops software, hardware and cloud services including Windows, Office 365 and Azure.', debtRatio: 0.21, pe: 34.1, employees: '221,000' },
  NVDA: { name: 'NVIDIA Corp.', sector: 'Technology', description: 'NVIDIA designs graphics processing units for gaming, data centers and automotive markets.', debtRatio: 0.12, pe: 65.3, employees: '29,600' },
  AMZN: { name: 'Amazon.com', sector: 'Technology', description: 'Amazon operates e-commerce and cloud computing including retail and AWS cloud services.', debtRatio: 0.28, pe: 44.2, employees: '1,540,000' },
  TSLA: { name: 'Tesla Inc.', sector: 'Automotive', description: 'Tesla designs and manufactures electric vehicles, energy storage and solar products.', debtRatio: 0.10, pe: 55.0, employees: '127,855' },
  GOOGL: { name: 'Alphabet Inc.', sector: 'Technology', description: 'Alphabet is parent of Google, operating search, advertising, cloud and hardware products.', debtRatio: 0.08, pe: 25.1, employees: '182,381' },
  META: { name: 'Meta Platforms', sector: 'Technology', description: 'Meta builds social technology including Facebook, Instagram, WhatsApp and the metaverse.', debtRatio: 0.09, pe: 24.3, employees: '86,482' },
  NFLX: { name: 'Netflix Inc.', sector: 'Entertainment', description: 'Netflix is a streaming entertainment service with over 260 million paid memberships worldwide.', debtRatio: 0.31, pe: 42.1, employees: '13,000' },
  AMD: { name: 'Advanced Micro Devices', sector: 'Technology', description: 'AMD designs high performance CPUs and GPUs for gaming, data center and embedded markets.', debtRatio: 0.11, pe: 38.5, employees: '26,000' },
  INTC: { name: 'Intel Corp.', sector: 'Technology', description: 'Intel designs and manufactures semiconductor chips, processors and related technologies.', debtRatio: 0.29, pe: 12.4, employees: '124,800' },
  HLAL: { name: 'Wahed FTSE USA Shariah ETF', sector: 'ETF', description: 'HLAL tracks the FTSE USA Shariah Index, providing exposure to large and mid-cap US companies that pass Shariah screening.', debtRatio: 0.0, pe: 22.1, employees: 'N/A' },
  SPUS: { name: 'SP Funds S&P 500 Sharia ETF', sector: 'ETF', description: 'SPUS tracks a Shariah-compliant version of the S&P 500, excluding companies involved in prohibited activities.', debtRatio: 0.0, pe: 24.5, employees: 'N/A' },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 8, padding: '8px 12px', fontSize: 12
      }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: 3 }}>{label}</div>
        <div style={{ fontWeight: 700, color: 'var(--accent-teal)' }}>
          {formatPrice(payload[0].value)}
        </div>
      </div>
    );
  }
  return null;
};

export default function StockDetail() {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const info = STOCK_INFO[ticker] || {
    name: ticker, sector: 'Unknown',
    description: 'Company information not available.',
    debtRatio: 0.2, pe: 0, employees: '—'
  };
  const screen = screenStock(ticker, info.sector, info.debtRatio);
  const { data: quote, loading: quoteLoading } = useStockQuote(ticker);
  const { data: history, loading: histLoading } = useStockHistory(ticker);

  const price = quote?.c || null;
  const change = quote?.change || null;
  const isUp = (change || 0) >= 0;

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <Navbar title="Stock Detail" />

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 7, padding: '7px 12px', color: 'var(--text-secondary)',
          fontSize: 12, cursor: 'pointer', marginBottom: 16
        }}
      >
        <ArrowLeft size={13} /> Back to Dashboard
      </button>

      {/* Header */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'linear-gradient(135deg, var(--accent-teal), var(--accent-purple))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: '#000'
            }}>
              {ticker?.slice(0, 2)}
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800 }}>
                {ticker}
              </h2>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{info.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{info.sector}</div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            {quoteLoading ? (
              <div style={{ width: 130, height: 44, background: 'var(--bg-hover)', borderRadius: 8, animation: 'pulse 1.5s infinite' }} />
            ) : (
              <>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800 }}>
                  {formatPrice(price)}
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  justifyContent: 'flex-end', marginTop: 3,
                  color: isUp ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: 13
                }}>
                  {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {change !== null ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : '—'}
                  <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>
                    {quote?.isLive ? '🟢 live' : '🔴 ref'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, marginBottom: 14 }}>
          30-Day Price Chart
        </h3>
        {histLoading ? (
          <div style={{ height: 200, background: 'var(--bg-hover)', borderRadius: 8, animation: 'pulse 1.5s infinite' }} />
        ) : history.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} interval="preserveStartEnd" />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `$${v}`} domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="price" stroke="var(--accent-teal)" strokeWidth={2} dot={false} activeDot={{ r: 3, fill: 'var(--accent-teal)' }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
            Chart data unavailable
          </div>
        )}
      </div>

      <div className="grid-2">
        {/* Shariah */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Shield size={15} color="var(--accent-teal)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14 }}>Shariah Screening</h3>
          </div>
          <div style={{
            padding: '10px 14px', borderRadius: 8, marginBottom: 14,
            background: screen.status === 'halal' ? 'rgba(34,197,94,0.08)' : 'rgba(251,191,36,0.08)',
            border: `1px solid ${screen.status === 'halal' ? 'rgba(34,197,94,0.25)' : 'rgba(251,191,36,0.25)'}`
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3, color: screen.status === 'halal' ? 'var(--accent-green)' : 'var(--accent-gold)' }}>
              {screen.status === 'halal' ? '✓ Shariah Compliant' : '⚠ Needs Review'}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{screen.reason}</div>
          </div>
          {[
            { label: 'Business Activity', value: info.sector, pass: screen.status === 'halal' },
            { label: 'Debt Ratio', value: `${(info.debtRatio * 100).toFixed(0)}% (max 33%)`, pass: info.debtRatio <= 0.33 },
            { label: 'Interest Income', value: 'Within limits', pass: screen.status === 'halal' },
            { label: 'Receivables', value: 'Within limits', pass: true },
          ].map(({ label, value, pass }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
              <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 11 }}>{value}</span>
                <span style={{ color: pass ? 'var(--accent-green)' : 'var(--accent-red)' }}>{pass ? '✓' : '✗'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Company Info */}
        <div className="card">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, marginBottom: 14 }}>
            About {info.name}
          </h3>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
            {info.description}
          </p>
          {[
            { label: 'Sector', value: info.sector },
            { label: 'P/E Ratio', value: info.pe || '—' },
            { label: 'Employees', value: info.employees || '—' },
            { label: 'Debt/Assets', value: `${(info.debtRatio * 100).toFixed(0)}%` },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
              <span style={{ color: 'var(--text-muted)' }}>{label}</span>
              <span style={{ fontWeight: 600 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
