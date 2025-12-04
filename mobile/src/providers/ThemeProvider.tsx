/**
 * Theme Provider Component
 * Provides theme context to the entire app
 */

import React, { ReactNode } from 'react';
import { useThemeStore } from '@/src/store';

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Theme is managed by Zustand store
    // This component can be extended later if needed for additional theme logic
    return <>{children}</>;
};

// Hook to use theme in components
export const useTheme = () => {
    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const setTheme = useThemeStore((state) => state.setTheme);

    return { theme, toggleTheme, setTheme };
};
