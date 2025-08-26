"""
Factory for creating prompt instances.
Implements the Factory pattern.
"""

from typing import Dict, Type
from .base import BasePrompt, PromptType, PromptContext
from .types.general_therapist import GeneralTherapistPrompt
from .types.meditation_guide import MeditationGuidePrompt
from .types.sleep_specialist import SleepSpecialistPrompt
from .types.anxiety_specialist import AnxietySpecialistPrompt


class PromptFactory:
    """
    Factory class for creating prompt instances.
    Implements the Factory pattern for prompt creation.
    """
    
    _prompt_classes: Dict[PromptType, Type[BasePrompt]] = {
        PromptType.GENERAL_THERAPIST: GeneralTherapistPrompt,
        PromptType.MEDITATION_GUIDE: MeditationGuidePrompt,
        PromptType.SLEEP_SPECIALIST: SleepSpecialistPrompt,
        PromptType.ANXIETY_SPECIALIST: AnxietySpecialistPrompt,
    }
    
    @classmethod
    def create_prompt(cls, prompt_type: PromptType, context: PromptContext = None) -> BasePrompt:
        """
        Create a prompt instance of the specified type.
        
        Args:
            prompt_type: The type of prompt to create
            context: Optional context for the prompt
            
        Returns:
            A configured prompt instance
            
        Raises:
            ValueError: If the prompt type is not supported
        """
        if prompt_type not in cls._prompt_classes:
            raise ValueError(f"Unsupported prompt type: {prompt_type}")
        
        prompt_class = cls._prompt_classes[prompt_type]
        return prompt_class(context)
    
    @classmethod
    def create_prompt_from_string(cls, prompt_type_str: str, context: PromptContext = None) -> BasePrompt:
        """
        Create a prompt instance from a string representation of the type.
        
        Args:
            prompt_type_str: String representation of the prompt type
            context: Optional context for the prompt
            
        Returns:
            A configured prompt instance
            
        Raises:
            ValueError: If the prompt type string is not valid
        """
        try:
            prompt_type = PromptType(prompt_type_str)
            return cls.create_prompt(prompt_type, context)
        except ValueError:
            raise ValueError(f"Invalid prompt type string: {prompt_type_str}")
    
    @classmethod
    def get_available_types(cls) -> list[PromptType]:
        """Get all available prompt types."""
        return list(cls._prompt_classes.keys())
    
    @classmethod
    def register_prompt_type(cls, prompt_type: PromptType, prompt_class: Type[BasePrompt]) -> None:
        """
        Register a new prompt type and class.
        
        Args:
            prompt_type: The prompt type to register
            prompt_class: The class implementing the prompt
        """
        cls._prompt_classes[prompt_type] = prompt_class
    
    @classmethod
    def unregister_prompt_type(cls, prompt_type: PromptType) -> None:
        """
        Unregister a prompt type.
        
        Args:
            prompt_type: The prompt type to unregister
        """
        if prompt_type in cls._prompt_classes:
            del cls._prompt_classes[prompt_type] 