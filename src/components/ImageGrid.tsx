'use client';

import React from 'react';
import { Download, Eye } from 'lucide-react';

interface ImageGridProps {
  images: File[];
  results: Array<{
    originalUrl: string;
    processedUrl: string;
    status: 'pending' | 'processing' | 'completed' | 'error';
    error?: string;
  }>;
  onDownload: (index: number) => void;
}

export function ImageGrid({ images, results, onDownload }: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => {
        const result = results[index];
        
        return (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 原始图片 */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">原图</h3>
                <span className="text-xs text-gray-500">
                  {(image.size / 1024 / 1024).toFixed(1)} MB
                </span>
              </div>
              <div className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Original ${index + 1}`}
                  className="w-full h-48 object-cover rounded"
                />
              </div>
            </div>

            {/* 处理状态 */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">处理结果</h3>
                {result.status === 'completed' && (
                  <Eye className="w-4 h-4 text-green-500" />
                )}
                {result.status === 'processing' && (
                  <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
                )}
                {result.status === 'error' && (
                  <span className="text-xs text-red-500">错误</span>
                )}
              </div>

              {/* 状态指示器 */}
              <div className="text-sm mb-3">
                {result.status === 'pending' && (
                  <span className="text-gray-500">等待处理</span>
                )}
                {result.status === 'processing' && (
                  <span className="text-blue-500">处理中...</span>
                )}
                {result.status === 'completed' && (
                  <span className="text-green-500">处理完成</span>
                )}
                {result.status === 'error' && (
                  <span className="text-red-500">{result.error}</span>
                )}
              </div>

              {/* 处理后的图片 */}
              {result.status === 'completed' && (
                <div className="relative">
                  <img
                    src={result.processedUrl}
                    alt={`Processed ${index + 1}`}
                    className="w-full h-48 object-cover rounded"
                  />
                  <button
                    onClick={() => onDownload(index)}
                    className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    下载
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}