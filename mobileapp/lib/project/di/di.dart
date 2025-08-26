import 'package:get_it/get_it.dart';
import 'package:mobileapp/features/settings/domain/bloc/settings_bloc.dart';
import 'package:mobileapp/utils/theme/theme_provider.dart';
import '../logs/logger/app_logger.dart';

class AppDi {
  static final getIt = GetIt.instance;
  static void initDiServices() {
    initDiApiServices();
    initDiApiClients();
    initDiBlocs();
    initRepos();
    initOthers();
  }

  // init api clients
  static void initDiApiClients() {
    // getIt.registerLazySingleton<UserApiClient>(() => UserApiClient());
  }

  // init all the api services
  static void initDiApiServices() {
    // getIt.registerLazySingleton<UserApiService>(() =>
    //     UserApiService(getIt.get<UserApiClient>(), getIt.get<AppLogger>()));
  }

  // init all the blocs
  static void initDiBlocs() {
    getIt.registerLazySingleton(() => SettingsBloc(themeNotifier: getIt.get<ThemeNotifier>()));
    // getIt.registerLazySingleton(() => TourBloc());
    // getIt.registerLazySingleton<OnboardingBloc>(() => OnboardingBloc());
    // getIt.registerLazySingleton<HomeBloc>(() => HomeBloc());
    // getIt.registerLazySingleton<ExploreBloc>(() => ExploreBloc());
    // getIt.registerLazySingleton<SettingsBloc>(() => SettingsBloc());
  }

  // init Repos
  static void initRepos() {
    // getIt.registerLazySingleton(() => AuthRepo(logger: getIt.get<AppLogger>()));
  }

  // init others
  static void initOthers() {
    getIt.registerLazySingleton<AppLogger>(() => AppLogger.getInstance);
    getIt.registerLazySingleton<ThemeNotifier>(() => ThemeNotifier());
  }
}
