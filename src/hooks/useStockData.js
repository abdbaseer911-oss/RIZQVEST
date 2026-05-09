import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_POLYGON_API_KEY;
const BASE = 'https://api.polygon.io';

// Uses Yahoo Finance proxy - free, no key needed, always works
export function useStockQuote(ticker) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ticker) return;
    const fetch = async () => {
      try {
        const res = await axios.get(
          `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=5d`,
          { headers: { 'Accept': 'application/json' } }
        );
        const meta = res.data.chart.result[0].meta;
        setData({
          c: meta.regularMarketPrice,
          prevClose: meta.previousClose,
          change: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100,
          isLive: meta.marketState === 'REGULAR',
          marketState: meta.marketState,
        });
      } catch (e) {
        console.error('Yahoo error:', e.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [ticker]);

  return { data, loading };
}

// For the ticker banner - still uses Polygon
export function useMarketSnapshot(tickers) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    if (!tickers?.length) return;
    try {
      const tickerStr = tickers.join(',');
      const res = await axios.get(
        `${BASE}/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${tickerStr}&apiKey=${API_KEY}`
      );
      setData(res.data.tickers || []);
    } catch (e) {
      console.error('Snapshot error:', e.message);
    } finally {
      setLoading(false);
    }
  }, [tickers?.join(',')]);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 60000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  return { data, loading, refetch: fetchAll };
}

export function useStockSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) { setResults([]); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE}/v3/reference/tickers?search=${query}&active=true&limit=8&apiKey=${API_KEY}`
        );
        setResults(res.data.results || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading };
}

export function useStockHistory(ticker) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ticker) return;
    const fetch = async () => {
      try {
        const res = await axios.get(
          `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=30d`
        );
        const quotes = res.data.chart.result[0];
        const times = quotes.timestamp;
        const closes = quotes.indicators.quote[0].close;
        setData(times.map((t, i) => ({
          date: new Date(t * 1000).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
          price: closes[i]?.toFixed(2),
        })));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [ticker]);

  return { data, loading };
}
