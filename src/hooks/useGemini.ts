import { useState } from 'react';
import { GEMINI_API_ENDPOINT, SYSTEM_PROMPT } from '../utils/constants';
import { getBase64Data, getBase64MimeType } from '../utils/imageHelpers';

export const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (prompt: string, imageBase64?: string): Promise<string> => {
    setLoading(true);
    setError(null);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      setError('Gemini API key is missing');
      setLoading(false);
      throw new Error('Gemini API key is missing');
    }

    try {
      const contents = [
        {
          role: 'user',
          parts: [
            { text: SYSTEM_PROMPT },
            { text: prompt }
          ]
        }
      ];

      if (imageBase64) {
        contents[0].parts.push({
          inline_data: {
            mime_type: getBase64MimeType(imageBase64),
            data: getBase64Data(imageBase64)
          }
        } as any);
      }

      const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contents }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to call Gemini API');
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error('No response from Gemini');
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
