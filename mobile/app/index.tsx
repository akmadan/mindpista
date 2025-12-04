import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, BorderRadius, Typography, CommonStyles } from '@/constants';

export default function AuthOnboardingScreen() {
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        // TODO: Implement Google Sign-In
        console.log('Google Sign-In pressed');
        router.push('/(tabs)/home');
    };

    const handleAppleSignIn = async () => {
        // TODO: Implement Apple Sign-In
        console.log('Apple Sign-In pressed');
        router.push('/(tabs)/home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome to MindPista</Text>
                <Text style={styles.subtitle}>
                    Your journey to better mental wellness starts here
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.googleButton]}
                    onPress={handleGoogleSignIn}
                >
                    <View style={styles.buttonContent}>
                        <Text style={styles.googleIcon}>G</Text>
                        <Text style={styles.googleButtonText}>Continue with Google</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.appleButton]}
                    onPress={handleAppleSignIn}
                >
                    <View style={styles.buttonContent}>
                        <Text style={styles.appleIcon}></Text>
                        <Text style={styles.appleButtonText}>Continue with Apple</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.termsText}>
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        justifyContent: 'space-between',
        padding: Spacing.lg,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: Typography.fontSize['4xl'],
        fontFamily: Typography.fontFamily.bold,
        color: Colors.primary,
        marginBottom: Spacing.base,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: Typography.fontSize.lg,
        fontFamily: Typography.fontFamily.regular,
        color: Colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: Spacing.lg,
    },
    buttonContainer: {
        paddingBottom: Spacing['3xl'],
        gap: Spacing.md,
    },
    button: {
        ...CommonStyles.button,
    },
    buttonContent: {
        ...CommonStyles.row,
        gap: Spacing.md,
    },
    googleButton: {
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.googleBorder,
    },
    googleButtonText: {
        fontSize: Typography.fontSize.base,
        fontFamily: Typography.fontFamily.semiBold,
        color: Colors.googleText,
    },
    googleIcon: {
        fontSize: Typography.fontSize.xl,
        fontFamily: Typography.fontFamily.bold,
        color: Colors.google,
    },
    appleButton: {
        backgroundColor: Colors.apple,
    },
    appleButtonText: {
        fontSize: Typography.fontSize.base,
        fontFamily: Typography.fontFamily.semiBold,
        color: Colors.textLight,
    },
    appleIcon: {
        fontSize: Typography.fontSize.xl,
        fontFamily: Typography.fontFamily.regular,
        color: Colors.textLight,
    },
    termsText: {
        fontSize: Typography.fontSize.xs,
        fontFamily: Typography.fontFamily.regular,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: Spacing.base,
        paddingHorizontal: Spacing.lg,
    },
});
