# Remove.bg API配置
export const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY || '';

export const API_ENDPOINTS = {
  removeBg: 'https://api.remove.bg/v1.0/remove-bg',
} as const;

export const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'] as const;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_FILES = 5;

export const ERROR_MESSAGES = {
  fileTooLarge: '文件大小不能超过10MB',
  unsupportedFormat: '不支持的文件格式',
  networkError: '网络连接失败',
  apiError: 'API处理失败',
  unknownError: '未知错误'
} as const;