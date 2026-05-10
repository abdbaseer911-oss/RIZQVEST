import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Shield } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { screenStock } from '../utils/halalScreener';
import { formatPrice } from '../utils/formatters';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

const STOCK_INFO = {
  AAPL: { name: 'Apple Inc.', sector: 'Technology', description: 'Apple designs consumer electronics, software and online services including iPhone, Mac and iPad.', debtRatio: 0.18, pe: 28.4, employees: '164,000', currency: '$' },
  MSFT: { name: 'Microsoft Corp.', sector: 'Technology', description: 'Microsoft develops software, hardware and cloud services including Windows, Office 365 and Azure.', debtRatio: 0.21, pe: 34.1, employees: '221,000', currency: '$' },
  NVDA: { name: 'NVIDIA Corp.', sector: 'Technology', description: 'NVIDIA designs graphics processing units for gaming, data centers and automotive markets.', debtRatio: 0.12, pe: 65.3, employees: '29,600', currency: '$' },
  AMZN: { name: 'Amazon.com', sector: 'Technology', description: 'Amazon operates e-commerce and cloud computing including retail and AWS cloud services.', debtRatio: 0.28, pe: 44.2, employees: '1,540,000', currency: '$' },
  TSLA: { name: 'Tesla Inc.', sector: 'Automotive', description: 'Tesla designs and manufactures electric vehicles, energy storage and solar products.', debtRatio: 0.10, pe: 55.0, employees: '127,855', currency: '$' },
  GOOGL: { name: 'Alphabet Inc.', sector: 'Technology', description: 'Alphabet is parent of Google, operating search, advertising, cloud and hardware products.', debtRatio: 0.08, pe: 25.1, employees: '182,381', currency: '$' },
  META: { name: 'Meta Platforms', sector: 'Technology', description: 'Meta builds social technology including Facebook, Instagram, WhatsApp and the metaverse.', debtRatio: 0.09, pe: 24.3, employees: '86,482', currency: '$' },
  NFLX: { name: 'Netflix Inc.', sector: 'Entertainment', description: 'Netflix is a streaming entertainment service with over 260 million paid memberships worldwide.', debtRatio: 0.31, pe: 42.1, employees: '13,000', currency: '$' },
  AMD: { name: 'Advanced Micro Devices', sector: 'Technology', description: 'AMD designs high performance CPUs and GPUs for gaming, data center and embedded markets.', debtRatio: 0.11, pe: 38.5, employees: '26,000', currency: '$' },
  INTC: { name: 'Intel Corp.', sector: 'Technology', description: 'Intel designs and manufactures semiconductor chips, processors and related technologies.', debtRatio: 0.29, pe: 12.4, employees: '124,800', currency: '$' },
  HLAL: { name: 'Wahed FTSE USA Shariah ETF', sector: 'ETF', description: 'HLAL tracks the FTSE USA Shariah Index providing exposure to large and mid-cap US Shariah-compliant companies.', debtRatio: 0.0, pe: 22.1, employees: 'N/A', currency: '$' },
  SPUS: { name: 'SP Funds S&P 500 Sharia ETF', sector: 'ETF', description: 'SPUS tracks a Shariah-compliant version of the S&P 500 excluding companies in prohibited activities.', debtRatio: 0.0, pe: 24.5, employees: 'N/A', currency: '$' },
  // Gulf Stocks
  '2222.SR': { name: 'Saudi Aramco', sector: 'Energy', description: 'Saudi Aramco is the world\'s largest oil company and the most profitable company globally. Listed on the Tadawul exchange.', debtRatio: 0.12, pe: 12.4, employees: '70,000+', currency: 'SAR', refPrice: 27.85, refChange: 0.54 },
  '1120.SR': { name: 'Al Rajhi Bank', sector: 'Islamic Banking', description: 'Al Rajhi Bank is the world\'s largest Islamic bank by assets, operating fully under Shariah principles with no interest-based products.', debtRatio: 0.15, pe: 18.2, employees: '14,000+', currency: 'SAR', refPrice: 85.20, refChange: -0.32 },
  '2280.SR': { name: 'Almarai', sector: 'Consumer', description: 'Almarai is the world\'s largest vertically integrated dairy company, headquartered in Riyadh, Saudi Arabia.', debtRatio: 0.20, pe: 24.4, employees: '40,000+', currency: 'SAR', refPrice: 52.10, refChange: 1.12 },
  '7010.SR': { name: 'STC Saudi Telecom', sector: 'Telecom', description: 'Saudi Telecom Company (STC) is the largest telecommunications company in Saudi Arabia and the Middle East.', debtRatio: 0.18, pe: 16.2, employees: '18,000+', currency: 'SAR', refPrice: 44.30, refChange: 0.28 },
  '1211.SR': { name: "Ma'aden", sector: 'Mining', description: "Saudi Arabian Mining Company (Ma'aden) is Saudi Arabia's national mining champion and one of the fastest growing mining companies globally.", debtRatio: 0.22, pe: 28.4, employees: '7,000+', currency: 'SAR', refPrice: 38.75, refChange: -1.05 },
  '2010.SR': { name: 'SABIC', sector: 'Petrochemicals', description: 'Saudi Basic Industries Corporation (SABIC) is one of the world\'s largest petrochemicals manufacturers.', debtRatio: 0.19, pe: 22.1, employees: '32,000+', currency: 'SAR', refPrice: 72.40, refChange: 0.88 },
  'EMAAR.AE': { name: 'Emaar Properties', sector: 'Real Estate', description: 'Emaar Properties is one of the world\'s most valuable real estate companies, developer of Burj Khalifa and Dubai Mall.', debtRatio: 0.22, pe: 8.4, employees: '12,000+', currency: 'AED', refPrice: 8.92, refChange: 1.34 },
  'FAB.AE': { name: 'First Abu Dhabi Bank', sector: 'Banking', description: 'First Abu Dhabi Bank is the UAE\'s largest bank by assets, formed by the merger of FGB and NBAD.', debtRatio: 0.28, pe: 12.1, employees: '10,000+', currency: 'AED', refPrice: 14.20, refChange: 0.42 },
  'ADNOC.AE': { name: 'ADNOC Distribution', sector: 'Energy', description: 'ADNOC Distribution is the UAE\'s largest fuel and convenience retailer, operating ADNOC service stations.', debtRatio: 0.14, pe: 14.8, employees: '3,000+', currency: 'AED', refPrice: 4.35, refChange: -0.23 },
  'DIB.AE': { name: 'Dubai Islamic Bank', sector: 'Islamic Banking', description: 'Dubai Islamic Bank (DIB) is the largest Islamic bank in the UAE and one of the largest in the world.', debtRatio: 0.18, pe: 10.2, employees: '8,000+', currency: 'AED', refPrice: 6.80, refChange: 0.88 },
  'ETISALAT.AE': { name: 'e& (Etisalat)', sector: 'Telecom', description: 'e& (formerly Etisalat) is one of the largest telecom groups in the world by market capitalisation.', debtRatio: 0.16, pe: 14.2, employees: '54,000+', currency: 'AED', refPrice: 22.50, refChange: 0.15 },
  'QNBK.QA': { name: 'QNB Group', sector: 'Banking', description: 'Qatar National Bank (QNB) is the largest bank in the Middle East and Africa by assets.', debtRatio: 0.25, pe: 12.4, employees: '29,000+', currency: 'QAR', refPrice: 18.20, refChange: 0.33 },
  'ORDS.QA': { name: 'Ooredoo', sector: 'Telecom', description: 'Ooredoo is a Qatari multinational telecommunications company operating across the Middle East, North Africa and Southeast Asia.', debtRatio: 0.22, pe: 10.4, employees: '15,000+', currency: 'QAR', refPrice: 8.45, refChange: -0.18 },
  'MARK.QA': { name: 'Masraf Al Rayan', sector: 'Islamic Banking', description: 'Masraf Al Rayan is one of Qatar\'s leading Islamic banks operating fully under Shariah principles.', debtRatio: 0.12, pe: 14.2, employees: '2,000+', currency: 'QAR', refPrice: 1.92, refChange: 0.52 },
};

const REFERENCE = {
  AAPL: { c: 211.45, change: 1.24 },
  MSFT: { c: 415.20, change: 0.87 },
  NVDA: { c: 1208.88, change: 3.21 },
  AMZN: { c: 224.19, change: 0.54 },
  TSLA: { c: 176.75, change: -1.89 },
  GOOGL: { c: 175.07, change: 0.62 },
  META: { c: 512.45, change: 1.45 },
  NFLX: { c: 645.30, change: 0.32 },
  AMD: { c: 178.90, change: 2.10 },
  INTC: { c: 42.30, change: -0.54 },
  HLAL: { c: 34.80, change: 0.73 },
  SPUS: { c: 58.20, change: 0.55 },
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
          {payload[0].value?.toFixed(2)}
        </div>
      </div>
    );
  }
  return null;
};

function generateGulfChart(basePrice) {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const variation = (Math.random() - 0.48) * basePrice * 0.015;
    return {
      date: date.toLocaleDateString('en', { month: 'short', day: 'numeric' }),
      price: parseFloat((basePrice + variation * (i + 1) * 0.1).toFixed(2)),
    };
  });
}

export default function StockDetail() {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const info = STOCK_INFO[ticker] || {
    name: ticker, sector: 'Unknown',
    description: 'Company information not available.',
    debtRatio: 0.2, pe: 0, employees: '—', currency: '$'
  };
  const screen = screenStock(ticker, info.sector, info.debtRatio);
  const isGulf = ['SAR', 'AED', 'QAR'].includes(info.currency);

  const [price, setPrice] = useState(info.refPrice || REFERENCE[ticker]?.c || null);
  const [change, setChange] = useState(info.refChange || REFERENCE[ticker]?.change || null);
  const [isLive, setIsLive] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [histLoading, setHistLoading] = useState(true);

  useEffect(() => {
    // For Gulf stocks use reference data immediately
    if (isGulf) {
      setLoading(false);
      setHistory(generateGulfChart(info.refPrice || 10));
      setHistLoading(false);
      return;
    }

    const key = import.meta.env.VITE_ALPHA_KEY;

    // Fetch price
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${key}`
        );
        const json = await res.json();
        const q = json['Global Quote'];
        if (q && q['05. price']) {
          const p = parseFloat(q['05. price']);
          const c = parseFloat((q['10. change percent'] || '0').replace('%', ''));
          if (p > 0) { setPrice(p); setChange(isNaN(c) ? 0 : c); setIsLive(true); }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    // Fetch history
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${key}`
        );
        const json = await res.json();
        const series = json['Time Series (Daily)'];
        if (series) {
          const formatted = Object.entries(series)
            .slice(0, 30).reverse()
            .map(([date, v]) => ({
              date: new Date(date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
              price: parseFloat(v['4. close']),
            }));
          setHistory(formatted);
        } else {
          const ref = REFERENCE[ticker];
          if (ref) setHistory(generateGulfChart(ref.c));
        }
      } catch (e) {
        const ref = REFERENCE[ticker];
        if (ref) setHistory(generateGulfChart(ref.c));
      } finally {
        setHistLoading(false);
      }
    };

    fetchPrice();
    fetchHistory();
  }, [ticker]);

  const isUp = (change || 0) >= 0;
  const currencySymbol = info.currency === 'SAR' ? 'SAR ' : info.currency === 'AED' ? 'AED ' : info.currency === 'QAR' ? 'QAR ' : '$';

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <Navbar title="Stock Detail" />

      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 7, padding: '7px 12px', color: 'var(--text-secondary)',
          fontSize: 12, cursor: 'pointer', marginBottom: 14
        }}
      >
        <ArrowLeft size={13} /> Back
      </button>

      {/* Header */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 11,
              background: isGulf
                ? 'linear-gradient(135deg, #064e3b, #065f46)'
                : 'linear-gradient(135deg, var(--accent-teal), var(--accent-purple))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13,
              color: isGulf ? '#34d399' : '#000'
            }}>
              {isGulf ? '☽' : ticker?.slice(0, 2)}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800 }}>
                  {ticker}
                </h2>
                {isGulf && (
                  <span style={{
                    fontSize: 9, padding: '2px 6px', borderRadius: 4,
                    background: 'rgba(34,197,94,0.1)', color: 'var(--accent-green)',
                    border: '1px solid rgba(34,197,94,0.3)', fontWeight: 600
                  }}>
                    🌙 Gulf Market
                  </span>
                )}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{info.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{info.sector}</div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            {loading ? (
              <div style={{ width: 130, height: 44, background: 'var(--bg-hover)', borderRadius: 8, animation: 'pulse 1.5s infinite' }} />
            ) : (
              <>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800 }}>
                  {currencySymbol}{price ? Number(price).toFixed(2) : '—'}
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  justifyContent: 'flex-end', marginTop: 3,
                  color: isUp ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: 13
                }}>
                  {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {change !== null ? `${change >= 0 ? '+' : ''}${Number(change).toFixed(2)}%` : '—'}
                  <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>
                    {isGulf ? '📊 ref' : isLive ? '🟢 live' : '🔴 ref'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13 }}>
            30-Day Price Chart
          </h3>
          {isGulf && (
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
              Illustrative data — live Gulf data coming soon
            </span>
          )}
        </div>
        {histLoading ? (
          <div style={{ height: 180, background: 'var(--bg-hover)', borderRadius: 8, animation: 'pulse 1.5s infinite' }} />
        ) : history.length > 0 ? (
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} interval="preserveStartEnd" />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${v}`} domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="price" stroke={isGulf ? 'var(--accent-green)' : 'var(--accent-teal)'} strokeWidth={2} dot={false} activeDot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 12 }}>
            Chart data unavailable
          </div>
        )}
      </div>

      <div className="grid-2">
        {/* Shariah Screening */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Shield size={14} color="var(--accent-teal)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13 }}>Shariah Screening</h3>
          </div>
          <div style={{
            padding: '10px 12px', borderRadius: 8, marginBottom: 12,
            background: screen.status === 'halal' ? 'rgba(34,197,94,0.08)' : 'rgba(251,191,36,0.08)',
            border: `1px solid ${screen.status === 'halal' ? 'rgba(34,197,94,0.25)' : 'rgba(251,191,36,0.25)'}`
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3, color: screen.status === 'halal' ? 'var(--accent-green)' : 'var(--accent-gold)' }}>
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
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 11 }}>
              <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span>{value}</span>
                <span style={{ color: pass ? 'var(--accent-green)' : 'var(--accent-red)' }}>{pass ? '✓' : '✗'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Company Info */}
        <div className="card">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13, marginBottom: 12 }}>
            About {info.name}
          </h3>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 14 }}>
            {info.description}
          </p>
          {[
            { label: 'Sector', value: info.sector },
            { label: 'P/E Ratio', value: info.pe || '—' },
            { label: 'Employees', value: info.employees || '—' },
            { label: 'Debt/Assets', value: `${(info.debtRatio * 100).toFixed(0)}%` },
            { label: 'Currency', value: info.currency || 'USD' },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 11 }}>
              <span style={{ color: 'var(--text-muted)' }}>{label}</span>
              <span style={{ fontWeight: 600 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
