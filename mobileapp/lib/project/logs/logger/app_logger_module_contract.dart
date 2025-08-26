import 'package:mobileapp/project/logs/logger/app_logger_message_type.dart';


abstract class AppLoggerModuleContract {
  // To Log Message in the logger modules
  void logMessage(
    String message, {
    AppLoggerMessageType messageType = AppLoggerMessageType.debug,
  });

  // To Log Caught Errors in the logger modules
  void logError(
    Exception exception,
    StackTrace? stackTrace,
    bool? fatal,
  );
}
