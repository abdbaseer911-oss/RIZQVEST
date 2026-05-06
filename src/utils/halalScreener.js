// Simplified Halal screening based on AAOIFI / Dow Jones Islamic Index rules
// In a real app, you'd pull this from a dedicated halal data provider

const HARAM_SECTORS = [
  'Banks', 'Insurance', 'Financial Services',
  'Beverages', 'Tobacco', 'Defense',
  'Gambling', 'Hotels & Entertainment',
];

const EXCLUDED_TICKERS = [
  'BUD', 'TAP', 'STZ', // Alcohol
  'MO', 'PM', 'BTI',   // Tobacco
  'MGM', 'LVS', 'WYNN',// Gambling
  'JPM', 'BAC', 'C',   // Conventional banks (high interest)
];

export function screenStock(ticker, sector, debtRatio) {
  if (EXCLUDED_TICKERS.includes(ticker)) {
    return { status: 'haram', reason: 'Excluded sector/product' };
  }
  if (HARAM_SECTORS.some(s => sector?.includes(s))) {
    return { status: 'questionable', reason: 'Sector review needed' };
  }
  if (debtRatio && debtRatio > 0.33) {
    return { status: 'questionable', reason: 'High debt ratio (>33%)' };
  }
  return { status: 'halal', reason: 'Passes basic screening' };
}

export const GULF_WATCHLIST = [
  { ticker: 'ARAMCO.SR', name: 'Saudi Aramco', exchange: 'Tadawul' },
  { ticker: 'EMAAR.AE', name: 'Emaar Properties', exchange: 'DFM' },
  { ticker: 'FAB.AE', name: 'First Abu Dhabi Bank', exchange: 'ADX' },
  { ticker: 'ADNOC.AE', name: 'ADNOC Distribution', exchange: 'ADX' },
  { ticker: 'ALMARAI.SR', name: 'Almarai', exchange: 'Tadawul' },
];

export const HALAL_ETF_LIST = [
  { ticker: 'HLAL', name: 'Wahed FTSE USA Shariah ETF' },
  { ticker: 'SPUS', name: 'SP Funds S&P 500 Sharia' },
  { ticker: 'SPRE', name: 'SP Funds Global REITs Sharia' },
  { ticker: 'UMMA', name: 'Saturna Al-Kawthar Global Fund' },
];
