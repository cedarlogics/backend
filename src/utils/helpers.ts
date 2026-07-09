import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  }
  if (bytes >= 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
  if (bytes >= 1024) {
    return (bytes / 1024).toFixed(1) + ' KB';
  }
  return bytes + ' B';
}

export function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;

  return date.toLocaleDateString();
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
    case 'running':
    case 'connected':
    case 'success':
      return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    case 'paused':
    case 'pending':
    case 'idle':
    case 'warning':
      return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    case 'error':
    case 'stopped':
    case 'disconnected':
      return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
    case 'draft':
      return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    default:
      return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'critical':
      return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
    case 'high':
      return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    case 'medium':
      return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    case 'low':
      return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    default:
      return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
  }
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export const themeColors = {
  primary: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ff0088',
    600: '#ff1493',
    700: '#ff4fa3',
    800: '#ff69b4',
    900: '#ff85c2',
  },
  dark: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#050308',
  },
  background: {
    primary: '#050308',
    secondary: '#0a0713',
    tertiary: '#10081d',
    card: '#151021',
    elevated: '#1b1029',
  },
};
