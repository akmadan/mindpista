import 'package:flutter/material.dart';
import '../../tokens/colors/app_colors.dart';
import '../../tokens/spacing/app_spacing.dart';
import '../../tokens/dimensions/app_dimensions.dart';

/// App Card - A flexible card component with multiple variants
class AppCard extends StatelessWidget {
  final Widget? child;
  final Widget? title;
  final Widget? subtitle;
  final Widget? leading;
  final Widget? trailing;
  final List<Widget>? actions;
  final VoidCallback? onTap;
  final AppCardVariant variant;
  final AppCardSize size;
  final bool isElevated;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;

  const AppCard({
    super.key,
    this.child,
    this.title,
    this.subtitle,
    this.leading,
    this.trailing,
    this.actions,
    this.onTap,
    this.variant = AppCardVariant.elevated,
    this.size = AppCardSize.medium,
    this.isElevated = true,
    this.padding,
    this.margin,
  });

  @override
  Widget build(BuildContext context) {
    final cardContent = _buildCardContent(context);
    
    Widget card = Container(
      decoration: _getDecoration(context),
      child: cardContent,
    );

    if (onTap != null) {
      card = InkWell(
        onTap: onTap,
        borderRadius: AppDimensions.borderRadiusMd,
        child: card,
      );
    }

    if (margin != null) {
      card = Container(
        margin: margin,
        child: card,
      );
    }

    return card;
  }

  Widget _buildCardContent(BuildContext context) {
    if (title != null || leading != null || trailing != null || actions != null) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildHeader(context),
          if (child != null) ...[
            _buildDivider(context),
            _buildBody(),
          ],
        ],
      );
    }

    return _buildBody();
  }

  Widget _buildHeader(BuildContext context) {
    return Padding(
      padding: _getHeaderPadding(),
      child: Row(
        children: [
          if (leading != null) ...[
            leading!,
            SizedBox(width: AppSpacing.spacing12),
          ],
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (title != null) _wrapWithDefaultStyle(context, title!, isTitle: true),
                if (subtitle != null) ...[
                  SizedBox(height: AppSpacing.spacing4),
                  _wrapWithDefaultStyle(context, subtitle!, isTitle: false),
                ],
              ],
            ),
          ),
          if (trailing != null) ...[
            SizedBox(width: AppSpacing.spacing12),
            trailing!,
          ],
        ],
      ),
    );
  }

  Widget _wrapWithDefaultStyle(BuildContext context, Widget widget, {required bool isTitle}) {
    // If the widget is already a Text widget with a style, return it as is
    if (widget is Text && widget.style != null) {
      return widget;
    }
    
    // If it's a Text widget without style, wrap it with default theme-aware style
    if (widget is Text) {
      return Text(
        widget.data ?? '',
        style: isTitle 
            ? Theme.of(context).textTheme.titleLarge?.copyWith(
                color: Theme.of(context).colorScheme.onSurface,
              )
            : Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Theme.of(context).colorScheme.onSurfaceVariant,
              ),
        textAlign: widget.textAlign,
        maxLines: widget.maxLines,
        overflow: widget.overflow,
        softWrap: widget.softWrap,
      );
    }
    
    // For other widgets, return as is
    return widget;
  }

  Widget _buildDivider(BuildContext context) {
    return Builder(
      builder: (context) => Divider(
        height: 1,
        color: AppColors.getBorderLight(context),
      ),
    );
  }

  Widget _buildBody() {
    return Padding(
      padding: padding ?? _getBodyPadding(),
      child: child,
    );
  }

  BoxDecoration _getDecoration(BuildContext context) {
    switch (variant) {
      case AppCardVariant.elevated:
        return BoxDecoration(
          color: AppColors.getSurface(context),
          borderRadius: AppDimensions.borderRadiusMd,
          boxShadow: isElevated ? AppDimensions.shadowSm : null,
        );
      case AppCardVariant.outlined:
        return BoxDecoration(
          color: AppColors.getSurface(context),
          borderRadius: AppDimensions.borderRadiusMd,
          border: Border.all(
            color: AppColors.getBorder(context),
            width: AppDimensions.borderWidthSm,
          ),
        );
      case AppCardVariant.filled:
        return BoxDecoration(
          color: AppColors.getSurfaceVariant(context),
          borderRadius: AppDimensions.borderRadiusMd,
        );
    }
  }

  EdgeInsets _getHeaderPadding() {
    switch (size) {
      case AppCardSize.small:
        return EdgeInsets.all(AppSpacing.spacing12);
      case AppCardSize.medium:
        return EdgeInsets.all(AppSpacing.spacing16);
      case AppCardSize.large:
        return EdgeInsets.all(AppSpacing.spacing20);
    }
  }

  EdgeInsets _getBodyPadding() {
    switch (size) {
      case AppCardSize.small:
        return AppSpacing.cardPadding.copyWith(
          top: AppSpacing.spacing8,
          bottom: AppSpacing.spacing8,
        );
      case AppCardSize.medium:
        return AppSpacing.cardPadding;
      case AppCardSize.large:
        return EdgeInsets.all(AppSpacing.spacing20);
    }
  }
}

/// Card variants
enum AppCardVariant {
  elevated,
  outlined,
  filled,
}

/// Card sizes
enum AppCardSize {
  small,
  medium,
  large,
} 