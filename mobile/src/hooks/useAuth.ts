/**
 * useAuth Hook
 * Manages authentication state and provides auth-related utilities
 */

import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { getUserById } from '@/src/lib/userService';
import { useUserStore } from '@/src/store';
import { Session } from '@supabase/supabase-js';

export const useAuth = () => {
    const { user, setUser, clearUser, isAuthenticated } = useUserStore();
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session?.user) {
                // Fetch user profile from database
                getUserById(session.user.id)
                    .then((userData) => {
                        if (userData) {
                            setUser(userData);
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching user profile:', error);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            } else {
                setIsLoading(false);
            }
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);

            if (session?.user) {
                // Fetch user profile when auth state changes
                getUserById(session.user.id)
                    .then((userData) => {
                        if (userData) {
                            setUser(userData);
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching user profile on auth change:', error);
                    });
            } else {
                clearUser();
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
            clearUser();
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    return {
        user,
        session,
        isAuthenticated,
        isLoading,
        signOut,
    };
};
