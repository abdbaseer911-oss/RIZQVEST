import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, Briefcase, BookOpen, Globe } from 'lucide-react';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/screener', icon: Search, label: 'Screener' },
  { to: '/gulf', icon: Globe, label: 'Gulf Markets' },
  { to: '/portfolio', icon: Briefcase, label: 'Portfolio' },
  { to: '/learn', icon: BookOpen, label: 'Learn' },
];

export default function Sidebar() {
  return (
    <aside style={{
      position: 'fixed', left: 0, top: 0, bottom: 0,
      width: 200, background: '#080d18',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      padding: '20px 0', zIndex: 100
    }}>
      {/* Logo */}
      <div style={{ padding: '0 16px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, var(--accent-gold), #e67e00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16
          }}>☽</div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800, fontSize: 16,
              color: 'var(--text-primary)'
            }}>RizqVest</div>
            <div style={{ fontSize: 9, color: 'var(--accent-gold)', letterSpacing: 1 }}>
              ISLAMIC FINANCE
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0 10px' }}>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 10px', borderRadius: 7, marginBottom: 3,
              textDecoration: 'none',
              color: isActive ? 'var(--accent-teal)' : 'var(--text-secondary)',
              background: isActive ? 'rgba(14,210,200,0.08)' : 'transparent',
              fontWeight: isActive ? 500 : 400,
              fontSize: 13, transition: 'all 0.15s'
            })}
          >
            <Icon size={15} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '14px 16px 0', borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>
          Powered by Polygon.io
        </div>
        <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>
          Screened per AAOIFI Standards
        </div>
      </div>
    </aside>
  );
}
