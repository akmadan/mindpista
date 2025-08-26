import 'package:flutter/material.dart';

/// App Colors - Design tokens for consistent color usage across the app
/// Now theme-aware with methods that accept BuildContext
class AppColors {
  // Private constructor to prevent instantiation
  AppColors._();

  // Primary Colors
  static const Color primary = Color(0xFF2196F3);
  static const Color primaryLight = Color(0xFF64B5F6);
  static const Color primaryDark = Color(0xFF1976D2);

  // Secondary Colors
  static const Color secondary = Color(0xFFFF9800);
  static const Color secondaryLight = Color(0xFFFFB74D);
  static const Color secondaryDark = Color(0xFFF57C00);

  // Neutral Colors
  static const Color white = Color(0xFFFFFFFF);
  static const Color black = Color(0xFF000000);
  static const Color transparent = Color(0x00000000);

  // Gray Scale
  static const Color gray50 = Color(0xFFFAFAFA);
  static const Color gray100 = Color(0xFFF5F5F5);
  static const Color gray200 = Color(0xFFEEEEEE);
  static const Color gray300 = Color(0xFFE0E0E0);
  static const Color gray400 = Color(0xFFBDBDBD);
  static const Color gray500 = Color(0xFF9E9E9E);
  static const Color gray600 = Color(0xFF757575);
  static const Color gray700 = Color(0xFF616161);
  static const Color gray800 = Color(0xFF424242);
  static const Color gray900 = Color(0xFF212121);

  // Semantic Colors
  static const Color success = Color(0xFF4CAF50);
  static const Color warning = Color(0xFFFF9800);
  static const Color error = Color(0xFFF44336);
  static const Color info = Color(0xFF2196F3);

  // Theme-aware color getters
  static Color getBackground(BuildContext context) {
    return Theme.of(context).colorScheme.background;
  }

  static Color getSurface(BuildContext context) {
    return Theme.of(context).colorScheme.surface;
  }

  static Color getSurfaceVariant(BuildContext context) {
    return Theme.of(context).colorScheme.surfaceVariant;
  }

  static Color getTextPrimary(BuildContext context) {
    return Theme.of(context).colorScheme.onBackground;
  }

  static Color getTextSecondary(BuildContext context) {
    return Theme.of(context).colorScheme.onSurfaceVariant;
  }

  static Color getTextDisabled(BuildContext context) {
    return Theme.of(context).colorScheme.onSurface.withOpacity(0.38);
  }

  static Color getBorder(BuildContext context) {
    return Theme.of(context).colorScheme.outline;
  }

  static Color getBorderLight(BuildContext context) {
    return Theme.of(context).colorScheme.outline.withOpacity(0.5);
  }

  // Legacy static colors for backward compatibility
  // These are now deprecated in favor of theme-aware methods
  @Deprecated('Use getBackground(context) instead')
  static const Color background = Color(0xFFFAFAFA);
  
  @Deprecated('Use getSurface(context) instead')
  static const Color surface = Color(0xFFFFFFFF);
  
  @Deprecated('Use getSurfaceVariant(context) instead')
  static const Color surfaceVariant = Color(0xFFF5F5F5);

  @Deprecated('Use getTextPrimary(context) instead')
  static const Color textPrimary = Color(0xFF212121);
  
  @Deprecated('Use getTextSecondary(context) instead')
  static const Color textSecondary = Color(0xFF757575);
  
  @Deprecated('Use getTextDisabled(context) instead')
  static const Color textDisabled = Color(0xFFBDBDBD);
  
  @Deprecated('Use getTextInverse(context) instead')
  static const Color textInverse = Color(0xFFFFFFFF);

  @Deprecated('Use getBorder(context) instead')
  static const Color border = Color(0xFFE0E0E0);
  
  @Deprecated('Use getBorderLight(context) instead')
  static const Color borderLight = Color(0xFFF5F5F5);
  
  @Deprecated('Use getBorderDark(context) instead')
  static const Color borderDark = Color(0xFFBDBDBD);

  // Shadow Colors
  static const Color shadow = Color(0x1A000000);
  static const Color shadowLight = Color(0x0A000000);
  static const Color shadowDark = Color(0x33000000);
} 