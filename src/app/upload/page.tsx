'use client';

import React from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { ImageGrid } from '@/components/ImageGrid';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Sparkles } from 'lucide-react';

interface ProcessResult {
  originalUrl: string;
  processedUrl: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}

export default function UploadPage() {
  const [images, setImages] = useState<File[]>([]);
  const [results, setResults] = useState<ProcessResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleProcess = async () => {
    if (images.length === 0) return;

    setIsProcessing(true);
    setProgress(0);
    
    // 初始化结果状态
    const initialResults: ProcessResult[] = images.map((image, index) => ({
      originalUrl: URL.createObjectURL(image),
      processedUrl: '',
      status: 'pending'
    }));
    setResults(initialResults);

    // 逐个处理图片
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      
      // 更新状态为处理中
      setResults(prev => {
        const newResults = [...prev];
        newResults[i] = { ...newResults[i], status: 'processing' };
        return newResults;
      });

      try {
        const formData = new FormData();
        formData.append('image', image);

        const response = await fetch('/api/remove-bg', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('处理失败');
        }

        const data = await response.json();

        // 更新状态为完成
        setResults(prev => {
          const newResults = [...prev];
          newResults[i] = {
            ...newResults[i],
            processedUrl: `data:image/png;base64,${data.data.result_b64img}`,
            status: 'completed'
          };
          return newResults;
        });

      } catch (error) {
        // 更新状态为错误
        setResults(prev => {
          const newResults = [...prev];
          newResults[i] = {
            ...newResults[i],
            status: 'error',
            error: '处理失败'
          };
          return newResults;
        });
      }

      // 更新进度
      setProgress(((i + 1) / images.length) * 100);
    }

    setIsProcessing(false);
  };

  const handleDownload = (index: number) => {
    const result = results[index];
    if (result.status !== 'completed') return;

    const link = document.createElement('a');
    link.href = result.processedUrl;
    link.download = `background-removed-${index + 1}.png`;
    link.click();
  };

  const handleClear = () => {
    setImages([]);
    setResults([]);
    setIsProcessing(false);
    setProgress(0);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-blue-500" />
          背景移除专家
          <Sparkles className="w-8 h-8 text-blue-500" />
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          AI 驱动的图片背景移除工具，让您的图片处理变得简单高效
        </p>
        <div className="flex justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            快速处理
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            高质量输出
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            批量支持
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>上传图片</CardTitle>
          <CardDescription>
            支持 JPG, PNG, WebP 格式，最多可同时处理 5 张图片
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload
            images={images}
            onImagesChange={setImages}
            disabled={isProcessing}
          />
        </CardContent>
      </Card>

      {/* Processing Controls */}
      {images.length > 0 && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  已选择 {images.length} 张图片
                </p>
                {isProcessing && (
                  <p className="text-xs text-gray-500 mt-1">
                    正在处理中... {progress.toFixed(0)}%
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {isProcessing ? '处理中...' : '开始处理'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClear}
                  disabled={isProcessing}
                >
                  清空
                </Button>
              </div>
            </div>
            
            {isProcessing && (
              <Progress value={progress} className="w-full" />
            )}
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>处理结果</CardTitle>
            <CardDescription>
              查看和处理您的图片
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageGrid
              images={images}
              results={results}
              onDownload={handleDownload}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}