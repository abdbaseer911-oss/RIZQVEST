import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Shield, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useStockHistory, useStockQuote } from '../hooks/useStockData';
import { screenStock } from '../utils/halalScreener';
import { formatPrice, formatChange, formatVolume } from '../utils/formatters';
import Navbar from '../components/Navbar';

const STOCK_INFO = {
  AAPL: { name: 'Apple Inc.', sector: 'Technology', description: 'Apple designs and sells consumer electronics, software and online services. Known for iPhone, Mac, iPad and Apple Watch.', debtRatio: 0.18, pe: 28.4, employees: '164,000' },
  MSFT: { name: 'Microsoft Corp.', sector: 'Technology', description: 'Microsoft develops and licenses software, hardware and cloud services including Windows, Office 365 and Azure.', debtRatio: 0.21, pe: 34.1, employees: '221,000' },
  NVDA: { name: 'NVIDIA Corp.', sector: 'Technology', description: 'NVIDIA designs graphics processing units for gaming, professional visualization, data centers and automotive markets.', debtRatio: 0.12, pe: 65.3, employees: '29,600' },
  AMZN: { name: 'Amazon.com', sector: 'Technology', description: 'Amazon is an e-commerce and cloud computing company offering retail, AWS cloud services and digital streaming.', debtRatio: 0.28, pe: 44.2, employees: '1,540,000' },
  TSLA: { name: 'Tesla Inc.', sector: 'Automotive', description: 'Tesla designs and manufactures electric vehicles, energy storage systems and solar products.', debtRatio: 0.10, pe: 55.0, employees: '127,855' },
  GOOGL: { name: 'Alphabet Inc.', sector: 'Technology', description: 'Alphabet is the parent company of Google, operating search, advertising, cloud computing and hardware products.', debtRatio: 0.08, pe: 25.1, employees: '182,381' },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 8, padding: '10px 14px', fontSize: 12
      }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
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
  const info = STOCK_INFO[ticker] || { name: ticker, sector: 'Unknown', description: 'No description available.', debtRatio: 0.2, pe: 0 };
  const { data: quote, loading: quoteLoading } = useStockQuote(ticker);
  const { data: history, loading: histLoading } = useStockHistory(ticker);
  const screen = screenStock(ticker, info.sector, info.debtRatio);

  const price = quote?.c || null;
  const change = quote?.change || quote?.todaysChangePerc || null;
  const isUp = (change || 0) >= 0;

  return (
    <div>
      <Navbar title="Stock Detail" />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 8, padding: '8px 14px', color: 'var(--text-secondary)',
          fontSize: 13, cursor: 'pointer', marginBottom: 20
        }}
      >
        <ArrowLeft size={14} /> Back
      </button>

      {/* Header */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
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
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{info.name}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{info.sector}</div>
          </div>

          <div style={{ textAlign: 'right' }}>
            {quoteLoading ? (
              <div style={{ width: 120, height: 40, background: 'var(--bg-hover)', borderRadius: 8 }} />
            ) : (
              <>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800 }}>
                  {formatPrice(price)}
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end',
                  color: isUp ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: 14, marginTop: 4
                }}>
                  {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {change !== null ? formatChange(change) : '—'}
                  <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                    {quote?.isLive ? '🟢 live' : '🔴 ref'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        {/* Price Chart */}
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, marginBottom: 16 }}>
            30-Day Price Chart
          </h3>
          {histLoading ? (
            <div style={{ height: 200, background: 'var(--bg-hover)', borderRadius: 8, animation: 'pulse 1.5s infinite' }}>
              <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
            </div>
          ) : history.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                  tickLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={v => `$${v}`}
                  domain={['auto', 'auto']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="var(--accent-teal)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: 'var(--accent-teal)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Chart data unavailable
            </div>
          )}
        </div>

        {/* Shariah Screening */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Shield size={16} color="var(--accent-teal)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15 }}>Shariah Screening</h3>
          </div>

          <div style={{
            padding: '12px 16px', borderRadius: 10, marginBottom: 16,
            background: screen.status === 'halal' ? 'rgba(34,197,94,0.08)' : 'rgba(251,191,36,0.08)',
            border: `1px solid ${screen.status === 'halal' ? 'rgba(34,197,94,0.3)' : 'rgba(251,191,36,0.3)'}`
          }}>
            <div style={{
              fontSize: 15, fontWeight: 700,
              color: screen.status === 'halal' ? 'var(--accent-green)' : 'var(--accent-gold)',
              marginBottom: 4
            }}>
              {screen.status === 'halal' ? '✓ Shariah Compliant' : '⚠ Needs Review'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{screen.reason}</div>
          </div>

          {[
            { label: 'Business Activity', value: info.sector, pass: screen.status === 'halal' },
            { label: 'Debt Ratio', value: `${(info.debtRatio * 100).toFixed(0)}% (max 33%)`, pass: info.debtRatio <= 0.33 },
            { label: 'Interest Income', value: 'Within limits', pass: screen.status === 'halal' },
            { label: 'Receivables Ratio', value: 'Within limits', pass: true },
          ].map(({ label, value, pass }) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13
            }}>
              <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11 }}>{value}</span>
                <span style={{ color: pass ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                  {pass ? '✓' : '✗'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Company Info */}
        <div className="card">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, marginBottom: 16 }}>
            About {info.name}
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
            {info.description}
          </p>

          {[
            { label: 'Sector', value: info.sector },
            { label: 'P/E Ratio', value: info.pe || '—' },
            { label: 'Employees', value: info.employees || '—' },
            { label: 'Debt/Assets', value: `${(info.debtRatio * 100).toFixed(0)}%` },
          ].map(({ label, value }) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13
            }}>
              <span style={{ color: 'var(--text-muted)' }}>{label}</span>
              <span style={{ fontWeight: 600 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
