# PrismCode — Premium developer workspace by Refract Labs

This package includes the dedicated Daily Challenges and Your Progress pages, a refreshed dashboard, a searchable problem library, an immersive Monaco workspace, leaderboard, and appearance settings.

## Run on Windows

1. Extract the ZIP.
2. Open the `prismcode-frontend` folder in VS Code (the folder containing `package.json`).
3. In the VS Code terminal, run:

   ```powershell
   npm.cmd install
   npm.cmd run dev
   ```

4. Open the Local URL printed by Vite (normally `http://localhost:5173`).

Do not use Live Server. Keep the Vite terminal open while developing. After the first dependency install, everyday startup only requires `npm.cmd run dev`.

## Product surfaces

- Dedicated `/daily-challenges` and `/progress` routes, linked from desktop and mobile navigation.
- A focused dashboard with a hero recommendation, animated problem-library and skill-path counts, practice pathways, and a seven-day activity sparkline. Duplicate progress summary cards remain on the Progress page rather than the dashboard.
- Searchable problem library with difficulty/topic filters and quick solved-state updates.
- Full-bleed, two-pane coding workspace with a Monaco editor, language-specific editor themes, problem description tabs, sample console, and explicit Run/Submit request states.
- Frosted sidebar and topbar, palette-aware active navigation, gradient/shimmer primary actions, animated page/list entrances, and reduced-motion support.
- Manrope, Montserrat, and Geist Mono typography, tabular number styling, layered mesh atmospheres, and a subtle noise overlay.
- Light and dark modes plus seven palette choices in Settings. Carbon Pulse is the default palette.

## Local data and execution limits

Sign-in, question records, progress history, daily challenge completion, editor text, and preferences are handled client-side in this starter. Progress history is browser-local. Workspace sessions are recorded when leaving a workspace after at least 30 seconds. Arena points are calculated as 10 per Easy, 20 per Medium, and 30 per Hard problem solved.

## Code Execution Engine & Supported Languages

PrismCode features a full execution engine powered by the **OnlineCompiler.io API** (Free Tier supporting up to 100,000 runs/month) and supports **46 programming languages** (Python, JavaScript, TypeScript, C++, Java, C#, Go, Rust, Swift, Kotlin, Dart, PHP, Ruby, and 33 more).

- **API Configuration**: Set `ONLINECOMPILER_API_KEY` in `backend/.env`. If the key is not set, a local safe execution fallback handles basic runs.
- **Run & Submit Modes**: Supports both unit-test execution against problem cases and direct `stdin`/`stdout` execution.
- **Diagnostics**: Detailed verdicts (`Accepted`, `Wrong Answer`, `Time Limit Exceeded`, `Runtime Error`), runtime (ms), memory usage (MB), stdout, and stderr logs.
