"""
Builder for constructing complex prompts.
Implements the Builder pattern.
"""

from typing import Dict, Any, Optional, List
from .base import BasePrompt, PromptContext, PromptType


class PromptBuilder:
    """
    Builder class for constructing complex prompts.
    Implements the Builder pattern for flexible prompt creation.
    """
    
    def __init__(self):
        self._context = PromptContext()
        self._custom_sections: Dict[str, str] = {}
        self._parameters: Dict[str, Any] = {}
        self._prompt_type: Optional[PromptType] = None
        self._base_template: Optional[str] = None
    
    def set_prompt_type(self, prompt_type: PromptType) -> 'PromptBuilder':
        """Set the type of prompt to build."""
        self._prompt_type = prompt_type
        return self
    
    def set_user_id(self, user_id: str) -> 'PromptBuilder':
        """Set the user ID in the context."""
        self._context.user_id = user_id
        return self
    
    def set_session_id(self, session_id: str) -> 'PromptBuilder':
        """Set the session ID in the context."""
        self._context.session_id = session_id
        return self
    
    def set_user_preferences(self, preferences: Dict[str, Any]) -> 'PromptBuilder':
        """Set user preferences in the context."""
        self._context.user_preferences = preferences
        return self
    
    def set_conversation_history(self, history: List[Dict[str, Any]]) -> 'PromptBuilder':
        """Set conversation history in the context."""
        self._context.conversation_history = history
        return self
    
    def set_current_mood(self, mood: str) -> 'PromptBuilder':
        """Set current mood in the context."""
        self._context.current_mood = mood
        return self
    
    def set_expertise_level(self, level: str) -> 'PromptBuilder':
        """Set expertise level in the context."""
        self._context.expertise_level = level
        return self
    
    def add_custom_section(self, section_name: str, content: str) -> 'PromptBuilder':
        """Add a custom section to the prompt."""
        self._custom_sections[section_name] = content
        return self
    
    def set_parameter(self, key: str, value: Any) -> 'PromptBuilder':
        """Set a parameter for the prompt."""
        self._parameters[key] = value
        return self
    
    def set_base_template(self, template: str) -> 'PromptBuilder':
        """Set the base template for the prompt."""
        self._base_template = template
        return self
    
    def build(self) -> BasePrompt:
        """
        Build the final prompt instance.
        
        Returns:
            A configured BasePrompt instance
            
        Raises:
            ValueError: If required components are missing
        """
        if not self._prompt_type:
            raise ValueError("Prompt type must be set before building")
        
        # Create a custom prompt class if we have custom sections or base template
        if self._custom_sections or self._base_template:
            return self._build_custom_prompt()
        else:
            # Use the factory to create a standard prompt
            from .factory import PromptFactory
            return PromptFactory.create_prompt(self._prompt_type, self._context)
    
    def _build_custom_prompt(self) -> BasePrompt:
        """Build a custom prompt with additional sections."""
        
        class CustomPrompt(BasePrompt):
            def __init__(self, context: PromptContext, custom_sections: Dict[str, str], 
                         base_template: Optional[str], parameters: Dict[str, Any], prompt_type: PromptType):
                self._custom_sections = custom_sections
                self._base_template = base_template
                self._parameters = parameters
                self._prompt_type = prompt_type
                super().__init__(context)
            
            def _get_base_prompt(self) -> str:
                if self._base_template:
                    # Apply parameters to the base template
                    template = self._base_template
                    for key, value in self._parameters.items():
                        template = template.replace(f"{{{key}}}", str(value))
                    return template
                else:
                    # Use default template for the prompt type
                    from .factory import PromptFactory
                    default_prompt = PromptFactory.create_prompt(self._prompt_type, self.context)
                    return default_prompt._get_base_prompt()
            
            def _get_customizations(self) -> Dict[str, str]:
                return self._custom_sections
            
            def _get_prompt_type(self) -> PromptType:
                return self._prompt_type
        
        return CustomPrompt(self._context, self._custom_sections, self._base_template, self._parameters, self._prompt_type)
    
    def reset(self) -> 'PromptBuilder':
        """Reset the builder to initial state."""
        self._context = PromptContext()
        self._custom_sections.clear()
        self._parameters.clear()
        self._prompt_type = None
        self._base_template = None
        return self
    
    def get_context(self) -> PromptContext:
        """Get the current context."""
        return self._context
    
    def get_custom_sections(self) -> Dict[str, str]:
        """Get the custom sections."""
        return self._custom_sections.copy()
    
    def get_parameters(self) -> Dict[str, Any]:
        """Get the parameters."""
        return self._parameters.copy() 