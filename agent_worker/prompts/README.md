# Prompt System Architecture

This directory contains a comprehensive prompt management system built using proper LLD (Low-Level Design) principles and design patterns. The system provides flexible, extensible, and maintainable prompt management for various AI therapy roles.

## Architecture Overview

The prompt system implements several design patterns to ensure scalability, maintainability, and flexibility:

### Design Patterns Used

1. **Strategy Pattern** - Different prompt types implement different strategies
2. **Factory Pattern** - Centralized prompt creation with type safety
3. **Template Method Pattern** - Common prompt structure with customizable parts
4. **Builder Pattern** - Complex prompt construction with fluent interface
5. **Singleton Pattern** - Global prompt registry management
6. **Observer Pattern** - Event-driven prompt updates and monitoring

## Directory Structure

```
prompts/
├── __init__.py              # Package initialization
├── base.py                  # Base classes and enums
├── factory.py               # Factory pattern implementation
├── registry.py              # Singleton registry with observer pattern
├── builder.py               # Builder pattern for complex prompts
├── example_usage.py         # Comprehensive usage examples
├── README.md               # This documentation
└── types/                  # Specific prompt implementations
    ├── __init__.py
    ├── general_therapist.py
    ├── meditation_guide.py
    ├── sleep_specialist.py
    └── anxiety_specialist.py
```

## Core Components

### 1. Base Classes (`base.py`)

- **`PromptType`** - Enumeration of available prompt types
- **`PromptContext`** - Data class for prompt context information
- **`BasePrompt`** - Abstract base class implementing Strategy and Template Method patterns

### 2. Factory (`factory.py`)

- **`PromptFactory`** - Centralized prompt creation with type safety
- Supports both enum-based and string-based prompt creation
- Extensible for new prompt types

### 3. Registry (`registry.py`)

- **`PromptRegistry`** - Singleton for managing prompt instances
- Observer pattern for monitoring changes
- Configuration management
- Statistics and monitoring

### 4. Builder (`builder.py`)

- **`PromptBuilder`** - Fluent interface for complex prompt construction
- Supports custom sections, parameters, and templates
- Context-aware prompt building

### 5. Prompt Types (`types/`)

Each prompt type implements the `BasePrompt` interface:

- **`GeneralTherapistPrompt`** - General mental health support
- **`MeditationGuidePrompt`** - Meditation and mindfulness guidance
- **`SleepSpecialistPrompt`** - Sleep health and wellness
- **`AnxietySpecialistPrompt`** - Anxiety management and coping

## Usage Examples

### Basic Usage

```python
from prompts import PromptFactory, PromptType, PromptContext

# Create context
context = PromptContext(
    user_id="user123",
    current_mood="anxious",
    expertise_level="beginner"
)

# Create prompt using factory
therapist_prompt = PromptFactory.create_prompt(PromptType.GENERAL_THERAPIST, context)

# Get the prompt text
prompt_text = therapist_prompt.get_prompt()
```

### Registry Usage

```python
from prompts import PromptRegistry

# Get singleton registry
registry = PromptRegistry()

# Register a prompt
registry.register_prompt("user123_therapist", therapist_prompt)

# Set configuration
registry.set_configuration("user123_therapist", {
    "session_count": 5,
    "preferred_style": "cbt_focused"
})

# Retrieve prompt
retrieved_prompt = registry.get_prompt("user123_therapist")
```

### Builder Usage

```python
from prompts import PromptBuilder

# Create complex prompt using builder
complex_prompt = (PromptBuilder()
    .set_prompt_type(PromptType.ANXIETY_SPECIALIST)
    .set_user_id("user789")
    .set_user_preferences({
        "anxiety_type": "social_anxiety",
        "anxiety_severity": "moderate"
    })
    .set_current_mood("nervous")
    .add_custom_section("SPECIAL_INSTRUCTIONS", "Focus on workplace anxiety")
    .build())
```

### Observer Pattern

```python
def registry_observer(event_type: str, data: dict):
    print(f"Registry event: {event_type} - {data}")

registry = PromptRegistry()
registry.add_observer(registry_observer)

# All registry operations will now trigger the observer
registry.register_prompt("test", prompt)
```

## Adding New Prompt Types

1. **Create the prompt class** in `types/`:

```python
from ..base import BasePrompt, PromptType
from typing import Dict

class NewSpecialistPrompt(BasePrompt):
    def _get_base_prompt(self) -> str:
        return "Your base prompt template here..."
    
    def _get_customizations(self) -> Dict[str, str]:
        return {}  # Add customizations based on context
    
    def _get_prompt_type(self) -> PromptType:
        return PromptType.NEW_SPECIALIST  # Add to enum
```

2. **Update the enum** in `base.py`:

```python
class PromptType(Enum):
    # ... existing types ...
    NEW_SPECIALIST = "new_specialist"
```

3. **Register in factory** in `factory.py`:

```python
_prompt_classes: Dict[PromptType, Type[BasePrompt]] = {
    # ... existing mappings ...
    PromptType.NEW_SPECIALIST: NewSpecialistPrompt,
}
```

## Context Customization

The system supports rich context customization:

- **User ID and Session ID** - For tracking and personalization
- **User Preferences** - Custom behavior and focus areas
- **Conversation History** - Context-aware responses
- **Current Mood** - Mood-appropriate responses
- **Expertise Level** - Skill-appropriate guidance

## Benefits of This Architecture

1. **Extensibility** - Easy to add new prompt types
2. **Maintainability** - Clear separation of concerns
3. **Testability** - Each component can be tested independently
4. **Flexibility** - Multiple ways to create and customize prompts
5. **Type Safety** - Strong typing throughout the system
6. **Observability** - Built-in monitoring and event tracking
7. **Reusability** - Components can be reused across different scenarios

## Running Examples

To see all patterns in action:

```python
from prompts.example_usage import run_all_examples

# Run comprehensive examples
results = run_all_examples()
```

This will demonstrate:
- Basic prompt creation
- Registry management
- Builder pattern usage
- Observer pattern
- Context updates
- String-based creation

## Best Practices

1. **Use the Factory** for standard prompt creation
2. **Use the Builder** for complex, customized prompts
3. **Use the Registry** for prompt lifecycle management
4. **Leverage Context** for personalization
5. **Add Observers** for monitoring and logging
6. **Follow the Template Method** when extending prompts
7. **Use Type Hints** for better code clarity

## Error Handling

The system includes comprehensive error handling:

- Invalid prompt types raise `ValueError`
- Missing required components are caught during build
- Observer errors don't break the notification chain
- Registry operations are safe and idempotent

This architecture provides a solid foundation for scalable prompt management in AI therapy applications. 