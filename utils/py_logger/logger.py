"""
Core logging functionality with structured logging support.
"""

import logging
import sys
import time
import uuid
from datetime import datetime
from enum import Enum
from typing import Dict, Any, Optional, List
from dataclasses import dataclass, field
from contextlib import contextmanager
import traceback
import json


class LogLevel(Enum):
    """Log levels with numeric values for filtering."""
    DEBUG = logging.DEBUG
    INFO = logging.INFO
    WARNING = logging.WARNING
    ERROR = logging.ERROR
    CRITICAL = logging.CRITICAL


@dataclass
class LogContext:
    """Context information for structured logging."""
    user_id: Optional[str] = None
    session_id: Optional[str] = None
    room_id: Optional[str] = None
    therapist_role: Optional[str] = None
    request_id: Optional[str] = None
    correlation_id: Optional[str] = None
    metadata: Dict[str, Any] = field(default_factory=dict)
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert context to dictionary for logging."""
        return {
            'user_id': self.user_id,
            'session_id': self.session_id,
            'room_id': self.room_id,
            'therapist_role': self.therapist_role,
            'request_id': self.request_id,
            'correlation_id': self.correlation_id,
            'metadata': self.metadata
        }


class Logger:
    """
    Production-ready logger with structured logging capabilities.
    
    Features:
    - Multiple handlers (console, file, JSON)
    - Structured logging with context
    - Performance timing
    - Error tracking
    - Configurable formatting
    """
    
    def __init__(self, name: str = "ai_therapist", config: Optional['LogConfig'] = None):
        self.name = name
        if config is None:
            from .config import LogConfig
            self.config = LogConfig()
        else:
            self.config = config
        self._logger = logging.getLogger(name)
        self._setup_logger()
        self._context_stack: List[LogContext] = []
    
    def _setup_logger(self):
        """Setup the underlying logging configuration."""
        self._logger.setLevel(self.config.level.value)
        
        # Clear existing handlers
        for handler in self._logger.handlers[:]:
            self._logger.removeHandler(handler)
        
        # Add configured handlers
        for handler_config in self.config.handlers:
            handler = self._create_handler(handler_config)
            if handler:
                self._logger.addHandler(handler)
    
    def _create_handler(self, handler_config: 'HandlerConfig') -> Optional[logging.Handler]:
        """Create a handler based on configuration."""
        try:
            if handler_config.type == "console":
                from .handlers import ConsoleHandler
                return ConsoleHandler(handler_config)
            elif handler_config.type == "file":
                from .handlers import FileHandler
                return FileHandler(handler_config)
            elif handler_config.type == "rotating":
                from .handlers import RotatingFileHandler
                return RotatingFileHandler(handler_config)
            elif handler_config.type == "json":
                from .handlers import JSONHandler
                return JSONHandler(handler_config)
        except Exception as e:
            # Fallback to console handler if configuration fails
            print(f"Failed to create handler {handler_config.type}: {e}")
            return None
    
    def set_context(self, context: LogContext):
        """Set the current logging context."""
        self._context_stack.append(context)
    
    def clear_context(self):
        """Clear the current logging context."""
        if self._context_stack:
            self._context_stack.pop()
    
    @contextmanager
    def context(self, **kwargs):
        """Context manager for temporary logging context."""
        context = LogContext(**kwargs)
        self.set_context(context)
        try:
            yield
        finally:
            self.clear_context()
    
    def _get_current_context(self) -> Optional[LogContext]:
        """Get the current logging context."""
        return self._context_stack[-1] if self._context_stack else None
    
    def _format_message(self, level: LogLevel, message: str, **kwargs) -> str:
        """Format log message with context and extra data."""
        context = self._get_current_context()
        
        # Build structured log entry
        log_entry = {
            'timestamp': datetime.utcnow().isoformat(),
            'level': level.name,
            'logger': self.name,
            'message': message,
            'context': context.to_dict() if context else {},
            'extra': kwargs
        }
        
        return json.dumps(log_entry) if self.config.json_format else str(log_entry)
    
    def debug(self, message: str, **kwargs):
        """Log debug message."""
        self._log(LogLevel.DEBUG, message, **kwargs)
    
    def info(self, message: str, **kwargs):
        """Log info message."""
        self._log(LogLevel.INFO, message, **kwargs)
    
    def warning(self, message: str, **kwargs):
        """Log warning message."""
        self._log(LogLevel.WARNING, message, **kwargs)
    
    def error(self, message: str, **kwargs):
        """Log error message."""
        self._log(LogLevel.ERROR, message, **kwargs)
    
    def critical(self, message: str, **kwargs):
        """Log critical message."""
        self._log(LogLevel.CRITICAL, message, **kwargs)
    
    def _log(self, level: LogLevel, message: str, **kwargs):
        """Internal logging method."""
        formatted_message = self._format_message(level, message, **kwargs)
        self._logger.log(level.value, formatted_message)
    
    @contextmanager
    def performance_timer(self, operation: str, **kwargs):
        """Context manager for performance timing."""
        start_time = time.time()
        try:
            yield
        finally:
            duration = time.time() - start_time
            self.info(f"Performance: {operation} completed in {duration:.3f}s", 
                     operation=operation, duration=duration, **kwargs)
    
    def log_exception(self, message: str, exc_info: Optional[Exception] = None, **kwargs):
        """Log exception with full traceback."""
        if exc_info is None:
            exc_info = sys.exc_info()[1]
        
        self.error(f"{message}: {str(exc_info)}", 
                  exception_type=type(exc_info).__name__,
                  traceback=traceback.format_exc(),
                  **kwargs)
    
    def log_user_interaction(self, interaction_type: str, user_id: str, **kwargs):
        """Log user interaction for analytics."""
        self.info(f"User interaction: {interaction_type}", 
                 interaction_type=interaction_type,
                 user_id=user_id,
                 **kwargs)
    
    def log_therapist_session(self, therapist_role: str, session_id: str, **kwargs):
        """Log therapist session information."""
        self.info(f"Therapist session started", 
                 therapist_role=therapist_role,
                 session_id=session_id,
                 **kwargs)
    
    def log_tool_usage(self, tool_name: str, user_id: str, **kwargs):
        """Log tool usage for analytics."""
        self.info(f"Tool used: {tool_name}", 
                 tool_name=tool_name,
                 user_id=user_id,
                 **kwargs)
    
    def get_metrics(self) -> Dict[str, Any]:
        """Get current logging metrics."""
        return {
            'logger_name': self.name,
            'context_stack_size': len(self._context_stack),
            'current_context': self._get_current_context().to_dict() if self._get_current_context() else None
        }


# Global logger instance
_global_logger: Optional[Logger] = None


def get_logger(name: str = "ai_therapist", config: Optional['LogConfig'] = None) -> Logger:
    """Get or create a logger instance."""
    global _global_logger
    
    if _global_logger is None:
        _global_logger = Logger(name, config)
    
    return _global_logger


def set_global_logger(logger: Logger):
    """Set the global logger instance."""
    global _global_logger
    _global_logger = logger 