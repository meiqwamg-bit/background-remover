import { NextRequest, NextResponse } from 'next/server';
import { REMOVE_BG_API_KEY, API_ENDPOINTS } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json(
        { error: '没有上传图片' },
        { status: 400 }
      );
    }

    // 验证文件大小
    if (image.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: '文件大小不能超过10MB' },
        { status: 400 }
      );
    }

    // 验证文件格式
    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!supportedTypes.includes(image.type)) {
      return NextResponse.json(
        { error: '不支持的文件格式' },
        { status: 400 }
      );
    }

    // 调用Remove.bg API
    const response = await fetch(API_ENDPOINTS.removeBg, {
      method: 'POST',
      headers: {
        'X-API-Key': REMOVE_BG_API_KEY,
        'Accept': 'application/json',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.errors?.[0]?.message || 'API处理失败' },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.success || !data.data?.result_b64img) {
      return NextResponse.json(
        { error: '图片处理失败' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        result_b64img: data.data.result_b64img,
        elapsed_seconds: data.data.elapsed_seconds,
      }
    });

  } catch (error) {
    console.error('Background removal error:', error);
    return NextResponse.json(
      { error: '网络连接失败' },
      { status: 500 }
    );
  }
}