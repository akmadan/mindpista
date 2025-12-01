from dotenv import load_dotenv
from livekit import agents
from livekit.agents import (
    AgentSession,
    Agent,
    RoomInputOptions,
)
from livekit.plugins import (
    openai,
    noise_cancellation,
)
import asyncio

load_dotenv()

THERAPY_SYSTEM_PROMPT = """
You are a therapy assistant. You are here to help the user with their mental health.
"""

YOGA_SYSTEM_PROMPT = """
You are a yoga assistant. You are here to help the user with their yoga practice.
"""

MEDITATION_SYSTEM_PROMPT = """
You are a meditation assistant. You are here to help the user with their meditation practice.
"""

is_agent_speaking = False


async def stop_current_speech(session):
    """Stop the current speech if the agent is speaking using LiveKit API"""
    global is_agent_speaking

    if session.current_speech is not None:
        try:
            print(f"Interrupting current speech: {session.current_speech}")
            session.current_speech.interrupt()
            is_agent_speaking = False
            print("Interrupted current speech using LiveKit API")
            await asyncio.sleep(0.5)
        except Exception as e:
            print(f"Error stopping speech: {e}")
    else:
        print("No current speech to interrupt")
        is_agent_speaking = False


async def check_if_agent_speaking(session):
    """Check if the agent is currently speaking using LiveKit API"""
    global is_agent_speaking

    if session.current_speech is not None:
        is_agent_speaking = True
        print(f"Agent is speaking: {session.current_speech}")
    else:
        is_agent_speaking = False
        print("Agent is not speaking")

    return is_agent_speaking


async def async_handle_text_stream(reader, participant_identity, session):
    text = await reader.read_all()
    print(f"Received text: {text} from {participant_identity}")

    await check_if_agent_speaking(session)

    await stop_current_speech(session)

    print(f"Generating response for: {text[:100]}...")
    await session.generate_reply(instructions=text)

    print("Response generated and speech started automatically by LiveKit")


def handle_text_stream(reader, participant_identity, session):
    asyncio.create_task(async_handle_text_stream(reader, participant_identity, session))


async def entrypoint(ctx: agents.JobContext):
    session = AgentSession(llm=openai.realtime.RealtimeModel(voice="ash"))
    await session.start(
        room=ctx.room,
        agent=Agent(
            instructions=THERAPY_SYSTEM_PROMPT,
        ),
        room_input_options=RoomInputOptions(
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    await ctx.connect()

    ctx.room.register_text_stream_handler(
        "text-stream-topic-1",
        lambda reader, participant_identity: handle_text_stream(
            reader, participant_identity, session
        ),
    )


if __name__ == "__main__":
    agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint))
