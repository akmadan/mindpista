import 'package:mobileapp/features/home/presentation/pages/home_page.dart';
import 'package:mobileapp/features/splash/presentation/pages/splash_page.dart';
import 'package:mobileapp/features/bottom_tab_view/presentation/pages/bottom_tab_view_page.dart';
import 'package:mobileapp/features/settings/presentation/pages/settings_page.dart';
import 'package:go_router/go_router.dart';
import 'router_paths.dart';

class AppRouter {
  static final routeSplashPage = AppRouterPaths.splash;
  static final routeHomePage = AppRouterPaths.home;
  static final routeBottomTabView = AppRouterPaths.bottomTabView;
  static final routeSettingsPage = AppRouterPaths.settings;
  static final routeDecidePage = AppRouterPaths.decide;
  static final routeOnboardingPage = AppRouterPaths.onboarding;
  static final routeSigninPage = AppRouterPaths.signIn;
  static final routeErrorPage = AppRouterPaths.error;

  static GoRouter router = GoRouter(
    initialLocation: AppRouterPaths.splash,
    routes: <RouteBase>[
      GoRoute(
        path: AppRouterPaths.splash,
        builder: (context, state) => const SplashPage(),
      ),
      GoRoute(
        path: AppRouterPaths.bottomTabView,
        builder: (context, state) => const BottomTabViewPage(),
      ),
      GoRoute(
        path: AppRouterPaths.settings,
        builder: (context, state) => const SettingsPage(),
      ),
      GoRoute(
        path: AppRouterPaths.home,
        builder: (context, state) => const HomePage(),
      ),

      // GoRoute(
      //   path: AppRouterPaths.decide,
      //   builder: (context, state) => const DecidePage(),
      // ),
      // GoRoute(
      //   path: AppRouterPaths.onboarding,
      //   builder: (context, state) => const AppOnboardingPage(),
      // ),
      // GoRoute(
      //   path: AppRouterPaths.signIn,
      //   builder: (context, state) => const AppOnboardingSigninView(),
      // ),
      // GoRoute(
      //   path: AppRouterPaths.error,
      //   builder: (context, state) => const AppOnboardingSigninView(),
      // ),
    ],
  );
}
