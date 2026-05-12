import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.6 + 0.2,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 5,
}));

const ARABIC_PATTERNS = [
  { x: 5, y: 10, size: 120, opacity: 0.025 },
  { x: 80, y: 60, size: 180, opacity: 0.02 },
  { x: 50, y: 85, size: 100, opacity: 0.03 },
];

function StarField() {
  return (
    <>
      {STARS.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: s.x + '%', top: s.y + '%',
          width: s.size, height: s.size,
          borderRadius: '50%',
          background: s.id % 4 === 0 ? '#d4a843' : s.id % 4 === 1 ? '#0ed2c8' : s.id % 4 === 2 ? '#f1f5f9' : '#22c55e',
          opacity: s.opacity,
          animation: 'pulse ' + s.duration + 's ease-in-out ' + s.delay + 's infinite',
          pointerEvents: 'none',
        }} />
      ))}
    </>
  );
}

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 150);
  }, []);

  const handleAuth = async () => {
    if (!email || !password) { setMessage('Please fill in all fields'); return; }
    setLoading(true);
    setMessage('');
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Account created! You can now sign in.');
      }
    } catch (e) {
      setMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 30% 20%, #0f2a0f 0%, #060a12 40%, #0a0f2a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      fontFamily: 'var(--font-body)',
    }}>
      {/* Geometric Islamic pattern background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          repeating-linear-gradient(60deg, rgba(212,168,67,0.02) 0, rgba(212,168,67,0.02) 1px, transparent 0, transparent 40px),
          repeating-linear-gradient(-60deg, rgba(212,168,67,0.02) 0, rgba(212,168,67,0.02) 1px, transparent 0, transparent 40px),
          repeating-linear-gradient(0deg, rgba(14,210,200,0.01) 0, rgba(14,210,200,0.01) 1px, transparent 0, transparent 40px)
        `,
        pointerEvents: 'none',
      }} />

      {/* Stars */}
      <StarField />

      {/* Big crescent moon */}
      <div style={{
        position: 'absolute', right: '8%', top: '8%',
        fontSize: 160, opacity: 0.06,
        animation: 'moonGlow 4s ease-in-out infinite',
        pointerEvents: 'none',
        fontFamily: 'serif',
      }}>☽</div>

      {/* Small decorative crescents */}
      <div style={{ position: 'absolute', left: '5%', bottom: '20%', fontSize: 40, opacity: 0.04, animation: 'float 6s ease-in-out infinite' }}>☽</div>
      <div style={{ position: 'absolute', right: '15%', bottom: '30%', fontSize: 25, opacity: 0.04, animation: 'float 8s ease-in-out 2s infinite' }}>★</div>
      <div style={{ position: 'absolute', left: '20%', top: '15%', fontSize: 20, opacity: 0.04, animation: 'float 7s ease-in-out 1s infinite' }}>✦</div>

      {/* Main card */}
      <div style={{
        background: 'rgba(13,22,40,0.92)',
        border: '1px solid rgba(212,168,67,0.2)',
        borderRadius: 18, padding: '40px 34px', width: 400,
        backdropFilter: 'blur(20px)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,168,67,0.05), inset 0 1px 0 rgba(212,168,67,0.1)',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative', zIndex: 1,
      }}>
        {/* Top gold accent line */}
        <div style={{
          position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
          background: 'linear-gradient(90deg, transparent, #d4a843, #f0c866, #d4a843, transparent)',
          borderRadius: 1,
        }} />

        {/* Corner decorations */}
        <div style={{ position: 'absolute', top: 12, left: 16, color: 'rgba(212,168,67,0.3)', fontSize: 14 }}>✦</div>
        <div style={{ position: 'absolute', top: 12, right: 16, color: 'rgba(212,168,67,0.3)', fontSize: 14 }}>✦</div>

        {/* Logo section */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          {/* Moon icon */}
          <div style={{
            width: 68, height: 68, borderRadius: 18,
            background: 'linear-gradient(135deg, #b8860b, #d4a843, #f0c866)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, margin: '0 auto 14px',
            boxShadow: '0 8px 32px rgba(212,168,67,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
            animation: 'glow 3s ease-in-out infinite',
          }}>☽</div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 28,
            fontWeight: 800, marginBottom: 4,
            background: 'linear-gradient(135deg, #f0c866, #d4a843, #b8860b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            RizqVest
          </h1>

          <p style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: 13, color: 'var(--accent-teal)',
            letterSpacing: 1, marginBottom: 4,
          }}>
            بسم الله الرحمن الرحيم
          </p>

          <p style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: 2, textTransform: 'uppercase' }}>
            Islamic Finance Terminal
          </p>
        </div>

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22
        }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.3))' }} />
          <span style={{ fontSize: 12, color: 'rgba(212,168,67,0.5)' }}>✦</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(270deg, transparent, rgba(212,168,67,0.3))' }} />
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 15,
          marginBottom: 18, textAlign: 'center', color: 'var(--text-secondary)'
        }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        {/* Email input */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 10, color: 'var(--text-muted)', display: 'block', marginBottom: 5, letterSpacing: 0.5 }}>
            EMAIL ADDRESS
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: '100%',
              background: 'rgba(22,34,54,0.8)',
              border: '1px solid rgba(212,168,67,0.15)',
              borderRadius: 9, padding: '10px 14px',
              color: 'var(--text-primary)', fontSize: 13,
              outline: 'none', boxSizing: 'border-box',
              transition: 'all 0.2s',
            }}
            onFocus={e => {
              e.target.style.borderColor = 'rgba(212,168,67,0.5)';
              e.target.style.boxShadow = '0 0 0 3px rgba(212,168,67,0.08)';
            }}
            onBlur={e => {
              e.target.style.borderColor = 'rgba(212,168,67,0.15)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Password input */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 10, color: 'var(--text-muted)', display: 'block', marginBottom: 5, letterSpacing: 0.5 }}>
            PASSWORD
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={e => e.key === 'Enter' && handleAuth()}
            style={{
              width: '100%',
              background: 'rgba(22,34,54,0.8)',
              border: '1px solid rgba(212,168,67,0.15)',
              borderRadius: 9, padding: '10px 14px',
              color: 'var(--text-primary)', fontSize: 13,
              outline: 'none', boxSizing: 'border-box',
              transition: 'all 0.2s',
            }}
            onFocus={e => {
              e.target.style.borderColor = 'rgba(212,168,67,0.5)';
              e.target.style.boxShadow = '0 0 0 3px rgba(212,168,67,0.08)';
            }}
            onBlur={e => {
              e.target.style.borderColor = 'rgba(212,168,67,0.15)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Message */}
        {message && (
          <div style={{
            padding: '8px 12px', borderRadius: 8, marginBottom: 12,
            background: message.includes('created') ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
            border: '1px solid ' + (message.includes('created') ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'),
            color: message.includes('created') ? 'var(--accent-green)' : 'var(--accent-red)',
            fontSize: 12, animation: 'slideDown 0.3s ease',
          }}>
            {message}
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleAuth}
          disabled={loading}
          style={{
            width: '100%', padding: '12px',
            background: loading
              ? 'rgba(212,168,67,0.1)'
              : 'linear-gradient(135deg, #b8860b, #d4a843, #c49a30)',
            border: '1px solid rgba(212,168,67,0.3)',
            borderRadius: 9,
            color: loading ? 'var(--text-muted)' : '#0a0f1e',
            fontWeight: 800, fontSize: 13,
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: 16,
            transition: 'all 0.2s',
            boxShadow: loading ? 'none' : '0 4px 20px rgba(212,168,67,0.25)',
            letterSpacing: 0.5,
          }}
          onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(212,168,67,0.35)'; } }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = loading ? 'none' : '0 4px 20px rgba(212,168,67,0.25)'; }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={{
                width: 14, height: 14,
                border: '2px solid rgba(212,168,67,0.3)',
                borderTopColor: '#d4a843',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                display: 'inline-block',
              }} />
              Please wait...
            </span>
          ) : isLogin ? '✦ Enter the Terminal' : '✦ Join RizqVest'}
        </button>

        {/* Toggle */}
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)' }}>
          {isLogin ? "New to RizqVest? " : 'Already have an account? '}
          <span
            onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
            style={{ color: '#d4a843', cursor: 'pointer', fontWeight: 600 }}
          >
            {isLogin ? 'Create Account' : 'Sign In'}
          </span>
        </p>

        {/* Bottom divider + note */}
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(212,168,67,0.1)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 8
          }}>
            <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.2))' }} />
            <span style={{ fontSize: 16 }}>☽</span>
            <div style={{ height: 1, flex: 1, background: 'linear-gradient(270deg, transparent, rgba(212,168,67,0.2))' }} />
          </div>
          <p style={{
            fontFamily: 'var(--font-arabic)',
            textAlign: 'center', fontSize: 11,
            color: 'rgba(212,168,67,0.4)', lineHeight: 1.6,
          }}>
            الرزق من عند الله
          </p>
          <p style={{ textAlign: 'center', fontSize: 9, color: 'var(--text-muted)', marginTop: 4 }}>
            Screened per AAOIFI Shariah Standards
          </p>
        </div>
      </div>
    </div>
  );
}
