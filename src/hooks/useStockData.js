import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_POLYGON_API_KEY;
const BASE = 'https://api.polygon.io';

// Single stock - uses snapshot for most recent price
export function useStockQuote(ticker) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!ticker) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE}/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=${API_KEY}`
      );
      const snap = res.data.ticker;
      if (snap) {
        setData({
          c: snap.day?.c || snap.prevDay?.c,
          o: snap.day?.o || snap.prevDay?.o,
          todaysChangePerc: snap.todaysChangePerc,
          todaysChange: snap.todaysChange,
          prevClose: snap.prevDay?.c,
        });
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [ticker]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Multiple stocks snapshot
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

// Search stocks
export function useStockSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE}/v3/reference/tickers?search=${query}&active=true&limit=8&apiKey=${API_KEY}`
        );
        setResults(res.data.results || []);
      } catch (e) {
        console.error('Search error:', e.message);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading };
}

// 30 day price history for charts
export function useStockHistory(ticker) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ticker) return;
    const fetchHistory = async () => {
      try {
        const today = new Date();
        const past = new Date();
        past.setDate(today.getDate() - 30);
        const from = past.toISOString().split('T')[0];
        const to = today.toISOString().split('T')[0];
        const res = await axios.get(
          `${BASE}/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&apiKey=${API_KEY}`
        );
        const formatted = (res.data.results || []).map(d => ({
          date: new Date(d.t).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
          price: d.c,
          open: d.o,
          high: d.h,
          low: d.l,
          volume: d.v
        }));
        setData(formatted);
      } catch (e) {
        console.error('History error:', e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [ticker]);

  return { data, loading };
}
