# Yantra

Yantra is a Next.js 16 prototype for an AI-native learning platform. The current build combines:

- a public marketing site
- a public learner dashboard
- a locally persisted student profile
- a public editor with local project storage
- persisted access requests
- a Render-backed Yantra chat assistant routed through the Python AI microservice
- a room-only Sarvam-powered voice assistant layered on top of the same chat route
- a separate Python AI microservice under `ai/`

The app is no longer just a static marketing-plus-dashboard shell. Public dashboard/profile usage is live, and most learning data, roadmap logic, and room functionality are still demo content.
The main Yantra chat route now proxies into the Python AI microservice when `YANTRA_AI_SERVICE_URL` is set.

## Current Routes

### Public pages

- `/` marketing landing page
- `/dashboard` student dashboard
- `/dashboard/student-profile` editable student profile workspace
- `/editor` public editor workspace
- `/editor/projects` local project list
- `/docs` documentation hub

### Compatibility redirects

- `/login`
- `/signup`
- `/onboarding`
- `/reset-password`
- `/auth/confirm`
- `/auth/reset-password`
- `/auth/signout`

### API routes

- `/api/chat` Next.js proxy to the Python Yantra AI service
- `/api/chat/health` wake-check proxy for the configured Yantra AI service
- `/api/chat/history` public-safe chat-history load
- `/api/profile` authenticated profile read/update for legacy flows
- `/api/access-requests` access-intent form submission
- `/api/sarvam/stt` room voice transcription
- `/api/sarvam/tts` room voice synthesis

## What Works Today

- Next.js App Router runtime on Vercel-compatible setup
- public dashboard access with no required sign-in
- local profile persistence from `/dashboard/student-profile`
- local editor projects and shared-project remix into `/editor`
- reusable chat widget on the marketing site and dashboard
- room-only push-to-talk voice assistant using Sarvam STT/TTS
- access-request form validation, persistence, and server handling

## What Is Still Placeholder Or Static

- dashboard skills, progress cards, momentum charts, and room cards
- curriculum and performance content inside the dashboard UI
- chat moderation, analytics, and tool use
- practice-room execution engines and dynamic roadmap logic
- cross-device sync for public-mode profiles and editor projects

## Project Structure

```text
Yantra/
|-- ai/
|   |-- knowledge/
|   |-- tests/
|   |-- yantra_ai/
|   |-- main.py
|   `-- pyproject.toml
|-- app/
|   |-- api/
|   |-- auth/
|   |-- dashboard/
|   |-- login/
|   |-- signup/
|   |-- layout.tsx
|   `-- page.tsx
|-- docs/
|-- src/
|   |-- features/
|   |-- lib/supabase/
|   `-- styles/
|-- supabase/schema.sql
|-- proxy.ts
`-- package.json
```

## Local Setup

### Requirements

- Node.js 20 or newer
- npm
- a Supabase project
- a Gemini API key
- a Sarvam API key for room voice
- a deployed Yantra AI service URL for the main chat path

### Install

```bash
npm install
```

### Environment

Copy `.env.example` to `.env.local` and set:

```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
YANTRA_AI_SERVICE_URL="https://YOUR-YANTRA-AI-SERVICE.onrender.com"
SARVAM_API_KEY="YOUR_SARVAM_API_KEY"
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

### Database setup

Run the SQL in `supabase/schema.sql` against your Supabase project. That creates `public.profiles`, `public.access_requests`, `public.chat_histories`, plus the update triggers and row-level security policies used by access requests and any Supabase-backed legacy profile/chat persistence that is still enabled.

### Start

```bash
npm run dev
```

### Local AI microservice

The separate Python service can be started independently:

```bash
cd ai
python -m venv .venv
pip install -e .[dev]
uvicorn main:app --reload --port 8000
```

On Windows PowerShell, activate the virtual environment with `.venv\\Scripts\\Activate.ps1`.

If `YANTRA_AI_SERVICE_URL` is set in the root `.env.local`, the website chat uses the deployed Python service. If it is missing, `/api/chat` falls back to Gemini directly. The Python room voice sidebar uses Sarvam through the Next.js server routes, so it does not need a second worker process.

### Validate

```bash
npm run lint
npm run build
```

## Start Here

If you are new to the repo, read these in order:

1. `docs/README.md`
2. `docs/handoff/CURRENT_STATE.md`
3. `docs/engineering/SETUP_AND_DEPLOYMENT.md`
4. `docs/engineering/CODEBASE_MAP.md`
5. the relevant feature doc inside `docs/features/`

## Documentation Rule

When routes, auth behavior, environment setup, persistence, or major UI surfaces change, update the docs in `docs/` in the same pass.
