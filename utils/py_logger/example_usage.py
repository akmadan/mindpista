"""
Simple example showing how to use the logger in your worker.
"""

import sys
import os

# Add the parent directory to the path so we can import the logger
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from py_logger import get_logger, get_config, LogContext


def example_basic_usage():
    """Example of basic logger usage."""
    print("=== Basic Logger Usage ===")
    
    # Get logger with default configuration
    logger = get_logger("ai_therapist")
    
    # Basic logging
    logger.info("AI Therapist starting up")
    logger.debug("Debug information")
    logger.warning("Warning message")
    logger.error("Error occurred")
    
    # Logging with extra data
    logger.info("User session started", user_id="user123", session_type="therapy")
    
    # Logging exceptions
    try:
        raise ValueError("Something went wrong")
    except Exception as e:
        logger.log_exception("Failed to process request", e, user_id="user123")


def example_with_context():
    """Example of using logging context."""
    print("\n=== Context Usage ===")
    
    logger = get_logger("ai_therapist")
    
    # Set context for the entire session
    context = LogContext(
        user_id="user456",
        session_id="session789",
        therapist_role="anxiety_specialist",
        room_id="room123"
    )
    
    logger.set_context(context)
    
    # All logs will now include the context
    logger.info("Therapist session started")
    logger.info("User requested breathing exercise")
    logger.info("Session completed successfully")
    
    # Clear context when done
    logger.clear_context()


def example_with_context_manager():
    """Example using context manager."""
    print("\n=== Context Manager Usage ===")
    
    logger = get_logger("ai_therapist")
    
    # Use context manager for temporary context
    with logger.context(user_id="user789", therapist_role="meditation_guide"):
        logger.info("Meditation session started")
        logger.info("Guided user through breathing exercise")
        logger.info("Session ended")
    
    # Context is automatically cleared


def example_performance_timing():
    """Example of performance timing."""
    print("\n=== Performance Timing ===")
    
    logger = get_logger("ai_therapist")
    
    # Time an operation
    with logger.performance_timer("generate_response", user_id="user123"):
        # Simulate some work
        import time
        time.sleep(0.1)
        logger.info("Generated AI response")


def example_different_configurations():
    """Example of different logging configurations."""
    print("\n=== Different Configurations ===")
    
    # Development configuration (verbose, colored output)
    dev_config = get_config("development")
    dev_logger = get_logger("dev_logger", dev_config)
    dev_logger.info("Development mode logging")
    
    # Production configuration (JSON format, file rotation)
    prod_config = get_config("production")
    prod_logger = get_logger("prod_logger", prod_config)
    prod_logger.info("Production mode logging")
    
    # Testing configuration (minimal output)
    test_config = get_config("testing")
    test_logger = get_logger("test_logger", test_config)
    test_logger.info("Testing mode logging")


def example_worker_integration():
    """Example of how to integrate with your worker."""
    print("\n=== Worker Integration Example ===")
    
    # Get logger for the worker
    logger = get_logger("ai_therapist_worker")
    
    # Simulate worker startup
    logger.info("AI Therapist Worker starting", version="1.0.0")
    
    # Simulate room connection
    with logger.context(room_id="room456", therapist_role="general_therapist"):
        logger.info("Room connected")
        logger.info("User joined", user_id="user123")
        
        # Simulate message processing
        with logger.performance_timer("process_message", message_type="text"):
            logger.info("Processing user message", message_length=50)
            logger.info("Generated response", response_length=120)
        
        # Simulate tool usage
        logger.log_tool_usage("breathing_exercise", "user123", duration="5_minutes")
        
        # Simulate session end
        logger.info("User left session")
    
    logger.info("Worker shutdown complete")


if __name__ == "__main__":
    print("Logger Usage Examples")
    print("=" * 50)
    
    example_basic_usage()
    example_with_context()
    example_with_context_manager()
    example_performance_timing()
    example_different_configurations()
    example_worker_integration()
    
    print("\n" + "=" * 50)
    print("All examples completed!")
    print("Check the logs/ directory for log files.") 