import React, { useState } from 'react';
import { usePollenAuth } from '../hooks/usePollenAuth.tsx';
import { LogOut, Key, Check } from 'lucide-react';

const ByopAuth: React.FC = () => {
  const { isAuthenticated, balance, setToken } = usePollenAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [inputKey, setInputKey] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim()) {
      setToken(inputKey.trim());
      setInputKey('');
      setIsEditing(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-3 glass px-4 py-1.5 rounded-full border border-studio-accent/30 shadow-lg">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Pollen Balance</span>
            <span className="text-sm font-bold text-studio-accent">{balance !== null ? balance : '...'}</span>
          </div>
          <button
            onClick={() => setToken(null)}
            className="p-1.5 text-gray-400 hover:text-red-400 transition-colors bg-white/5 rounded-full"
            title="Disconnect"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSave} className="flex items-center space-x-2">
        <input
          type="password"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="Paste Pollinations API Key..."
          className="bg-black/40 border border-white/20 rounded-lg px-3 py-1.5 text-sm w-48 focus:outline-none focus:border-studio-accent"
          autoFocus
        />
        <button
          type="submit"
          className="p-2 bg-studio-accent rounded-lg text-white hover:bg-blue-600 transition-all"
        >
          <Check size={16} />
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="text-xs text-gray-400 hover:text-white"
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="flex items-center space-x-2 bg-studio-accent hover:bg-blue-600 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg"
    >
      <Key size={16} />
      <span>Enter API Key</span>
    </button>
  );
};

export default ByopAuth;
