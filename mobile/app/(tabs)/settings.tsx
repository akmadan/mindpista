
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Spacing, Typography, CommonStyles, Shadow, BorderRadius } from '@/constants';
import { useAppTheme, useThemeStyles } from '@/src/hooks';

export default function SettingsScreen() {
    const { theme, toggleTheme, isDark } = useAppTheme();
    const styles = useThemeStyles((colors) => ({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundSecondary,
        },
        header: {
            backgroundColor: colors.primary,
            padding: Spacing.xl,
            paddingTop: Spacing['5xl'],
            paddingBottom: Spacing['2xl'],
        },
        headerTitle: {
            fontSize: Typography.fontSize['3xl'],
            fontFamily: Typography.fontFamily.bold,
            color: colors.textLight,
            marginBottom: Spacing.sm,
        },
        headerSubtitle: {
            fontSize: Typography.fontSize.base,
            fontFamily: Typography.fontFamily.regular,
            color: colors.primaryLight,
        },
        content: {
            padding: Spacing.lg,
            gap: Spacing.lg,
        },
        section: {
            backgroundColor: colors.cardBackground,
            borderRadius: BorderRadius.lg,
            overflow: 'hidden' as const,
            ...Shadow.md,
        },
        sectionTitle: {
            fontSize: Typography.fontSize.sm,
            fontFamily: Typography.fontFamily.semiBold,
            color: colors.textSecondary,
            padding: Spacing.base,
            paddingBottom: Spacing.sm,
            textTransform: 'uppercase' as const,
            letterSpacing: 0.5,
        },
        settingItem: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            justifyContent: 'space-between' as const,
            padding: Spacing.base,
            borderTopWidth: 1,
            borderTopColor: colors.borderLight,
        },
        settingText: {
            fontSize: Typography.fontSize.base,
            fontFamily: Typography.fontFamily.regular,
            color: colors.text,
        },
        arrow: {
            fontSize: Typography.fontSize['2xl'],
            color: colors.textTertiary,
        },
        dangerText: {
            color: colors.error,
        },
    }));

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
                <Text style={styles.headerSubtitle}>Manage your preferences</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingText}>Profile</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingText}>Privacy</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingText}>Notifications</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>

                    {/* Theme Switcher */}
                    <View style={styles.settingItem}>
                        <Text style={styles.settingText}>Dark Mode</Text>
                        <Switch
                            value={isDark}
                            onValueChange={toggleTheme}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={[styles.settingText, styles.dangerText]}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

