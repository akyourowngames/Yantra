# Roadmap

## Current Phase

Yantra is in the transition from product shell to application foundation.

What already exists:

- branded public landing page
- login and signup flows
- Supabase-backed protected routes
- persisted student profiles
- Gemini-backed chat assistant
- access-request submission flow

What is still incomplete:

- persistent chat sessions
- dynamic roadmap engine
- real practice-room tooling
- analytics and observability
- teacher and institution workflows
- access-request storage and review workflow

## Practical Roadmap

### Phase 1: Solidify The App Foundation

Goal: harden what already exists.

Priority items:

- add tests around auth redirects and `/api/profile`
- persist access requests
- add password reset
- decide whether to support Google sign-in
- remove ambiguity in setup and deployment flow

### Phase 2: Make The Dashboard Truly Data-Driven

Goal: replace the presentational dashboard shell with real learner state.

Priority items:

- typed learner dashboard data model
- dynamic progress and milestone data
- curriculum state tied to the learner profile
- room unlock logic
- next-step recommendation logic

### Phase 3: Add Persistent Learning Continuity

Goal: preserve learner context between sessions.

Priority items:

- persistent chat history
- contextual prompt inputs from learner profile and progress
- event tracking for key learner actions
- auditability around important profile and learning changes

### Phase 4: Build Practice Rooms

Goal: make Yantra hands-on instead of mostly explanatory.

Priority items:

- Python practice room
- neural-network builder
- dataset explorer
- prompt lab
- evaluation and feedback loops

### Phase 5: Expand Into Institutional And Outcome Layers

Goal: turn the learner product into a broader platform.

Priority items:

- teacher dashboard
- class analytics
- classroom and smartboard behaviors
- certifications
- portfolio and employer-facing signals

## Rule For Contributors

Before starting a feature, be explicit about whether it:

- hardens the current foundation
- makes existing learner surfaces truly data-driven
- adds new product surface area

That distinction matters because the repo already has a real auth/profile base. Work that ignores it will usually create churn.
