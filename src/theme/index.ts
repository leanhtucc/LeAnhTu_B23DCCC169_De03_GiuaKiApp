import { StyleSheet, ViewStyle } from 'react-native';

export const Colors = {
  // Brand / Primary
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  primaryLight: '#eff6ff',
  primaryMuted: '#93c5fd',

  // Status & Priority
  danger: '#ef4444',
  dangerDark: '#dc2626',
  dangerLight: '#fef2f2',
  dangerBorder: '#fecaca',

  warning: '#f59e0b',
  warningDark: '#d97706',
  warningLight: '#fffbeb',
  warningBorder: '#fde68a',

  success: '#10b981',
  successDark: '#059669',
  successLight: '#ecfdf5',
  successBorder: '#a7f3d0',

  // Neutrals / Surfaces
  white: '#ffffff',
  background: '#f8fafc',
  surface: '#ffffff',
  surfaceSubtle: '#f1f5f9',
  surfaceActive: '#e2e8f0',

  // Text
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
  textDisabled: '#cbd5e1',
  textOnPrimary: '#ffffff',

  // Borders
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  borderDark: '#cbd5e1',

  // Categories
  categories: {
    'Học tập': {
      bg: '#f5f3ff',
      text: '#7c3aed',
      border: '#ddd6fe',
    },
    'Công việc': {
      bg: '#eff6ff',
      text: '#2563eb',
      border: '#bfdbfe',
    },
    'Sức khoẻ': {
      bg: '#ecfdf5',
      text: '#059669',
      border: '#a7f3d0',
    },
    'Cá nhân': {
      bg: '#fff7ed',
      text: '#ea580c',
      border: '#fed7aa',
    },
  },

  // Priority Colors
  priorities: {
    Cao: {
      bg: '#fef2f2',
      text: '#dc2626',
      border: '#fca5a5',
      dot: '#ef4444',
    },
    'Trung bình': {
      bg: '#fffbeb',
      text: '#d97706',
      border: '#fde68a',
      dot: '#f59e0b',
    },
    Thấp: {
      bg: '#f0fdf4',
      text: '#16a34a',
      border: '#bbf7d0',
      dot: '#22c55e',
    },
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const Radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  title: 28,
};

export const FontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const Shadow = StyleSheet.create({
  card: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  } as ViewStyle,
  floating: {
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  } as ViewStyle,
  subtle: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  } as ViewStyle,
});
