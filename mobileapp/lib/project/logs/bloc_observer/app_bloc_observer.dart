import 'package:mobileapp/project/logs/logger/app_logger.dart';
import 'package:mobileapp/project/logs/logger/app_logger_message_type.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../logger/app_logger_config.dart';

class AppBlocObserver extends BlocObserver {
  @override
  void onCreate(BlocBase bloc) {
    // called whenever a bloc is instantiated.
    super.onCreate(bloc);
    if (LoggerConfig.isBlocLoggingEnabled) {
      AppLogger.getInstance.logMessage(
        '[BLoC INFO] ${bloc.runtimeType}: created',
        messageType: AppLoggerMessageType.info,
      );
    }
  }

  @override
  void onEvent(Bloc bloc, Object? event) {
    // called whenever an event is added
    super.onEvent(bloc, event);
    if (LoggerConfig.isBlocLoggingEnabled) {
      AppLogger.getInstance.logMessage(
        '[BLoC INFO] ${bloc.runtimeType}: ${event.runtimeType} added',
        messageType: AppLoggerMessageType.info,
      );
    }
  }

  @override
  void onChange(BlocBase bloc, Change change) {
    // called whenever a state is emitted
    super.onChange(bloc, change);
    if (LoggerConfig.isBlocLoggingEnabled) {
      AppLogger.getInstance.logMessage(
        '[BLoC INFO] ${bloc.runtimeType}: ${change.nextState.runtimeType} emitted (previous state was ${change.currentState.runtimeType})',
        messageType: AppLoggerMessageType.info,
      );
    }
  }

  @override
  void onError(BlocBase bloc, Object error, StackTrace stackTrace) {
    // called whenever an error is thrown
    super.onError(bloc, error, stackTrace);
    if (LoggerConfig.isBlocLoggingEnabled) {
      AppLogger.getInstance
          .logError('[BLoC Error] ${bloc.runtimeType}: $stackTrace');
    }
  }

  @override
  void onClose(BlocBase bloc) {
    // called whenever a bloc is disposed
    super.onClose(bloc);
    if (LoggerConfig.isBlocLoggingEnabled) {
      AppLogger.getInstance.logMessage(
        '[BLoC INFO] ${bloc.runtimeType}: disposed',
        messageType: AppLoggerMessageType.info,
      );
    }
  }
}
