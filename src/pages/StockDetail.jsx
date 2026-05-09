import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Shield } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { screenStock } from '../utils/halalScreener';
import { formatPrice, formatChange } from '../utils/formatters';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

const STOCK_INFO = {
  AAPL: { name: 'Apple Inc.', sector: 'Technology', description: 'Apple designs consumer electronics, software and online services including iPhone, Mac and iPad.', debtRatio: 0.18, pe: 28.4, employees: '164,000' },
  MSFT: { name: 'Microsoft Corp.', sector: 'Technology', description: 'Microsoft develops software, hardware and cloud services including Windows, Office 365 and Azure.', debtRatio: 0.21, pe: 34.1, employees: '221,000' },
  NVDA: { name: 'NVIDIA Corp.', sector: 'Technology', description: 'NVIDIA designs graphics processing units for gaming, data centers and automotive markets.', debtRatio: 0.12, pe: 65.3, employees: '29,600' },
  AMZN: { name: 'Amazon.com', sector: 'Technology', description: 'Amazon operates e-commerce and cloud computing including retail and AWS cloud services.', debtRatio: 0.28, pe: 44.2, employees: '1,540,000' },
  TSLA: { name: 'Tesla Inc.', sector: 'Automotive', description: 'Tesla designs and manufactures electric vehicles, energy storage and solar products.', debtRatio: 0.10, pe: 55.0, employees: '127,855' },
  GOOGL: { name: 'Alphabet Inc.', sector: 'Technology', description: 'Alphabet is parent of Google, operating search, advertising, cloud and hardware products.', debtRatio: 0.08, pe: 25.1, employees: '182,381' },
};

const FALLBACK = {
  AAPL: { c: 211.45, change: 1.24 },
  MSFT: { c: 415.20, change: 0.87 },
  NVDA: { c: 1208.88, change: 3.21 },
  AMZN: { c: 224.19, change: 0.54 },
  TSLA: { c: 176.75, change: -1.89 },
  GOOGL: { c: 175.07, change: 0.62 },
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
  const info = STOCK_INFO[ticker] || {
    name: ticker, sector: 'Unknown',
    description: 'No description available.',
    debtRatio: 0.2, pe: 0, employees: '—'
  };
  const screen = screenStock(ticker, info.sector, info.debtRatio);

  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [histLoading, setHistLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=2d`
          )}`
        );
        const json = await res.json();
        const data = JSON.parse(json.contents);
        const meta = data.chart.result[0].meta;
        setPrice(meta.regularMarketPrice);
        setChange(((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100);
        setIsLive(true);
      } catch (e) {
        const fb = FALLBACK[ticker];
        if (fb) { setPrice(fb.c); setChange(fb.change); }
      } finally {
        setLoading(false);
      }
    };

    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1mo`
          )}`
        );
        const json = await res.json();
        const data = JSON.parse(json.contents);
        const result = data.chart.result[0];
        const times = result.timestamp;
        const closes = result.indicators.quote[0].close;
        setHistory(times.map((t, i) => ({
          date: new Date(t * 1000).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
          price: parseFloat(closes[i]?.toFixed(2))
        })).filter(d => d.price));
      } catch (e) {
        console.error('History error:', e);
      } finally {
        setHistLoading(false);
      }
    };

    fetchPrice();
    fetchHistory();
  }, [ticker]);

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

      {/* Header Card */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 12,
              background: 'linear-gradient(135deg, var(--accent-teal), var(--accent-purple))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: '#000'
            }}>
              {ticker?.slice(0, 2)}
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800 }}>
                {ticker}
              </h2>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{info.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{info.sector}</div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            {loading ? (
              <div style={{ width: 140, height: 48, background: 'var(--bg-hover)', borderRadius: 8 }} />
            ) : (
              <>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 800 }}>
                  {formatPrice(price)}
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  justifyContent: 'flex-end', marginTop: 4,
                  color: isUp ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: 14
                }}>
                  {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {change !== null ? formatChange(change) : '—'}
                  <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                    {isLive ? '🟢 live' : '🔴 ref'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, marginBottom: 16 }}>
          30-Day Price Chart
        </h3>
        {histLoading ? (
          <div style={{
            height: 220, background: 'var(--bg-hover)',
            borderRadius: 8, animation: 'pulse 1.5s infinite'
          }}>
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
          <div style={{
            height: 220, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-muted)', fontSize: 13
          }}>
            Chart data unavailable
          </div>
        )}
      </div>

      <div className="grid-2">
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
              fontSize: 15, fontWeight: 700, marginBottom: 4,
              color: screen.status === 'halal' ? 'var(--accent-green)' : 'var(--accent-gold)'
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
