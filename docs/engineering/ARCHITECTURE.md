# Architecture

## Current Stack

- Framework: Next.js 16 App Router
- UI: React 19
- Styling: Tailwind CSS v4 through `src/styles/globals.css`
- Motion and scroll behavior: `motion` and `lenis`
- Icons: `lucide-react`
- Auth and data persistence: Supabase SSR + `@supabase/supabase-js`
- AI provider: Google Gemini through `@google/genai`
- Deployment target: Vercel

## Runtime Surfaces

### Marketing Site

- Route: `/`
- Entry: `app/page.tsx`
- Main implementation: `src/features/marketing/MarketingLandingPage.tsx`
- Responsibilities:
  - public product narrative
  - access-request CTA surface
  - signup/login entry points
  - chat entry points

### Authentication

- Routes: `/login`, `/signup`, `/auth/confirm`, `/auth/reset-password`, `/auth/signout`
- Main implementation: `src/features/auth/AuthExperience.tsx`
- Responsibilities:
  - email/password sign-in
  - email/password sign-up
  - email verification redirect handling
  - password recovery and password update
  - sign-out
  - redirecting authenticated users away from auth pages

### Student Dashboard

- Route: `/dashboard`
- Entry: `app/dashboard/page.tsx`
- Main implementation: `src/features/dashboard/StudentDashboard.tsx`
- Responsibilities:
  - protected student-facing dashboard shell
  - display of learner name and email from authenticated profile data
  - static presentation of progress, skills, curriculum, and rooms
  - chat entry points

### Student Profile

- Route: `/dashboard/student-profile`
- Entry: `app/dashboard/student-profile/page.tsx`
- Main implementation: `src/features/dashboard/StudentProfilePage.tsx`
- Responsibilities:
  - protected profile editing experience
  - loading current learner profile from Supabase
  - persisting edits through `/api/profile`

### APIs

- `POST /api/chat`
  - validates and sanitizes recent chat messages
  - calls Gemini with the Yantra system prompt
- `GET /api/chat/history`
  - returns the authenticated learner's latest persisted conversation
- `GET /api/profile`
  - returns the authenticated learner profile and seeded defaults
- `PUT /api/profile`
  - validates profile input and upserts the authenticated learner profile
- `POST /api/access-requests`
  - validates name/email/message and persists the request

## Auth And Session Boundary

Supabase SSR is wired through three layers:

1. `src/lib/supabase/client.ts`
   Browser client for interactive auth actions inside client components.
2. `src/lib/supabase/server.ts`
   Server client for route handlers and server components.
3. `proxy.ts` plus `src/lib/supabase/proxy.ts`
   Request-level cookie refresh for Supabase sessions.

Protected routes do not rely on client-only checks. `app/dashboard/page.tsx` and `app/dashboard/student-profile/page.tsx` read the authenticated user server-side and redirect unauthenticated requests to `/login`.

## Persistence Model

### Current persisted data

- Supabase auth users
- `public.profiles`
- `public.access_requests`
- `public.chat_histories`

### `public.profiles` fields

- `id`
- `email`
- `full_name`
- `class_designation`
- `skill_level`
- `progress`
- `academic_year`
- `created_at`
- `updated_at`

The profile model is defined in the app as `StudentProfile` in `src/features/dashboard/student-profile-model.ts`. Writes are sanitized before persistence.

## Request Flows

### Login flow

1. User opens `/login`.
2. `app/login/page.tsx` checks whether Supabase env vars exist.
3. If a valid session already exists, the route redirects to `/dashboard`.
4. `AuthExperience` submits `signInWithPassword()` from the browser client.
5. On success, the client transitions to `/dashboard`.

### Signup flow

1. User opens `/signup`.
2. `AuthExperience` calls `signUp()` with `emailRedirectTo` pointing to `/auth/confirm?next=/dashboard`.
3. Supabase sends the confirmation email when email confirmation is enabled.
4. `/auth/confirm` verifies the OTP and redirects into the app.

### Password reset flow

1. User opens `/login` and enters an email address.
2. `AuthExperience` calls `resetPasswordForEmail()` with `redirectTo=/auth/reset-password`.
3. Supabase redirects the recovery link into `/auth/reset-password`.
4. `ResetPasswordExperience` updates the password through `updateUser({ password })`.
5. The temporary recovery session is signed out and the learner is redirected to `/login`.

### Dashboard/profile load flow

1. A protected route checks `hasSupabaseEnv()`.
2. The route calls `getAuthenticatedProfile()`.
3. If no session exists, the route redirects to `/login`.
4. If the learner has no `profiles` row yet, the server inserts a seeded default row.
5. The server component renders using the returned profile.

### Profile save flow

1. `StudentProfilePage` sends `PUT /api/profile`.
2. `normalizeStudentProfileInput()` validates the incoming payload.
3. `updateAuthenticatedProfile()` upserts the row keyed by the authenticated user id.
4. The updated profile is returned to the client.

### Chat flow

1. Marketing and dashboard pages wrap their UI in `ChatProvider`.
2. On first open, the provider tries to load `/api/chat/history`.
3. Authenticated learners receive their last persisted conversation; public users keep the in-memory welcome state.
4. The provider sends the most recent sanitized conversation to `/api/chat`.
5. The route truncates model input to the last 12 messages, calls Gemini, and persists the updated rolling history for authenticated learners.
6. Gemini responds using `gemini-2.5-flash` and the shared Yantra prompt.

## State Boundaries

### Persistent

- auth session
- student profile row
- access-request rows
- authenticated chat history

### Client-only

- dashboard section state
- mobile nav and panel open states
- access-request form status

### Static/demo data

- dashboard overview cards
- skills
- room cards
- curriculum nodes
- many marketing copy blocks

## Current Constraints

- dashboard metrics are largely presentation data
- Google sign-in is still a placeholder
- chat continuity is limited to one rolling authenticated conversation
- there is no test suite or monitoring layer

## Recommended Evolution

- keep route wiring and API handlers in `app/`
- keep surface-specific UI in `src/features/`
- keep Supabase integration inside `src/lib/supabase/`
- keep the current auth/profile foundation and extend from it instead of adding a second identity layer
- add richer dashboard persistence, chat observability, and access-request review tooling before expanding the surface area further
