# Codebase Map

## Active Runtime Structure

```text
Yantra/
|-- app/
|   |-- api/
|   |   |-- access-requests/route.ts
|   |   |-- chat/route.ts
|   |   `-- profile/route.ts
|   |-- auth/
|   |   |-- confirm/route.ts
|   |   `-- signout/route.ts
|   |-- dashboard/
|   |   |-- student-profile/page.tsx
|   |   `-- page.tsx
|   |-- login/page.tsx
|   |-- signup/page.tsx
|   |-- layout.tsx
|   `-- page.tsx
|-- docs/
|-- src/
|   |-- features/
|   |   |-- access/AccessRequestForm.tsx
|   |   |-- auth/AuthExperience.tsx
|   |   |-- chat/
|   |   |   |-- ChatMessageContent.tsx
|   |   |   |-- ChatWidget.tsx
|   |   |   `-- yantra-chat.ts
|   |   |-- dashboard/
|   |   |   |-- StudentDashboard.tsx
|   |   |   |-- StudentProfileCard.tsx
|   |   |   |-- StudentProfilePage.tsx
|   |   |   |-- student-profile-model.ts
|   |   |   `-- YantraAmbientBackground.tsx
|   |   |-- marketing/MarketingLandingPage.tsx
|   |   `-- motion/ExperienceProvider.tsx
|   |-- lib/
|   |   `-- supabase/
|   |       |-- client.ts
|   |       |-- env.ts
|   |       |-- profiles.ts
|   |       |-- proxy.ts
|   |       `-- server.ts
|   `-- styles/globals.css
|-- supabase/schema.sql
|-- proxy.ts
|-- package.json
|-- next.config.ts
`-- README.md
```

## Folder Roles

### `app/`

Route entrypoints, redirect logic, auth utility handlers, and API route handlers.

### `src/features/access/`

Client-side access request form used by the marketing surface.

### `src/features/auth/`

The login/signup experience, validation, browser-side Supabase auth calls, and status messaging.

### `src/features/chat/`

The chat widget, prompt/config helpers, and rich message rendering.

### `src/features/dashboard/`

The protected dashboard and student-profile UI, plus the local student profile model helpers.

### `src/features/marketing/`

The public landing page implementation. This is still a large single feature file.

### `src/features/motion/`

Shared experience helpers such as overlay locking used by the chat widget and mobile navigation layers.

### `src/lib/supabase/`

Shared Supabase integration code:

- `env.ts` checks and returns required env vars
- `client.ts` builds the browser client
- `server.ts` builds the server client
- `proxy.ts` refreshes auth cookies for requests
- `profiles.ts` loads, seeds, and updates learner profile data

### `supabase/`

Project SQL required for the current profile persistence layer.

## Route Ownership

### Public routes

- `app/page.tsx` -> `src/features/marketing/MarketingLandingPage.tsx`
- `app/login/page.tsx` -> `src/features/auth/AuthExperience.tsx`
- `app/signup/page.tsx` -> `src/features/auth/AuthExperience.tsx`

### Protected routes

- `app/dashboard/page.tsx` -> `src/features/dashboard/StudentDashboard.tsx`
- `app/dashboard/student-profile/page.tsx` -> `src/features/dashboard/StudentProfilePage.tsx`

### API routes

- `app/api/chat/route.ts`
- `app/api/profile/route.ts`
- `app/api/access-requests/route.ts`

### Auth utility routes

- `app/auth/confirm/route.ts`
- `app/auth/signout/route.ts`

## Current Organization Notes

- `MarketingLandingPage.tsx` is still the largest single UI file in the repo.
- `StudentDashboard.tsx` and `StudentProfilePage.tsx` still contain a significant amount of presentation data inline.
- `src/lib/supabase/profiles.ts` is the main persistence boundary for authenticated learner profile behavior.
- `proxy.ts` at the repo root is required for Supabase SSR cookie refresh and should be treated as active runtime code, not a leftover file.

## Reference And Non-Runtime Items

### `docs/reference/`

Holds design and product inputs:

- `dashboard-sample/`
- `Login-signup-sample/`
- `build-plan/`

### Root-level local artifacts

- `dist/`
- `node_modules_broken/`
- `tmp/`

These are not part of the active application runtime and should not be deleted casually without approval.

## Safe Next Organization Steps

- keep new route handlers inside `app/`
- keep Supabase-specific helpers inside `src/lib/supabase/`
- keep route-specific UI in the matching `src/features/` folder
- split `MarketingLandingPage.tsx` into section files when that cleanup is explicitly chosen
- extract large hardcoded dashboard/profile config blocks into typed data modules if those surfaces continue to grow
