"""
Example usage of the prompt system.
Demonstrates all design patterns and usage scenarios.
"""

from typing import Dict, Any
from base import PromptType, PromptContext
from factory import PromptFactory
from registry import PromptRegistry
from builder import PromptBuilder


def example_basic_usage():
    """Example of basic prompt creation and usage."""
    print("=== Basic Usage Example ===")
    
    # Create a simple prompt using the factory
    context = PromptContext(
        user_id="user123",
        current_mood="anxious",
        expertise_level="beginner"
    )
    
    # Create different types of prompts
    therapist_prompt = PromptFactory.create_prompt(PromptType.GENERAL_THERAPIST, context)
    meditation_prompt = PromptFactory.create_prompt(PromptType.MEDITATION_GUIDE, context)
    
    print(f"Therapist prompt type: {therapist_prompt.get_prompt_type().value}")
    print(f"Meditation prompt type: {meditation_prompt.get_prompt_type().value}")
    
    # Get the actual prompt text
    therapist_text = therapist_prompt.get_prompt()
    print(f"Therapist prompt length: {len(therapist_text)} characters")
    
    return therapist_prompt, meditation_prompt


def example_registry_usage():
    """Example of using the registry to manage prompts."""
    print("\n=== Registry Usage Example ===")
    
    # Get the singleton registry instance
    registry = PromptRegistry()
    
    # Create and register prompts
    context = PromptContext(user_id="user456", session_id="session789")
    
    therapist_prompt = PromptFactory.create_prompt(PromptType.GENERAL_THERAPIST, context)
    sleep_prompt = PromptFactory.create_prompt(PromptType.SLEEP_SPECIALIST, context)
    
    # Register prompts with names
    registry.register_prompt("user456_therapist", therapist_prompt)
    registry.register_prompt("user456_sleep", sleep_prompt)
    
    # Set configurations
    registry.set_configuration("user456_therapist", {
        "session_count": 5,
        "preferred_style": "cbt_focused"
    })
    
    # Retrieve prompts
    retrieved_therapist = registry.get_prompt("user456_therapist")
    config = registry.get_configuration("user456_therapist")
    
    print(f"Retrieved therapist prompt: {retrieved_therapist is not None}")
    print(f"Therapist configuration: {config}")
    
    # Get statistics
    stats = registry.get_statistics()
    print(f"Registry statistics: {stats}")
    
    return registry


def example_builder_usage():
    """Example of using the builder pattern for complex prompts."""
    print("\n=== Builder Usage Example ===")
    
    # Create a complex prompt using the builder
    builder = PromptBuilder()
    
    complex_prompt = (builder
        .set_prompt_type(PromptType.ANXIETY_SPECIALIST)
        .set_user_id("user789")
        .set_session_id("session_anxiety_001")
        .set_user_preferences({
            "anxiety_type": "social_anxiety",
            "anxiety_severity": "moderate",
            "anxiety_triggers": "work_meetings"
        })
        .set_current_mood("nervous")
        .set_expertise_level("intermediate")
        .add_custom_section("SPECIAL_INSTRUCTIONS", "Focus on workplace social anxiety and meeting preparation techniques")
        .set_parameter("session_duration", "45_minutes")
        .build())
    
    print(f"Built complex prompt type: {complex_prompt.get_prompt_type().value}")
    print(f"Complex prompt metadata: {complex_prompt.get_metadata()}")
    
    return complex_prompt


def example_observer_usage():
    """Example of using the observer pattern with the registry."""
    print("\n=== Observer Usage Example ===")
    
    def registry_observer(event_type: str, data: Dict[str, Any]):
        """Observer function to monitor registry changes."""
        print(f"Registry event: {event_type} - {data}")
    
    # Get registry and add observer
    registry = PromptRegistry()
    registry.add_observer(registry_observer)
    
    # Create and register a prompt (this will trigger the observer)
    context = PromptContext(user_id="observer_test")
    prompt = PromptFactory.create_prompt(PromptType.MEDITATION_GUIDE, context)
    registry.register_prompt("observer_test_prompt", prompt)
    
    # Update configuration (this will also trigger the observer)
    registry.set_configuration("observer_test_prompt", {"test": "value"})
    
    # Remove observer
    registry.remove_observer(registry_observer)
    
    return registry


def example_context_updates():
    """Example of updating prompt context dynamically."""
    print("\n=== Context Updates Example ===")
    
    # Create initial prompt
    initial_context = PromptContext(
        user_id="dynamic_user",
        current_mood="stressed",
        expertise_level="beginner"
    )
    
    prompt = PromptFactory.create_prompt(PromptType.GENERAL_THERAPIST, initial_context)
    print(f"Initial prompt mood: {prompt.context.current_mood}")
    
    # Update context
    new_context = PromptContext(
        user_id="dynamic_user",
        current_mood="calm",
        expertise_level="intermediate",
        user_preferences={"therapy_style": "mindfulness_based"}
    )
    
    prompt.update_context(new_context)
    print(f"Updated prompt mood: {prompt.context.current_mood}")
    print(f"Updated prompt preferences: {prompt.context.user_preferences}")
    
    return prompt


def example_string_based_creation():
    """Example of creating prompts from string representations."""
    print("\n=== String-Based Creation Example ===")
    
    # Create prompts using string representations
    prompt_types = ["therapist", "meditation", "sleep", "anxiety"]
    
    for prompt_type_str in prompt_types:
        try:
            prompt = PromptFactory.create_prompt_from_string(prompt_type_str)
            print(f"Successfully created {prompt_type_str} prompt: {prompt.get_prompt_type().value}")
        except ValueError as e:
            print(f"Error creating {prompt_type_str} prompt: {e}")


def run_all_examples():
    """Run all examples to demonstrate the complete system."""
    print("Running Prompt System Examples")
    print("=" * 50)
    
    # Run all examples
    therapist_prompt, meditation_prompt = example_basic_usage()
    registry = example_registry_usage()
    complex_prompt = example_builder_usage()
    registry_with_observer = example_observer_usage()
    dynamic_prompt = example_context_updates()
    example_string_based_creation()
    
    print("\n" + "=" * 50)
    print("All examples completed successfully!")
    
    return {
        "therapist_prompt": therapist_prompt,
        "meditation_prompt": meditation_prompt,
        "registry": registry,
        "complex_prompt": complex_prompt,
        "dynamic_prompt": dynamic_prompt
    }


if __name__ == "__main__":
    run_all_examples() 