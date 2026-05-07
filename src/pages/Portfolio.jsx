import Navbar from '../components/Navbar';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const HOLDINGS = [
  { ticker: 'AAPL', shares: 10, avgCost: 165, current: 189.30 },
  { ticker: 'MSFT', shares: 5, avgCost: 380, current: 415.20 },
  { ticker: 'NVDA', shares: 3, avgCost: 600, current: 875.40 },
  { ticker: 'HLAL', shares: 50, avgCost: 32, current: 34.80 },
];

const COLORS = ['#0ed2c8', '#f0b429', '#22c55e', '#8b5cf6'];

export default function Portfolio() {
  const pieData = HOLDINGS.map(h => ({
    name: h.ticker,
    value: h.shares * h.current
  }));

  const totalValue = HOLDINGS.reduce((a, h) => a + h.shares * h.current, 0);
  const totalCost = HOLDINGS.reduce((a, h) => a + h.shares * h.avgCost, 0);
  const totalGain = totalValue - totalCost;
  const gainPct = ((totalGain / totalCost) * 100).toFixed(1);

  return (
    <div>
      <Navbar title="My Portfolio" />

      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div className="card">
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Total Value</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700 }}>
            ${totalValue.toLocaleString('en', { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div className="card">
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Total Gain/Loss</div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700,
            color: totalGain >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'
          }}>
            {totalGain >= 0 ? '+' : ''}${totalGain.toFixed(0)}
          </div>
        </div>
        <div className="card">
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Return %</div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700,
            color: gainPct >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'
          }}>
            +{gainPct}%
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Holdings Table */}
        <div className="card">
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 16, fontSize: 15 }}>Holdings</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                {['Stock', 'Shares', 'Avg Cost', 'Current', 'P&L'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 8px', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOLDINGS.map(h => {
                const pl = ((h.current - h.avgCost) / h.avgCost * 100).toFixed(1);
                return (
                  <tr key={h.ticker} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 8px', fontWeight: 700, color: 'var(--accent-teal)' }}>{h.ticker}</td>
                    <td style={{ padding: '10px 8px' }}>{h.shares}</td>
                    <td style={{ padding: '10px 8px', color: 'var(--text-secondary)' }}>${h.avgCost}</td>
                    <td style={{ padding: '10px 8px' }}>${h.current}</td>
                    <td style={{ padding: '10px 8px' }} className={pl >= 0 ? 'up' : 'down'}>
                      {pl >= 0 ? '+' : ''}{pl}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pie */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 16, fontSize: 15, alignSelf: 'flex-start' }}>Allocation</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={v => `$${v.toFixed(0)}`} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            {pieData.map((p, i) => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS[i] }} />
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
