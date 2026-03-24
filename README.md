# 背景移除专家 - Background Remover

AI 驱动的图片背景移除工具，让您的图片处理变得简单高效。

## 功能特性

- ✅ **快速处理**: 30秒内完成图片背景移除
- ✅ **批量支持**: 同时处理多张图片
- ✅ **高质量输出**: 保持原图质量，透明背景
- ✅ **简单易用**: 拖拽上传，一键处理
- ✅ **多格式支持**: JPG, PNG, WebP

## 技术栈

- **框架**: Next.js 15 + TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **API**: Remove.bg AI API
- **部署**: Cloudflare Pages

## 环境变量

创建 `.env.local` 文件并添加：

```bash
REMOVE_BG_API_KEY=your_remove_bg_api_key_here
```

## 开发

启动开发服务器：

```bash
npm run dev
```

构建生产版本：

```bash
npm run build
npm start
```

## 使用说明

1. 打开应用主页
2. 点击"开始使用"进入上传页面
3. 拖拽或点击选择图片
4. 点击"开始处理"等待结果
5. 查看处理结果并下载

## 许可证

MIT License