/**
 * User Service
 * Handles all user-related database operations with Supabase
 */

import { supabase } from './supabase';
import { User, CreateProfileData } from '@/src/types/user';

/**
 * Check if a user exists in the database by email
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error) {
            // If error is "no rows returned", user doesn't exist
            if (error.code === 'PGRST116') {
                return null;
            }
            console.error('Error fetching user:', error.message);
            throw error;
        }

        return data as User;
    } catch (error: any) {
        console.error('Error in getUserByEmail:', error.message);
        throw error;
    }
};

/**
 * Check if a user exists in the database by Supabase auth ID
 */
export const getUserById = async (id: string): Promise<User | null> => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            console.error('Error fetching user by ID:', error.message);
            throw error;
        }

        return data as User;
    } catch (error: any) {
        console.error('Error in getUserById:', error.message);
        throw error;
    }
};

/**
 * Create a new user profile in the database
 */
export const createUserProfile = async (
    userId: string,
    profileData: CreateProfileData
): Promise<User> => {
    try {
        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    id: userId,
                    email: profileData.email,
                    firstName: profileData.firstName,
                    lastName: profileData.lastName,
                    profilePicture: profileData.profilePicture,
                    dob: profileData.dob,
                    phone: profileData.phone,
                    gender: profileData.gender,
                    created_at: new Date().toISOString(),
                    lastUsed: new Date().toISOString(),
                },
            ])
            .select()
            .single();

        if (error) {
            console.error('Error creating user profile:', error.message);
            throw error;
        }

        // Return data as-is since Supabase uses camelCase
        return data as User;
    } catch (error: any) {
        console.error('Error in createUserProfile:', error.message);
        throw error;
    }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
    userId: string,
    updates: Partial<CreateProfileData>
): Promise<User> => {
    try {
        const updateData: any = {
            lastUsed: new Date().toISOString(),
        };

        if (updates.firstName) updateData.firstName = updates.firstName;
        if (updates.lastName) updateData.lastName = updates.lastName;
        if (updates.profilePicture !== undefined) updateData.profilePicture = updates.profilePicture;
        if (updates.dob !== undefined) updateData.dob = updates.dob;
        if (updates.phone !== undefined) updateData.phone = updates.phone;
        if (updates.gender !== undefined) updateData.gender = updates.gender;

        const { data, error } = await supabase
            .from('users')
            .update(updateData)
            .eq('id', userId)
            .select()
            .single();

        if (error) {
            console.error('Error updating user profile:', error.message);
            throw error;
        }

        // Return data as-is since Supabase uses camelCase
        return data as User;
    } catch (error: any) {
        console.error('Error in updateUserProfile:', error.message);
        throw error;
    }
};

/**
 * Upload user avatar to Supabase Storage
 */
export const uploadAvatar = async (
    userId: string,
    fileUri: string
): Promise<string> => {
    try {
        // Get file extension
        const fileExt = fileUri.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        // Read file as blob
        const response = await fetch(fileUri);
        const blob = await response.blob();

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('user-avatars')
            .upload(filePath, blob, {
                contentType: `image/${fileExt}`,
                upsert: true,
            });

        if (error) {
            console.error('Error uploading avatar:', error.message);
            throw error;
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
            .from('user-avatars')
            .getPublicUrl(filePath);

        return publicUrlData.publicUrl;
    } catch (error: any) {
        console.error('Error in uploadAvatar:', error.message);
        throw error;
    }
};
