part of 'settings_bloc.dart';

@immutable
sealed class SettingsEvent {}

class SettingsChangeThemeEvent extends SettingsEvent {
  final AppThemeType themeType;
  
  SettingsChangeThemeEvent({required this.themeType});
}

class SettingsLoadInitialEvent extends SettingsEvent {}
