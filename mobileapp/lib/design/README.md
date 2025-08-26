# Design System & Theme Architecture

## 🎯 True Single Source of Truth

This design system implements a **true single source of truth** approach. **ALL theme definitions** are in the design system, and the utils folder is purely a bridge.

### **Theme Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    DESIGN SYSTEM                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  lib/design/themes/app_theme.dart                  │   │
│  │  • Light Theme (Material 3)                        │   │
│  │  • Dark Theme (Material 3)                         │   │
│  │  • Custom Theme (Purple/Orange)                    │   │
│  │  • Uses design tokens                              │   │
│  │  • NO hardcoded values in utils                    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    PURE BRIDGE                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  lib/utils/theme/theme_utils.dart                  │   │
│  │  • Delegates ALL themes to design system           │   │
│  │  • NO hardcoded theme values                       │   │
│  │  • Pure adapter pattern                            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    THEME PROVIDER                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  lib/utils/theme/theme_provider.dart               │   │
│  │  • Manages theme state                             │   │
│  │  • Handles theme switching                         │   │
│  │  • Persists theme choice                           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Available Themes

| Theme Name | Type | Description | Source |
|------------|------|-------------|---------|
| `light` | Design System | Light theme (Material 3) | `AppTheme.lightTheme` |
| `dark` | Design System | Dark theme (Material 3) | `AppTheme.darkTheme` |
| `custom` | Design System | Purple/Orange custom theme | `AppTheme.customTheme` |
| `design_light` | Design System | Light theme (Material 3) | `AppTheme.lightTheme` |
| `design_dark` | Design System | Dark theme (Material 3) | `AppTheme.darkTheme` |

**Note**: All themes are now from the design system. The utils folder contains **zero hardcoded theme values**.

## 🌙 Theme-Aware Design System

### **Updated Components**

All design system components are now **theme-aware** and automatically adapt to light/dark themes:

#### **AppColors - Theme-Aware Color System**
```dart
// Old way (deprecated)
AppColors.surface
AppColors.textPrimary

// New way (theme-aware)
AppColors.getSurface(context)
AppColors.getTextPrimary(context)
```

#### **Components Automatically Adapt**
- **AppCard**: Background, borders, and text colors adapt to theme
- **AppButton**: Colors and styles adapt to theme
- **AppTextField**: Borders, backgrounds, and text colors adapt to theme
- **AppDivider**: Border colors adapt to theme

### **Benefits of Theme-Aware Design**
- ✅ **Automatic Adaptation**: Components look great in both light and dark themes
- ✅ **No Manual Color Management**: No need to specify colors for each theme
- ✅ **Consistent Experience**: All components follow Material 3 design principles
- ✅ **Future-Proof**: Easy to add new themes without component changes

## 🚀 Usage

### **Import Design System**
```dart
import 'package:flutter_app_template/design/index.dart';
```

### **Use Components (Theme-Aware)**
```dart
// Cards automatically adapt to theme
AppCard(
  title: Text('Theme-Aware Card'),
  subtitle: Text('Looks great in light and dark themes'),
  child: Text('Content here'),
)

// Buttons automatically adapt to theme
AppButton(
  text: 'Theme-Aware Button',
  variant: AppButtonVariant.primary,
  onPressed: () {},
)

// Text fields automatically adapt to theme
AppTextField(
  label: 'Theme-Aware Input',
  hint: 'Enter text here',
)
```

### **Use Design Tokens**
```dart
Container(
  padding: AppSpacing.allMd,
  decoration: BoxDecoration(
    color: AppColors.getSurface(context), // Theme-aware
    borderRadius: AppDimensions.borderRadiusMd,
    boxShadow: AppDimensions.shadowSm,
  ),
  child: Text(
    'Styled container', 
    style: AppTypography.bodyMedium.copyWith(
      color: AppColors.getTextPrimary(context), // Theme-aware
    ),
  ),
)
```

### **Theme Management**
```dart
// In your widgets
Consumer<ThemeNotifier>(
  builder: (context, themeNotifier, child) {
    return Column(
      children: [
        Text('Current: ${themeNotifier.currentThemeName}'),
        ElevatedButton(
          onPressed: () => themeNotifier.toggleTheme(),
          child: Text('Toggle Theme'),
        ),
        ElevatedButton(
          onPressed: () => themeNotifier.nextTheme(),
          child: Text('Next Theme'),
        ),
      ],
    );
  },
)

// Use the theme switcher component
ThemeSwitcher()
```

## 📁 File Structure

```
lib/
├── design/                          # Design System (SINGLE SOURCE)
│   ├── index.dart                   # Main exports
│   ├── tokens/                      # Design tokens
│   │   ├── colors/app_colors.dart   # Theme-aware color system
│   │   ├── typography/app_typography.dart # Typography
│   │   ├── spacing/app_spacing.dart # Spacing system
│   │   └── dimensions/app_dimensions.dart # Dimensions
│   ├── components/                  # Theme-aware UI Components
│   │   ├── buttons/app_button.dart  # Theme-aware button component
│   │   ├── text_fields/app_text_field.dart # Theme-aware text input
│   │   ├── cards/app_card.dart      # Theme-aware card component
│   │   ├── common/app_divider.dart  # Theme-aware divider component
│   │   ├── common/theme_switcher.dart # Theme switcher
│   │   └── ...                      # Other components
│   ├── themes/                      # ALL Theme definitions
│   │   ├── app_theme.dart          # ALL themes (light, dark, custom)
│   │   ├── light_theme.dart        # Light theme wrapper
│   │   └── dark_theme.dart         # Dark theme wrapper
│   ├── layouts/                     # Layout components
│   │   ├── app_scaffold.dart       # Custom scaffold
│   │   └── page_layout.dart        # Page layout
│   └── animations/                  # Animation utilities
│       └── app_animations.dart      # Animation helpers
└── utils/theme/                     # Pure Bridge (NO hardcoded values)
    ├── theme_utils.dart            # Delegates to design system
    └── theme_provider.dart         # Theme provider
```

## 🔄 Migration Strategy

### **Phase 1: ✅ Complete**
- ✅ Design system created with ALL themes
- ✅ Utils folder converted to pure bridge
- ✅ Zero hardcoded values in utils
- ✅ **Theme-aware components implemented**
- ✅ **Automatic light/dark theme adaptation**
- ✅ Backward compatibility maintained

### **Phase 2: Gradual Adoption**
- 🔄 Use design system components in new features
- 🔄 Gradually replace legacy component usage
- 🔄 Test theme switching functionality

### **Phase 3: Full Migration**
- 🔄 Remove any remaining legacy component usage
- 🔄 Update all existing components
- 🔄 Standardize on design system

## 🎯 Benefits

1. **True Single Source of Truth**: ALL themes defined in design system
2. **Zero Duplication**: No hardcoded values anywhere else
3. **Consistency**: All themes use the same design tokens
4. **Maintainability**: Change a design token → affects all themes
5. **Scalability**: Easy to add new themes and components
6. **Clean Architecture**: Clear separation of concerns
7. **Material 3 Ready**: Built with Material 3 design principles
8. **🌙 Theme-Aware**: Components automatically adapt to light/dark themes
9. **🎨 Beautiful UI**: Consistent, professional appearance in all themes

## 🔧 Customization

### **Adding New Themes**
1. Add theme definition in `lib/design/themes/app_theme.dart`
2. Update `lib/utils/theme/theme_utils.dart` to include new theme
3. Update theme provider and switcher if needed

### **Adding New Components**
1. Create component in `lib/design/components/`
2. Use theme-aware design tokens for styling
3. Add export to `lib/design/index.dart`
4. Test with different themes

### **Modifying Design Tokens**
1. Update token values in `lib/design/tokens/`
2. All components and themes will automatically update
3. Test across all themes to ensure consistency

## 🚨 Important Notes

- **NO hardcoded theme values** in `lib/utils/theme/`
- **ALL themes** are defined in `lib/design/themes/`
- **Utils folder** is purely a bridge/adapter
- **Design system** is the single source of truth
- **Backward compatibility** is maintained through the bridge
- **🌙 All components are theme-aware** and automatically adapt
- **🎨 Beautiful UI** in both light and dark themes 