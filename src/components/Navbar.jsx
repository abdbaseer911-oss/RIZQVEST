import { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';

export default function Navbar({ title }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length < 2) { setResults([]); return; }
    try {
      const res = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${val}&apikey=${import.meta.env.VITE_ALPHA_KEY}`
      );
      const json = await res.json();
      setResults((json.bestMatches || []).slice(0, 5));
    } catch {
      setResults([]);
    }
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', marginBottom: 20
    }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>
        {title}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '7px 12px', width: 220
          }}>
            <Search size={13} color="var(--text-muted)" />
            <input
              value={query}
              onChange={handleSearch}
              placeholder="Search stocks..."
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--text-primary)', fontSize: 12, width: '100%'
              }}
            />
          </div>
          {results.length > 0 && (
            <div style={{
              position: 'absolute', top: '110%', left: 0, right: 0,
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 8, zIndex: 999, overflow: 'hidden'
            }}>
              {results.map((r, i) => (
                <div
                  key={i}
                  style={{
                    padding: '9px 12px', cursor: 'pointer', fontSize: 12,
                    borderBottom: '1px solid var(--border)',
                    display: 'flex', justifyContent: 'space-between'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  onClick={() => { setQuery(''); setResults([]); }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--accent-teal)' }}>
                    {r['1. symbol']}
                  </span>
                  <span style={{ color: 'var(--text-secondary)', maxWidth: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {r['2. name']}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 8, padding: 7, color: 'var(--text-secondary)',
          display: 'flex', alignItems: 'center'
        }}>
          <Bell size={14} />
        </button>

        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-gold), #e67e00)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <User size={14} color="#000" />
        </div>
      </div>
    </div>
  );
}
