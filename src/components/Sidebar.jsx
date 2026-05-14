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
      background: 'linear-gradient(180deg, #060b14 0%, #080d1a 100%)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      padding: '18px 0', zIndex: 100
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, var(--accent-teal), transparent)'
      }} />

      <div style={{ padding: '0 14px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8, flexShrink: 0,
            background: 'linear-gradient(135deg, var(--accent-gold), #e67e00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, boxShadow: '0 4px 12px rgba(240,180,41,0.3)',
          }}>☽</div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 15, color: 'var(--text-primary)', letterSpacing: -0.3
            }}>RizqVest</div>
            <div style={{ fontSize: 7, color: 'var(--accent-gold)', letterSpacing: 1.5, marginTop: 1 }}>
              ISLAMIC FINANCE
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 14px 16px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(34,197,94,0.08)',
          border: '1px solid rgba(34,197,94,0.2)',
          borderRadius: 20, padding: '4px 10px'
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--accent-green)',
            animation: 'pulse 2s infinite'
          }} />
          <span style={{ fontSize: 9, color: 'var(--accent-green)', fontWeight: 600 }}>
            Markets Open
          </span>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '0 8px' }}>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '9px 10px', borderRadius: 8, marginBottom: 3,
              textDecoration: 'none',
              color: isActive ? 'var(--accent-teal)' : 'var(--text-secondary)',
              background: isActive
                ? 'linear-gradient(90deg, rgba(14,210,200,0.1), transparent)'
                : 'transparent',
              borderLeft: isActive ? '2px solid var(--accent-teal)' : '2px solid transparent',
              fontWeight: isActive ? 600 : 400,
              fontSize: 12, transition: 'all 0.15s'
            })}
          >
            <Icon size={13} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '12px 10px 0', borderTop: '1px solid var(--border)' }}>
        {session && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            marginBottom: 8, padding: '0 4px',
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, var(--accent-gold), #e67e00)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, color: '#000', fontWeight: 800,
            }}>
              {session.user.email[0].toUpperCase()}
            </div>
            <span style={{
              fontSize: 9, color: 'var(--text-muted)',
              overflow: 'hidden', textOverflow: 'ellipsis',
              whiteSpace: 'nowrap', flex: 1,
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
            background: 'rgba(239,68,68,0.06)',
            border: '1px solid rgba(239,68,68,0.15)',
            color: 'var(--accent-red)', fontSize: 11, cursor: 'pointer',
            transition: 'all 0.15s'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.06)'; }}
        >
          <LogOut size={11} /> Sign Out
        </button>
        <div style={{ fontSize: 8, color: 'var(--text-muted)', marginTop: 10, padding: '0 4px' }}>
          Screened per AAOIFI Standards
        </div>
      </div>
    </aside>
  );
}
