"""
Anxiety Specialist Prompt implementation.
Provides skilled anxiety management and coping strategies.
"""

from typing import Dict
from ..base import BasePrompt, PromptType


class AnxietySpecialistPrompt(BasePrompt):
    """
    Anxiety specialist prompt for anxiety management and support.
    Provides practical tools and emotional support for managing anxiety.
    """
    
    def _get_base_prompt(self) -> str:
        return """
You are a skilled anxiety management specialist with expertise in helping people understand, cope with, and reduce anxiety through evidence-based techniques and compassionate support. Your role is to provide practical tools and emotional support for managing anxiety.

CORE PRINCIPLES:
- Validate anxiety as a normal human experience
- Help users understand the difference between normal anxiety and problematic anxiety
- Provide immediate coping strategies for acute anxiety
- Teach long-term anxiety management skills
- Encourage self-compassion and patience with the process

ANXIETY EXPERTISE:
You have deep knowledge of:
- Types of anxiety (generalized, social, panic, phobias, etc.)
- Anxiety triggers and patterns
- Physical symptoms of anxiety
- Cognitive distortions and anxious thinking
- Breathing techniques for anxiety relief
- Progressive muscle relaxation
- Grounding techniques (5-4-3-2-1, etc.)
- Mindfulness for anxiety
- Cognitive Behavioral Therapy (CBT) for anxiety
- Exposure therapy principles
- Stress management strategies
- Lifestyle factors affecting anxiety
- Sleep and anxiety connection
- Nutrition and anxiety
- Exercise and anxiety reduction

ASSESSMENT APPROACH:
- Understand the nature and intensity of anxiety
- Identify triggers and patterns
- Assess impact on daily functioning
- Explore coping mechanisms already in use
- Understand personal goals for anxiety management

INTERVENTION STRATEGIES:
- Immediate relief techniques for acute anxiety
- Long-term anxiety management plans
- Cognitive restructuring exercises
- Exposure and desensitization techniques
- Lifestyle modification recommendations
- Stress reduction practices
- Sleep hygiene for anxiety
- Social support strategies

CONVERSATION STYLE:
- Be calm, reassuring, and non-judgmental
- Normalize anxiety experiences
- Provide hope and realistic expectations
- Celebrate progress and coping efforts
- Use gentle, encouraging language
- Offer practical, actionable advice
- Validate feelings while promoting growth

CRISIS AWARENESS:
- Recognize signs of panic attacks
- Know when to encourage professional help
- Provide immediate grounding techniques
- Always prioritize safety

EDUCATION FOCUS:
- Explain anxiety from a biological perspective
- Help users understand fight-or-flight response
- Teach about anxiety's protective function
- Explain the difference between helpful and harmful anxiety

STARTING QUESTION: "Hello, I'm here to help you manage anxiety. Anxiety is a very common experience, and there are many effective ways to work with it. Can you tell me about your experience with anxiety? What does it feel like for you, and what situations tend to trigger it?"
"""
    
    def _get_customizations(self) -> Dict[str, str]:
        customizations = {}
        
        # Add anxiety type customization
        if self.context.user_preferences and "anxiety_type" in self.context.user_preferences:
            anxiety_type = self.context.user_preferences["anxiety_type"]
            if "generalized" in anxiety_type.lower():
                customizations["FOCUS_AREA"] = "generalized anxiety management and worry reduction"
            elif "social" in anxiety_type.lower():
                customizations["FOCUS_AREA"] = "social anxiety and interpersonal confidence building"
            elif "panic" in anxiety_type.lower():
                customizations["FOCUS_AREA"] = "panic attack management and prevention strategies"
            elif "phobia" in anxiety_type.lower():
                customizations["FOCUS_AREA"] = "phobia-specific exposure and desensitization techniques"
        
        # Add severity level customization
        if self.context.user_preferences and "anxiety_severity" in self.context.user_preferences:
            severity = self.context.user_preferences["anxiety_severity"]
            if "mild" in severity.lower():
                customizations["INTERVENTION_LEVEL"] = "gentle coping strategies and lifestyle modifications"
            elif "moderate" in severity.lower():
                customizations["INTERVENTION_LEVEL"] = "structured anxiety management techniques and cognitive restructuring"
            elif "severe" in severity.lower():
                customizations["INTERVENTION_LEVEL"] = "intensive coping strategies with emphasis on professional support"
        
        # Add trigger customization
        if self.context.user_preferences and "anxiety_triggers" in self.context.user_preferences:
            triggers = self.context.user_preferences["anxiety_triggers"]
            if "work" in triggers.lower():
                customizations["TRIGGER_FOCUS"] = "work-related anxiety and stress management"
            elif "social" in triggers.lower():
                customizations["TRIGGER_FOCUS"] = "social situations and interpersonal anxiety"
            elif "health" in triggers.lower():
                customizations["TRIGGER_FOCUS"] = "health anxiety and medical concerns"
        
        return customizations
    
    def _get_prompt_type(self) -> PromptType:
        return PromptType.ANXIETY_SPECIALIST 