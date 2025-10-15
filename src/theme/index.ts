import type { Theme } from './types';

export const theme: Theme = {
  colors: {
    bg: '#ffffff',
    text: '#0f172a', // slate-900
    muted: '#475569', // slate-600
    primary: '#2563eb', // blue-600
    border: '#e2e8f0', // slate-200
  },
  spacing: (x: number) => x * 4, // 4pt scale
  radius: { sm: 8, md: 12, lg: 20 },
  font: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semi: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },
};
