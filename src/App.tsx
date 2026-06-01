import { useState, useCallback, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import ImageCanvas from './components/ImageCanvas';
import ImageHistory from './components/ImageHistory';
import ByopAuth from './components/ByopAuth';
import { useGemini } from './hooks/useGemini';
import { usePollinations } from './hooks/usePollinations';
import type { Message, ImageVersion } from './utils/constants';
import { Sparkles, Layers } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<ImageVersion[]>([]);
  const [currentImage, setCurrentImage] = useState<ImageVersion | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'canvas'>('chat');

  const { generate: getGeminiInstructions, loading: geminiLoading } = useGemini();
  const { generateImage, loading: pollinationLoading } = usePollinations();

  const handleSendMessage = useCallback(async (text: string, imageBase64?: string) => {
    // 1. Add user message
    const userMsg: Message = { role: 'user', content: text, image: imageBase64 };
    setMessages(prev => [...prev, userMsg]);

    // Switch to canvas on mobile if generating
    if (window.innerWidth < 768) setActiveTab('canvas');

    try {
      // 2. Get Gemini's interpretation/instructions
      const instructions = await getGeminiInstructions(text, imageBase64 || currentImage?.url);

      // Add model thinking message
      const modelMsg: Message = { role: 'model', content: instructions, isGenerating: true };
      setMessages(prev => [...prev, modelMsg]);

      // 3. Generate image using Pollinations
      // Combine user intent with gemini's specialized instructions
      const combinedPrompt = `${text}. ${instructions}`;
      const imageUrl = await generateImage(combinedPrompt);

      // 4. Update state with new image
      const newVersion: ImageVersion = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: text,
        timestamp: Date.now()
      };

      setHistory(prev => [...prev, newVersion]);
      setCurrentImage(newVersion);

      // Update model message to show completion
      setMessages(prev => {
        const last = [...prev];
        if (last.length > 0) {
          last[last.length - 1] = { ...last[last.length - 1], isGenerating: false };
        }
        return last;
      });

    } catch (error: any) {
      setMessages(prev => [...prev, {
        role: 'model',
        content: `Error: ${error.message}. Please check your API keys and connection.`
      }]);
    }
  }, [currentImage, getGeminiInstructions, generateImage]);

  const handleUndo = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentImage(newHistory[newHistory.length - 1]);
    } else {
      setHistory([]);
      setCurrentImage(null);
    }
  };

  const isProcessing = geminiLoading || pollinationLoading;

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        handleUndo();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleUndo]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-studio-bg text-white">
      {/* Header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md z-20">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-studio-accent rounded-lg flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight hidden sm:block">AI Image Studio</h1>
        </div>

        {/* Mobile Tabs */}
        <div className="flex sm:hidden bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === 'chat' ? 'bg-studio-accent text-white' : 'text-gray-400'}`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('canvas')}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === 'canvas' ? 'bg-studio-accent text-white' : 'text-gray-400'}`}
          >
            Canvas
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`p-2 rounded-lg transition-colors ${showHistory ? 'text-studio-accent bg-studio-accent/10' : 'text-gray-400 hover:bg-white/5'}`}
            title="Toggle History"
          >
            <Layers size={20} />
          </button>
          <ByopAuth />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Desktop Layout or Mobile Active Tab */}
        <div className={`w-full sm:w-[400px] lg:w-[450px] flex-shrink-0 ${(activeTab === 'chat' || window.innerWidth >= 640) ? 'flex' : 'hidden'}`}>
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            loading={isProcessing}
          />
        </div>

        <div className={`flex-1 relative ${(activeTab === 'canvas' || window.innerWidth >= 640) ? 'block' : 'hidden'}`}>
          <ImageCanvas
            currentImage={currentImage}
            loading={isProcessing}
            onUndo={handleUndo}
            canUndo={history.length > 0}
          />
        </div>

        {/* History Sidebar (Overlay on mobile, slide-in on desktop) */}
        {showHistory && (
          <div className="absolute right-0 top-0 bottom-0 w-64 z-30 shadow-2xl">
            <ImageHistory
              history={history}
              onSelect={(v) => {
                setCurrentImage(v);
                if (window.innerWidth < 640) setShowHistory(false);
              }}
              currentId={currentImage?.id}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
