'use client';

import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  disabled?: boolean;
}

export function ImageUpload({ images, onImagesChange, disabled }: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024
    );

    if (imageFiles.length > 0) {
      const newImages = [...images, ...imageFiles].slice(0, 5);
      onImagesChange(newImages);
    }
  }, [images, onImagesChange, disabled]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024
    );

    if (imageFiles.length > 0) {
      const newImages = [...images, ...imageFiles].slice(0, 5);
      onImagesChange(newImages);
    }
  }, [images, onImagesChange, disabled]);

  const removeImage = useCallback((index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  }, [images, onImagesChange]);

  return (
    <div 
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragOver 
          ? 'border-blue-500 bg-blue-50' 
          : disabled 
            ? 'border-gray-300 bg-gray-50' 
            : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFileSelect}
        disabled={disabled}
        className="hidden"
        id="image-upload"
      />
      
      <label htmlFor="image-upload" className="cursor-pointer">
        <div className="flex flex-col items-center space-y-4">
          <Upload className="w-12 h-12 text-gray-400" />
          <div>
            <p className="text-lg font-medium text-gray-900">
              拖拽图片到这里
            </p>
            <p className="text-sm text-gray-500">
              或点击选择文件
            </p>
          </div>
          <p className="text-xs text-gray-400">
            支持 JPG, PNG, WebP 格式，最大 10MB
          </p>
          {images.length > 0 && (
            <p className="text-sm text-blue-600">
              已选择 {images.length}/5 张图片
            </p>
          )}
        </div>
      </label>
    </div>
  );
}