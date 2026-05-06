import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_POLYGON_API_KEY;
const BASE = 'https://api.polygon.io';

export function useStockQuote(ticker) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    if (!ticker) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE}/v2/last/trade/${ticker}?apiKey=${API_KEY}`
      );
      setData(res.data.results);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [ticker]);

  useEffect(() => { fetch(); }, [fetch]);
  return { data, loading, error, refetch: fetch };
}

export function useMarketSnapshot(tickers) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tickers?.length) return;
    const fetchAll = async () => {
      try {
        const tickerStr = tickers.join(',');
        const res = await axios.get(
          `${BASE}/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${tickerStr}&apiKey=${API_KEY}`
        );
        setData(res.data.tickers || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
    const interval = setInterval(fetchAll, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, [tickers?.join(',')]);

  return { data, loading };
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
          `${BASE}/v3/reference/tickers?search=${query}&active=true&limit=10&apiKey=${API_KEY}`
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
