import React from 'react';
import { ImageIcon, SparklesIcon, DownloadIcon } from './icons';

interface ImageDisplayProps {
  title: string;
  imageUrl: string | null;
  isLoading?: boolean;
  hasContent?: boolean;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-gray-400 animate-pulse">
        <SparklesIcon className="w-12 h-12 mb-4" />
        <p className="text-lg">Generating new image...</p>
    </div>
);

const EmptyState: React.FC<{ title: string, hasContent?: boolean }> = ({ title, hasContent }) => {
    const isEditedDisplay = title.toLowerCase().includes('edited');
    
    if (isEditedDisplay && !hasContent) {
      return (
        <div className="flex flex-col items-center justify-center text-gray-500">
            <SparklesIcon className="w-12 h-12 mb-4" />
            <p className="text-lg text-center">Your edited image will appear here.</p>
        </div>
      );
    }

    return (
        <div className="flex flex-col items-center justify-center text-gray-500">
            <ImageIcon className="w-12 h-12 mb-4" />
            <p className="text-lg">{title}</p>
        </div>
    );
};

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageUrl, isLoading = false, hasContent = true }) => {
  const isEditedImage = title.toLowerCase().includes('edited');

  return (
    <div className="flex flex-col items-stretch h-full">
      <h2 className="text-lg font-semibold text-center text-gray-400 mb-2">{title}</h2>
      <div className="relative group w-full aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-700 p-2 flex-grow">
        {isLoading ? (
          <LoadingSpinner />
        ) : imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={title}
              className="max-w-full max-h-full object-contain rounded-md"
            />
            {isEditedImage && (
              <a
                href={imageUrl}
                download="gemini-edited-image.png"
                title="Download edited image"
                aria-label="Download edited image"
                className="absolute top-3 right-3 p-2 bg-gray-900/50 rounded-full text-gray-300 hover:bg-purple-600 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <DownloadIcon className="w-6 h-6" />
              </a>
            )}
          </>
        ) : (
          <EmptyState title={title} hasContent={hasContent} />
        )}
      </div>
    </div>
  );
};
