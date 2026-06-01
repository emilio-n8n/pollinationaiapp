export const POLLINATIONS_BASE_URL = 'https://gen.pollinations.ai';
export const POLLINATIONS_CHAT_ENDPOINT = 'https://gen.pollinations.ai/v1/chat/completions';
export const POLLINATIONS_IMAGE_ENDPOINT = 'https://gen.pollinations.ai/image';
export const SYSTEM_PROMPT = "You are a professional image editor assistant. Analyze the image and user's request, then return SPECIFIC instructions for an image generation AI to modify the image. Be precise about colors, lighting, composition, style, mood. Return ONLY the instruction text, no explanations.";
export const POLLINATIONS_AUTH_URL = 'https://enter.pollinations.ai/authorize';
export const POLLINATIONS_ACCOUNT_URL = 'https://gen.pollinations.ai/account';

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
