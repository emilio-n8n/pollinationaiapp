export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      // Remove data:image/jpeg;base64, prefix for Gemini API if needed,
      // but usually better to keep and handle where used
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const getBase64Data = (base64String: string) => {
  return base64String.split(',')[1];
};

export const getBase64MimeType = (base64String: string) => {
  const match = base64String.match(/^data:(.*);base64,/);
  return match ? match[1] : 'image/jpeg';
};
