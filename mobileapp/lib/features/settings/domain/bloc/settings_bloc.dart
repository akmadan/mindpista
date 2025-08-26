import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';
import '../../../../../utils/theme/theme_enum.dart';
import '../../../../../utils/theme/theme_utils.dart';
import '../../../../../utils/theme/theme_provider.dart';
import '../../../../../project/shared_prefs/shared_prefs_manager.dart';

part 'settings_event.dart';
part 'settings_state.dart';

class SettingsBloc extends Bloc<SettingsEvent, SettingsState> {
  final ThemeNotifier _themeNotifier;
  
  SettingsBloc({required ThemeNotifier themeNotifier}) 
      : _themeNotifier = themeNotifier,
        super(SettingsInitial()) {
    on<SettingsLoadInitialEvent>(_onSettingsLoadInitialEvent);
    on<SettingsChangeThemeEvent>(_onSettingsChangeThemeEvent);
  }

  void _onSettingsLoadInitialEvent(
    SettingsLoadInitialEvent event,
    Emitter<SettingsState> emit,
  ) {
    final currentThemeString = SharedPreferencesManager.getTheme();
    final currentTheme = AppThemeType.fromString(currentThemeString);
    final availableThemes = AppThemeType.availableThemes;
    
    emit(SettingsLoadedState(
      currentTheme: currentTheme,
      availableThemes: availableThemes,
    ));
  }

  void _onSettingsChangeThemeEvent(
    SettingsChangeThemeEvent event,
    Emitter<SettingsState> emit,
  ) {
    // Update the theme notifier which will apply the theme to the app
    _themeNotifier.setTheme(event.themeType.value);
    
    // Emit updated state
    final availableThemes = AppThemeType.availableThemes;
    emit(SettingsLoadedState(
      currentTheme: event.themeType,
      availableThemes: availableThemes,
    ));
    
    // Emit action state for UI updates
    emit(SettingsUpdateActionState());
  }
}
