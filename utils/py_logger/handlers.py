"""
Logging handlers for different output destinations.
"""

import logging
import logging.handlers
import json
import os
from typing import Dict, Any, Optional
from .config import HandlerConfig
from .formatters import StandardFormatter, JSONFormatter, StructuredFormatter, ColorFormatter


class ConsoleHandler(logging.StreamHandler):
    """Enhanced console handler with color support."""
    
    def __init__(self, config: HandlerConfig):
        super().__init__()
        self.config = config
        self.setLevel(config.level.value)
        self.setFormatter(self._get_formatter())
    
    def _get_formatter(self):
        """Get the appropriate formatter for this handler."""
        if self.config.formatter == "color":
            return ColorFormatter()
        elif self.config.formatter == "json":
            return JSONFormatter()
        elif self.config.formatter == "structured":
            return StructuredFormatter()
        else:
            return StandardFormatter()


class FileHandler(logging.FileHandler):
    """Enhanced file handler with directory creation."""
    
    def __init__(self, config: HandlerConfig):
        filename = config.config.get("filename", "logs/app.log")
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        
        mode = config.config.get("mode", "a")
        encoding = config.config.get("encoding", "utf-8")
        
        super().__init__(filename, mode, encoding)
        self.config = config
        self.setLevel(config.level.value)
        self.setFormatter(self._get_formatter())
    
    def _get_formatter(self):
        """Get the appropriate formatter for this handler."""
        if self.config.formatter == "json":
            return JSONFormatter()
        elif self.config.formatter == "structured":
            return StructuredFormatter()
        else:
            return StandardFormatter()


class RotatingFileHandler(logging.handlers.RotatingFileHandler):
    """Enhanced rotating file handler."""
    
    def __init__(self, config: HandlerConfig):
        filename = config.config.get("filename", "logs/app.log")
        max_bytes = config.config.get("max_bytes", 10 * 1024 * 1024)  # 10MB
        backup_count = config.config.get("backup_count", 5)
        encoding = config.config.get("encoding", "utf-8")
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        
        super().__init__(filename, maxBytes=max_bytes, backupCount=backup_count, encoding=encoding)
        self.config = config
        self.setLevel(config.level.value)
        self.setFormatter(self._get_formatter())
    
    def _get_formatter(self):
        """Get the appropriate formatter for this handler."""
        if self.config.formatter == "json":
            return JSONFormatter()
        elif self.config.formatter == "structured":
            return StructuredFormatter()
        else:
            return StandardFormatter()


class JSONHandler(logging.FileHandler):
    """Handler for JSON-formatted logs."""
    
    def __init__(self, config: HandlerConfig):
        filename = config.config.get("filename", "logs/app.json")
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        
        mode = config.config.get("mode", "a")
        encoding = config.config.get("encoding", "utf-8")
        
        super().__init__(filename, mode, encoding)
        self.config = config
        self.setLevel(config.level.value)
        self.setFormatter(JSONFormatter())
    
    def emit(self, record):
        """Emit a JSON-formatted log record."""
        try:
            # Convert record to JSON format
            log_entry = {
                'timestamp': self.formatter.formatTime(record),
                'level': record.levelname,
                'logger': record.name,
                'message': record.getMessage(),
                'module': record.module,
                'function': record.funcName,
                'line': record.lineno
            }
            
            # Add extra fields if present
            if hasattr(record, 'context'):
                log_entry['context'] = record.context
            
            if hasattr(record, 'extra'):
                log_entry['extra'] = record.extra
            
            # Write JSON line
            json_line = json.dumps(log_entry) + '\n'
            self.stream.write(json_line)
            self.flush()
            
        except Exception:
            self.handleError(record) 