/// Theme enum representing all available themes
enum AppThemeType {
  light('light', 'Light'),
  dark('dark', 'Dark'),
  custom('custom', 'Custom'),
  designLight('design_light', 'Light (Design System)'),
  designDark('design_dark', 'Dark (Design System)');

  const AppThemeType(this.value, this.displayName);

  final String value;
  final String displayName;

  /// Get theme type from string value
  static AppThemeType fromString(String value) {
    return AppThemeType.values.firstWhere(
      (theme) => theme.value == value,
      orElse: () => AppThemeType.light,
    );
  }

  /// Get all available theme types
  static List<AppThemeType> get availableThemes => AppThemeType.values;

  /// Check if this is a dark theme
  bool get isDark => this == AppThemeType.dark || this == AppThemeType.designDark;

  /// Check if this is a design system theme
  bool get isDesignSystem => value.startsWith('design_');
} 