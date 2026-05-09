import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Search, Briefcase,
  BookOpen, Globe
} from 'lucide-react';

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
      width: 220, background: '#0c1524',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      padding: '24px 0', zIndex: 100
    }}>
      {/* Logo */}
      <div style={{ padding: '0 20px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--accent-gold), #e67e00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18
          }}>☽</div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800, fontSize: 18,
              color: 'var(--text-primary)'
            }}>RizqVest</div>
            <div style={{ fontSize: 10, color: 'var(--accent-gold)', letterSpacing: 1 }}>
              ISLAMIC FINANCE
            </div>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav style={{ flex: 1, padding: '0 12px' }}>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 8, marginBottom: 4,
              textDecoration: 'none',
              color: isActive ? 'var(--accent-teal)' : 'var(--text-secondary)',
              background: isActive ? 'rgba(14,210,200,0.08)' : 'transparent',
              fontWeight: isActive ? 500 : 400,
              fontSize: 14, transition: 'all 0.15s'
            })}
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Info */}
      <div style={{
        padding: '16px 20px 0',
        borderTop: '1px solid var(--border)'
      }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>
          Powered by Polygon.io
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
          Screened per AAOIFI Standards
        </div>
      </div>
    </aside>
  );
}
