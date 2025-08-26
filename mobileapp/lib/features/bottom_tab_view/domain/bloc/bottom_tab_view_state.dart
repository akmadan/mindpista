part of 'bottom_tab_view_bloc.dart';

@immutable
sealed class BottomTabViewState {}

final class BottomTabViewInitial extends BottomTabViewState {}

abstract class BottomTabViewActionState extends BottomTabViewState {}
