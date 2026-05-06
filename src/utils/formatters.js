export const formatPrice = (n) =>
  n ? `$${Number(n).toFixed(2)}` : '—';

export const formatChange = (n) =>
  n >= 0 ? `+${n.toFixed(2)}%` : `${n.toFixed(2)}%`;

export const formatVolume = (n) => {
  if (!n) return '—';
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n;
};

export const formatMarketCap = (n) => {
  if (!n) return '—';
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  return `$${(n / 1e6).toFixed(0)}M`;
};
