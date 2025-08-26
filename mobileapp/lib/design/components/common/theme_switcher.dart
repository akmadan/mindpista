import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../utils/theme/theme_provider.dart';
import '../../../utils/theme/theme_utils.dart';
import '../buttons/app_button.dart';

/// Theme Switcher - A widget to switch between different themes
class ThemeSwitcher extends StatelessWidget {
  const ThemeSwitcher({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<ThemeNotifier>(
      builder: (context, themeNotifier, child) {
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Current Theme: ${themeNotifier.themeDisplayNames[themeNotifier.currentThemeName]}',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                AppButton(
                  text: 'Toggle Light/Dark',
                  variant: AppButtonVariant.primary,
                  size: AppButtonSize.small,
                  onPressed: () => themeNotifier.toggleTheme(),
                ),
                AppButton(
                  text: 'Toggle System',
                  variant: AppButtonVariant.secondary,
                  size: AppButtonSize.small,
                  onPressed: () => themeNotifier.toggleThemeSystem(),
                ),
                AppButton(
                  text: 'Next Theme',
                  variant: AppButtonVariant.outline,
                  size: AppButtonSize.small,
                  onPressed: () => themeNotifier.nextTheme(),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              'Available Themes:',
              style: Theme.of(context).textTheme.titleSmall,
            ),
            const SizedBox(height: 8),
            ...themeNotifier.availableThemes.map((themeName) {
              final isSelected = themeName == themeNotifier.currentThemeName;
              return Padding(
                padding: const EdgeInsets.only(bottom: 4),
                child: InkWell(
                  onTap: () => themeNotifier.setTheme(themeName),
                  borderRadius: BorderRadius.circular(8),
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isSelected 
                          ? Theme.of(context).colorScheme.primary.withOpacity(0.1)
                          : null,
                      border: Border.all(
                        color: isSelected 
                            ? Theme.of(context).colorScheme.primary
                            : Theme.of(context).dividerColor,
                        width: isSelected ? 2 : 1,
                      ),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Row(
                      children: [
                        if (isSelected)
                          Icon(
                            Icons.check_circle,
                            color: Theme.of(context).colorScheme.primary,
                            size: 20,
                          ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            themeNotifier.themeDisplayNames[themeName] ?? themeName,
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                            ),
                          ),
                        ),
                        if (ThemeUtils.isDesignSystemTheme(themeName))
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: Theme.of(context).colorScheme.secondary,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              'DS',
                              style: Theme.of(context).textTheme.labelSmall?.copyWith(
                                color: Theme.of(context).colorScheme.onSecondary,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                ),
              );
            }).toList(),
          ],
        );
      },
    );
  }
} 