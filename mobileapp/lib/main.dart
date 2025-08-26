import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:mobileapp/project/logs/bloc_observer/app_bloc_observer.dart';
import 'package:mobileapp/project/logs/logger/app_logger.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:provider/provider.dart';
import 'main_init.dart';
import 'utils/theme/theme_provider.dart';
import 'project/go_router/router.dart';
import 'project/di/di.dart';
import 'utils/literals/literals.dart';

Future<void> main() async {
  runZonedGuarded<Future<void>>(
    () async {
      final initializer = AppMainInitializer();
      await initializer.initialize();

      if (kDebugMode) {
        Bloc.observer = AppBlocObserver();
        runApp(const MyApp());
      } else {
        runApp(const MyApp());
      }
    },
    (error, stackTrace) async {
      AppLogger.getInstance.logError(
        error,
        stackTrace: stackTrace,
        fatal: true,
      );
    },
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(375, 812),
      builder: (context, child) {
        return MultiProvider(
          providers: [ChangeNotifierProvider(create: (_) => AppDi.getIt.get<ThemeNotifier>())],
          child: Consumer<ThemeNotifier>(
            builder:
                (context, themeProvider, child) => MaterialApp.router(
                  title: AppLiterals.appName,
                  theme: themeProvider.currentTheme,
                  debugShowCheckedModeBanner: false,
                  routerConfig: AppRouter.router,
                ),
          ),
        );
      },
    );
  }
}
