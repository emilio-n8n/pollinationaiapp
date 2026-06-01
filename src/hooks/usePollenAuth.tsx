import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { POLLINATIONS_ACCOUNT_URL } from '../utils/constants';

interface AuthContextType {
  token: string | null;
  balance: number | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setTokenInternal] = useState<string | null>(localStorage.getItem('pollen_token'));
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
        setBalance(typeof data === 'number' ? data : data.balance);
      } else {
        setBalance(null);
      }
    } catch (err) {
      console.error('Failed to fetch pollen balance', err);
      setBalance(null);
    }
  }, []);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('pollen_token', newToken);
    } else {
      localStorage.removeItem('pollen_token');
    }
    setTokenInternal(newToken);
  };

  useEffect(() => {
    if (token) {
      fetchBalance(token);
      const interval = setInterval(() => fetchBalance(token), 60 * 60 * 1000); // Check every hour
      return () => clearInterval(interval);
    } else {
      setBalance(null);
    }
  }, [token, fetchBalance]);

  return (
    <AuthContext.Provider value={{ token, balance, setToken, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const usePollenAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('usePollenAuth must be used within an AuthProvider');
  }
  return context;
};
