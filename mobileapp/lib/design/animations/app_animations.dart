import 'package:flutter/material.dart';
import '../tokens/dimensions/app_dimensions.dart';

/// App Animations - Animation utilities and constants
class AppAnimations {
  // Private constructor to prevent instantiation
  AppAnimations._();

  // Fade animations
  static Widget fadeIn({
    required Widget child,
    Duration? duration,
    Curve? curve,
  }) {
    return TweenAnimationBuilder<double>(
      duration: duration ?? AppDimensions.durationMd,
      curve: curve ?? AppDimensions.curveEaseInOut,
      tween: Tween(begin: 0.0, end: 1.0),
      builder: (context, value, child) {
        return Opacity(
          opacity: value,
          child: child,
        );
      },
      child: child,
    );
  }

  // Slide animations
  static Widget slideInFromBottom({
    required Widget child,
    Duration? duration,
    Curve? curve,
    double? offset,
  }) {
    return TweenAnimationBuilder<Offset>(
      duration: duration ?? AppDimensions.durationMd,
      curve: curve ?? AppDimensions.curveEaseInOut,
      tween: Tween(
        begin: Offset(0, offset ?? 50),
        end: Offset.zero,
      ),
      builder: (context, value, child) {
        return Transform.translate(
          offset: value,
          child: child,
        );
      },
      child: child,
    );
  }

  // Scale animations
  static Widget scaleIn({
    required Widget child,
    Duration? duration,
    Curve? curve,
    double? beginScale,
  }) {
    return TweenAnimationBuilder<double>(
      duration: duration ?? AppDimensions.durationMd,
      curve: curve ?? AppDimensions.curveEaseInOut,
      tween: Tween(begin: beginScale ?? 0.8, end: 1.0),
      builder: (context, value, child) {
        return Transform.scale(
          scale: value,
          child: child,
        );
      },
      child: child,
    );
  }

  // Page transitions
  static PageRouteBuilder<T> fadePageRoute<T>({
    required Widget page,
    Duration? duration,
  }) {
    return PageRouteBuilder<T>(
      pageBuilder: (context, animation, secondaryAnimation) => page,
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return FadeTransition(
          opacity: animation,
          child: child,
        );
      },
      transitionDuration: duration ?? AppDimensions.durationMd,
    );
  }

  static PageRouteBuilder<T> slidePageRoute<T>({
    required Widget page,
    Duration? duration,
    SlideDirection direction = SlideDirection.right,
  }) {
    return PageRouteBuilder<T>(
      pageBuilder: (context, animation, secondaryAnimation) => page,
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        Offset begin;
        switch (direction) {
          case SlideDirection.left:
            begin = const Offset(-1.0, 0.0);
            break;
          case SlideDirection.right:
            begin = const Offset(1.0, 0.0);
            break;
          case SlideDirection.up:
            begin = const Offset(0.0, 1.0);
            break;
          case SlideDirection.down:
            begin = const Offset(0.0, -1.0);
            break;
        }

        return SlideTransition(
          position: Tween<Offset>(
            begin: begin,
            end: Offset.zero,
          ).animate(CurvedAnimation(
            parent: animation,
            curve: AppDimensions.curveEaseInOut,
          )),
          child: child,
        );
      },
      transitionDuration: duration ?? AppDimensions.durationMd,
    );
  }
}

/// Slide directions for page transitions
enum SlideDirection {
  left,
  right,
  up,
  down,
} 