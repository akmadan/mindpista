enum AppLoggerMessageType {
  // things used while debugging and should ideally be removed before committing
  debug,
  // things that explain the flow of execution in the app
  info,
  // things that point to possible danger
  warning,
}
