/**
 * useAppTheme Hook
 * Custom hook to get current theme colors and toggle function
 */

import { useThemeStore } from '@/src/store';
import { getColors } from '@/constants';

export const useAppTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const setTheme = useThemeStore((state) => state.setTheme);
  
  const colors = getColors(theme);

  return {
    theme,
    colors,
    toggleTheme,
    setTheme,
    isDark: theme === 'dark',
  };
};
