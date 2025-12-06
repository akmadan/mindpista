/**
 * CreateProfile Screen
 * Allows new users to complete their profile after Google Sign-In
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
    Image,
    Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants';
import { createUserProfile, uploadAvatar } from '@/src/lib';
import { useUserStore } from '@/src/store';
import { CreateProfileData } from '@/src/types/user';

interface CreateProfileProps {
    userId: string;
    email: string;
    initialFirstName?: string;
    initialLastName?: string;
    initialPhoto?: string;
}

export default function CreateProfile({
    userId,
    email,
    initialFirstName = '',
    initialLastName = '',
    initialPhoto,
}: CreateProfileProps) {
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<CreateProfileData>({
        email,
        firstName: initialFirstName,
        lastName: initialLastName,
        profilePicture: initialPhoto || null,
        dob: null,
        phone: null,
        gender: null,
    });

    const [localImageUri, setLocalImageUri] = useState<string | null>(
        initialPhoto || null
    );

    const genderOptions = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
        { label: 'Prefer not to say', value: 'prefer_not_to_say' },
    ];

    const pickImage = async () => {
        try {
            // Request permission
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'Please grant permission to access your photos to upload a profile picture.'
                );
                return;
            }

            // Launch image picker
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                setLocalImageUri(result.assets[0].uri);
            }
        } catch (error: any) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    const handleSubmit = async () => {
        // Validation
        if (!formData.firstName.trim()) {
            Alert.alert('Validation Error', 'Please enter your first name.');
            return;
        }

        if (!formData.lastName.trim()) {
            Alert.alert('Validation Error', 'Please enter your last name.');
            return;
        }

        try {
            setIsLoading(true);

            // Upload avatar if a new image was selected
            let avatarUrl = formData.profilePicture;
            if (localImageUri && localImageUri !== initialPhoto) {
                avatarUrl = await uploadAvatar(userId, localImageUri);
            }

            // Create user profile
            const profileData: CreateProfileData = {
                ...formData,
                profilePicture: avatarUrl,
            };

            const user = await createUserProfile(userId, profileData);

            // Update Zustand store
            setUser(user);

            // Navigate to home
            router.replace('/(tabs)/home');
        } catch (error: any) {
            console.error('Error creating profile:', error);
            Alert.alert(
                'Error',
                error.message || 'Failed to create profile. Please try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.header}>
                <Text style={styles.title}>Complete Your Profile</Text>
                <Text style={styles.subtitle}>
                    Let's get to know you better
                </Text>
            </View>

            {/* Avatar Upload */}
            <View style={styles.avatarSection}>
                <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={pickImage}
                    disabled={isLoading}
                >
                    {localImageUri ? (
                        <Image source={{ uri: localImageUri }} style={styles.avatar} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Ionicons name="person" size={50} color={Colors.textSecondary} />
                        </View>
                    )}
                    <View style={styles.avatarEditBadge}>
                        <Ionicons name="camera" size={16} color={Colors.textLight} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.avatarLabel}>Profile Picture (Optional)</Text>
            </View>

            {/* Form Fields */}
            <View style={styles.form}>
                {/* First Name */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        First Name <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={formData.firstName}
                        onChangeText={(text) =>
                            setFormData({ ...formData, firstName: text })
                        }
                        placeholder="Enter your first name"
                        placeholderTextColor={Colors.textTertiary}
                        editable={!isLoading}
                    />
                </View>

                {/* Last Name */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        Last Name <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={formData.lastName}
                        onChangeText={(text) =>
                            setFormData({ ...formData, lastName: text })
                        }
                        placeholder="Enter your last name"
                        placeholderTextColor={Colors.textTertiary}
                        editable={!isLoading}
                    />
                </View>

                {/* Email (Read-only) */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[styles.input, styles.inputDisabled]}
                        value={formData.email}
                        editable={false}
                        placeholderTextColor={Colors.textTertiary}
                    />
                </View>

                {/* Date of Birth */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Date of Birth (Optional)</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.dob || ''}
                        onChangeText={(text) => setFormData({ ...formData, dob: text })}
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor={Colors.textTertiary}
                        editable={!isLoading}
                    />
                </View>

                {/* Phone */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Phone Number (Optional)</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.phone?.toString() || ''}
                        onChangeText={(text) => {
                            const phoneNumber = text ? parseInt(text, 10) : null;
                            setFormData({ ...formData, phone: phoneNumber });
                        }}
                        placeholder="Enter your phone number"
                        placeholderTextColor={Colors.textTertiary}
                        keyboardType="phone-pad"
                        editable={!isLoading}
                    />
                </View>

                {/* Gender */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Gender (Optional)</Text>
                    <View style={styles.genderContainer}>
                        {genderOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={[
                                    styles.genderOption,
                                    formData.gender === option.value && styles.genderOptionSelected,
                                ]}
                                onPress={() =>
                                    setFormData({
                                        ...formData,
                                        gender: option.value as any,
                                    })
                                }
                                disabled={isLoading}
                            >
                                <Text
                                    style={[
                                        styles.genderOptionText,
                                        formData.gender === option.value &&
                                        styles.genderOptionTextSelected,
                                    ]}
                                >
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
                style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color={Colors.textLight} />
                ) : (
                    <Text style={styles.submitButtonText}>Complete Profile</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    contentContainer: {
        padding: Spacing.xl,
        paddingBottom: Spacing['4xl'],
    },
    header: {
        marginBottom: Spacing['2xl'],
    },
    title: {
        fontSize: Typography.fontSize['3xl'],
        fontFamily: Typography.fontFamily.bold,
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        fontSize: Typography.fontSize.base,
        fontFamily: Typography.fontFamily.regular,
        color: Colors.textSecondary,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: Spacing['2xl'],
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: Spacing.md,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    avatarPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.backgroundSecondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.border,
        borderStyle: 'dashed',
    },
    avatarEditBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.background,
    },
    avatarLabel: {
        fontSize: Typography.fontSize.sm,
        fontFamily: Typography.fontFamily.regular,
        color: Colors.textSecondary,
    },
    form: {
        gap: Spacing.lg,
    },
    inputGroup: {
        gap: Spacing.xs,
    },
    label: {
        fontSize: Typography.fontSize.sm,
        fontFamily: Typography.fontFamily.semiBold,
        color: Colors.text,
    },
    required: {
        color: Colors.error,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.base,
        fontSize: Typography.fontSize.base,
        fontFamily: Typography.fontFamily.regular,
        color: Colors.text,
        backgroundColor: Colors.background,
    },
    inputDisabled: {
        backgroundColor: Colors.backgroundSecondary,
        color: Colors.textSecondary,
    },
    genderContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    genderOption: {
        paddingHorizontal: Spacing.base,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.background,
    },
    genderOptionSelected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    genderOptionText: {
        fontSize: Typography.fontSize.sm,
        fontFamily: Typography.fontFamily.medium,
        color: Colors.text,
    },
    genderOptionTextSelected: {
        color: Colors.textLight,
    },
    submitButton: {
        height: 56,
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.xl,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Spacing['2xl'],
    },
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitButtonText: {
        fontSize: Typography.fontSize.base,
        fontFamily: Typography.fontFamily.semiBold,
        color: Colors.textLight,
    },
});
