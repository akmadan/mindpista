part of 'settings_bloc.dart';

@immutable
sealed class SettingsState {}

final class SettingsInitial extends SettingsState {}

final class SettingsLoadedState extends SettingsState {
  final AppThemeType currentTheme;
  final List<AppThemeType> availableThemes;
  
  SettingsLoadedState({
    required this.currentTheme,
    required this.availableThemes,
  });
}

abstract class SettingsActionState extends SettingsState{}

class SettingsUpdateActionState extends SettingsActionState{}
