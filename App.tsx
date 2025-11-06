import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ImageDisplay } from './components/ImageDisplay';
import { PromptControls } from './components/PromptControls';
import { Header } from './components/Header';
import { editImageWithPrompt } from './services/geminiService';
import { fileToGenerativePart } from './utils/fileUtils';
import type { FilePart } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isHighQuality, setIsHighQuality] = useState<boolean>(true);

  const handleImageSelect = (file: File) => {
    setOriginalImage(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setEditedImage(null);
    setError(null);
  };

  const handleSubmit = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError('Please select an image and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const imagePart: FilePart = await fileToGenerativePart(originalImage);
      const finalPrompt = isHighQuality
        ? `${prompt}, photorealistic, high resolution, studio lighting`
        : prompt;
      const resultBase64 = await editImageWithPrompt(imagePart, finalPrompt);
      
      if (resultBase64) {
        setEditedImage(`data:image/png;base64,${resultBase64}`);
      } else {
        setError('Failed to get an edited image from the API. The response may have been empty or blocked.');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt, isHighQuality]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 flex-grow">
          <ImageDisplay title="Original Image" imageUrl={originalImageUrl} />
          <ImageDisplay
            title="Edited Image"
            imageUrl={editedImage}
            isLoading={isLoading}
            hasContent={!!originalImageUrl}
          />
        </div>
      </main>
      <footer className="sticky bottom-0 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50 p-4">
        <div className="container mx-auto">
          {!originalImage ? (
            <ImageUploader onImageSelect={handleImageSelect} />
          ) : (
            <PromptControls
              prompt={prompt}
              onPromptChange={setPrompt}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              isHighQuality={isHighQuality}
              onHighQualityChange={setIsHighQuality}
              onClearImage={() => {
                setOriginalImage(null);
                setOriginalImageUrl(null);
                setEditedImage(null);
                setError(null);
                setPrompt('');
              }}
            />
          )}
          {error && (
            <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">
              <p>{error}</p>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default App;
