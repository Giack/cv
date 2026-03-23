---
name: verify
description: Run full lint + build validation before committing or pushing. Use after making changes to ensure everything passes.
---

Run the following commands in sequence. Stop and report any failures immediately.

1. `npm run lint` — ESLint + TypeScript type-check
2. `npm run build` — static export to ./out/ (catches type errors and build failures ESLint misses)

Report the results clearly. If either fails, show the relevant error output and suggest what to fix.
