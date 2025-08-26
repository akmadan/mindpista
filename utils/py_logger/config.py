"""
Configuration classes for the logging system.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
from .logger import LogLevel


@dataclass
class HandlerConfig:
    """Configuration for a logging handler."""
    type: str  # console, file, rotating, json
    level: LogLevel = LogLevel.INFO
    formatter: Optional[str] = None
    config: Dict[str, Any] = field(default_factory=dict)


@dataclass
class LogConfig:
    """Main logging configuration."""
    level: LogLevel = LogLevel.INFO
    json_format: bool = False
    handlers: List[HandlerConfig] = field(default_factory=list)
    
    def __post_init__(self):
        """Set up default configuration if none provided."""
        if not self.handlers:
            self.handlers = [
                HandlerConfig(
                    type="console",
                    level=LogLevel.INFO,
                    formatter="standard"
                ),
                HandlerConfig(
                    type="file",
                    level=LogLevel.DEBUG,
                    formatter="json",
                    config={
                        "filename": "logs/ai_therapist.log",
                        "mode": "a"
                    }
                )
            ]


# Default configurations for common scenarios
DEFAULT_CONFIGS = {
    "development": {
        "level": "DEBUG",
        "json_format": False,
        "handlers": [
            {
                "type": "console",
                "level": "DEBUG",
                "formatter": "color"
            },
            {
                "type": "file",
                "level": "DEBUG",
                "formatter": "json",
                "config": {
                    "filename": "logs/development.log"
                }
            }
        ]
    },
    "production": {
        "level": "INFO",
        "json_format": True,
        "handlers": [
            {
                "type": "console",
                "level": "WARNING",
                "formatter": "standard"
            },
            {
                "type": "rotating",
                "level": "INFO",
                "formatter": "json",
                "config": {
                    "filename": "logs/ai_therapist.log",
                    "max_bytes": 10485760,  # 10MB
                    "backup_count": 5
                }
            }
        ]
    },
    "testing": {
        "level": "WARNING",
        "json_format": False,
        "handlers": [
            {
                "type": "console",
                "level": "WARNING",
                "formatter": "standard"
            }
        ]
    }
}


def get_config(environment: str = "development") -> LogConfig:
    """Get configuration for the specified environment."""
    if environment in DEFAULT_CONFIGS:
        config_dict = DEFAULT_CONFIGS[environment]
        
        level = LogLevel[config_dict.get("level", "INFO").upper()]
        json_format = config_dict.get("json_format", False)
        
        handlers = []
        for handler_dict in config_dict.get("handlers", []):
            handler = HandlerConfig(
                type=handler_dict["type"],
                level=LogLevel[handler_dict.get("level", "INFO").upper()],
                formatter=handler_dict.get("formatter"),
                config=handler_dict.get("config", {})
            )
            handlers.append(handler)
        
        return LogConfig(
            level=level,
            json_format=json_format,
            handlers=handlers
        )
    else:
        return LogConfig() 