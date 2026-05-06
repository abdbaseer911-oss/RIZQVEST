export default function HalalBadge({ status, reason }) {
  const config = {
    halal: { bg: '#064e3b', color: '#34d399', border: '#34d399', label: '✓ Shariah Compliant' },
    questionable: { bg: '#78350f', color: '#fbbf24', border: '#fbbf24', label: '⚠ Needs Review' },
    haram: { bg: '#7f1d1d', color: '#f87171', border: '#f87171', label: '✗ Not Compliant' },
  }[status] || {};

  return (
    <div style={{
      background: config.bg, color: config.color,
      border: `1px solid ${config.border}`,
      borderRadius: 8, padding: '8px 14px',
      fontSize: 12, fontWeight: 600, display: 'inline-block'
    }}>
      {config.label}
      {reason && <span style={{ fontWeight: 400, marginLeft: 8, opacity: 0.8 }}>— {reason}</span>}
    </div>
  );
}
