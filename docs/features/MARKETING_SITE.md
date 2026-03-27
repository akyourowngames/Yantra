# Marketing Site

## Route And Ownership

- Route: `/`
- Entry file: `app/page.tsx`
- Main implementation: `src/features/marketing/MarketingLandingPage.tsx`

## Purpose

The marketing site is the public-facing narrative and conversion layer for Yantra.

Today it is responsible for:

- explaining the product story
- directing visitors into signup and login
- collecting access intent through the access-request form
- opening the Yantra chat assistant with guided prompts

## Main Sections

The landing page currently includes:

- fixed navigation with in-page anchors
- hero section
- animated ticker
- about/platform framing
- capability cards
- visual use-case grid
- access/contact section
- footer

## Live User Actions

### Account entry

- primary CTA routes to `/signup`
- auth links route to `/login` and `/signup`

### Chat entry

The page is wrapped in `ChatProvider`, so CTA buttons can open the shared chat modal and optionally pre-send prompts from `yantraCtaPrompts`.

### Access requests

The access/contact area uses `src/features/access/AccessRequestForm.tsx`, which submits to `POST /api/access-requests`.

That flow is live, but the backend currently validates and logs requests only. It does not store them yet.

## Current Strengths

- strong visual identity and motion language
- clear conversion paths into signup and chat
- real access-request submission flow
- public surface stays usable even when Supabase is not configured

## Current Limitations

- still implemented in one large feature file
- content is hardcoded
- no CMS or structured content source
- no persistence for access requests
- no deeper marketing routes yet

## Guidance For Future Work

- keep the landing page as the public route boundary
- extract large section blocks into smaller files before the component grows further
- move static content into typed config objects if copy variants increase
- persist access requests before expanding the form into a true admissions or partner workflow
