# Chat System

## Purpose

Yantra chat is the main live AI feature in the repo.

It currently serves as:

- an AI teacher for learners
- a product explainer on the marketing site
- a contextual helper inside the dashboard

## Main Files

- client UI and provider: `src/features/chat/ChatWidget.tsx`
- rich message rendering: `src/features/chat/ChatMessageContent.tsx`
- shared model, prompt, and quick prompts: `src/features/chat/yantra-chat.ts`
- server route: `app/api/chat/route.ts`

## Where It Is Used

- marketing landing page
- protected dashboard

The auth pages do not embed the chat widget.

## How It Works

1. A page wraps its surface in `ChatProvider`.
2. The provider keeps conversation state in client memory.
3. CTA buttons or the floating launcher open the modal.
4. Sending a message posts recent messages to `POST /api/chat`.
5. The route sanitizes messages, keeps the last 12, trims each message, and truncates content length.
6. The route calls Gemini with the shared Yantra system prompt.
7. The reply is appended in the client UI.

## Current Runtime Details

- model: `gemini-2.5-flash`
- API package: `@google/genai`
- server runtime: Node.js
- welcome and quick prompts are defined in `yantra-chat.ts`
- markdown and LaTeX rendering are supported in the message UI

## Current Capabilities

- reusable modal chat UI
- floating launcher
- CTA-driven prompts from the landing page
- dashboard quick prompts
- loading and error states
- concise system prompt tailored to Yantra's product context

## Current Limitations

- no persistence
- no user-linked history
- no tool calling
- no moderation or analytics layer
- no streaming responses
- single-provider implementation only

## Environment Dependency

Requires:

- `GEMINI_API_KEY`

The route also accepts `GOOGLE_API_KEY` as a fallback.

## Recommended Next Work

- persist chat sessions for authenticated learners
- add observability and error tracking
- decide whether responses should stream
- pass richer structured learner context into prompts once the dashboard data model is real
