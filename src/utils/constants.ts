export const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
export const POLLINATIONS_IMAGE_ENDPOINT = 'https://image.pollinations.ai/prompt';
export const SYSTEM_PROMPT = "You are a professional image editor assistant. Analyze the image and user's request, then return SPECIFIC instructions for an image generation AI to modify the image. Be precise about colors, lighting, composition, style, mood. Return ONLY the instruction text, no explanations.";
export const POLLINATIONS_AUTH_URL = 'https://enter.pollinations.ai';

export interface Message {
  role: 'user' | 'model';
  content: string;
  image?: string; // base64
  isGenerating?: boolean;
}

export interface ImageVersion {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}
