import { useState } from 'react';
import { POLLINATIONS_IMAGE_ENDPOINT } from '../utils/constants';
import { usePollenAuth } from './usePollenAuth';

export const usePollinations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = usePollenAuth();

  const generateImage = async (prompt: string, options: { width?: number; height?: number; seed?: number } = {}) => {
    setLoading(true);
    setError(null);

    const { width = 1024, height = 1024, seed = Math.floor(Math.random() * 1000000) } = options;
    const encodedPrompt = encodeURIComponent(prompt);
    // model=gpt-image-2 was in requirements, but Pollinations docs mention 'flux' or 'turbo'.
    // Sticking to requirements' model but using fetch to apply headers.
    const url = `${POLLINATIONS_IMAGE_ENDPOINT}/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&model=gpt-image-2&nologo=true`;

    try {
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const appKey = import.meta.env.VITE_POLLINATIONS_APP_KEY;
      if (appKey) {
        // Assuming app key might be sent as a header if not part of BYOP
        headers['X-App-Key'] = appKey;
      }

      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error('Failed to generate image from Pollinations');
      }

      // Fetch as blob to ensure Authorization header is used
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      setLoading(false);
      return objectUrl;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { generateImage, loading, error };
};
