# PrismCode

PrismCode is a coding practice and interview preparation platform. It brings algorithm practice, guided learning, timed assessments, and code review exercises together with an in-browser editor.

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=20232A" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" alt="Vite 5" />
  <img src="https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white" alt="Express 4" />
</p>

## Features

- **Coding practice** with a searchable problem library, editorials, daily challenges, and saved progress.
- **In-browser workspace** with Monaco Editor and support for JavaScript, TypeScript, Python, Java, C++, C, Go, and Rust.
- **Guided study** with learning paths and algorithm pattern lessons, quizzes, drills, and coding practice.
- **Interview and placement preparation** with timed assessments, question review, and scorecards.
- **Code review practice** with multi-file scenarios, inline annotations, hints, and review feedback.
- **Progress tracking** with activity history, a yearly planner, contests, leaderboard, profiles, and certificates.
- **Personalized interface** with light and dark modes and selectable color themes.

## Technology

- Frontend: React, TypeScript, Vite, Tailwind CSS, React Router, and Monaco Editor.
- Backend: Node.js, TypeScript, and Express.
- Local persistence: a JSON database stored at `backend/data/db.json`.
- Code execution: JavaScript and TypeScript run in browser workers, Python runs with Pyodide, and compiled languages use the backend execution service.

## Getting started

### Requirements

- Node.js 20 or newer
- npm

### Install dependencies

```bash
git clone https://github.com/samadrito16/PrismCode.git
cd PrismCode
npm install
npm --prefix backend install
npm --prefix backend run db:generate
```

Create the backend environment file from the example.

```bash
# macOS or Linux
cp backend/.env.example backend/.env

# Windows PowerShell
Copy-Item backend/.env.example backend/.env
```

### Configure the backend

The backend reads settings from `backend/.env`. Defaults start the API at `http://localhost:8000` and allow the Vite app at `http://localhost:5173`.

| Variable | Purpose |
| --- | --- |
| `PORT` | Backend port. Defaults to `8000`. |
| `FRONTEND_URL` | Frontend origin allowed by the API. Defaults to `http://localhost:5173`. |
| `SESSION_SECRET` | Session signing secret. Use a unique secret of at least 32 characters for production. |
| `ONLINECOMPILER_API_KEY` | Enables isolated backend execution for compiled languages. |
| `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` | Enable Clerk authentication. |
| `RESEND_API_KEY` | Enables verification and password reset emails through Resend. Without it, links are not emailed. |

The frontend uses `VITE_API_BASE_URL` from a root `.env` file if you need to change the API URL. Its default is `http://localhost:8000/api`. When using Clerk, also set `VITE_CLERK_PUBLISHABLE_KEY` in the root `.env` and use the matching Clerk keys in `backend/.env`.

Backend execution uses an isolated OnlineCompiler service when `ONLINECOMPILER_API_KEY` is configured. Local execution of submitted code on the backend is disabled by default. JavaScript and TypeScript browser execution runs in workers, while Python uses Pyodide in WebAssembly.

Keep `.env` files and API keys private. The example file contains development placeholders and should not be used as a production configuration.

### Start the app

Run the backend and frontend in separate terminals from the project root.

```bash
# Terminal 1
npm --prefix backend run dev
```

```bash
# Terminal 2
npm run dev
```

Open the local address printed by Vite, usually `http://localhost:5173`. The backend health endpoint is available at `http://localhost:8000/api/health`.

## Cloud PostgreSQL

Learning paths are the first content type supported by PostgreSQL. Use a separate cloud test database while reviewing this migration. Other content and user records still use their existing storage.

1. Create an empty Neon project for testing and copy the pooled and direct PostgreSQL URLs into `backend/.env` as `DATABASE_URL` and `DIRECT_DATABASE_URL`, respectively. Keep both URLs private.
2. From the repository root, install the backend dependencies and prepare the database.

   ```bash
   npm --prefix backend ci
   npm --prefix backend run db:generate
   npm --prefix backend run db:migrate
   npm --prefix backend run db:seed:learning-paths
   ```

3. Start PrismCode and sign in as an administrator. In **Admin → Learning paths**, create or edit a path, save the draft, then publish it. Archiving hides a path from learners and keeps its revision history. Restore an earlier revision as a draft and publish it to bring that version back.

The seed command inserts missing bundled paths and preserves existing drafts, published revisions, and archived entries. Run it with `-- --check` to validate the source content without a database.

Published learning path edits take effect through the API without a website rebuild. GitHub Actions runs builds and PostgreSQL publishing checks on pushes and pull requests. Once the remaining persistence moves to PostgreSQL, the cloud web service can deploy from `main` after checks pass.

## Useful commands

Run these commands from the project root.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check and build the frontend. |
| `npm run preview` | Preview the built frontend locally. |
| `npm --prefix backend run dev` | Start the API in watch mode. |
| `npm --prefix backend run build` | Compile the backend TypeScript. |
| `npm --prefix backend test` | Run the backend test suite. |
| `npm --prefix backend run test:catalog` | Build the backend and run question catalog tests. |

## Project layout

```text
.
├── src/
│   ├── components/   # Shared UI and feature components
│   ├── context/      # Authentication, UI, and app state
│   ├── data/         # Problem, learning, interview, and review content
│   ├── pages/        # Route-level screens
│   ├── services/     # Frontend API and code execution clients
│   └── lib/          # Shared application utilities
└── backend/
    ├── src/
    │   ├── routes/   # API endpoints
    │   ├── services/ # Authentication, email, and execution services
    │   └── db/       # JSON database implementation
    ├── data/         # Local database and catalog data
    └── tests/        # Backend test suite
```

## Contributing

Bug reports and pull requests are welcome. For larger changes, open an issue first so the scope can be discussed. Please avoid committing environment files, API keys, or local database data.
