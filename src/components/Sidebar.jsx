import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, Briefcase, BookOpen, Globe, LogOut } from 'lucide-react';
import { supabase } from '../supabase';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/screener', icon: Search, label: 'Screener' },
  { to: '/gulf', icon: Globe, label: 'Gulf Markets' },
  { to: '/portfolio', icon: Briefcase, label: 'Portfolio' },
  { to: '/learn', icon: BookOpen, label: 'Learn' },
];

export default function Sidebar({ session }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <aside style={{
      position: 'fixed', left: 0, top: 0, bottom: 0,
      width: 180,
      background: 'linear-gradient(180deg, #06090f 0%, #080d18 50%, #060a0f 100%)',
      borderRight: '1px solid rgba(212,168,67,0.12)',
      display: 'flex', flexDirection: 'column',
      padding: '18px 0', zIndex: 100,
      overflow: 'hidden',
    }}>
      {/* Islamic geometric side pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(
          60deg,
          rgba(212,168,67,0.015) 0, rgba(212,168,67,0.015) 1px,
          transparent 0, transparent 25px
        )`,
        pointerEvents: 'none',
      }} />

      {/* Top gold line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, #d4a843, transparent)',
      }} />

      {/* Logo */}
      <div style={{ padding: '0 14px 20px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: 'linear-gradient(135deg, #b8860b, #d4a843)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
            boxShadow: '0 4px 12px rgba(212,168,67,0.3)',
            animation: 'glow 4s ease-in-out infinite',
          }}>☽</div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15,
              background: 'linear-gradient(135deg, #f0c866, #d4a843)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>RizqVest</div>
            <div style={{
              fontFamily: 'var(--font-arabic)',
              fontSize: 8, color: 'rgba(212,168,67,0.5)',
              letterSpacing: 0.5, marginTop: 1,
            }}>
              المالية الإسلامية
            </div>
          </div>
        </div>
      </div>

      {/* Market status */}
      <div style={{ padding: '0 14px 16px', position: 'relative' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(34,197,94,0.06)',
          border: '1px solid rgba(34,197,94,0.15)',
          borderRadius: 20, padding: '4px 10px',
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: '50%',
            background: 'var(--accent-green)',
            animation: 'pulse 2s infinite',
          }} />
          <span style={{ fontSize: 9, color: 'var(--accent-green)', fontWeight: 600 }}>
            Markets Open
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        margin: '0 14px 14px',
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.15), transparent)',
      }} />

      {/* Nav links */}
      <nav style={{ flex: 1, padding: '0 8px', position: 'relative' }}>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '9px 10px', borderRadius: 8, marginBottom: 2,
              textDecoration: 'none',
              color: isActive ? '#d4a843' : 'var(--text-secondary)',
              background: isActive
                ? 'linear-gradient(90deg, rgba(212,168,67,0.1), transparent)'
                : 'transparent',
              borderLeft: isActive ? '2px solid #d4a843' : '2px solid transparent',
              fontWeight: isActive ? 600 : 400,
              fontSize: 12, transition: 'all 0.15s',
              position: 'relative',
            })}
          >
            <Icon size={13} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom divider */}
      <div style={{
        margin: '0 14px 12px',
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.15), transparent)',
      }} />

      {/* User + signout */}
      <div style={{ padding: '0 10px', position: 'relative' }}>
        {session && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            marginBottom: 8, padding: '0 4px',
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #b8860b, #d4a843)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, color: '#0a0f1e', fontWeight: 800,
            }}>
              {session.user.email[0].toUpperCase()}
            </div>
            <span style={{
              fontSize: 9, color: 'var(--text-muted)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              flex: 1,
            }}>
              {session.user.email}
            </span>
          </div>
        )}

        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            width: '100%', padding: '7px 10px', borderRadius: 7,
            background: 'rgba(239,68,68,0.05)',
            border: '1px solid rgba(239,68,68,0.12)',
            color: 'var(--accent-red)', fontSize: 11, cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.05)'; }}
        >
          <LogOut size={11} /> Sign Out
        </button>

        <p style={{
          fontFamily: 'var(--font-arabic)',
          textAlign: 'center', fontSize: 9,
          color: 'rgba(212,168,67,0.3)', marginTop: 10,
          lineHeight: 1.5,
        }}>
          الرزق من عند الله
        </p>
      </div>
    </aside>
  );
}
