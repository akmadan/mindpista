/**
 * Design System - Typography
 * Centralized typography styles for the MindPista app
 */

export const Typography = {
  // Font families - Delight
  fontFamily: {
    thin: 'Delight-Thin',
    extraLight: 'Delight-ExtraLight',
    light: 'Delight-Light',
    regular: 'Delight-Regular',
    medium: 'Delight-Medium',
    semiBold: 'Delight-SemiBold',
    bold: 'Delight-Bold',
    extraBold: 'Delight-ExtraBold',
    black: 'Delight-Black',
  },
  
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },
  
  // Font weights (for reference, actual fonts are loaded)
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export type FontSize = keyof typeof Typography.fontSize;
export type FontWeight = keyof typeof Typography.fontWeight;
export type FontFamily = keyof typeof Typography.fontFamily;

