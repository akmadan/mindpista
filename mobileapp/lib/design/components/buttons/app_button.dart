import 'package:flutter/material.dart';
import '../../tokens/colors/app_colors.dart';
import '../../tokens/spacing/app_spacing.dart';
import '../../tokens/dimensions/app_dimensions.dart';
import '../../tokens/typography/app_typography.dart';

/// App Button - A customizable button component with multiple variants
class AppButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final Widget? icon;
  final AppButtonVariant variant;
  final AppButtonSize size;
  final bool isLoading;
  final bool isFullWidth;
  final EdgeInsetsGeometry? padding;
  final BorderRadius? borderRadius;

  const AppButton({
    super.key,
    required this.text,
    this.onPressed,
    this.icon,
    this.variant = AppButtonVariant.primary,
    this.size = AppButtonSize.medium,
    this.isLoading = false,
    this.isFullWidth = false,
    this.padding,
    this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    final buttonWidget = _buildButtonWidget(context);
    
    if (isFullWidth) {
      return SizedBox(
        width: double.infinity,
        child: buttonWidget,
      );
    }
    
    return buttonWidget;
  }

  Widget _buildButtonWidget(BuildContext context) {
    switch (variant) {
      case AppButtonVariant.primary:
        return ElevatedButton(
          onPressed: isLoading ? null : onPressed,
          style: _getElevatedButtonStyle(context),
          child: _buildButtonContent(),
        );
      case AppButtonVariant.secondary:
        return ElevatedButton(
          onPressed: isLoading ? null : onPressed,
          style: _getSecondaryButtonStyle(context),
          child: _buildButtonContent(),
        );
      case AppButtonVariant.outline:
        return OutlinedButton(
          onPressed: isLoading ? null : onPressed,
          style: _getOutlinedButtonStyle(context),
          child: _buildButtonContent(),
        );
      case AppButtonVariant.text:
        return TextButton(
          onPressed: isLoading ? null : onPressed,
          style: _getTextButtonStyle(context),
          child: _buildButtonContent(),
        );
      case AppButtonVariant.danger:
        return ElevatedButton(
          onPressed: isLoading ? null : onPressed,
          style: _getDangerButtonStyle(context),
          child: _buildButtonContent(),
        );
    }
  }

  Widget _buildButtonContent() {
    if (isLoading) {
      return SizedBox(
        width: _getIconSize(),
        height: _getIconSize(),
        child: CircularProgressIndicator(
          strokeWidth: 2,
          valueColor: AlwaysStoppedAnimation<Color>(_getLoadingColor()),
        ),
      );
    }

    if (icon != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          icon!,
          SizedBox(width: AppSpacing.spacing8),
          Text(text, style: _getTextStyle()),
        ],
      );
    }

    return Text(text, style: _getTextStyle());
  }

  ButtonStyle _getElevatedButtonStyle(BuildContext context) {
    return ElevatedButton.styleFrom(
      backgroundColor: AppColors.primary,
      foregroundColor: AppColors.white,
      elevation: AppDimensions.elevationSm,
      padding: padding ?? _getButtonPadding(),
      shape: RoundedRectangleBorder(
        borderRadius: borderRadius ?? AppDimensions.borderRadiusMd,
      ),
      minimumSize: Size(AppDimensions.buttonMinWidth, _getButtonHeight()),
    );
  }

  ButtonStyle _getSecondaryButtonStyle(BuildContext context) {
    return ElevatedButton.styleFrom(
      backgroundColor: AppColors.getSurfaceVariant(context),
      foregroundColor: AppColors.getTextPrimary(context),
      elevation: AppDimensions.elevationSm,
      padding: padding ?? _getButtonPadding(),
      shape: RoundedRectangleBorder(
        borderRadius: borderRadius ?? AppDimensions.borderRadiusMd,
      ),
      minimumSize: Size(AppDimensions.buttonMinWidth, _getButtonHeight()),
    );
  }

  ButtonStyle _getOutlinedButtonStyle(BuildContext context) {
    return OutlinedButton.styleFrom(
      foregroundColor: AppColors.primary,
      side: BorderSide(color: AppColors.primary),
      padding: padding ?? _getButtonPadding(),
      shape: RoundedRectangleBorder(
        borderRadius: borderRadius ?? AppDimensions.borderRadiusMd,
      ),
      minimumSize: Size(AppDimensions.buttonMinWidth, _getButtonHeight()),
    );
  }

  ButtonStyle _getTextButtonStyle(BuildContext context) {
    return TextButton.styleFrom(
      foregroundColor: AppColors.primary,
      padding: padding ?? _getButtonPadding(),
      shape: RoundedRectangleBorder(
        borderRadius: borderRadius ?? AppDimensions.borderRadiusMd,
      ),
      minimumSize: Size(AppDimensions.buttonMinWidth, _getButtonHeight()),
    );
  }

  ButtonStyle _getDangerButtonStyle(BuildContext context) {
    return ElevatedButton.styleFrom(
      backgroundColor: AppColors.error,
      foregroundColor: AppColors.white,
      elevation: AppDimensions.elevationSm,
      padding: padding ?? _getButtonPadding(),
      shape: RoundedRectangleBorder(
        borderRadius: borderRadius ?? AppDimensions.borderRadiusMd,
      ),
      minimumSize: Size(AppDimensions.buttonMinWidth, _getButtonHeight()),
    );
  }

  TextStyle _getTextStyle() {
    switch (size) {
      case AppButtonSize.small:
        return AppTypography.labelMedium;
      case AppButtonSize.medium:
        return AppTypography.labelLarge;
      case AppButtonSize.large:
        return AppTypography.titleSmall;
    }
  }

  EdgeInsets _getButtonPadding() {
    switch (size) {
      case AppButtonSize.small:
        return EdgeInsets.symmetric(
          horizontal: AppSpacing.spacing12,
          vertical: AppSpacing.spacing6,
        );
      case AppButtonSize.medium:
        return AppSpacing.buttonPadding;
      case AppButtonSize.large:
        return EdgeInsets.symmetric(
          horizontal: AppSpacing.spacing20,
          vertical: AppSpacing.spacing12,
        );
    }
  }

  double _getButtonHeight() {
    switch (size) {
      case AppButtonSize.small:
        return AppDimensions.buttonHeightSm;
      case AppButtonSize.medium:
        return AppDimensions.buttonHeightMd;
      case AppButtonSize.large:
        return AppDimensions.buttonHeightLg;
    }
  }

  double _getIconSize() {
    switch (size) {
      case AppButtonSize.small:
        return AppDimensions.iconSizeSm;
      case AppButtonSize.medium:
        return AppDimensions.iconSizeMd;
      case AppButtonSize.large:
        return AppDimensions.iconSizeLg;
    }
  }

  Color _getLoadingColor() {
    switch (variant) {
      case AppButtonVariant.primary:
      case AppButtonVariant.danger:
        return AppColors.white;
      case AppButtonVariant.secondary:
      case AppButtonVariant.outline:
      case AppButtonVariant.text:
        return AppColors.primary;
    }
  }
}

/// Button variants
enum AppButtonVariant {
  primary,
  secondary,
  outline,
  text,
  danger,
}

/// Button sizes
enum AppButtonSize {
  small,
  medium,
  large,
} 