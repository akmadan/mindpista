/**
 * Design System - Common Styles
 * Reusable style objects for common UI patterns
 */

import { StyleSheet } from 'react-native';
import { Colors } from './Colors';
import { Typography } from './Typography';
import { Spacing, BorderRadius, Shadow } from './Spacing';

export const CommonStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  containerWithPadding: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  
  // Text styles
  heading1: {
    fontSize: Typography.fontSize['4xl'],
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text,
    marginBottom: Spacing.base,
  },
  
  heading2: {
    fontSize: Typography.fontSize['3xl'],
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  
  heading3: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  
  bodyText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.textSecondary,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.normal,
  },
  
  bodyTextLarge: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.textSecondary,
    lineHeight: Typography.fontSize.lg * Typography.lineHeight.normal,
  },
  
  caption: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.textTertiary,
  },
  
  // Card styles
  card: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadow.md,
  },
  
  cardTitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  
  cardText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  
  // Button styles
  button: {
    paddingVertical: Spacing.base,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonPrimary: {
    backgroundColor: Colors.primary,
  },
  
  buttonSecondary: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  
  buttonText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.textLight,
  },
  
  buttonTextSecondary: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text,
  },
  
  // Header styles
  header: {
    backgroundColor: Colors.primary,
    padding: Spacing.xl,
    paddingTop: Spacing['5xl'],
    paddingBottom: Spacing['2xl'],
  },
  
  headerTitle: {
    fontSize: Typography.fontSize['3xl'],
    fontFamily: Typography.fontFamily.bold,
    color: Colors.textLight,
    marginBottom: Spacing.sm,
  },
  
  headerSubtitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.primaryLight,
  },
  
  // Layout helpers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Spacing helpers
  mb1: { marginBottom: Spacing.xs },
  mb2: { marginBottom: Spacing.sm },
  mb3: { marginBottom: Spacing.md },
  mb4: { marginBottom: Spacing.base },
  mb5: { marginBottom: Spacing.lg },
  
  mt1: { marginTop: Spacing.xs },
  mt2: { marginTop: Spacing.sm },
  mt3: { marginTop: Spacing.md },
  mt4: { marginTop: Spacing.base },
  mt5: { marginTop: Spacing.lg },
  
  gap1: { gap: Spacing.xs },
  gap2: { gap: Spacing.sm },
  gap3: { gap: Spacing.md },
  gap4: { gap: Spacing.base },
  gap5: { gap: Spacing.lg },
});
