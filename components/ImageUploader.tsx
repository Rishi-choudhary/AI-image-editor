
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  }, [onImageSelect]);


  return (
    <div className="flex flex-col items-center justify-center">
      <label
        htmlFor="image-upload"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`w-full max-w-lg cursor-pointer p-6 rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-all duration-300 ${isDragging ? 'border-purple-400 bg-purple-900/20 scale-105' : 'border-gray-600 hover:border-purple-500 hover:bg-gray-800'}`}
      >
        <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
        <span className="text-lg font-semibold text-gray-300">
          Drag & drop an image or click to upload
        </span>
        <span className="text-sm text-gray-500 mt-1">PNG, JPG, WEBP</span>
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
