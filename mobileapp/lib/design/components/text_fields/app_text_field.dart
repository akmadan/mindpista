import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../tokens/colors/app_colors.dart';
import '../../tokens/spacing/app_spacing.dart';
import '../../tokens/dimensions/app_dimensions.dart';
import '../../tokens/typography/app_typography.dart';

/// App Text Field - A customizable text input component
class AppTextField extends StatefulWidget {
  final String? label;
  final String? hint;
  final String? helperText;
  final String? errorText;
  final Widget? prefixIcon;
  final Widget? suffixIcon;
  final TextEditingController? controller;
  final TextInputType? keyboardType;
  final TextInputAction? textInputAction;
  final bool obscureText;
  final bool enabled;
  final bool readOnly;
  final int? maxLines;
  final int? maxLength;
  final String? Function(String?)? validator;
  final void Function(String)? onChanged;
  final void Function(String)? onSubmitted;
  final VoidCallback? onTap;
  final List<TextInputFormatter>? inputFormatters;
  final AppTextFieldVariant variant;
  final AppTextFieldSize size;
  final FocusNode? focusNode;

  const AppTextField({
    super.key,
    this.label,
    this.hint,
    this.helperText,
    this.errorText,
    this.prefixIcon,
    this.suffixIcon,
    this.controller,
    this.keyboardType,
    this.textInputAction,
    this.obscureText = false,
    this.enabled = true,
    this.readOnly = false,
    this.maxLines = 1,
    this.maxLength,
    this.validator,
    this.onChanged,
    this.onSubmitted,
    this.onTap,
    this.inputFormatters,
    this.variant = AppTextFieldVariant.outlined,
    this.size = AppTextFieldSize.medium,
    this.focusNode,
  });

  @override
  State<AppTextField> createState() => _AppTextFieldState();
}

class _AppTextFieldState extends State<AppTextField> {
  bool _obscureText = false;

  @override
  void initState() {
    super.initState();
    _obscureText = widget.obscureText;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (widget.label != null) ...[
          Text(
            widget.label!,
            style: AppTypography.labelMedium.copyWith(
              color: AppColors.getTextPrimary(context),
            ),
          ),
          SizedBox(height: AppSpacing.spacing4),
        ],
        TextFormField(
          controller: widget.controller,
          keyboardType: widget.keyboardType,
          textInputAction: widget.textInputAction,
          obscureText: _obscureText,
          enabled: widget.enabled,
          readOnly: widget.readOnly,
          maxLines: widget.maxLines,
          maxLength: widget.maxLength,
          validator: widget.validator,
          onChanged: widget.onChanged,
          onFieldSubmitted: widget.onSubmitted,
          onTap: widget.onTap,
          inputFormatters: widget.inputFormatters,
          focusNode: widget.focusNode,
          decoration: _buildInputDecoration(context),
        ),
        if (widget.helperText != null && widget.errorText == null) ...[
          SizedBox(height: AppSpacing.spacing4),
          Text(
            widget.helperText!,
            style: AppTypography.bodySmall.copyWith(
              color: AppColors.getTextSecondary(context),
            ),
          ),
        ],
        if (widget.errorText != null) ...[
          SizedBox(height: AppSpacing.spacing4),
          Text(
            widget.errorText!,
            style: AppTypography.bodySmall.copyWith(
              color: AppColors.error,
            ),
          ),
        ],
      ],
    );
  }

  InputDecoration _buildInputDecoration(BuildContext context) {
    final hasError = widget.errorText != null;
    
    return InputDecoration(
      hintText: widget.hint,
      prefixIcon: widget.prefixIcon,
      suffixIcon: _buildSuffixIcon(),
      filled: widget.variant == AppTextFieldVariant.filled,
      fillColor: widget.variant == AppTextFieldVariant.filled 
          ? AppColors.getSurfaceVariant(context) 
          : null,
      border: _getBorder(context, hasError),
      enabledBorder: _getBorder(context, hasError),
      focusedBorder: _getFocusedBorder(context, hasError),
      errorBorder: _getErrorBorder(context),
      focusedErrorBorder: _getErrorBorder(context),
      contentPadding: _getContentPadding(),
      hintStyle: AppTypography.bodyMedium.copyWith(
        color: AppColors.getTextSecondary(context),
      ),
      errorStyle: AppTypography.bodySmall.copyWith(
        color: AppColors.error,
      ),
    );
  }

  Widget? _buildSuffixIcon() {
    if (widget.obscureText) {
      return IconButton(
        icon: Icon(
          _obscureText ? Icons.visibility : Icons.visibility_off,
          color: AppColors.getTextSecondary(context),
        ),
        onPressed: () {
          setState(() {
            _obscureText = !_obscureText;
          });
        },
      );
    }
    return widget.suffixIcon;
  }

  OutlineInputBorder _getBorder(BuildContext context, bool hasError) {
    return OutlineInputBorder(
      borderRadius: AppDimensions.borderRadiusMd,
      borderSide: BorderSide(
        color: hasError ? AppColors.error : AppColors.getBorder(context),
        width: AppDimensions.borderWidthSm,
      ),
    );
  }

  OutlineInputBorder _getFocusedBorder(BuildContext context, bool hasError) {
    return OutlineInputBorder(
      borderRadius: AppDimensions.borderRadiusMd,
      borderSide: BorderSide(
        color: hasError ? AppColors.error : AppColors.primary,
        width: AppDimensions.borderWidthMd,
      ),
    );
  }

  OutlineInputBorder _getErrorBorder(BuildContext context) {
    return OutlineInputBorder(
      borderRadius: AppDimensions.borderRadiusMd,
      borderSide: BorderSide(
        color: AppColors.error,
        width: AppDimensions.borderWidthSm,
      ),
    );
  }

  EdgeInsets _getContentPadding() {
    switch (widget.size) {
      case AppTextFieldSize.small:
        return EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.spacing8,
        );
      case AppTextFieldSize.medium:
        return AppSpacing.inputPadding;
      case AppTextFieldSize.large:
        return EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.spacing16,
        );
    }
  }
}

/// Text field variants
enum AppTextFieldVariant {
  outlined,
  filled,
}

/// Text field sizes
enum AppTextFieldSize {
  small,
  medium,
  large,
} 