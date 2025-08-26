import 'package:shared_preferences/shared_preferences.dart';

class SharedPreferencesManager {
  static late SharedPreferences _prefs;

  static Future<void> init() async {
    _prefs = await SharedPreferences.getInstance();
  }

  static SharedPreferences get instance => _prefs;

  // theme
  static String getTheme() {
    return _prefs.getString('theme') ?? 'light';
  }

  static Future<void> setTheme(String theme) async {
    await _prefs.setString('theme', theme);
  }
}
