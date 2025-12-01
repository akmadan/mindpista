import { create } from 'zustand';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';

interface AuthState {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),

  signInWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const signInResult = await GoogleSignin.signIn();
      let idToken = signInResult.data?.idToken;
      if (!idToken) {
          // If no idToken, try to get tokens
           const tokens = await GoogleSignin.getTokens();
           idToken = tokens.idToken;
      }

      if (!idToken) {
        throw new Error('No ID token found');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      set({ error: error.message || 'Failed to sign in with Google' });
    } finally {
      set({ isLoading: false });
    }
  },

  signInWithApple: async () => {
    set({ isLoading: true, error: null });
    try {
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const { identityToken } = appleCredential;
      if (!identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }

      const googleCredential = auth.AppleAuthProvider.credential(identityToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      console.error('Apple Sign-In Error:', error);
      if (error.code === 'ERR_CANCELED') {
          // User canceled, do nothing
      } else {
          set({ error: error.message || 'Failed to sign in with Apple' });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await auth().signOut();
      try {
        await GoogleSignin.signOut();
      } catch (e) {
        // Ignore if not signed in with Google
      }
      set({ user: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

// Initialize Google Sign-In
GoogleSignin.configure({
  webClientId: '1059378956158-r1ebu6fq5nubstjfd13q6hu9sjvomcot.apps.googleusercontent.com',
});

// Listen to auth state changes
auth().onAuthStateChanged((user) => {
  useAuthStore.getState().setUser(user);
});
