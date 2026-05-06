import { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useStockSearch } from '../hooks/useStockData';

export default function Navbar({ title }) {
  const [query, setQuery] = useState('');
  const { results, loading } = useStockSearch(query);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: 24
    }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700 }}>
        {title}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '8px 14px', width: 240
          }}>
            <Search size={14} color="var(--text-muted)" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search stocks..."
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--text-primary)', fontSize: 13, width: '100%'
              }}
            />
          </div>
          {results.length > 0 && (
            <div style={{
              position: 'absolute', top: '110%', left: 0, right: 0,
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 8, zIndex: 200, overflow: 'hidden'
            }}>
              {results.slice(0, 6).map(r => (
                <div key={r.ticker} style={{
                  padding: '10px 14px', cursor: 'pointer', fontSize: 13,
                  borderBottom: '1px solid var(--border)',
                  display: 'flex', justifyContent: 'space-between'
                }}
                  onClick={() => setQuery('')}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontWeight: 600 }}>{r.ticker}</span>
                  <span style={{ color: 'var(--text-secondary)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 8, padding: '8px', color: 'var(--text-secondary)',
          display: 'flex', alignItems: 'center'
        }}>
          <Bell size={16} />
        </button>

        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-gold), #e67e00)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: 14
        }}>
          <User size={16} color="#000" />
        </div>
      </div>
    </div>
  );
}
