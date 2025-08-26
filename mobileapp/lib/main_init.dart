import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobileapp/project/di/di.dart';
import 'package:mobileapp/project/logs/logger/app_logger.dart';
import 'package:mobileapp/project/logs/logger/logger_modules/devtools_logger_module.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:firebase_core/firebase_core.dart';
import './project/shared_prefs/shared_prefs_manager.dart';


class AppMainInitializer {
  Future<void> initialize() async {
    WidgetsFlutterBinding.ensureInitialized();
    // await _initializeFirebase();
    // await _loadDotenv();
    _setPreferredOrientations();
    _initializeLogger();
    await _initializeSharedPreferences();
    _injectDependencies();
  }

  Future<void> _initializeFirebase() async {
    try {
      await Firebase.initializeApp();
    } catch (e) {
      if (kDebugMode) {
        print('Firebase initialization note: $e');
      }
    }
  }

  Future<void> _loadDotenv() async {
    await dotenv.load(fileName: ".env");
  }

  void _setPreferredOrientations() {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);
  }

  void _initializeLogger() {
    AppLogger.createInstance([DevToolsLoggerModule()]);
  }

  Future<void> _initializeSharedPreferences() async {
    await SharedPreferencesManager.init();
  }

  void _injectDependencies() {
    AppDi.initDiServices();
  }
}