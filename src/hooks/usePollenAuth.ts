import { useState, useEffect, useCallback } from 'react';
import { POLLINATIONS_AUTH_URL, POLLINATIONS_ACCOUNT_URL } from '../utils/constants';

export const usePollenAuth = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('pollen_token'));
  const [balance, setBalance] = useState<number | null>(null);

  const fetchBalance = useCallback(async (authToken: string) => {
    try {
      const response = await fetch(`${POLLINATIONS_ACCOUNT_URL}/balance`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        // Assuming the response is the balance number or { balance: number }
        setBalance(typeof data === 'number' ? data : data.balance);
      }
    } catch (err) {
      console.error('Failed to fetch pollen balance', err);
    }
  }, []);

  useEffect(() => {
    // Handle redirect flow: api_key is in the URL fragment (#api_key=sk_...)
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    const urlToken = params.get('api_key');

    if (urlToken) {
      localStorage.setItem('pollen_token', urlToken);
      setToken(urlToken);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchBalance(token);

      // Auto-refresh every 24h
      const interval = setInterval(() => fetchBalance(token), 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [token, fetchBalance]);

  const login = () => {
    const appKey = import.meta.env.VITE_POLLINATIONS_APP_KEY;
    const params = new URLSearchParams({
      redirect_uri: window.location.origin + window.location.pathname,
      client_id: appKey || '',
    });
    window.location.href = `${POLLINATIONS_AUTH_URL}?${params.toString()}`;
  };

  const logout = () => {
    localStorage.removeItem('pollen_token');
    setToken(null);
    setBalance(null);
  };

  return { token, balance, login, logout, isAuthenticated: !!token };
};
