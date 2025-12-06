import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Colors, Spacing, CommonStyles } from '@/constants';

export default function HomeScreen() {
    return (
        <ScrollView style={CommonStyles.container}>
            <View style={CommonStyles.header}>
                <Text style={CommonStyles.headerTitle}>Hello! 👋</Text>
                <Text style={CommonStyles.headerSubtitle}>Welcome to MindPista</Text>
            </View>

            <View style={styles.content}>
                <View style={CommonStyles.card}>
                    <Text style={CommonStyles.cardTitle}>Your Wellness Journey</Text>
                    <Text style={CommonStyles.cardText}>
                        Track your mental wellness and mindfulness practice
                    </Text>
                </View>

                <View style={CommonStyles.card}>
                    <Text style={CommonStyles.cardTitle}>Quick Stats</Text>
                    <Text style={CommonStyles.cardText}>
                        Sessions completed: 0
                    </Text>
                    <Text style={CommonStyles.cardText}>
                        Current streak: 0 days
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: Spacing.lg,
        gap: Spacing.base,
    },
});
