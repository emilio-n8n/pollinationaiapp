import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, X } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ActionButtons from './ActionButtons';
import type { Message } from '../utils/constants';
import { fileToBase64 } from '../utils/imageHelpers';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (text: string, image?: string) => void;
  loading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, loading }) => {
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!inputText.trim() && !selectedImage) || loading) return;

    onSendMessage(inputText, selectedImage || undefined);
    setInputText('');
    setSelectedImage(null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setSelectedImage(base64);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full bg-studio-bg border-r border-white/10">
      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-white/10"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center px-6 opacity-40">
             <ImageIcon size={48} className="mb-4" />
             <p className="text-sm">Describe an image or upload one to start editing.</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <ActionButtons onAction={(prompt) => onSendMessage(prompt)} disabled={loading} />

        {selectedImage && (
          <div className="relative inline-block mb-2 group">
            <img src={selectedImage} alt="Selected" className="h-20 w-20 object-cover rounded-lg border border-studio-accent shadow-lg" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a prompt (Ctrl+Enter to send)..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-24 focus:outline-none focus:ring-2 focus:ring-studio-accent/50 min-h-[50px] max-h-[200px] text-sm resize-none"
            rows={1}
          />
          <div className="absolute right-2 bottom-2 flex items-center space-x-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400"
              title="Upload Image"
            >
              <ImageIcon size={20} />
            </button>
            <button
              type="submit"
              disabled={(!inputText.trim() && !selectedImage) || loading}
              className="p-2 bg-studio-accent hover:bg-blue-600 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-studio-accent"
            >
              <Send size={20} />
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
