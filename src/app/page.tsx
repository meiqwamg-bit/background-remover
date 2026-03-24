import Link from 'next/link'
import { Sparkles, Zap, Upload } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-4">
          <Sparkles className="w-10 h-10 text-blue-500" />
          背景移除专家
          <Sparkles className="w-10 h-10 text-blue-500" />
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI 驱动的图片背景移除工具，让您的图片处理变得简单高效
        </p>
        
        <Link href="/upload">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium flex items-center gap-2 transition-colors">
            <Upload className="w-5 h-5" />
            开始使用
          </button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-3">快速处理</h3>
          <p className="text-gray-600">采用先进的 AI 算法，30秒内完成图片背景移除</p>
        </div>
        
        <div className="text-center p-6">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-3">批量支持</h3>
          <p className="text-gray-600">同时处理多张图片，提升工作效率</p>
        </div>
        
        <div className="text-center p-6">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold mb-3">高质量输出</h3>
          <p className="text-gray-600">保持原图质量，透明背景，适用于各种场景</p>
        </div>
      </div>

      {/* Supported Formats */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">支持的格式</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-4 mb-2">
              <span className="text-2xl">📸</span>
            </div>
            <p className="font-medium">JPG</p>
            <p className="text-sm text-gray-500">常见格式</p>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-4 mb-2">
              <span className="text-2xl">🖼️</span>
            </div>
            <p className="font-medium">PNG</p>
            <p className="text-sm text-gray-500">支持透明背景</p>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-4 mb-2">
              <span className="text-2xl">🌐</span>
            </div>
            <p className="font-medium">WebP</p>
            <p className="text-sm text-gray-500">现代格式</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <Link href="/upload">
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all">
            立即体验
          </button>
        </Link>
        <p className="text-gray-500 mt-4">无需注册，免费使用</p>
      </div>
    </div>
  )
}