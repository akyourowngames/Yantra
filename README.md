# Yantra

Yantra is a Next.js 16 prototype for an AI-native learning platform. The current build combines:

- a public marketing site
- Supabase-backed email/password authentication
- protected dashboard routes
- a persisted student profile
- a Gemini-powered chat assistant
- a lightweight access-request submission flow

The app is no longer just a static marketing-plus-dashboard shell. Authentication and profile persistence are live; most learning data, roadmap logic, and room functionality are still demo content.

## Current Routes

### Public pages

- `/` marketing landing page
- `/login` email/password sign-in
- `/signup` account creation

### Protected pages

- `/dashboard` student dashboard
- `/dashboard/student-profile` editable student profile workspace

### Auth handlers

- `/auth/confirm` email confirmation callback
- `/auth/signout` sign-out route

### API routes

- `/api/chat` Gemini-backed Yantra assistant
- `/api/profile` authenticated profile read/update
- `/api/access-requests` access-intent form submission

## What Works Today

- Next.js App Router runtime on Vercel-compatible setup
- Supabase SSR auth with cookie refresh handled through `proxy.ts`
- automatic profile seeding in `public.profiles` for first-time signed-in users
- profile persistence from `/dashboard/student-profile`
- protected dashboard redirects for signed-out visitors
- reusable chat widget on the marketing site and dashboard
- access-request form validation and server handling

## What Is Still Placeholder Or Static

- dashboard skills, progress cards, momentum charts, and room cards
- curriculum and performance content inside the dashboard UI
- password recovery
- Google sign-in
- access-request storage
- chat persistence, moderation, analytics, and tool use
- practice-room execution engines and dynamic roadmap logic

## Project Structure

```text
Yantra/
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

### Install

```bash
npm install
```

### Environment

Copy `.env.example` to `.env.local` and set:

```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

### Database setup

Run the SQL in `supabase/schema.sql` against your Supabase project. That creates the `public.profiles` table, update trigger, and row-level security policies used by the dashboard profile flow.

### Start

```bash
npm run dev
```

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
