/**
 * Create Profile Route
 * Wrapper for the CreateProfile component that handles route params
 */

import { useLocalSearchParams } from 'expo-router';
import CreateProfile from './presentation/CreateProfile';

export default function CreateProfileRoute() {
    const params = useLocalSearchParams<{
        userId: string;
        email: string;
        firstName?: string;
        lastName?: string;
        photo?: string;
    }>();

    return (
        <CreateProfile
            userId={params.userId}
            email={params.email}
            initialFirstName={params.firstName}
            initialLastName={params.lastName}
            initialPhoto={params.photo}
        />
    );
}

