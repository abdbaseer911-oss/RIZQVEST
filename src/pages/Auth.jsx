import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
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
      background: 'radial-gradient(ellipse at 20% 50%, #0f2a1a 0%, #070b14 40%, #0a0f2e 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', right: '10%', top: '10%',
        fontSize: 200, opacity: 0.03,
        pointerEvents: 'none'
      }}>☽</div>

      <div style={{
        background: 'rgba(15,26,46,0.9)',
        border: '1px solid rgba(14,210,200,0.2)',
        borderRadius: 16, padding: '36px 32px', width: 380,
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
        transition: 'all 0.5s ease',
        position: 'relative', zIndex: 1
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
          background: 'linear-gradient(90deg, transparent, var(--accent-teal), var(--accent-gold), transparent)',
        }} />

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: 'linear-gradient(135deg, var(--accent-gold), #e67e00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, margin: '0 auto 12px',
            boxShadow: '0 8px 24px rgba(240,180,41,0.3)',
          }}>☽</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, marginBottom: 3 }}>
            RizqVest
          </h1>
          <p style={{ fontSize: 10, color: 'var(--accent-teal)', letterSpacing: 2 }}>
            ISLAMIC FINANCE TERMINAL
          </p>
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 15, marginBottom: 20, textAlign: 'center', color: 'var(--text-secondary)' }}>
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h2>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: '100%', background: 'rgba(22,34,54,0.8)',
              border: '1px solid var(--border)', borderRadius: 8,
              padding: '10px 14px', color: 'var(--text-primary)',
              fontSize: 13, outline: 'none', boxSizing: 'border-box',
              transition: 'border-color 0.2s'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent-teal)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={e => e.key === 'Enter' && handleAuth()}
            style={{
              width: '100%', background: 'rgba(22,34,54,0.8)',
              border: '1px solid var(--border)', borderRadius: 8,
              padding: '10px 14px', color: 'var(--text-primary)',
              fontSize: 13, outline: 'none', boxSizing: 'border-box',
              transition: 'border-color 0.2s'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent-teal)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        {message && (
          <div style={{
            padding: '8px 12px', borderRadius: 7, marginBottom: 12,
            background: message.includes('created') ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            border: '1px solid ' + (message.includes('created') ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'),
            color: message.includes('created') ? 'var(--accent-green)' : 'var(--accent-red)',
            fontSize: 12, animation: 'slideDown 0.3s ease'
          }}>
            {message}
          </div>
        )}

        <button
          onClick={handleAuth}
          disabled={loading}
          style={{
            width: '100%', padding: '11px',
            background: loading ? 'var(--bg-hover)' : 'linear-gradient(135deg, var(--accent-teal), #0ab5ac)',
            border: 'none', borderRadius: 8,
            color: loading ? 'var(--text-muted)' : '#000',
            fontWeight: 700, fontSize: 13,
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: 16, transition: 'all 0.2s',
            boxShadow: loading ? 'none' : '0 4px 16px rgba(14,210,200,0.3)'
          }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={{
                width: 14, height: 14,
                border: '2px solid var(--text-muted)',
                borderTopColor: 'var(--accent-teal)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                display: 'inline-block'
              }} />
              Please wait...
            </span>
          ) : isLogin ? 'Sign In' : 'Create Account'}
        </button>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span
            onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
            style={{ color: 'var(--accent-teal)', cursor: 'pointer', fontWeight: 600 }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </span>
        </p>

        <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            بسم الله الرحمن الرحيم
          </p>
        </div>
      </div>
    </div>
  );
}
