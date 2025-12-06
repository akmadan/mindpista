import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ImageBackground,
    Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/constants';
import { configureGoogleSignIn, signInWithGoogle, getUserById } from '@/src/lib';
import { useUserStore } from '@/src/store';

const { width, height } = Dimensions.get('window');

export default function AuthOnboarding() {
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        configureGoogleSignIn();
    }, []);

    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true);
            const session = await signInWithGoogle();

            if (!session || !session.user) {
                throw new Error('No session data received');
            }

            const authUser = session.user;
            console.log('Auth user:', authUser);

            // Check if user exists in our database
            const existingUser = await getUserById(authUser.id);

            if (existingUser) {
                // User exists - update store and navigate to home
                console.log('User found in database:', existingUser);
                setUser(existingUser);
                router.replace('/(tabs)/home');
            } else {
                // User doesn't exist - navigate to create profile
                console.log('User not found in database, navigating to create profile');

                // Extract name from Google user metadata
                const userMetadata = authUser.user_metadata || {};
                const fullName = userMetadata.full_name || userMetadata.name || '';
                const firstName = userMetadata.given_name || fullName.split(' ')[0] || '';
                const lastName = userMetadata.family_name || fullName.split(' ').slice(1).join(' ') || '';
                const photo = userMetadata.avatar_url || userMetadata.picture || '';

                router.push({
                    pathname: '/auth/create-profile',
                    params: {
                        userId: authUser.id,
                        email: authUser.email || '',
                        firstName,
                        lastName,
                        photo,
                    },
                });
            }
        } catch (error: any) {
            console.error('Google Sign-In Error:', error);
            Alert.alert('Sign In Failed', error.message || 'An error occurred during sign in');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAppleSignIn = async () => {
        // TODO: Implement Apple Sign-In
        console.log('Apple Sign-In pressed');
        Alert.alert('Coming Soon', 'Apple Sign-In is not yet implemented.');
    };

    return (
        <ImageBackground
            source={require('@/assets/images/mindpista_onboarding.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            {/* Dark overlay for better text readability */}
            <View style={styles.overlay} />

            <View style={styles.container}>
                {/* Content Section */}
                <View style={styles.contentSection}>
                    <Text style={styles.title}>MindPista</Text>
                    <Text style={styles.subtitle}>Sit back, Relax & Talk</Text>
                </View>

                {/* Button Section */}
                <View style={styles.buttonSection}>
                    {/* Google Sign In Button */}
                    <TouchableOpacity
                        style={[styles.button, styles.googleButton]}
                        onPress={handleGoogleSignIn}
                        disabled={isLoading}
                        activeOpacity={0.8}
                    >
                        {isLoading ? (
                            <ActivityIndicator color={Colors.text} />
                        ) : (
                            <View style={styles.buttonContent}>
                                <Ionicons name="logo-google" size={20} color={Colors.text} />
                                <Text style={styles.googleButtonText}>Sign in with Google</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Apple Sign In Button */}
                    <TouchableOpacity
                        style={[styles.button, styles.appleButton]}
                        onPress={handleAppleSignIn}
                        disabled={isLoading}
                        activeOpacity={0.8}
                    >
                        <View style={styles.buttonContent}>
                            <Ionicons name="logo-apple" size={20} color={Colors.textLight} />
                            <Text style={styles.appleButtonText}>Sign in with Apple</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for better contrast
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.xl,
        paddingTop: height * 0.15,
        paddingBottom: Spacing['4xl'],
    },
    contentSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 80,
        fontFamily: 'InstrumentSerif-Regular', // Will need to add this font
        color: Colors.textLight,
        textAlign: 'center',
        marginBottom: Spacing.xs,
        fontStyle: 'italic',
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 24,
        fontFamily: 'AtkinsonHyperlegible-Regular', // Will need to add this font
        color: Colors.textLight,
        textAlign: 'center',
        letterSpacing: 0.3,
    },
    buttonSection: {
        gap: Spacing.base,
        paddingBottom: Spacing.xl,
    },
    button: {
        height: 56,
        borderRadius: BorderRadius.xl,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    googleButton: {
        backgroundColor: Colors.textLight,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    googleButtonText: {
        fontSize: 16,
        fontFamily: 'AtkinsonHyperlegible-Regular',
        color: Colors.text,
        fontStyle: 'italic',
    },
    appleButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.textLight,
    },
    appleButtonText: {
        fontSize: 16,
        fontFamily: 'AtkinsonHyperlegible-Regular',
        color: Colors.textLight,
        fontStyle: 'italic',
    },
});
