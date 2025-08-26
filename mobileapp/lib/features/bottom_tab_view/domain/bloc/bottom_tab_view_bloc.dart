import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'bottom_tab_view_event.dart';
part 'bottom_tab_view_state.dart';

class BottomTabViewBloc extends Bloc<BottomTabViewEvent, BottomTabViewState> {
  BottomTabViewBloc() : super(BottomTabViewInitial()) {
    // on<BottomTabViewInitialFetchEvent>(bottomTabViewInitialFetchEvent);
  }
}
