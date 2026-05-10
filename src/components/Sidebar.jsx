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
      width: 180, background: '#060b14',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      padding: '16px 0', zIndex: 100
    }}>
      {/* Logo */}
      <div style={{ padding: '0 14px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: 'linear-gradient(135deg, var(--accent-gold), #e67e00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, flexShrink: 0
          }}>☽</div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800, fontSize: 14,
              color: 'var(--text-primary)'
            }}>RizqVest</div>
            <div style={{ fontSize: 8, color: 'var(--accent-gold)', letterSpacing: 1 }}>
              ISLAMIC FINANCE
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0 8px' }}>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 10px', borderRadius: 6, marginBottom: 2,
              textDecoration: 'none',
              color: isActive ? 'var(--accent-teal)' : 'var(--text-secondary)',
              background: isActive ? 'rgba(14,210,200,0.08)' : 'transparent',
              fontWeight: isActive ? 500 : 400,
              fontSize: 12, transition: 'all 0.15s'
            })}
          >
            <Icon size={13} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: '12px 10px 0', borderTop: '1px solid var(--border)' }}>
        {session && (
          <div style={{
            fontSize: 10, color: 'var(--text-muted)',
            marginBottom: 8, padding: '0 4px',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
          }}>
            {session.user.email}
          </div>
        )}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            width: '100%', padding: '7px 10px', borderRadius: 6,
            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
            color: 'var(--accent-red)', fontSize: 11, cursor: 'pointer'
          }}
        >
          <LogOut size={11} /> Sign Out
        </button>
        <div style={{ fontSize: 8, color: 'var(--text-muted)', marginTop: 8, padding: '0 4px' }}>
          Screened per AAOIFI Standards
        </div>
      </div>
    </aside>
  );
}
