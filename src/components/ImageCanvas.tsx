import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Download, Undo2, Maximize2 } from 'lucide-react';
import type { ImageVersion } from '../utils/constants';
import LoadingSpinner from './LoadingSpinner';

interface ImageCanvasProps {
  currentImage: ImageVersion | null;
  loading: boolean;
  onUndo: () => void;
  canUndo: boolean;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({ currentImage, loading, onUndo, canUndo }) => {
  const [zoom, setZoom] = useState(1);

  const handleDownload = async () => {
    if (!currentImage) return;
    try {
      const response = await fetch(currentImage.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `studio-gen-${currentImage.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  return (
    <div className="relative h-full flex flex-col bg-[#111]">
      {/* Canvas Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-2">
          <button
            onClick={onUndo}
            disabled={!canUndo || loading}
            className="p-2 glass rounded-md hover:text-studio-accent disabled:opacity-30 disabled:hover:text-inherit transition-colors"
            title="Undo"
          >
            <Undo2 size={18} />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center glass rounded-md px-1 mr-2">
            <button onClick={() => setZoom(prev => Math.max(0.5, prev - 0.25))} className="p-2 hover:text-studio-accent transition-colors"><ZoomOut size={16} /></button>
            <span className="text-xs w-12 text-center font-mono">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(prev => Math.min(3, prev + 0.25))} className="p-2 hover:text-studio-accent transition-colors"><ZoomIn size={16} /></button>
          </div>
          <button
            onClick={handleDownload}
            disabled={!currentImage}
            className="p-2 glass rounded-md hover:text-studio-accent disabled:opacity-30 transition-colors"
            title="Download"
          >
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 overflow-hidden relative flex items-center justify-center p-8 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:20px_20px]">
        {loading ? (
          <div className="glass p-8 rounded-2xl shadow-2xl z-10">
            <LoadingSpinner />
          </div>
        ) : currentImage ? (
          <div
            className="transition-transform duration-200 ease-out shadow-2xl rounded-lg overflow-hidden"
            style={{ transform: `scale(${zoom})` }}
          >
            <img
              src={currentImage.url}
              alt={currentImage.prompt}
              className="max-w-full max-h-[70vh] object-contain"
            />
          </div>
        ) : (
          <div className="text-center space-y-4 max-w-sm px-6 py-10 glass rounded-2xl">
            <div className="w-16 h-16 bg-studio-accent/20 rounded-full flex items-center justify-center mx-auto text-studio-accent">
              <Maximize2 size={32} />
            </div>
            <h2 className="text-xl font-bold">Image Studio</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Upload an image or describe what you want to create in the chat to begin your creative journey.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCanvas;
