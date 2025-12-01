import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import * as AppleAuthentication from 'expo-apple-authentication';

export default function AuthLandingPresenter() {
    const { signInWithGoogle, signInWithApple, isLoading, error, user } = useAuthStore();

    if (user) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Welcome, {user.email}</Text>
                <TouchableOpacity style={styles.button} onPress={() => useAuthStore.getState().signOut()}>
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>MindPista</Text>
            <Text style={styles.subtitle}>Find your inner peace</Text>

            {error && <Text style={styles.error}>{error}</Text>}

            {isLoading ? (
                <ActivityIndicator size="large" color="#ff9a3b" />
            ) : (
                <View style={styles.buttonContainer}>
                    {/* Google Sign In */}
                    <TouchableOpacity
                        style={[styles.button, styles.googleButton]}
                        onPress={signInWithGoogle}
                    >
                        <Text style={[styles.buttonText, styles.googleButtonText]}>Sign in with Google</Text>
                    </TouchableOpacity>

                    {/* Apple Sign In */}
                    {Platform.OS === 'ios' && (
                        <AppleAuthentication.AppleAuthenticationButton
                            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                            cornerRadius={5}
                            style={styles.appleButton}
                            onPress={async () => {
                                try {
                                    await signInWithApple();
                                } catch (e) {
                                    console.error(e);
                                }
                            }}
                        />
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 40,
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 300,
        gap: 16,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    googleButton: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    googleButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    appleButton: {
        width: '100%',
        height: 48,
    },
    error: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
});
