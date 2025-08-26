import 'package:flutter/material.dart';
import '../../project/shared_prefs/shared_prefs_manager.dart';
import 'theme_utils.dart';

/// Theme Notifier - Manages theme switching with support for both legacy and design system themes
class ThemeNotifier extends ChangeNotifier {
  late ThemeData _currentTheme;
  late String _currentThemeName;

  ThemeNotifier() {
    _currentThemeName = SharedPreferencesManager.getTheme();
    _currentTheme = ThemeUtils.getThemeByName(_currentThemeName);
  }

  ThemeData get currentTheme => _currentTheme;
  String get currentThemeName => _currentThemeName;

  /// Get all available theme names
  List<String> get availableThemes => ThemeUtils.availableThemes;

  /// Get display names for themes
  Map<String, String> get themeDisplayNames => ThemeUtils.themeDisplayNames;

  /// Set theme by name
  void setTheme(String themeName) {
    if (_currentThemeName != themeName) {
      _currentThemeName = themeName;
      _currentTheme = ThemeUtils.getThemeByName(themeName);
      SharedPreferencesManager.setTheme(themeName);
      notifyListeners();
    }
  }

  /// Toggle between light and dark themes (legacy behavior)
  void toggleTheme() {
    if (_currentThemeName == 'light' || _currentThemeName == 'design_light') {
      setTheme('dark');
    } else if (_currentThemeName == 'dark' || _currentThemeName == 'design_dark') {
      setTheme('light');
    } else {
      // For custom theme, default to light
      setTheme('light');
    }
  }

  /// Toggle between legacy and design system themes
  void toggleThemeSystem() {
    if (ThemeUtils.isDesignSystemTheme(_currentThemeName)) {
      // Switch to legacy theme
      if (_currentThemeName == 'design_light') {
        setTheme('light');
      } else if (_currentThemeName == 'design_dark') {
        setTheme('dark');
      }
    } else {
      // Switch to design system theme
      if (_currentThemeName == 'light') {
        setTheme('design_light');
      } else if (_currentThemeName == 'dark') {
        setTheme('design_dark');
      } else {
        setTheme('design_light');
      }
    }
  }

  /// Check if current theme is a design system theme
  bool get isDesignSystemTheme => ThemeUtils.isDesignSystemTheme(_currentThemeName);

  /// Check if current theme is dark
  bool get isDarkTheme => _currentThemeName.contains('dark');

  /// Get next theme in the cycle
  void nextTheme() {
    final themes = availableThemes;
    final currentIndex = themes.indexOf(_currentThemeName);
    final nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }

  /// Get previous theme in the cycle
  void previousTheme() {
    final themes = availableThemes;
    final currentIndex = themes.indexOf(_currentThemeName);
    final previousIndex = (currentIndex - 1 + themes.length) % themes.length;
    setTheme(themes[previousIndex]);
  }
}
