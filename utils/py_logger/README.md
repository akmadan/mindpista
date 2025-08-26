# AI Therapist Logger

A simple, production-ready logging system for the AI therapist worker.

## Quick Start

```python
from utils.py_logger import get_logger, LogContext

# Get a logger
logger = get_logger("ai_therapist")

# Basic logging
logger.info("AI Therapist starting up")
logger.error("Something went wrong")

# Logging with context
with logger.context(user_id="user123", therapist_role="anxiety_specialist"):
    logger.info("Session started")
    logger.info("User requested breathing exercise")
```

## Features

- **Structured Logging**: Log with context and extra data
- **Multiple Handlers**: Console, file, rotating files, JSON
- **Performance Timing**: Time operations easily
- **Context Management**: Set context for entire sessions
- **Environment Configs**: Different configs for dev/prod/test

## Basic Usage

### 1. Get a Logger

```python
from utils.py_logger import get_logger

logger = get_logger("ai_therapist")
```

### 2. Basic Logging

```python
logger.debug("Debug information")
logger.info("Info message")
logger.warning("Warning message")
logger.error("Error message")
logger.critical("Critical error")
```

### 3. Logging with Extra Data

```python
logger.info("User session started", 
           user_id="user123", 
           session_type="therapy",
           duration="30_minutes")
```

### 4. Logging Exceptions

```python
try:
    # Some code that might fail
    raise ValueError("Something went wrong")
except Exception as e:
    logger.log_exception("Failed to process request", e, user_id="user123")
```

## Context Management

### Set Context for Entire Session

```python
from utils.py_logger import LogContext

context = LogContext(
    user_id="user456",
    session_id="session789",
    therapist_role="anxiety_specialist",
    room_id="room123"
)

logger.set_context(context)

# All logs will include this context
logger.info("Session started")
logger.info("User requested tool")

# Clear when done
logger.clear_context()
```

### Use Context Manager (Recommended)

```python
with logger.context(user_id="user789", therapist_role="meditation_guide"):
    logger.info("Meditation session started")
    logger.info("Guided breathing exercise")
    logger.info("Session ended")
# Context automatically cleared
```

## Performance Timing

```python
with logger.performance_timer("generate_response", user_id="user123"):
    # Your code here
    response = generate_ai_response()
    logger.info("Generated response", response_length=len(response))
```

## Specialized Logging Methods

```python
# Log user interactions
logger.log_user_interaction("tool_used", "user123", tool_name="breathing_exercise")

# Log therapist sessions
logger.log_therapist_session("anxiety_specialist", "session456")

# Log tool usage
logger.log_tool_usage("meditation_guide", "user123", duration="10_minutes")
```

## Configuration

### Different Environments

```python
from utils.py_logger import get_config

# Development (verbose, colored output)
dev_config = get_config("development")
logger = get_logger("dev_logger", dev_config)

# Production (JSON format, file rotation)
prod_config = get_config("production")
logger = get_logger("prod_logger", prod_config)

# Testing (minimal output)
test_config = get_config("testing")
logger = get_logger("test_logger", test_config)
```

### Custom Configuration

```python
from utils.py_logger import LogConfig, HandlerConfig, LogLevel

config = LogConfig(
    level=LogLevel.DEBUG,
    json_format=True,
    handlers=[
        HandlerConfig(
            type="console",
            level=LogLevel.INFO,
            formatter="color"
        ),
        HandlerConfig(
            type="file",
            level=LogLevel.DEBUG,
            formatter="json",
            config={"filename": "logs/custom.log"}
        )
    ]
)

logger = get_logger("custom_logger", config)
```

## Integration with Worker

Here's how to integrate with your `worker.py`:

```python
# At the top of worker.py
from utils.py_logger import get_logger, LogContext

# Get logger
logger = get_logger("ai_therapist_worker")

async def entrypoint(ctx: agents.JobContext):
    # Set up context from room metadata
    room_metadata = ctx.room.metadata or {}
    
    if room_metadata:
        role_type = room_metadata.get("therapist_role", "therapist")
        user_name = room_metadata.get("user_name", "User")
        
        # Set logging context
        context = LogContext(
            user_id=user_name,
            room_id=ctx.room.name,
            therapist_role=role_type,
            session_id=str(uuid.uuid4())
        )
        logger.set_context(context)
        
        logger.info("AI Therapist Agent starting", role=role_type, user=user_name)
    else:
        logger.info("Starting in console mode")
    
    try:
        # Your existing code here...
        logger.info("Session started successfully")
        
    except Exception as e:
        logger.log_exception("Failed to start session", e)
        raise
```

## Log Files

The logger creates log files in the `logs/` directory:

- `logs/ai_therapist.log` - Main application logs
- `logs/development.log` - Development logs
- `logs/app.json` - JSON formatted logs

## Example Output

### Console Output (Development)
```
2024-01-15 10:30:15 - ai_therapist - INFO - AI Therapist starting up
2024-01-15 10:30:16 - ai_therapist - INFO - User session started | Context: {'user_id': 'user123', 'therapist_role': 'anxiety_specialist'}
```

### JSON Output (Production)
```json
{"timestamp": "2024-01-15T10:30:15.123456", "level": "INFO", "logger": "ai_therapist", "message": "AI Therapist starting up", "context": {"user_id": "user123"}, "extra": {}}
```

## Best Practices

1. **Use Context Managers**: Prefer `with logger.context()` over manual context setting
2. **Include Relevant Data**: Always log user_id, session_id, and therapist_role when available
3. **Use Performance Timing**: Time important operations
4. **Log Exceptions**: Use `log_exception()` for proper error tracking
5. **Use Appropriate Levels**: 
   - DEBUG: Detailed debugging info
   - INFO: General information
   - WARNING: Something unexpected but handled
   - ERROR: Errors that need attention
   - CRITICAL: System-breaking errors

## Running Examples

```bash
cd utils/py_logger
python example_usage.py
```

This will demonstrate all the features and create sample log files. 