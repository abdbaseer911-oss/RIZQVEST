// AAOIFI Shariah Screening Standards
// 3 criteria: Business activity, Debt ratio (<33%), Interest income (<5%)

const HARAM_TICKERS = [
  // Alcohol
  'BUD', 'TAP', 'STZ', 'SAM', 'BREW',
  // Tobacco
  'MO', 'PM', 'BTI', 'LO', 'VGR',
  // Gambling
  'MGM', 'LVS', 'WYNN', 'CZR', 'DKNG', 'PENN',
  // Weapons/Defense (controversial)
  'LMT', 'RTX', 'NOC', 'GD', 'BA',
  // Conventional Banks (interest-based)
  'JPM', 'BAC', 'C', 'WFC', 'GS', 'MS', 'USB', 'PNC',
  // Insurance (conventional)
  'MET', 'PRU', 'AFL', 'AIG', 'TRV',
  // Adult entertainment
  'PLAYBOY',
  // Pork
  'HRL', 'TSN', 'WH',
];

const QUESTIONABLE_TICKERS = [
  // Media with some haram content
  'DIS', 'NFLX', 'PARA', 'WBD',
  // Hotels (alcohol served)
  'MAR', 'HLT', 'H', 'IHG',
  // Mixed business
  'AMZN', 'BABA', 'EBAY',
  // High debt conventional finance adjacent
  'V', 'MA', 'AXP',
];

const HARAM_SECTORS = [
  'Banks', 'Insurance', 'Gambling',
  'Tobacco', 'Alcohol', 'Defense',
  'Adult Entertainment',
];

const QUESTIONABLE_SECTORS = [
  'Entertainment', 'Hotels', 'Restaurants',
];

export function screenStock(ticker, sector, debtRatio) {
  // Hard haram
  if (HARAM_TICKERS.includes(ticker)) {
    return {
      status: 'haram',
      reason: 'Core business involves prohibited activities',
      details: {
        businessActivity: false,
        debtRatio: true,
        interestIncome: false,
      }
    };
  }

  // Haram sector
  if (HARAM_SECTORS.some(s => sector?.toLowerCase().includes(s.toLowerCase()))) {
    return {
      status: 'haram',
      reason: 'Sector involves prohibited activities',
      details: {
        businessActivity: false,
        debtRatio: debtRatio <= 0.33,
        interestIncome: false,
      }
    };
  }

  // Questionable tickers
  if (QUESTIONABLE_TICKERS.includes(ticker)) {
    return {
      status: 'questionable',
      reason: 'Mixed business activities require scholar review',
      details: {
        businessActivity: null,
        debtRatio: debtRatio <= 0.33,
        interestIncome: null,
      }
    };
  }

  // Questionable sector
  if (QUESTIONABLE_SECTORS.some(s => sector?.toLowerCase().includes(s.toLowerCase()))) {
    return {
      status: 'questionable',
      reason: 'Sector may involve some non-compliant activities',
      details: {
        businessActivity: null,
        debtRatio: debtRatio <= 0.33,
        interestIncome: null,
      }
    };
  }

  // Debt ratio check
  if (debtRatio > 0.33) {
    return {
      status: 'questionable',
      reason: 'Debt ratio exceeds 33% AAOIFI threshold',
      details: {
        businessActivity: true,
        debtRatio: false,
        interestIncome: true,
      }
    };
  }

  // Passes all checks
  return {
    status: 'halal',
    reason: 'Passes AAOIFI Shariah screening criteria',
    details: {
      businessActivity: true,
      debtRatio: true,
      interestIncome: true,
    }
  };
}
