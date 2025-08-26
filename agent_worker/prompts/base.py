"""
Base classes and enums for the prompt system.
Implements the Strategy pattern and Template Method pattern.
"""

from abc import ABC, abstractmethod
from enum import Enum
from typing import Dict, Any, Optional
from dataclasses import dataclass


class PromptType(Enum):
    """Enumeration of available prompt types."""
    GENERAL_THERAPIST = "therapist"
    MEDITATION_GUIDE = "meditation"
    SLEEP_SPECIALIST = "sleep"
    ANXIETY_SPECIALIST = "anxiety"


@dataclass
class PromptContext:
    """Context data for prompt generation."""
    user_id: Optional[str] = None
    session_id: Optional[str] = None
    user_preferences: Optional[Dict[str, Any]] = None
    conversation_history: Optional[list] = None
    current_mood: Optional[str] = None
    expertise_level: Optional[str] = None


class BasePrompt(ABC):
    """
    Abstract base class for all system prompts.
    Implements the Strategy pattern and Template Method pattern.
    """
    
    def __init__(self, context: Optional[PromptContext] = None):
        self.context = context or PromptContext()
        self._base_prompt = self._get_base_prompt()
        self._customizations = self._get_customizations()
    
    @abstractmethod
    def _get_base_prompt(self) -> str:
        """Get the base prompt template."""
        pass
    
    @abstractmethod
    def _get_customizations(self) -> Dict[str, str]:
        """Get prompt customizations based on context."""
        pass
    
    def _apply_customizations(self, prompt: str) -> str:
        """Apply customizations to the base prompt."""
        for key, value in self._customizations.items():
            prompt = prompt.replace(f"{{{key}}}", value)
        return prompt
    
    def _add_contextual_info(self, prompt: str) -> str:
        """Add contextual information to the prompt."""
        if self.context.user_preferences:
            preferences = ", ".join([f"{k}: {v}" for k, v in self.context.user_preferences.items()])
            prompt += f"\n\nUSER PREFERENCES: {preferences}"
        
        if self.context.current_mood:
            prompt += f"\n\nCURRENT MOOD: {self.context.current_mood}"
        
        if self.context.expertise_level:
            prompt += f"\n\nEXPERTISE LEVEL: {self.context.expertise_level}"
        
        return prompt
    
    def get_prompt(self) -> str:
        """
        Template method that constructs the final prompt.
        This is the main interface for getting the complete prompt.
        """
        prompt = self._base_prompt
        prompt = self._apply_customizations(prompt)
        prompt = self._add_contextual_info(prompt)
        return self._finalize_prompt(prompt)
    
    def _finalize_prompt(self, prompt: str) -> str:
        """Final processing step for the prompt."""
        return prompt.strip()
    
    def get_prompt_type(self) -> PromptType:
        """Get the type of this prompt."""
        return self._get_prompt_type()
    
    @abstractmethod
    def _get_prompt_type(self) -> PromptType:
        """Return the specific prompt type."""
        pass
    
    def update_context(self, context: PromptContext) -> None:
        """Update the prompt context."""
        self.context = context
        self._customizations = self._get_customizations()
    
    def get_metadata(self) -> Dict[str, Any]:
        """Get metadata about this prompt."""
        return {
            "type": self.get_prompt_type().value,
            "context": self.context,
            "has_customizations": bool(self._customizations)
        } 