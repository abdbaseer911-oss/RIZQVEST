import Navbar from '../components/Navbar';

const CONCEPTS = [
  {
    title: 'What is Riba?',
    icon: '🚫',
    summary: 'Riba refers to interest or usury — any guaranteed return on money lending. It is strictly prohibited in Islam.',
    detail: 'In Islamic finance, money has no intrinsic value — it is just a medium of exchange. Charging interest treats money as a commodity, which is forbidden.'
  },
  {
    title: 'Murabaha',
    icon: '🤝',
    summary: 'A cost-plus financing structure where a bank buys an asset and sells it to the customer at a markup.',
    detail: 'Common in home and car financing. The bank takes ownership risk, making it Shariah-compliant unlike conventional interest loans.'
  },
  {
    title: 'Sukuk (Islamic Bonds)',
    icon: '📄',
    summary: 'Asset-backed securities that represent ownership in a real asset, project, or business.',
    detail: 'Unlike conventional bonds that pay interest, Sukuk pay returns from profits of the underlying asset.'
  },
  {
    title: 'Zakat on Investments',
    icon: '💚',
    summary: '2.5% annual purification of eligible wealth, including stocks and investment portfolios.',
    detail: 'Zakat is calculated on the market value of liquid investments held for one Hijri year (Nisab threshold applies).'
  },
  {
    title: 'Debt-to-Asset Screening',
    icon: '📊',
    summary: 'A stock is considered non-compliant if its interest-bearing debt exceeds 33% of total assets.',
    detail: 'This is the AAOIFI standard. Some scholars use total market cap as the denominator instead.'
  },
  {
    title: 'Halal ETFs',
    icon: '📈',
    summary: 'Exchange-traded funds that only hold Shariah-screened equities, with haram income purified.',
    detail: 'Popular options include HLAL (Wahed), SPUS (SP Funds), and SPRE for real estate exposure.'
  },
];

export default function Learn() {
  return (
    <div>
      <Navbar title="Islamic Finance Academy" />
      <div style={{
        background: 'linear-gradient(135deg, #0f2027, #1a2f1a)',
        borderRadius: 14, padding: '20px 24px', marginBottom: 24,
        border: '1px solid #1e4d2b'
      }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 6 }}>
          Learn Halal Investing
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
          Understand the principles behind every screening decision RizqVest makes.
        </p>
      </div>
      <div className="grid-2">
        {CONCEPTS.map(c => (
          <div key={c.title} className="card" style={{ cursor: 'pointer' }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, marginBottom: 8 }}>{c.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10, lineHeight: 1.6 }}>{c.summary}</p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{c.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
