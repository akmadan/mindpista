"""
Simple test to verify the new prompt system works correctly.
"""

import sys
import os

# Add the parent directory to the path so we can import the prompts module
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from prompts import PromptFactory, PromptType, PromptContext, PromptRegistry, PromptBuilder


def test_basic_functionality():
    """Test basic prompt creation and usage."""
    print("Testing basic functionality...")
    
    # Create context
    context = PromptContext(
        user_id="test_user",
        current_mood="anxious",
        expertise_level="beginner"
    )
    
    # Test all prompt types
    for prompt_type in PromptType:
        try:
            prompt = PromptFactory.create_prompt(prompt_type, context)
            prompt_text = prompt.get_prompt()
            
            print(f"✓ {prompt_type.value}: Created successfully ({len(prompt_text)} chars)")
            
            # Test metadata
            metadata = prompt.get_metadata()
            assert metadata["type"] == prompt_type.value
            assert metadata["context"] == context
            
        except Exception as e:
            print(f"✗ {prompt_type.value}: Failed - {e}")
            return False
    
    return True


def test_registry_functionality():
    """Test registry functionality."""
    print("\nTesting registry functionality...")
    
    try:
        registry = PromptRegistry()
        
        # Create and register a prompt
        context = PromptContext(user_id="registry_test")
        prompt = PromptFactory.create_prompt(PromptType.GENERAL_THERAPIST, context)
        
        registry.register_prompt("test_prompt", prompt)
        
        # Test retrieval
        retrieved = registry.get_prompt("test_prompt")
        assert retrieved is not None
        assert retrieved.get_prompt_type() == PromptType.GENERAL_THERAPIST
        
        # Test configuration
        registry.set_configuration("test_prompt", {"test": "value"})
        config = registry.get_configuration("test_prompt")
        assert config["test"] == "value"
        
        # Test statistics
        stats = registry.get_statistics()
        assert stats["total_prompts"] > 0
        
        print("✓ Registry: All tests passed")
        return True
        
    except Exception as e:
        print(f"✗ Registry: Failed - {e}")
        return False


def test_builder_functionality():
    """Test builder functionality."""
    print("\nTesting builder functionality...")
    
    try:
        builder = PromptBuilder()
        
        complex_prompt = (builder
            .set_prompt_type(PromptType.ANXIETY_SPECIALIST)
            .set_user_id("builder_test")
            .set_user_preferences({"anxiety_type": "social_anxiety"})
            .set_current_mood("nervous")
            .add_custom_section("TEST_SECTION", "This is a test section")
            .build())
        
        # Verify the prompt was created correctly
        assert complex_prompt.get_prompt_type() == PromptType.ANXIETY_SPECIALIST
        assert complex_prompt.context.user_id == "builder_test"
        assert complex_prompt.context.user_preferences["anxiety_type"] == "social_anxiety"
        
        # Get the prompt text
        prompt_text = complex_prompt.get_prompt()
        assert len(prompt_text) > 0
        
        print("✓ Builder: All tests passed")
        return True
        
    except Exception as e:
        print(f"✗ Builder: Failed - {e}")
        return False


def test_string_based_creation():
    """Test string-based prompt creation."""
    print("\nTesting string-based creation...")
    
    try:
        # Test valid string types
        valid_types = ["therapist", "meditation", "sleep", "anxiety"]
        
        for prompt_type_str in valid_types:
            prompt = PromptFactory.create_prompt_from_string(prompt_type_str)
            assert prompt is not None
            print(f"✓ {prompt_type_str}: Created successfully")
        
        # Test invalid string type
        try:
            PromptFactory.create_prompt_from_string("invalid_type")
            print("✗ Invalid type: Should have raised ValueError")
            return False
        except ValueError:
            print("✓ Invalid type: Correctly raised ValueError")
        
        return True
        
    except Exception as e:
        print(f"✗ String-based creation: Failed - {e}")
        return False


def run_all_tests():
    """Run all tests."""
    print("Running Prompt System Tests")
    print("=" * 40)
    
    tests = [
        test_basic_functionality,
        test_registry_functionality,
        test_builder_functionality,
        test_string_based_creation
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
    
    print("\n" + "=" * 40)
    print(f"Tests passed: {passed}/{total}")
    
    if passed == total:
        print("🎉 All tests passed! The prompt system is working correctly.")
        return True
    else:
        print("❌ Some tests failed. Please check the implementation.")
        return False


if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1) 