import React from 'react';
import { usePollenAuth } from '../hooks/usePollenAuth';
import { Wallet, LogOut } from 'lucide-react';

const ByopAuth: React.FC = () => {
  const { isAuthenticated, balance, login, logout } = usePollenAuth();

  return (
    <div className="flex items-center space-x-3">
      {isAuthenticated ? (
        <div className="flex items-center space-x-3 glass px-3 py-1.5 rounded-full border border-studio-accent/30">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Pollen Balance</span>
            <span className="text-sm font-semibold text-studio-accent">{balance !== null ? balance : '...'}</span>
          </div>
          <button
            onClick={logout}
            className="p-1 hover:text-red-400 transition-colors"
            title="Disconnect"
          >
            <LogOut size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={login}
          className="flex items-center space-x-2 bg-studio-accent hover:bg-blue-600 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg"
        >
          <Wallet size={16} />
          <span>Connect Your Pollen Account</span>
        </button>
      )}
    </div>
  );
};

export default ByopAuth;
