# AI Therapist Agent

A LiveKit-based AI therapist agent that can take on different specialized roles based on user preferences. The agent provides compassionate, evidence-based mental health support through voice and text interactions.

## Quick Start

### 1. Console Mode (Setup Required)
```bash
python3 worker.py
```
This will start the AI therapist in console mode, asking for your preferences and creating a LiveKit voice session.

### 2. LiveKit Mode (Full Setup)
```bash
# Install dependencies
pip install -r requirements.txt

# Set up environment variables in .env file
# Start the worker (will connect to LiveKit rooms)
python3 worker.py
```

## How It Works

### Console Mode
1. **User runs `python3 worker.py`** - Worker detects console mode
2. **User selects role** - Choose from General Therapist, Meditation Guide, Sleep Specialist, or Anxiety Management
3. **User provides name** - Enter your name for personalized interaction
4. **LiveKit session created** - Voice-based therapy session starts with the selected role

### LiveKit Mode
1. **Room created** - LiveKit room is created with user preferences in metadata
2. **Worker connects** - AI agent connects with the selected role and starts the session
3. **Therapy begins** - User connects via LiveKit client and therapy session starts

## Available Roles

1. **General Therapist** - CBT, mindfulness, solution-focused therapy
2. **Meditation Guide** - 15+ meditation techniques, patient guidance
3. **Sleep Specialist** - Sleep science, hygiene, insomnia management
4. **Anxiety Management** - Coping strategies, grounding techniques

## Files

- `worker.py` - Main worker with console and LiveKit modes
- `system_prompts.py` - Detailed prompts for each role
- `requirements.txt` - Dependencies

## Environment Setup

Create a `.env` file with:
```env
LIVEKIT_URL=wss://your-livekit-instance.livekit.cloud
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
OPENAI_API_KEY=your_openai_api_key
```

## Usage Flow

### Console Mode
1. **Start worker**: `python3 worker.py`
2. **Choose role**: Select from available therapist types
3. **Enter name**: Provide your name for the session
4. **LiveKit session**: Voice-based therapy session starts with selected role

### LiveKit Mode
1. **Create room**: LiveKit room with user preferences
2. **Start worker**: `python3 worker.py` (connects to room)
3. **Connect**: Use LiveKit client to connect to the room
4. **Begin therapy**: AI therapist starts with your selected role

## Features

- **Role-based specialization** with detailed system prompts
- **Interactive tools** for breathing, grounding, meditation, assessments
- **Voice and text support** through LiveKit
- **Evidence-based approaches** from established therapeutic practices
- **Safety protocols** and professional boundaries

## Demo

Run `python3 worker.py` to start a console-based LiveKit therapy session! The worker will ask for your preferences and create a voice session. 