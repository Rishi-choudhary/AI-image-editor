
import React from 'react';
import { WandIcon } from './icons';

export const Header: React.FC = () => (
  <header className="bg-gray-800/50 p-4 border-b border-gray-700/50">
    <div className="container mx-auto flex items-center justify-center space-x-3">
      <WandIcon className="w-8 h-8 text-purple-400" />
      <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        Gemini Image Editor
      </h1>
    </div>
  </header>
);
