from livekit.agents import function_tool, RunContext
from prompts.system_prompts import AVAILABLE_ROLES


@function_tool
async def get_available_roles(
    context: RunContext,
):
    """Get the list of available therapist roles and their descriptions"""
    return {
        "available_roles": AVAILABLE_ROLES,
        "message": "Here are the different types of AI therapist roles available. Please choose one that best fits your needs.",
    }


@function_tool
async def set_therapist_role(
    context: RunContext,
    role_type: str,
):
    """Set the therapist role based on user preference"""
    if role_type.lower() not in AVAILABLE_ROLES:
        return {
            "success": False,
            "message": f"Invalid role type. Available roles are: {', '.join(AVAILABLE_ROLES.keys())}",
            "available_roles": AVAILABLE_ROLES,
        }

    # Get the appropriate system prompt for the selected role
    system_prompt = get_system_prompt(role_type.lower())

    return {
        "success": True,
        "role_type": role_type.lower(),
        "role_description": AVAILABLE_ROLES[role_type.lower()],
        "system_prompt": system_prompt,
        "message": f"Role set to {role_type.lower()}. I'm now ready to help you as your {AVAILABLE_ROLES[role_type.lower()]}.",
    }


@function_tool
async def breathing_exercise(
    context: RunContext,
    exercise_type: str = "box_breathing",
):
    """Guide the user through a breathing exercise"""
    exercises = {
        "box_breathing": {
            "name": "Box Breathing (4-4-4-4)",
            "instructions": "Inhale for 4 counts, hold for 4 counts, exhale for 4 counts, hold for 4 counts. Repeat this cycle.",
            "benefits": "Calms the nervous system, reduces stress and anxiety, improves focus",
        },
        "4_7_8": {
            "name": "4-7-8 Breathing",
            "instructions": "Inhale for 4 counts, hold for 7 counts, exhale for 8 counts. Repeat 4 times.",
            "benefits": "Promotes relaxation, helps with sleep, reduces anxiety",
        },
        "diaphragmatic": {
            "name": "Diaphragmatic Breathing",
            "instructions": "Place one hand on your chest and one on your belly. Breathe deeply so your belly rises more than your chest.",
            "benefits": "Improves oxygen intake, reduces stress, strengthens diaphragm",
        },
    }

    exercise = exercises.get(exercise_type, exercises["box_breathing"])

    return {
        "exercise_name": exercise["name"],
        "instructions": exercise["instructions"],
        "benefits": exercise["benefits"],
        "message": f"Let's practice {exercise['name']}. {exercise['instructions']} This technique helps with {exercise['benefits']}.",
    }


@function_tool
async def grounding_technique(
    context: RunContext,
    technique: str = "5_4_3_2_1",
):
    """Guide the user through a grounding technique"""
    techniques = {
        "5_4_3_2_1": {
            "name": "5-4-3-2-1 Grounding",
            "instructions": "Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
            "benefits": "Brings awareness to the present moment, reduces anxiety and panic",
        },
        "body_scan": {
            "name": "Body Scan",
            "instructions": "Slowly scan your body from head to toe, noticing any sensations, tension, or relaxation in each part.",
            "benefits": "Increases body awareness, promotes relaxation, reduces stress",
        },
        "mindful_walking": {
            "name": "Mindful Walking",
            "instructions": "Walk slowly and deliberately, paying attention to each step, the feeling of your feet touching the ground.",
            "benefits": "Connects mind and body, reduces anxiety, improves focus",
        },
    }

    technique_info = techniques.get(technique, techniques["5_4_3_2_1"])

    return {
        "technique_name": technique_info["name"],
        "instructions": technique_info["instructions"],
        "benefits": technique_info["benefits"],
        "message": f"Let's practice {technique_info['name']}. {technique_info['instructions']} This helps with {technique_info['benefits']}.",
    }


@function_tool
async def meditation_guide(
    context: RunContext,
    meditation_type: str = "mindfulness",
    duration: str = "5 minutes",
):
    """Guide the user through a meditation session"""
    meditations = {
        "mindfulness": {
            "name": "Mindfulness Meditation",
            "instructions": "Focus on your breath. When your mind wanders, gently bring it back to your breath without judgment.",
            "benefits": "Reduces stress, improves focus, increases self-awareness",
        },
        "loving_kindness": {
            "name": "Loving-Kindness Meditation",
            "instructions": "Send wishes of peace, happiness, and well-being to yourself, loved ones, and all beings.",
            "benefits": "Increases compassion, reduces negative emotions, improves relationships",
        },
        "body_scan": {
            "name": "Body Scan Meditation",
            "instructions": "Systematically focus attention on different parts of your body, releasing tension as you go.",
            "benefits": "Reduces physical tension, improves body awareness, promotes relaxation",
        },
    }

    meditation = meditations.get(meditation_type, meditations["mindfulness"])

    return {
        "meditation_name": meditation["name"],
        "duration": duration,
        "instructions": meditation["instructions"],
        "benefits": meditation["benefits"],
        "message": f"Let's practice {meditation['name']} for {duration}. {meditation['instructions']} This meditation helps with {meditation['benefits']}.",
    }


@function_tool
async def sleep_assessment(
    context: RunContext,
):
    """Conduct a brief sleep assessment to understand the user's sleep patterns"""
    return {
        "assessment_questions": [
            "What time do you usually go to bed?",
            "What time do you usually wake up?",
            "How long does it typically take you to fall asleep?",
            "How many times do you wake up during the night?",
            "How would you rate your sleep quality (1-10)?",
            "What factors do you think affect your sleep?",
            "Do you use any devices (phone, TV) before bed?",
            "What's your typical evening routine?",
        ],
        "message": "I'd like to understand your sleep patterns better. Let's go through some questions to help me provide personalized sleep guidance.",
    }


@function_tool
async def anxiety_assessment(
    context: RunContext,
):
    """Conduct a brief anxiety assessment to understand the user's anxiety patterns"""
    return {
        "assessment_questions": [
            "How would you describe your anxiety (physical sensations, thoughts, behaviors)?",
            "What situations or triggers tend to cause anxiety for you?",
            "How often do you experience anxiety (daily, weekly, occasionally)?",
            "How does anxiety affect your daily life and activities?",
            "What coping strategies have you tried in the past?",
            "What would you like to achieve in managing your anxiety?",
            "Do you have any specific fears or worries that are particularly challenging?",
        ],
        "message": "I'd like to understand your experience with anxiety better. Let's explore your patterns so I can provide the most helpful support.",
    }
