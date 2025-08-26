import 'package:flutter/foundation.dart';

import 'app_logger_message_type.dart';
import 'app_logger_module_contract.dart';
import 'logger_modules/devtools_logger_module.dart';

class AppLogger {
  final List<AppLoggerModuleContract> _loggerModules;

  AppLogger._(this._loggerModules);

  static AppLogger? _instance;

  factory AppLogger.createInstance(List<AppLoggerModuleContract> modules) {
    return _instance ??= AppLogger._(modules);
  }

  static AppLogger get getInstance {
    if (_instance == null) {
      kDebugMode
          ? throw Exception("AppLogger Not Initialized")

          /// Silent Fail on Prod Instance
          : AppLogger.createInstance(
              [
                DevToolsLoggerModule(),
              ],
            );
    }

    return _instance!;
  }

  void logMessage(
    String message, {
    AppLoggerMessageType messageType = AppLoggerMessageType.debug,
  }) {
    for (final module in _loggerModules) {
      module.logMessage(
        message,
        messageType: messageType,
      );
    }
  }

  void logError(
    Object error, {
    StackTrace? stackTrace,
    bool? fatal,
  }) {
    for (final module in _loggerModules) {
      module.logError(Exception(error), stackTrace, fatal);
    }
  }
}
