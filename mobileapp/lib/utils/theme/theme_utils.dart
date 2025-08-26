import 'package:flutter/material.dart';
import '../../design/themes/app_theme.dart';

/// Theme Utils - Pure bridge to design system themes
/// This file delegates ALL theme creation to the design system
class ThemeUtils {
  // All theme getters delegate to design system
  static ThemeData get darkTheme => AppTheme.darkTheme;
  static ThemeData get lightTheme => AppTheme.lightTheme;
  
  // Custom theme also delegates to design system (using a custom variant)
  static ThemeData get customTheme => AppTheme.customTheme;

  /// Get theme by name - all themes come from design system
  static ThemeData getThemeByName(String themeName) {
    switch (themeName.toLowerCase()) {
      case 'light':
        return lightTheme;
      case 'dark':
        return darkTheme;
      case 'custom':
        return customTheme;
      case 'design_light':
        return AppTheme.lightTheme;
      case 'design_dark':
        return AppTheme.darkTheme;
      default:
        return lightTheme;
    }
  }

  /// Check if theme is a design system theme
  static bool isDesignSystemTheme(String themeName) {
    return themeName.toLowerCase().startsWith('design_');
  }

  /// Get all available theme names
  static List<String> get availableThemes => [
    'light',
    'dark', 
    'custom',
    'design_light',
    'design_dark',
  ];

  /// Get display names for themes
  static Map<String, String> get themeDisplayNames => {
    'light': 'Light',
    'dark': 'Dark',
    'custom': 'Custom',
    'design_light': 'Light (Design System)',
    'design_dark': 'Dark (Design System)',
  };
}
