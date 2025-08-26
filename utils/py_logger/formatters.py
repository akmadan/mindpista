"""
Log formatters for different output formats.
"""

import logging
import json
from datetime import datetime
from typing import Dict, Any, Optional


class StandardFormatter(logging.Formatter):
    """Standard log formatter with timestamp and structured data."""
    
    def __init__(self):
        super().__init__(
            fmt='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )
    
    def format(self, record):
        """Format log record with extra context."""
        # Add context information if available
        if hasattr(record, 'context'):
            record.msg = f"{record.msg} | Context: {record.context}"
        
        if hasattr(record, 'extra'):
            record.msg = f"{record.msg} | Extra: {record.extra}"
        
        return super().format(record)


class JSONFormatter(logging.Formatter):
    """JSON formatter for structured logging."""
    
    def __init__(self):
        super().__init__()
    
    def format(self, record):
        """Format log record as JSON."""
        log_entry = {
            'timestamp': self.formatTime(record),
            'level': record.levelname,
            'logger': record.name,
            'message': record.getMessage(),
            'module': record.module,
            'function': record.funcName,
            'line': record.lineno,
            'process': record.process,
            'thread': record.thread
        }
        
        # Add context information if available
        if hasattr(record, 'context'):
            log_entry['context'] = record.context
        
        if hasattr(record, 'extra'):
            log_entry['extra'] = record.extra
        
        # Add exception information if present
        if record.exc_info:
            log_entry['exception'] = self.formatException(record.exc_info)
        
        return json.dumps(log_entry)


class StructuredFormatter(logging.Formatter):
    """Structured formatter with key-value pairs."""
    
    def __init__(self):
        super().__init__()
    
    def format(self, record):
        """Format log record in structured key-value format."""
        parts = [
            f"timestamp={self.formatTime(record)}",
            f"level={record.levelname}",
            f"logger={record.name}",
            f"message={record.getMessage()}"
        ]
        
        # Add context information if available
        if hasattr(record, 'context'):
            for key, value in record.context.items():
                parts.append(f"{key}={value}")
        
        if hasattr(record, 'extra'):
            for key, value in record.extra.items():
                parts.append(f"{key}={value}")
        
        # Add exception information if present
        if record.exc_info:
            parts.append(f"exception={self.formatException(record.exc_info)}")
        
        return " | ".join(parts)


class ColorFormatter(logging.Formatter):
    """Colorized formatter for console output."""
    
    # ANSI color codes
    COLORS = {
        'DEBUG': '\033[36m',      # Cyan
        'INFO': '\033[32m',       # Green
        'WARNING': '\033[33m',    # Yellow
        'ERROR': '\033[31m',      # Red
        'CRITICAL': '\033[35m',   # Magenta
        'RESET': '\033[0m'        # Reset
    }
    
    def __init__(self):
        super().__init__(
            fmt='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )
    
    def format(self, record):
        """Format log record with color coding."""
        # Get color for log level
        color = self.COLORS.get(record.levelname, self.COLORS['RESET'])
        reset = self.COLORS['RESET']
        
        # Format the base message
        formatted = super().format(record)
        
        # Add color to level name
        formatted = formatted.replace(
            record.levelname,
            f"{color}{record.levelname}{reset}"
        )
        
        # Add context information if available
        if hasattr(record, 'context'):
            context_str = f" | Context: {record.context}"
            formatted += f"\033[90m{context_str}\033[0m"  # Gray color
        
        if hasattr(record, 'extra'):
            extra_str = f" | Extra: {record.extra}"
            formatted += f"\033[90m{extra_str}\033[0m"  # Gray color
        
        return formatted


class CompactFormatter(logging.Formatter):
    """Compact formatter for high-volume logging."""
    
    def __init__(self):
        super().__init__(
            fmt='%(asctime)s %(levelname)s %(name)s: %(message)s',
            datefmt='%H:%M:%S'
        )
    
    def format(self, record):
        """Format log record in compact format."""
        formatted = super().format(record)
        
        # Add minimal context if available
        if hasattr(record, 'context') and record.context:
            # Only show user_id and session_id for compactness
            context = record.context
            compact_context = {}
            if 'user_id' in context:
                compact_context['user'] = context['user_id']
            if 'session_id' in context:
                compact_context['session'] = context['session_id']
            
            if compact_context:
                formatted += f" | {compact_context}"
        
        return formatted


class DetailedFormatter(logging.Formatter):
    """Detailed formatter with comprehensive information."""
    
    def __init__(self):
        super().__init__(
            fmt='%(asctime)s - %(name)s - %(levelname)s - %(module)s:%(funcName)s:%(lineno)d - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S.%f'
        )
    
    def format(self, record):
        """Format log record with detailed information."""
        formatted = super().format(record)
        
        # Add comprehensive context information
        if hasattr(record, 'context'):
            formatted += f"\nContext: {json.dumps(record.context, indent=2)}"
        
        if hasattr(record, 'extra'):
            formatted += f"\nExtra: {json.dumps(record.extra, indent=2)}"
        
        # Add exception information if present
        if record.exc_info:
            formatted += f"\nException: {self.formatException(record.exc_info)}"
        
        return formatted


class PerformanceFormatter(logging.Formatter):
    """Specialized formatter for performance logging."""
    
    def __init__(self):
        super().__init__(
            fmt='%(asctime)s - PERFORMANCE - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S.%f'
        )
    
    def format(self, record):
        """Format performance log record."""
        formatted = super().format(record)
        
        # Add performance-specific information
        if hasattr(record, 'operation'):
            formatted += f" | Operation: {record.operation}"
        
        if hasattr(record, 'duration'):
            formatted += f" | Duration: {record.duration:.3f}s"
        
        if hasattr(record, 'context'):
            # Filter for performance-relevant context
            perf_context = {
                k: v for k, v in record.context.items()
                if k in ['user_id', 'session_id', 'room_id', 'therapist_role']
            }
            if perf_context:
                formatted += f" | Context: {perf_context}"
        
        return formatted


class SecurityFormatter(logging.Formatter):
    """Specialized formatter for security-related logging."""
    
    def __init__(self):
        super().__init__(
            fmt='%(asctime)s - SECURITY - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )
    
    def format(self, record):
        """Format security log record with sensitive data handling."""
        formatted = super().format(record)
        
        # Add security-specific information
        if hasattr(record, 'context'):
            # Sanitize sensitive information
            sanitized_context = self._sanitize_context(record.context)
            formatted += f" | Context: {sanitized_context}"
        
        if hasattr(record, 'extra'):
            # Sanitize extra data
            sanitized_extra = self._sanitize_context(record.extra)
            formatted += f" | Extra: {sanitized_extra}"
        
        return formatted
    
    def _sanitize_context(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Sanitize sensitive information in context."""
        sanitized = {}
        sensitive_keys = ['password', 'token', 'secret', 'key', 'auth']
        
        for key, value in context.items():
            if any(sensitive in key.lower() for sensitive in sensitive_keys):
                sanitized[key] = '***REDACTED***'
            else:
                sanitized[key] = value
        
        return sanitized 