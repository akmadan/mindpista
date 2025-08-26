"""
Registry for managing prompt instances and configurations.
Implements the Singleton pattern and Observer pattern.
"""

from typing import Dict, List, Callable, Any, Optional
from .base import BasePrompt, PromptType, PromptContext


class PromptRegistry:
    """
    Singleton registry for managing prompt instances and configurations.
    Implements the Singleton pattern and Observer pattern.
    """
    
    _instance = None
    _initialized = False
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(PromptRegistry, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        if not self._initialized:
            self._prompts: Dict[str, BasePrompt] = {}
            self._configurations: Dict[str, Dict[str, Any]] = {}
            self._observers: List[Callable] = []
            self._default_context = PromptContext()
            PromptRegistry._initialized = True
    
    def register_prompt(self, name: str, prompt: BasePrompt) -> None:
        """
        Register a prompt instance with a name.
        
        Args:
            name: Unique name for the prompt
            prompt: The prompt instance to register
        """
        self._prompts[name] = prompt
        self._notify_observers("prompt_registered", {"name": name, "type": prompt.get_prompt_type()})
    
    def get_prompt(self, name: str) -> Optional[BasePrompt]:
        """
        Get a registered prompt by name.
        
        Args:
            name: Name of the registered prompt
            
        Returns:
            The prompt instance or None if not found
        """
        return self._prompts.get(name)
    
    def unregister_prompt(self, name: str) -> bool:
        """
        Unregister a prompt by name.
        
        Args:
            name: Name of the prompt to unregister
            
        Returns:
            True if the prompt was unregistered, False if not found
        """
        if name in self._prompts:
            del self._prompts[name]
            self._notify_observers("prompt_unregistered", {"name": name})
            return True
        return False
    
    def get_all_prompts(self) -> Dict[str, BasePrompt]:
        """Get all registered prompts."""
        return self._prompts.copy()
    
    def get_prompts_by_type(self, prompt_type: PromptType) -> Dict[str, BasePrompt]:
        """
        Get all prompts of a specific type.
        
        Args:
            prompt_type: The type of prompts to retrieve
            
        Returns:
            Dictionary of prompts of the specified type
        """
        return {
            name: prompt for name, prompt in self._prompts.items()
            if prompt.get_prompt_type() == prompt_type
        }
    
    def set_configuration(self, name: str, config: Dict[str, Any]) -> None:
        """
        Set configuration for a prompt.
        
        Args:
            name: Name of the prompt
            config: Configuration dictionary
        """
        self._configurations[name] = config
        self._notify_observers("configuration_updated", {"name": name, "config": config})
    
    def get_configuration(self, name: str) -> Optional[Dict[str, Any]]:
        """
        Get configuration for a prompt.
        
        Args:
            name: Name of the prompt
            
        Returns:
            Configuration dictionary or None if not found
        """
        return self._configurations.get(name)
    
    def set_default_context(self, context: PromptContext) -> None:
        """Set the default context for new prompts."""
        self._default_context = context
        self._notify_observers("default_context_updated", {"context": context})
    
    def get_default_context(self) -> PromptContext:
        """Get the default context."""
        return self._default_context
    
    def add_observer(self, observer: Callable) -> None:
        """
        Add an observer to be notified of registry changes.
        
        Args:
            observer: Callable that takes event_type and data parameters
        """
        if observer not in self._observers:
            self._observers.append(observer)
    
    def remove_observer(self, observer: Callable) -> None:
        """
        Remove an observer.
        
        Args:
            observer: The observer to remove
        """
        if observer in self._observers:
            self._observers.remove(observer)
    
    def _notify_observers(self, event_type: str, data: Dict[str, Any]) -> None:
        """
        Notify all observers of an event.
        
        Args:
            event_type: Type of event that occurred
            data: Event data
        """
        for observer in self._observers:
            try:
                observer(event_type, data)
            except Exception as e:
                # Log error but don't break the notification chain
                print(f"Error in observer notification: {e}")
    
    def clear(self) -> None:
        """Clear all registered prompts and configurations."""
        self._prompts.clear()
        self._configurations.clear()
        self._notify_observers("registry_cleared", {})
    
    def get_statistics(self) -> Dict[str, Any]:
        """Get statistics about the registry."""
        type_counts = {}
        for prompt in self._prompts.values():
            prompt_type = prompt.get_prompt_type().value
            type_counts[prompt_type] = type_counts.get(prompt_type, 0) + 1
        
        return {
            "total_prompts": len(self._prompts),
            "total_configurations": len(self._configurations),
            "type_distribution": type_counts,
            "observers_count": len(self._observers)
        } 