import React from 'react';
import type { ImageVersion } from '../utils/constants';
import { History, Clock } from 'lucide-react';

interface ImageHistoryProps {
  history: ImageVersion[];
  onSelect: (version: ImageVersion) => void;
  currentId?: string;
}

const ImageHistory: React.FC<ImageHistoryProps> = ({ history, onSelect, currentId }) => {
  return (
    <div className="h-full flex flex-col glass border-l border-white/10">
      <div className="p-4 border-b border-white/10 flex items-center space-x-2">
        <History size={18} className="text-studio-accent" />
        <h3 className="font-semibold text-sm uppercase tracking-wider">Version History</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 text-xs text-center px-4">
            <Clock size={24} className="mb-2 opacity-20" />
            <p>Your generation history will appear here.</p>
          </div>
        ) : (
          history.map((v) => (
            <button
              key={v.id}
              onClick={() => onSelect(v)}
              className={`w-full group relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                currentId === v.id ? 'border-studio-accent shadow-lg shadow-studio-accent/20' : 'border-transparent hover:border-white/30'
              }`}
            >
              <img src={v.url} alt={v.prompt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                <p className="text-[10px] text-white text-center line-clamp-3">{v.prompt}</p>
              </div>
            </button>
          )).reverse()
        )}
      </div>
    </div>
  );
};

export default ImageHistory;
