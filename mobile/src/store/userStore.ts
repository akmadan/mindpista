/**
 * User Store - Zustand
 * Manages user authentication state and profile data
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/src/types/user';

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setUser: (user: User | null) => void;
    updateUser: (userData: Partial<User>) => void;
    clearUser: () => void;
    setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: !!user,
                }),

            updateUser: (userData) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...userData } : null,
                })),

            clearUser: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                }),

            setLoading: (loading) =>
                set({
                    isLoading: loading,
                }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
