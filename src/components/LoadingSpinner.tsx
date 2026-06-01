import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Loader2 className="w-8 h-8 text-studio-accent animate-spin" />
      <span className="mt-2 text-sm text-gray-400">Generating...</span>
    </div>
  );
};

export default LoadingSpinner;
