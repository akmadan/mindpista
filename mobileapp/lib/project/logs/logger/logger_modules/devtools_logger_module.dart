import 'package:flutter/foundation.dart';
import 'package:mobileapp/project/logs/logger/app_logger_message_type.dart';
import 'package:mobileapp/project/logs/logger/app_logger_module_contract.dart';

import 'package:logger/logger.dart';

// currently setup to work only in debug mode
class DevToolsLoggerModule implements AppLoggerModuleContract {
  final logger =
      kDebugMode
          ? Logger(
            printer: PrettyPrinter(
              methodCount: 0,
              lineLength: 80,
              // colors don't work now
              colors: false,
            ),
          )
          : null;

  @override
  void logMessage(
    String message, {
    AppLoggerMessageType messageType = AppLoggerMessageType.debug,
  }) {
    if (kDebugMode) {
      switch (messageType) {
        case AppLoggerMessageType.info:
          logger?.i(message);
          break;
        case AppLoggerMessageType.warning:
          logger?.w(message);
          break;
        case AppLoggerMessageType.debug:
          logger?.d(message);
      }
    }
  }

  @override
  void logError(Exception exception, StackTrace? stackTrace, bool? fatal) {
    if (kDebugMode) {
      logger?.f(exception.toString(), error: exception, stackTrace: stackTrace);
    }
  }
}
