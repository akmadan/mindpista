from dotenv import load_dotenv
import os
from livekit import agents
from livekit.agents import (
    AgentSession,
    Agent,
    RoomInputOptions,
    function_tool,
    RunContext,
)
from livekit.plugins import (
    openai,
    noise_cancellation,
)
from tools.tools import (
    anxiety_assessment,
    breathing_exercise,
    get_available_roles,
    grounding_technique,
    set_therapist_role,
    sleep_assessment,
    meditation_guide,
)
import asyncio
import json
import sys
from agent_worker.prompts.system_prompts import get_system_prompt, AVAILABLE_ROLES

load_dotenv()


async def async_handle_text_stream(reader, participant_identity, session):
    text = await reader.read_all()
    print(f"Received text: {text} from {participant_identity}")

    # Generate a reply using the LLM
    response = await session.generate_reply(instructions=text)

    # Send the reply as text and as speech
    await session.send_text(response)
    await session.speak(response)


def handle_text_stream(reader, participant_identity, session):
    asyncio.create_task(async_handle_text_stream(reader, participant_identity, session))


async def get_console_input():
    """Get user input for therapist role and name in console mode"""
    print("\n" + "=" * 60)
    print("🧠 AI THERAPIST - CONSOLE MODE")
    print("=" * 60)
    print("Welcome! I'm here to provide you with compassionate mental health support.")
    print("Please choose the type of therapist that best fits your needs today.\n")

    # Display available roles
    print("Available Therapist Types:")
    print("-" * 40)

    for i, (role, description) in enumerate(AVAILABLE_ROLES.items(), 1):
        print(f"{i}. {role.title()}: {description}")

    print(f"{len(AVAILABLE_ROLES) + 1}. Exit")
    print("-" * 40)

    # Get role selection
    while True:
        try:
            choice = input(
                f"\nPlease enter your choice (1-{len(AVAILABLE_ROLES) + 1}): "
            ).strip()
            choice_num = int(choice)

            if choice_num == len(AVAILABLE_ROLES) + 1:
                print("Thank you for visiting. Take care! 👋")
                sys.exit(0)

            if 1 <= choice_num <= len(AVAILABLE_ROLES):
                role_list = list(AVAILABLE_ROLES.keys())
                selected_role = role_list[choice_num - 1]
                break
            else:
                print(
                    f"❌ Please enter a number between 1 and {len(AVAILABLE_ROLES) + 1}"
                )
        except ValueError:
            print("❌ Please enter a valid number")

    # Display role information
    print(f"\n✅ You've selected: {selected_role.title()}")
    print(f"Description: {AVAILABLE_ROLES[selected_role]}")

    # Get the starting question for this role
    prompt = get_system_prompt(selected_role)
    lines = prompt.split("\n")
    starting_question = ""
    for line in lines:
        if line.startswith("STARTING QUESTION:"):
            starting_question = (
                line.replace("STARTING QUESTION:", "").strip().strip('"')
            )
            break

    print(f"\nYour therapist will start by asking:")
    print(f'"{starting_question}"')

    # Get user name
    print("\n" + "-" * 40)
    name = input("What's your name? (or press Enter to skip): ").strip()
    user_name = name if name else "User"

    print(f"\n🔄 Starting your therapy session...")
    print("=" * 60)

    return selected_role, user_name


async def create_console_session(role_type, user_name, system_prompt):
    """Create a LiveKit session for console mode with user preferences"""

    print(f"\n🎯 Creating LiveKit room with your preferences...")
    print(f"Role: {role_type.title()}")
    print(f"User: {user_name}")
    print("=" * 60)

    # Check if LiveKit credentials are available
    livekit_url = os.getenv("LIVEKIT_URL")
    livekit_api_key = os.getenv("LIVEKIT_API_KEY")
    livekit_api_secret = os.getenv("LIVEKIT_API_SECRET")

    if not all([livekit_url, livekit_api_key, livekit_api_secret]):
        print("❌ LiveKit credentials not found in .env file")
        print("Please set LIVEKIT_URL, LIVEKIT_API_KEY, and LIVEKIT_API_SECRET")
        print("For now, starting in demo mode...")
        return

    try:
        # Create room name
        import uuid

        room_name = f"therapist-{role_type}-{uuid.uuid4().hex[:8]}"

        # Create room metadata
        room_metadata = {
            "therapist_role": role_type,
            "user_name": user_name,
            "session_type": "console_session",
        }

        print(f"Room: {room_name}")
        print(f"LiveKit URL: {livekit_url}")
        print("=" * 60)

        # Create the session
        session = AgentSession(
            llm=openai.realtime.RealtimeModel(
                voice="coral"  # You can change this to other voices like "alloy", "echo", "fable", "onyx", "nova"
            )
        )

        # Create a mock room context with the metadata
        class ConsoleRoomContext:
            def __init__(self, room_name, metadata):
                self.metadata = metadata
                self.name = room_name

        console_ctx = ConsoleRoomContext(room_name, room_metadata)

        await session.start(
            room=console_ctx,
            agent=Agent(
                instructions=system_prompt,
                tools=[
                    get_available_roles,
                    set_therapist_role,
                    breathing_exercise,
                    grounding_technique,
                    meditation_guide,
                    sleep_assessment,
                    anxiety_assessment,
                ],
            ),
            room_input_options=RoomInputOptions(
                noise_cancellation=noise_cancellation.BVC(),
            ),
        )

        print("✅ LiveKit session created successfully!")
        print("🤖 AI Therapist is ready to start the voice session.")
        print("=" * 60)
        print("To connect to this session, use a LiveKit client with:")
        print(f"Room: {room_name}")
        print(f"URL: {livekit_url}")
        print("=" * 60)

        # Keep the session alive
        while True:
            await asyncio.sleep(1)

    except Exception as e:
        print(f"❌ Error creating LiveKit session: {str(e)}")
        print("This might be due to missing LiveKit credentials or network issues.")
        print("Please check your .env file and LiveKit setup.")


async def entrypoint(ctx: agents.JobContext):
    # Check if we're in console mode (no room metadata)
    room_metadata = ctx.room.metadata or {}

    # If no room metadata, we're in console mode - get user input
    if not room_metadata:
        role_type, user_name = await get_console_input()
        print(f"\n🤖 AI Therapist Agent starting in console mode...")
        print(f"Role: {role_type}")
        print(f"User: {user_name}")
    else:
        # Production mode - get from room metadata
        role_type = room_metadata.get("therapist_role", "therapist")
        user_name = room_metadata.get("user_name", "User")
        print(f"🤖 AI Therapist Agent starting...")
        print(f"Role: {role_type}")
        print(f"User: {user_name}")
        print(f"Room: {ctx.room.name}")

    # Get the appropriate system prompt
    system_prompt = get_system_prompt(role_type)

    # Add role information to the prompt
    full_prompt = f"""
{system_prompt}

CURRENT ROLE: {role_type.upper()}
ROLE DESCRIPTION: {AVAILABLE_ROLES.get(role_type, "General therapist")}
USER NAME: {user_name}

IMPORTANT: You are currently operating as a {role_type} specialist. Stay within your expertise area while being helpful and supportive.

AVAILABLE TOOLS:
- get_available_roles: Show user the different therapist roles available
- set_therapist_role: Change your role based on user preference
- breathing_exercise: Guide through breathing techniques
- grounding_technique: Guide through grounding exercises
- meditation_guide: Guide through meditation sessions
- sleep_assessment: Conduct sleep assessment
- anxiety_assessment: Conduct anxiety assessment

STARTUP BEHAVIOR:
- Welcome the user by name if provided
- Ask your designated starting question for your role
- Be warm, professional, and supportive
- Use the tools available to help the user effectively
"""

    # Check if we're in console mode
    if not room_metadata:
        # Console mode - create a simple console-based session
        print(f"\n🎯 Starting console-based therapy session...")
        print(f"Role: {role_type.title()}")
        print(f"User: {user_name}")
        print("=" * 60)

        # Start console-based LiveKit session
        await create_console_session(role_type, user_name, full_prompt)
    else:
        # Production mode - use LiveKit session
        session = AgentSession(
            llm=openai.realtime.RealtimeModel(
                voice="coral"  # You can change this to other voices like "alloy", "echo", "fable", "onyx", "nova"
            )
        )

        await session.start(
            room=ctx.room,
            agent=Agent(
                instructions=full_prompt,
                tools=[
                    get_available_roles,
                    set_therapist_role,
                    breathing_exercise,
                    grounding_technique,
                    meditation_guide,
                    sleep_assessment,
                    anxiety_assessment,
                ],
            ),
            room_input_options=RoomInputOptions(
                noise_cancellation=noise_cancellation.BVC(),
            ),
        )

        await ctx.connect()

        ctx.room.register_text_stream_handler(
            "my-topic",
            lambda reader, participant_identity: handle_text_stream(
                reader, participant_identity, session
            ),
        )


if __name__ == "__main__":
    agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint))
