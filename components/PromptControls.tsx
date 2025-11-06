import React from 'react';
import { ClearIcon, WandIcon } from './icons';

interface PromptControlsProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onClearImage: () => void;
  isHighQuality: boolean;
  onHighQualityChange: (value: boolean) => void;
}

export const PromptControls: React.FC<PromptControlsProps> = ({
  prompt,
  onPromptChange,
  onSubmit,
  isLoading,
  onClearImage,
  isHighQuality,
  onHighQualityChange,
}) => {
  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
        <div className="flex w-full items-center gap-4">
            <button
                onClick={onClearImage}
                className="p-3 bg-gray-700 hover:bg-red-700 rounded-lg transition-colors text-gray-300 hover:text-white shrink-0"
                aria-label="Clear image"
            >
                <ClearIcon className="w-6 h-6" />
            </button>
            <input
                type="text"
                value={prompt}
                onChange={(e) => onPromptChange(e.target.value)}
                placeholder="e.g., Add a retro filter, make it look like a sketch..."
                className="flex-grow p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-shadow"
                disabled={isLoading}
            />
            <label htmlFor="high-quality-toggle" className="flex items-center cursor-pointer gap-2 shrink-0 text-gray-300 hover:text-white transition-colors">
              <input
                id="high-quality-toggle"
                type="checkbox"
                checked={isHighQuality}
                onChange={(e) => onHighQualityChange(e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              <span className="text-sm md:text-base whitespace-nowrap">High Quality</span>
            </label>
            <button
                onClick={onSubmit}
                disabled={isLoading || !prompt}
                className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 shrink-0"
            >
                {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                </>
                ) : (
                <>
                    <WandIcon className="w-5 h-5 mr-2" />
                    Generate
                </>
                )}
            </button>
        </div>
    </div>
  );
};
