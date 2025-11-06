
import type { FilePart } from '../types';

export const fileToGenerativePart = (file: File): Promise<FilePart> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      if (!base64Data) {
        reject(new Error("Could not extract base64 data from file."));
        return;
      }
      resolve({
        data: base64Data,
        mimeType: file.type,
      });
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};
