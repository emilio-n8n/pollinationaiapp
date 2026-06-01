import { useState } from 'react';
import { POLLINATIONS_CHAT_ENDPOINT, SYSTEM_PROMPT } from '../utils/constants';
import { usePollenAuth } from './usePollenAuth.tsx';

export const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = usePollenAuth();

  const generate = async (prompt: string, imageBase64?: string): Promise<string> => {
    setLoading(true);
    setError(null);

    const appKey = import.meta.env.VITE_POLLINATIONS_APP_KEY;

    try {
      const messages: any[] = [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        }
      ];

      const userContent: any[] = [{ type: 'text', text: prompt }];

      if (imageBase64) {
        userContent.push({
          type: 'image_url',
          image_url: {
            url: imageBase64
          }
        });
      }

      messages.push({
        role: 'user',
        content: userContent
      });

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (appKey) {
        headers['Authorization'] = `Bearer ${appKey}`;
      }

      const response = await fetch(POLLINATIONS_CHAT_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: 'gemini', // Using Pollinations' gemini model
          messages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to call Pollinations Chat API');
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content;

      if (!text) {
        throw new Error('No response from AI');
      }

      setLoading(false);
      return text.trim();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { generate, loading, error };
};
