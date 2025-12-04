/**
 * useThemeStyles Hook
 * Helper to create styles that depend on the current theme
 */

import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useAppTheme } from './useAppTheme';
import { Colors as ThemeColors, ThemeColors as ThemeColorsType } from '@/constants';

type NamedStyles<T> = { [P in keyof T]: any };

export const useThemeStyles = <T extends NamedStyles<T> | NamedStyles<any>>(
  styleCreator: (colors: ThemeColorsType) => T
) => {
  const { colors } = useAppTheme();

  return useMemo(() => {
    return StyleSheet.create(styleCreator(colors));
  }, [colors, styleCreator]);
};
