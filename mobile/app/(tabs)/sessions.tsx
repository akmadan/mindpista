import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, CommonStyles, Shadow, BorderRadius } from '@/constants';

export default function SessionsScreen() {
    return (
        <ScrollView style={CommonStyles.container}>
            <View style={CommonStyles.header}>
                <Text style={CommonStyles.headerTitle}>Sessions</Text>
                <Text style={CommonStyles.headerSubtitle}>Your mindfulness sessions</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyIcon}>📅</Text>
                    <Text style={styles.emptyTitle}>No sessions yet</Text>
                    <Text style={styles.emptyText}>
                        Start your first mindfulness session to begin your journey
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: Spacing.lg,
    },
    emptyState: {
        backgroundColor: Colors.cardBackground,
        padding: Spacing['3xl'],
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        ...Shadow.md,
    },
    emptyIcon: {
        fontSize: Typography.fontSize['5xl'],
        marginBottom: Spacing.base,
    },
    emptyTitle: {
        fontSize: Typography.fontSize.xl,
        fontFamily: Typography.fontFamily.bold,
        color: Colors.text,
        marginBottom: Spacing.sm,
    },
    emptyText: {
        fontSize: Typography.fontSize.base,
        fontFamily: Typography.fontFamily.regular,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
});
