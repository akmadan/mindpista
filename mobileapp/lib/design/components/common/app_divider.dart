import 'package:flutter/material.dart';
import '../../tokens/colors/app_colors.dart';
import '../../tokens/spacing/app_spacing.dart';
import '../../tokens/dimensions/app_dimensions.dart';

/// App Divider - A customizable divider component
class AppDivider extends StatelessWidget {
  final double? height;
  final double? thickness;
  final EdgeInsetsGeometry? margin;
  final Color? color;
  final AppDividerVariant variant;

  const AppDivider({
    super.key,
    this.height,
    this.thickness,
    this.margin,
    this.color,
    this.variant = AppDividerVariant.standard,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: margin ?? _getDefaultMargin(),
      child: Divider(
        height: height ?? _getDefaultHeight(),
        thickness: thickness ?? _getDefaultThickness(),
        color: color ?? _getDefaultColor(context),
      ),
    );
  }

  double _getDefaultHeight() {
    switch (variant) {
      case AppDividerVariant.standard:
        return AppSpacing.spacing16;
      case AppDividerVariant.compact:
        return AppSpacing.spacing8;
      case AppDividerVariant.spacious:
        return AppSpacing.spacing24;
    }
  }

  double _getDefaultThickness() {
    switch (variant) {
      case AppDividerVariant.standard:
        return AppDimensions.borderWidthSm;
      case AppDividerVariant.compact:
        return 0.5;
      case AppDividerVariant.spacious:
        return AppDimensions.borderWidthMd;
    }
  }

  Color _getDefaultColor(BuildContext context) {
    switch (variant) {
      case AppDividerVariant.standard:
        return AppColors.getBorder(context);
      case AppDividerVariant.compact:
        return AppColors.getBorderLight(context);
      case AppDividerVariant.spacious:
        return AppColors.getBorder(context);
    }
  }

  EdgeInsets _getDefaultMargin() {
    switch (variant) {
      case AppDividerVariant.standard:
        return EdgeInsets.symmetric(vertical: AppSpacing.spacing8);
      case AppDividerVariant.compact:
        return EdgeInsets.symmetric(vertical: AppSpacing.spacing4);
      case AppDividerVariant.spacious:
        return EdgeInsets.symmetric(vertical: AppSpacing.spacing16);
    }
  }
}

/// Divider variants
enum AppDividerVariant {
  standard,
  compact,
  spacious,
} 