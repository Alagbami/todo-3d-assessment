# To-Do 3D — Assessment Submission

## Summary
A small, frontend-only To-Do app built with Next.js (App Router), Tailwind CSS and an interactive 3D progress widget implemented using React Three Fiber. Data persists to `localStorage`.

## Highlights
- Next.js App Router + TypeScript
- Tailwind CSS UI
- State: `useReducer` + Context
- 3D visualization: `@react-three/fiber` & `@react-three/drei` (stars light up based on completion)
- Unit tests with Jest + React Testing Library
- Deployed to Vercel (live link in top of repo)

## Run locally (1-2 steps)
1. `git clone <repo>` && `cd repo`
2. `npm install` && `npm run dev`
Open http://localhost:3000

## Tests
`npm test`

## Architecture
- `app/` — Next.js App Router
- `src/context` — state + localStorage hydration
- `src/components` — UI & 3D components

## Trade-offs & notes
- Chose Context + reducer for simplicity and testability; Redux would be warranted as app scale grows.
- Persistence via `localStorage` (satisfies frontend-only constraint). For multi-device sync, add backend API.
- 3D widget kept minimal to ensure performance and accessibility.

## Future improvements
- Add edit task modal, tags, due dates
- Add small animation to 3D widget for completed tasks
- Server-side sync and auth if needed

## Demo
See DEMO.md (or run `npm run dev` and follow the Quick Demo in the repo root).

