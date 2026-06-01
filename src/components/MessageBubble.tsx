import React from 'react';
import type { Message } from '../utils/constants';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 w-full`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 glass ${
          isUser ? 'bg-studio-accent text-white' : 'bg-white/10 text-gray-200'
        }`}
      >
        {message.image && (
          <img
            src={message.image}
            alt="User uploaded content"
            className="w-full h-auto rounded mb-2 max-h-60 object-cover"
          />
        )}
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        {message.isGenerating && (
          <div className="mt-2 flex items-center space-x-1">
             <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
             <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]" />
             <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
