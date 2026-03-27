# Open Work

## Highest-Priority Product And Engineering Work

### Foundation hardening

- add tests for auth redirects, profile reads, and profile writes
- persist access requests instead of only logging them
- implement password reset
- decide whether Google sign-in should be real or remain deferred
- add basic monitoring and error reporting

### Dashboard data

- replace hardcoded dashboard arrays with typed data contracts
- connect dashboard progress and milestones to persistent learner state
- define room unlock and recommendation logic
- replace static curriculum and performance sections with real models

### Chat continuity

- persist chat sessions for authenticated learners
- add richer learner context to prompts
- decide on streaming versus non-streaming responses
- add operational visibility for chat failures

### Practice rooms

- Python execution environment
- neural-net builder
- dataset explorer
- prompt lab
- shared evaluation and feedback framework

### Institution and outcome layers

- teacher dashboard
- class analytics
- classroom mode or smartboard behavior
- certification workflows
- portfolio and hiring signals

## Current Product Gaps

- the learner identity layer exists, but onboarding is still thin
- the dashboard feels personalized, but most data is static
- the access pipeline exists, but requests are not stored or reviewed
- the profile exists, but broader learner state does not

## Current Engineering Gaps

- no automated test suite
- no persistent chat storage
- no analytics or observability layer
- no production access-request persistence
- no content-management workflow

## Cleanup Work That Needs Approval

These are intentionally not executed yet:

- deleting root-level local artifacts such as `dist/` or `node_modules_broken/`
- moving or removing reference assets under `docs/reference/`
- large-scale file-organization cleanup that is unrelated to runtime behavior
