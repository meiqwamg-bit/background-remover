import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '背景移除专家 - AI-powered Background Removal',
  description: '快速、高质量地移除图片背景，支持批量处理。让您的图片处理变得简单高效。',
  keywords: 'background removal, AI, image processing, remove.bg, photo editing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </main>
      </body>
    </html>
  )
}