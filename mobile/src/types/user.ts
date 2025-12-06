/**
 * User Types
 * Type definitions for user data and profile
 * Matches Supabase users table schema
 */

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture?: string | null;
    dob?: string | null; // timestamp without timezone
    phone?: number | null; // numeric type in Supabase
    gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null;
    created_at?: string; // timestamp with timezone
    lastUsed?: string | null; // timestamp without timezone
}

export interface CreateProfileData {
    email: string;
    firstName: string;
    lastName: string;
    profilePicture?: string | null;
    dob?: string | null;
    phone?: number | null;
    gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null;
}

export interface GoogleUserInfo {
    email: string;
    name: string;
    givenName?: string;
    familyName?: string;
    photo?: string;
}
