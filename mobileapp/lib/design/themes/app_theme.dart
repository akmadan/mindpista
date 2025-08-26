import 'package:flutter/material.dart';
import '../tokens/colors/app_colors.dart';
import '../tokens/typography/app_typography.dart';
import '../tokens/spacing/app_spacing.dart';
import '../tokens/dimensions/app_dimensions.dart';

/// App Theme - Design system theme configuration
class AppTheme {
  /// Get light theme from design system
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: _lightColorScheme,
      textTheme: _textTheme,
      appBarTheme: _appBarTheme,
      elevatedButtonTheme: _elevatedButtonTheme,
      outlinedButtonTheme: _outlinedButtonTheme,
      textButtonTheme: _textButtonTheme,
      inputDecorationTheme: _inputDecorationTheme,
      cardTheme: _cardTheme,
      dividerTheme: _dividerTheme,
      iconTheme: _iconTheme,
      scaffoldBackgroundColor: AppColors.background,
    );
  }

  /// Get dark theme from design system
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: _darkColorScheme,
      textTheme: _textTheme,
      appBarTheme: _appBarTheme,
      elevatedButtonTheme: _elevatedButtonTheme,
      outlinedButtonTheme: _outlinedButtonTheme,
      textButtonTheme: _textButtonTheme,
      inputDecorationTheme: _inputDecorationTheme,
      cardTheme: _cardTheme,
      dividerTheme: _dividerTheme,
      iconTheme: _iconTheme,
      scaffoldBackgroundColor: AppColors.gray900,
    );
  }

  /// Get custom theme from design system
  static ThemeData get customTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: _customColorScheme,
      textTheme: _customTextTheme,
      appBarTheme: _customAppBarTheme,
      elevatedButtonTheme: _customElevatedButtonTheme,
      outlinedButtonTheme: _customOutlinedButtonTheme,
      textButtonTheme: _customTextButtonTheme,
      inputDecorationTheme: _customInputDecorationTheme,
      cardTheme: _customCardTheme,
      dividerTheme: _customDividerTheme,
      iconTheme: _customIconTheme,
      scaffoldBackgroundColor: const Color(0xFFF3E5F5), // Purple 50
    );
  }

  static ColorScheme get _lightColorScheme {
    return const ColorScheme(
      brightness: Brightness.light,
      primary: AppColors.primary,
      onPrimary: AppColors.white,
      secondary: AppColors.secondary,
      onSecondary: AppColors.white,
      error: AppColors.error,
      onError: AppColors.white,
      background: AppColors.background,
      onBackground: AppColors.textPrimary,
      surface: AppColors.surface,
      onSurface: AppColors.textPrimary,
      surfaceVariant: AppColors.surfaceVariant,
      onSurfaceVariant: AppColors.textSecondary,
    );
  }

  static ColorScheme get _darkColorScheme {
    return const ColorScheme(
      brightness: Brightness.dark,
      primary: AppColors.primaryLight,
      onPrimary: AppColors.black,
      secondary: AppColors.secondaryLight,
      onSecondary: AppColors.black,
      error: AppColors.error,
      onError: AppColors.white,
      background: AppColors.gray900,
      onBackground: AppColors.white,
      surface: AppColors.gray800,
      onSurface: AppColors.white,
      surfaceVariant: AppColors.gray700,
      onSurfaceVariant: AppColors.gray300,
    );
  }

  static ColorScheme get _customColorScheme {
    return const ColorScheme(
      brightness: Brightness.light,
      primary: Color(0xFF9C27B0), // Purple
      onPrimary: Colors.white,
      secondary: Color(0xFFFF9800), // Orange
      onSecondary: Colors.white,
      error: AppColors.error,
      onError: AppColors.white,
      background: Color(0xFFF3E5F5), // Purple 50
      onBackground: Color(0xFF4A148C), // Purple 900
      surface: Color(0xFFE1BEE7), // Purple 100
      onSurface: Color(0xFF4A148C), // Purple 900
      surfaceVariant: Color(0xFFCE93D8), // Purple 200
      onSurfaceVariant: Color(0xFF7B1FA2), // Purple 700
    );
  }

  static TextTheme get _textTheme {
    return const TextTheme(
      displayLarge: AppTypography.displayLarge,
      displayMedium: AppTypography.displayMedium,
      displaySmall: AppTypography.displaySmall,
      headlineLarge: AppTypography.headlineLarge,
      headlineMedium: AppTypography.headlineMedium,
      headlineSmall: AppTypography.headlineSmall,
      titleLarge: AppTypography.titleLarge,
      titleMedium: AppTypography.titleMedium,
      titleSmall: AppTypography.titleSmall,
      bodyLarge: AppTypography.bodyLarge,
      bodyMedium: AppTypography.bodyMedium,
      bodySmall: AppTypography.bodySmall,
      labelLarge: AppTypography.labelLarge,
      labelMedium: AppTypography.labelMedium,
      labelSmall: AppTypography.labelSmall,
    );
  }

  static TextTheme get _customTextTheme {
    return TextTheme(
      displayLarge: AppTypography.displayLarge.copyWith(
        color: const Color(0xFF4A148C), // Purple 900
      ),
      displayMedium: AppTypography.displayMedium.copyWith(
        color: const Color(0xFF4A148C),
      ),
      displaySmall: AppTypography.displaySmall.copyWith(
        color: const Color(0xFF4A148C),
      ),
      headlineLarge: AppTypography.headlineLarge.copyWith(
        color: const Color(0xFF4A148C),
      ),
      headlineMedium: AppTypography.headlineMedium.copyWith(
        color: const Color(0xFF4A148C),
      ),
      headlineSmall: AppTypography.headlineSmall.copyWith(
        color: const Color(0xFF4A148C),
      ),
      titleLarge: AppTypography.titleLarge.copyWith(
        color: const Color(0xFF4A148C),
      ),
      titleMedium: AppTypography.titleMedium.copyWith(
        color: const Color(0xFF4A148C),
      ),
      titleSmall: AppTypography.titleSmall.copyWith(
        color: const Color(0xFF4A148C),
      ),
      bodyLarge: AppTypography.bodyLarge.copyWith(
        color: const Color(0xFF4A148C),
      ),
      bodyMedium: AppTypography.bodyMedium.copyWith(
        color: const Color(0xFF4A148C),
      ),
      bodySmall: AppTypography.bodySmall.copyWith(
        color: const Color(0xFF7B1FA2), // Purple 700
      ),
      labelLarge: AppTypography.labelLarge.copyWith(
        color: const Color(0xFF4A148C),
      ),
      labelMedium: AppTypography.labelMedium.copyWith(
        color: const Color(0xFF4A148C),
      ),
      labelSmall: AppTypography.labelSmall.copyWith(
        color: const Color(0xFF7B1FA2),
      ),
    );
  }

  static AppBarTheme get _appBarTheme {
    return const AppBarTheme(
      backgroundColor: AppColors.surface,
      foregroundColor: AppColors.textPrimary,
      elevation: 0,
      centerTitle: true,
      titleTextStyle: AppTypography.titleMedium,
    );
  }

  static AppBarTheme get _customAppBarTheme {
    return const AppBarTheme(
      backgroundColor: Color(0xFF9C27B0), // Purple
      foregroundColor: Colors.white,
      elevation: 0,
      centerTitle: true,
      titleTextStyle: TextStyle(
        color: Colors.white,
        fontSize: 20,
        fontWeight: FontWeight.w500,
      ),
    );
  }

  static ElevatedButtonThemeData get _elevatedButtonTheme {
    return ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.primary,
        foregroundColor: AppColors.white,
        elevation: AppDimensions.elevationSm,
        padding: AppSpacing.buttonPadding,
        shape: RoundedRectangleBorder(
          borderRadius: AppDimensions.borderRadiusMd,
        ),
        minimumSize: Size(AppDimensions.buttonMinWidth, AppDimensions.buttonHeightMd),
      ),
    );
  }

  static ElevatedButtonThemeData get _customElevatedButtonTheme {
    return ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFFFF9800), // Orange
        foregroundColor: Colors.white,
        elevation: AppDimensions.elevationSm,
        padding: AppSpacing.buttonPadding,
        shape: RoundedRectangleBorder(
          borderRadius: AppDimensions.borderRadiusMd,
        ),
        minimumSize: Size(AppDimensions.buttonMinWidth, AppDimensions.buttonHeightMd),
      ),
    );
  }

  static OutlinedButtonThemeData get _outlinedButtonTheme {
    return OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: AppColors.primary,
        side: const BorderSide(color: AppColors.primary),
        padding: AppSpacing.buttonPadding,
        shape: RoundedRectangleBorder(
          borderRadius: AppDimensions.borderRadiusMd,
        ),
        minimumSize: Size(AppDimensions.buttonMinWidth, AppDimensions.buttonHeightMd),
      ),
    );
  }

  static OutlinedButtonThemeData get _customOutlinedButtonTheme {
    return OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: const Color(0xFF9C27B0), // Purple
        side: const BorderSide(color: Color(0xFF9C27B0)),
        padding: AppSpacing.buttonPadding,
        shape: RoundedRectangleBorder(
          borderRadius: AppDimensions.borderRadiusMd,
        ),
        minimumSize: Size(AppDimensions.buttonMinWidth, AppDimensions.buttonHeightMd),
      ),
    );
  }

  static TextButtonThemeData get _textButtonTheme {
    return TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: AppColors.primary,
        padding: AppSpacing.buttonPadding,
        shape: RoundedRectangleBorder(
          borderRadius: AppDimensions.borderRadiusMd,
        ),
        minimumSize: Size(AppDimensions.buttonMinWidth, AppDimensions.buttonHeightMd),
      ),
    );
  }

  static TextButtonThemeData get _customTextButtonTheme {
    return TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: const Color(0xFF9C27B0), // Purple
        padding: AppSpacing.buttonPadding,
        shape: RoundedRectangleBorder(
          borderRadius: AppDimensions.borderRadiusMd,
        ),
        minimumSize: Size(AppDimensions.buttonMinWidth, AppDimensions.buttonHeightMd),
      ),
    );
  }

  static InputDecorationTheme get _inputDecorationTheme {
    return InputDecorationTheme(
      filled: false,
      border: OutlineInputBorder(
        borderRadius: AppDimensions.borderRadiusMd,
        borderSide: const BorderSide(color: AppColors.border),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: AppDimensions.borderRadiusMd,
        borderSide: const BorderSide(color: AppColors.border),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: AppDimensions.borderRadiusMd,
        borderSide: const BorderSide(color: AppColors.primary, width: 2),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: AppDimensions.borderRadiusMd,
        borderSide: const BorderSide(color: AppColors.error),
      ),
      contentPadding: AppSpacing.inputPadding,
      hintStyle: AppTypography.bodyMedium.copyWith(color: AppColors.textSecondary),
    );
  }

  static InputDecorationTheme get _customInputDecorationTheme {
    return InputDecorationTheme(
      filled: false,
      border: OutlineInputBorder(
        borderRadius: AppDimensions.borderRadiusMd,
        borderSide: const BorderSide(color: Color(0xFFCE93D8)), // Purple 200
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: AppDimensions.borderRadiusMd,
        borderSide: const BorderSide(color: Color(0xFFCE93D8)),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: AppDimensions.borderRadiusMd,
        borderSide: const BorderSide(color: Color(0xFF9C27B0), width: 2), // Purple
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: AppDimensions.borderRadiusMd,
        borderSide: const BorderSide(color: AppColors.error),
      ),
      contentPadding: AppSpacing.inputPadding,
      hintStyle: AppTypography.bodyMedium.copyWith(color: const Color(0xFF7B1FA2)), // Purple 700
    );
  }

  static CardTheme get _cardTheme {
    return CardTheme(
      color: AppColors.surface,
      elevation: AppDimensions.elevationSm,
      shape: RoundedRectangleBorder(
        borderRadius: AppDimensions.borderRadiusMd,
      ),
      margin: AppSpacing.cardMargin,
    );
  }

  static CardTheme get _customCardTheme {
    return CardTheme(
      color: const Color(0xFFE1BEE7), // Purple 100
      elevation: AppDimensions.elevationSm,
      shape: RoundedRectangleBorder(
        borderRadius: AppDimensions.borderRadiusMd,
      ),
      margin: AppSpacing.cardMargin,
    );
  }

  static DividerThemeData get _dividerTheme {
    return const DividerThemeData(
      color: AppColors.borderLight,
      thickness: 1,
      space: AppSpacing.spacing16,
    );
  }

  static DividerThemeData get _customDividerTheme {
    return const DividerThemeData(
      color: Color(0xFFCE93D8), // Purple 200
      thickness: 1,
      space: AppSpacing.spacing16,
    );
  }

  static IconThemeData get _iconTheme {
    return const IconThemeData(
      color: AppColors.textPrimary,
      size: AppDimensions.iconSizeMd,
    );
  }

  static IconThemeData get _customIconTheme {
    return const IconThemeData(
      color: Color(0xFF4A148C), // Purple 900
      size: AppDimensions.iconSizeMd,
    );
  }
} 