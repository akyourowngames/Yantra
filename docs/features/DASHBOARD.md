# Dashboard

## Routes And Ownership

- `/dashboard`
- `/dashboard/student-profile`
- Dashboard entry: `app/dashboard/page.tsx`
- Dashboard implementation: `src/features/dashboard/StudentDashboard.tsx`
- Student profile entry: `app/dashboard/student-profile/page.tsx`
- Student profile implementation: `src/features/dashboard/StudentProfilePage.tsx`

## Route Protection

Both routes are protected server-side.

Each route:

- checks whether Supabase env vars are configured
- reads the authenticated learner through `getAuthenticatedProfile()`
- redirects unauthenticated requests to `/login`

This means the dashboard is no longer just a public concept page.

## `/dashboard`

### Purpose

The main dashboard is the protected learner home surface. It mixes real identity data with mostly static progress and learning content.

### What is dynamic today

- learner full name
- learner first name
- learner email

These values come from the authenticated Supabase profile flow.

### What is still static today

- overview cards
- momentum bars
- skill cards
- room cards
- curriculum nodes
- AI quick prompts

### Embedded behavior

- chat entry points open the shared Yantra chat modal
- navigation links into `/dashboard/student-profile`
- the visual surface is polished, but it is still largely presentation data

## `/dashboard/student-profile`

### Purpose

This is the real persisted dashboard surface in the current product. It lets the authenticated learner review and update their profile record.

### Current profile fields

- `name`
- `classDesignation`
- `skillLevel`
- `progress`
- `academicYear`

### Persistence behavior

- the server seeds a default profile row on first access if one does not exist
- the page saves changes through `PUT /api/profile`
- the payload is validated with `normalizeStudentProfileInput()`
- the stored values are sanitized before upsert

### Supporting UI

The page also includes:

- overview, roster, curriculum, and performance sections
- help and support shortcuts
- settings/notifications/help panels
- a direct logout path through `/auth/signout`

Only the profile record is persisted. The surrounding curriculum, roster, and performance content is still static UI copy.

## Current Strengths

- protected routes are real
- learner identity and profile are backed by Supabase
- the profile screen exposes a genuine save path
- dashboard and profile surfaces share a consistent visual system

## Current Limitations

- no dynamic room engine
- no dynamic curriculum model
- no real unlock logic
- no analytics or event tracking
- no tests around protected-route or profile-save behavior

## Recommended Next Work

- extract hardcoded dashboard data into typed server/client contracts
- add tests for `/api/profile` and route protection
- connect dashboard progress and rooms to persisted learner state
- replace static curriculum and performance sections with real data models
