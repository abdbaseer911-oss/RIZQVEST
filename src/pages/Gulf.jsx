import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { TrendingUp, TrendingDown, Globe } from 'lucide-react';

const SA_STOCKS = [
  { ticker: '2222.SR', name: 'Saudi Aramco', sector: 'Energy', price: 27.85, change: 0.54, halal: true, mcap: '$1.8T' },
  { ticker: '1120.SR', name: 'Al Rajhi Bank', sector: 'Islamic Banking', price: 85.20, change: -0.32, halal: true, mcap: '$78B' },
  { ticker: '2280.SR', name: 'Almarai', sector: 'Consumer', price: 52.10, change: 1.12, halal: true, mcap: '$14B' },
  { ticker: '7010.SR', name: 'STC Telecom', sector: 'Telecom', price: 44.30, change: 0.28, halal: true, mcap: '$48B' },
  { ticker: '1211.SR', name: 'Maaden', sector: 'Mining', price: 38.75, change: -1.05, halal: true, mcap: '$30B' },
  { ticker: '2010.SR', name: 'SABIC', sector: 'Petrochemicals', price: 72.40, change: 0.88, halal: true, mcap: '$80B' },
];

const UAE_STOCKS = [
  { ticker: 'EMAAR.AE', name: 'Emaar Properties', sector: 'Real Estate', price: 8.92, change: 1.34, halal: true, mcap: '$12B' },
  { ticker: 'FAB.AE', name: 'First Abu Dhabi Bank', sector: 'Banking', price: 14.20, change: 0.42, halal: false, mcap: '$45B' },
  { ticker: 'ADNOC.AE', name: 'ADNOC Distribution', sector: 'Energy', price: 4.35, change: -0.23, halal: true, mcap: '$18B' },
  { ticker: 'DIB.AE', name: 'Dubai Islamic Bank', sector: 'Islamic Banking', price: 6.80, change: 0.88, halal: true, mcap: '$8B' },
  { ticker: 'ETISALAT.AE', name: 'e and Etisalat', sector: 'Telecom', price: 22.50, change: 0.15, halal: true, mcap: '$40B' },
  { ticker: 'DU.AE', name: 'du EITC', sector: 'Telecom', price: 7.15, change: -0.42, halal: true, mcap: '$6B' },
];

const QA_STOCKS = [
  { ticker: 'QNBK.QA', name: 'QNB Group', sector: 'Banking', price: 18.20, change: 0.33, halal: false, mcap: '$42B' },
  { ticker: 'ORDS.QA', name: 'Ooredoo', sector: 'Telecom', price: 8.45, change: -0.18, halal: true, mcap: '$7B' },
  { ticker: 'MARK.QA', name: 'Masraf Al Rayan', sector: 'Islamic Banking', price: 1.92, change: 0.52, halal: true, mcap: '$8B' },
  { ticker: 'QEWS.QA', name: 'Qatar Electricity and Water', sector: 'Utilities', price: 16.80, change: 0.71, halal: true, mcap: '$5B' },
];

const KW_STOCKS = [
  { ticker: 'NBK.KW', name: 'National Bank of Kuwait', sector: 'Banking', price: 0.98, change: 0.22, halal: false, mcap: '$18B' },
  { ticker: 'KFH.KW', name: 'Kuwait Finance House', sector: 'Islamic Banking', price: 0.82, change: 0.45, halal: true, mcap: '$14B' },
  { ticker: 'ZAIN.KW', name: 'Zain Group', sector: 'Telecom', price: 0.52, change: -0.12, halal: true, mcap: '$4B' },
];

const MARKETS = [
  { id: 'Saudi Arabia', exchange: 'Tadawul', index: 'TASI', indexValue: '11,842', indexChange: 0.54, currency: 'SAR', color: '#22c55e', stocks: SA_STOCKS },
  { id: 'UAE', exchange: 'DFM/ADX', index: 'DFMGI', indexValue: '4,284', indexChange: 1.34, currency: 'AED', color: '#0ed2c8', stocks: UAE_STOCKS },
  { id: 'Qatar', exchange: 'QSE', index: 'QE Index', indexValue: '9,842', indexChange: -0.18, currency: 'QAR', color: '#8b5cf6', stocks: QA_STOCKS },
  { id: 'Kuwait', exchange: 'Boursa', index: 'BKP', indexValue: '7,124', indexChange: 0.22, currency: 'KWD', color: '#f0b429', stocks: KW_STOCKS },
];

const FLAGS = { 'Saudi Arabia': 'SA', UAE: 'UAE', Qatar: 'QA', Kuwait: 'KW' };
const FLAG_EMOJI = { 'Saudi Arabia': '🇸🇦', UAE: '🇦🇪', Qatar: '🇶🇦', Kuwait: '🇰🇼' };

const SECTOR_COLORS = {
  Energy: '#f0b429',
  'Islamic Banking': '#22c55e',
  Consumer: '#ec4899',
  Telecom: '#0ed2c8',
  Mining: '#94a3b8',
  Petrochemicals: '#f97316',
  'Real Estate': '#f97316',
  Banking: '#ef4444',
  Utilities: '#3b82f6',
};

export default function Gulf() {
  var navigate = useNavigate();
  var activeState = useState('Saudi Arabia');
  var activeId = activeState[0];
  var setActiveId = activeState[1];

  var market = null;
  for (var i = 0; i < MARKETS.length; i++) {
    if (MARKETS[i].id === activeId) {
      market = MARKETS[i];
      break;
    }
  }

  var totalStocks = 0;
  var halalCount = 0;
  for (var j = 0; j < MARKETS.length; j++) {
    totalStocks += MARKETS[j].stocks.length;
    for (var k = 0; k < MARKETS[j].stocks.length; k++) {
      if (MARKETS[j].stocks[k].halal) halalCount++;
    }
  }

  var halalInMarket = 0;
  for (var m = 0; m < market.stocks.length; m++) {
    if (market.stocks[m].halal) halalInMarket++;
  }

  return (
    <div style={{ width: '100%', animation: 'fadeInUp 0.4s ease' }}>
      <Navbar title="Gulf Markets" />

      <div style={{
        background: 'linear-gradient(135deg, #071a07 0%, #0a1f14 50%, #0d1a2e 100%)',
        border: '1px solid rgba(34,197,94,0.2)',
        borderRadius: 12, padding: '18px 22px', marginBottom: 12,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: 20, top: '50%',
          transform: 'translateY(-50%)', fontSize: 80, opacity: 0.05,
          pointerEvents: 'none',
        }}>☽</div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Globe size={14} color="var(--accent-green)" />
              <span style={{ fontSize: 10, color: 'var(--accent-green)', letterSpacing: 1.5, fontWeight: 600 }}>
                GULF COOPERATION COUNCIL
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 5 }}>
              GCC Markets Terminal
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 11, maxWidth: 420, lineHeight: 1.6 }}>
              Track Shariah-screened stocks across Saudi Arabia, UAE, Qatar and Kuwait.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{
              background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8, padding: '10px 14px', textAlign: 'center', minWidth: 70,
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--accent-teal)' }}>
                {totalStocks}
              </div>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>GCC Stocks</div>
            </div>
            <div style={{
              background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8, padding: '10px 14px', textAlign: 'center', minWidth: 70,
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--accent-green)' }}>
                {halalCount}
              </div>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>Halal</div>
            </div>
            <div style={{
              background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8, padding: '10px 14px', textAlign: 'center', minWidth: 70,
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--accent-gold)' }}>
                4
              </div>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>Exchanges</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 12 }}>
        {MARKETS.map(function(m) {
          var isActive = activeId === m.id;
          var isUp = m.indexChange >= 0;
          return (
            <div
              key={m.id}
              onClick={function() { setActiveId(m.id); }}
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, ' + m.color + '15, ' + m.color + '05)'
                  : 'var(--bg-card)',
                border: '1px solid ' + (isActive ? m.color + '50' : 'var(--border)'),
                borderRadius: 10, padding: '12px 14px',
                cursor: 'pointer', transition: 'all 0.2s',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {isActive && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: 'linear-gradient(90deg, ' + m.color + ', transparent)',
                }} />
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 18 }}>{FLAG_EMOJI[m.id]}</span>
                <span style={{
                  fontSize: 8, padding: '1px 5px', borderRadius: 3,
                  background: m.color + '15', color: m.color,
                  border: '1px solid ' + m.color + '25', fontWeight: 600,
                }}>{m.exchange}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, marginBottom: 2 }}>
                {m.id}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6 }}>{m.index}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 2 }}>
                {m.indexValue}
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 3, fontSize: 10,
                color: isUp ? 'var(--accent-green)' : 'var(--accent-red)',
              }}>
                {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {isUp ? '+' : ''}{m.indexChange}%
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13 }}>
              {FLAG_EMOJI[market.id]} {market.id} Stocks
            </h3>
            <span style={{ fontSize: 10, color: market.color }}>
              {market.exchange} Exchange
            </span>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
              <thead>
                <tr style={{
                  background: 'rgba(0,0,0,0.2)',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                }}>
                  <th style={{ textAlign: 'left', padding: '8px 10px', fontWeight: 500 }}>Company</th>
                  <th style={{ textAlign: 'left', padding: '8px 10px', fontWeight: 500 }}>Price</th>
                  <th style={{ textAlign: 'left', padding: '8px 10px', fontWeight: 500 }}>Chg%</th>
                  <th style={{ textAlign: 'left', padding: '8px 10px', fontWeight: 500 }}>MCap</th>
                  <th style={{ textAlign: 'left', padding: '8px 10px', fontWeight: 500 }}>Shariah</th>
                </tr>
              </thead>
              <tbody>
                {market.stocks.map(function(s) {
                  var isUp = s.change >= 0;
                  var sColor = SECTOR_COLORS[s.sector] || '#0ed2c8';
                  return (
                    <tr
                      key={s.ticker}
                      style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                      onMouseEnter={function(e) { e.currentTarget.style.background = 'var(--bg-hover)'; }}
                      onMouseLeave={function(e) { e.currentTarget.style.background = 'transparent'; }}
                      onClick={function() { navigate('/stock/' + s.ticker); }}
                    >
                      <td style={{ padding: '9px 10px' }}>
                        <div style={{ fontWeight: 700, color: market.color, fontSize: 11 }}>{s.ticker}</div>
                        <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 1 }}>{s.name}</div>
                        <span style={{
                          fontSize: 8, padding: '1px 4px', borderRadius: 3,
                          background: sColor + '12', color: sColor,
                          marginTop: 2, display: 'inline-block',
                        }}>{s.sector}</span>
                      </td>
                      <td style={{ padding: '9px 10px', fontWeight: 700, fontSize: 12 }}>
                        {market.currency} {s.price.toFixed(2)}
                      </td>
                      <td style={{ padding: '9px 10px' }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 2,
                          color: isUp ? 'var(--accent-green)' : 'var(--accent-red)',
                          fontSize: 11,
                        }}>
                          {isUp ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                          {isUp ? '+' : ''}{s.change}%
                        </div>
                      </td>
                      <td style={{ padding: '9px 10px', fontSize: 10, color: 'var(--text-secondary)' }}>
                        {s.mcap}
                      </td>
                      <td style={{ padding: '9px 10px' }}>
                        <span className={s.halal ? 'badge-halal' : 'badge-screen'}>
                          {s.halal ? 'Halal' : 'Review'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="card" style={{
            background: 'linear-gradient(135deg, var(--bg-card), ' + market.color + '08)',
            border: '1px solid ' + market.color + '20',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>{FLAG_EMOJI[market.id]}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700 }}>
                  {market.id} Market
                </div>
                <div style={{ fontSize: 10, color: market.color }}>{market.exchange}</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 11 }}>
              <span style={{ color: 'var(--text-muted)' }}>Currency</span>
              <span style={{ fontWeight: 600 }}>{market.currency}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 11 }}>
              <span style={{ color: 'var(--text-muted)' }}>Stocks</span>
              <span style={{ fontWeight: 600 }}>{market.stocks.length} shown</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 11 }}>
              <span style={{ color: 'var(--text-muted)' }}>Halal</span>
              <span style={{ fontWeight: 600 }}>{halalInMarket} / {market.stocks.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 11 }}>
              <span style={{ color: 'var(--text-muted)' }}>Index</span>
              <span style={{ fontWeight: 600 }}>{market.index} {market.indexValue}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 11 }}>
              <span style={{ color: 'var(--text-muted)' }}>Data</span>
              <span style={{ fontWeight: 600 }}>Reference prices</span>
            </div>
          </div>

          <div style={{
            background: 'rgba(34,197,94,0.05)',
            border: '1px solid rgba(34,197,94,0.15)',
            borderRadius: 10, padding: '12px 14px',
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-green)', marginBottom: 6 }}>
              Why Gulf Markets?
            </div>
            <p style={{ fontSize: 10, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Gulf markets are among the most Shariah-compliant globally.
              Islamic banking dominates in Saudi Arabia and Kuwait.
              The GCC has the highest concentration of AAOIFI-certified institutions worldwide.
            </p>
          </div>

          <div style={{
            background: 'rgba(212,168,67,0.04)',
            border: '1px solid rgba(212,168,67,0.15)',
            borderRadius: 10, padding: '10px 14px',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-gold)', marginBottom: 8 }}>
              Live Exchange Links
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span
                onClick={function() { window.open('https://www.saudiexchange.sa', '_blank'); }}
                style={{
                  fontSize: 9, padding: '3px 7px', borderRadius: 4,
                  background: 'rgba(212,168,67,0.08)', color: 'var(--accent-gold)',
                  border: '1px solid rgba(212,168,67,0.2)',
                  cursor: 'pointer', fontWeight: 600,
                }}
              >Tadawul</span>
              <span
                onClick={function() { window.open('https://www.dfm.ae', '_blank'); }}
                style={{
                  fontSize: 9, padding: '3px 7px', borderRadius: 4,
                  background: 'rgba(212,168,67,0.08)', color: 'var(--accent-gold)',
                  border: '1px solid rgba(212,168,67,0.2)',
                  cursor: 'pointer', fontWeight: 600,
                }}
              >DFM</span>
              <span
                onClick={function() { window.open('https://www.qe.com.qa', '_blank'); }}
                style={{
                  fontSize: 9, padding: '3px 7px', borderRadius: 4,
                  background: 'rgba(212,168,67,0.08)', color: 'var(--accent-gold)',
                  border: '1px solid rgba(212,168,67,0.2)',
                  cursor: 'pointer', fontWeight: 600,
                }}
              >QSE</span>
              <span
                onClick={function() { window.open('https://www.boursakuwait.com.kw', '_blank'); }}
                style={{
                  fontSize: 9, padding: '3px 7px', borderRadius: 4,
                  background: 'rgba(212,168,67,0.08)', color: 'var(--accent-gold)',
                  border: '1px solid rgba(212,168,67,0.2)',
                  cursor: 'pointer', fontWeight: 600,
                }}
              >Boursa KW</span>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #071a07, #0f2f1a)',
            border: '1px solid rgba(34,197,94,0.15)',
            borderRadius: 10, padding: '10px 14px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 13, color: 'rgba(212,168,67,0.6)', marginBottom: 4 }}>
              الرزق من عند الله
            </div>
            <p style={{ fontSize: 9, color: 'var(--text-muted)' }}>
              Screened per AAOIFI Shariah Standards
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
