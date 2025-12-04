/**
 * Design System - Colors
 * Centralized color palette for the MindPista app
 */

const LightColors = {
  // Primary colors
  primary: '#1D3D47',
  primaryLight: '#A1CEDC',
  primaryDark: '#0F1F24',

  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  
  // Text colors
  text: '#1D3D47',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textLight: '#FFFFFF',
  
  // UI colors
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  
  // Status colors
  success: '#4CAF50',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#007AFF',
  
  // Social/Brand colors
  google: '#4285F4',
  googleBorder: '#DADCE0',
  googleText: '#3C4043',
  apple: '#000000',
  
  // Card & Shadow
  cardBackground: '#FFFFFF',
  shadow: '#000000',
} as const;

const DarkColors = {
  // Primary colors
  primary: '#A1CEDC',
  primaryLight: '#C5E3ED',
  primaryDark: '#7AB8CC',

  // Background colors
  background: '#121212',
  backgroundSecondary: '#1E1E1E',
  
  // Text colors
  text: '#FFFFFF',
  textSecondary: '#B3B3B3',
  textTertiary: '#808080',
  textLight: '#FFFFFF',
  
  // UI colors
  border: '#2C2C2C',
  borderLight: '#242424',
  
  // Status colors
  success: '#4CAF50',
  error: '#FF453A',
  warning: '#FF9F0A',
  info: '#0A84FF',
  
  // Social/Brand colors
  google: '#4285F4',
  googleBorder: '#3C3C3C',
  googleText: '#E8E8E8',
  apple: '#FFFFFF',
  
  // Card & Shadow
  cardBackground: '#1E1E1E',
  shadow: '#000000',
} as const;

export type ThemeColors = typeof LightColors;

export const getColors = (theme: 'light' | 'dark'): ThemeColors => {
  return (theme === 'light' ? LightColors : DarkColors) as ThemeColors;
};

// Default export for backward compatibility
export const Colors = LightColors;

export type ColorKey = keyof typeof LightColors;

