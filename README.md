# PrismCode

<p align="center">
  <strong>Next-Generation Algorithmic Arena & Developer Workspace</strong><br>
  <em>Designed and engineered by Refract Labs</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5.7" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white" alt="Vite 5" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Monaco_Editor-0.46-1E1E1E?logo=visual-studio-code&logoColor=white" alt="Monaco Editor" />
  <img src="https://img.shields.io/badge/Node.js-Express_4-339933?logo=node.js&logoColor=white" alt="Node.js Express" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" />
</p>

---

## ✦ Overview

**PrismCode** is a high-performance algorithmic engineering playground and competitive programming platform. Built for software engineers, students, and competitive coders, PrismCode blends an immersive, full-bleed code editor workspace with structured data structures and algorithms (DSA) progression, real-time code compilation, personalized performance telemetry, and customizable aesthetic atmospheres.

Developed by **Refract Labs**, PrismCode is architected as a modern, decoupled full-stack TypeScript application with real-time compilation engines, dual-mode authentication, granular privacy controls, and audit logging.

---

## ⚡ Highlights & Key Features

### 🖥️ Full-Bleed Monaco Coding Workspace
- **Multi-Language Support**: Real-time execution across **46 programming languages** (Python, TypeScript, JavaScript, C++, Java, Rust, Go, C#, Kotlin, and more) powered by the **OnlineCompiler.io Engine** with local fallback isolation.
- **Custom Monaco Theming**: Synchronized syntax palettes that seamlessly blend with your application theme.
- **Custom Test Runner**: Build, edit, run, and benchmark custom edge-case test suites side-by-side with official test fixtures.
- **Deep Execution Telemetry**: Granular execution statistics including runtime duration (ms), memory usage (MB), exit codes, test case verdicts, and stdout/stderr outputs.
- **Active Engagement Timer**: Precise practice tracking that automatically detects tab visibility and user idle states to log real problem-solving focus time.

### 📚 Curated Problem Bank & Topic Mastery
- **306+ Normalized DSA Problems**: Standardized into 19 canonical algorithmic topics (Arrays, Strings, Dynamic Programming, Graphs, Binary Search, Trees, Heaps, Sliding Window, Matrix, Backtracking, and more).
- **Topic Mastery Breakdown**: Visual progress bars showing strengths and focus areas with one-click practice launchers.
- **Targeted Difficulty Tiers**: Easy, Medium, and Hard challenges with acceptance rates and estimated solving benchmarks.

### 🔥 Daily Challenges & Momentum Signals
- **Daily Algorithmic Drops**: Dynamic calendar schedule providing curated daily challenges.
- **7-Day Velocity Signal**: Sparklines and activity logs measuring week-over-week consistency and streak retention.

### 🎨 Atmospheric Theme Engine
- **7 Bespoke Color Palettes**:
  - `Carbon Pulse` *(Default)* — Graphite, vibrant cyan, and warm brass
  - `Molten Bronze` — Deep obsidian with burnished amber glow
  - `Glacial Mist` — High-clarity Arctic blue with cool slate
  - `Crimson Ember` — Nocturnal ruby with volcanic red contrasts
  - `Obsidian Onyx` — True pitch black with titanium accents
  - `Royal Cobalt` — Deep sapphire with vibrant electric blue highlights
  - `Sandstone Dunes` — Earthy ochre with warm desert highlights
- **Contrast Certified**: Universal WCAG AA compliance with dedicated contrast variable bindings across both Dark and Light modes.

### 🛡️ Dual-Mode Enterprise Authentication & Security
- **Self-Hosted Session Cookies**: HTTP-only, SameSite-protected `prismcode_session` cookies powered by bcrypt password hashing and token rotation.
- **Clerk Integration Ready**: Seamlessly plug in Clerk publishable/secret keys to enable social OAuth (GitHub, Google) and hosted authentication with zero code refactoring.
- **Granular Privacy Modes**: Profile visibility toggle (`Public`, `Unlisted`, `Private`) that dynamically masks identity, practice activity, and search presence.
- **Rate-Limited API**: Express API rate limiting with proxy trust headers to protect compilation and authentication endpoints.

### 🛠️ Administrator Operations & Audit Logging
- **Problem Lifecycle Management**: Add, update, archive, and delete problems directly from the dedicated `/admin` dashboard.
- **Bulk Import**: Validate and stream-import problem libraries via JSON and JSONL with immediate schema validation.
- **Immutable Audit Trail**: Chronological security audit logs recording administrative actions, problem imports, and security events.

### ⌨️ Universal Command Palette (`Ctrl+K` / `⌘K`)
- Fuzzy-search problems, jump straight to today's daily challenge, toggle Dark/Light appearance, or execute system-wide quick actions without leaving the keyboard.

---

## 🏗️ Architecture & Technology Stack

```
PrismCode Platform
├── Frontend (prismcode-frontend)
│   ├── React 18.3 & TypeScript 5.6
│   ├── Vite 5.4 (High-speed HMR & Rollup bundling)
│   ├── Tailwind CSS 3.4 (Design tokens & atmospheric CSS variables)
│   ├── @monaco-editor/react (VS Code editor engine)
│   ├── Lucide React (Streamlined SVG iconography)
│   └── React Router DOM 6.28
│
└── Backend API (prismcode-backend)
    ├── Express 4.21 & TypeScript 5.7 (tsx runtime engine)
    ├── Atomic File-Backed DB (backend/data/db.json)
    ├── OnlineCompiler.io Execution Adapter
    ├── BcryptJS & Cookie-Parser
    ├── Express Rate Limit
    └── Zod 3.24 (Type-safe request validation)
```

---

## 📁 Repository Layout

```
Codearena/
├── index.html                   # HTML entry point with metadata & web fonts
├── package.json                 # Frontend dependencies & scripts
├── vite.config.ts               # Vite bundler configuration
├── tailwind.config.js           # Design system tokens & animations
├── start-prismcode.bat          # One-click Windows launch script
│
├── src/
│   ├── components/              # Modular UI components (Sidebar, Footer, Workspace, Palettes)
│   ├── context/                 # Global state (AppContext, AuthContext, UiContext)
│   ├── data/                    # Curated problem taxonomy & theme palettes
│   ├── hooks/                   # Custom hooks (useWorkspaceLayout, useEditorPreferences)
│   ├── lib/                     # API client, analytics, storage adapters, timer
│   ├── pages/                   # Route views (Dashboard, Workspace, Problems, Admin, Settings)
│   └── services/                # Problem cache & API communication services
│
└── backend/
    ├── package.json             # Backend dependencies & scripts
    ├── .env.example             # Environment variable template
    ├── data/
    │   └── db.json              # Atomic local database storage
    ├── scripts/
    │   ├── testAuth.ts          # Automated authentication & cookie test suite
    │   └── verify-admin-fixes.ts# Admin functionality & import test harness
    └── src/
        ├── config.ts            # Centralized environment configuration
        ├── index.ts             # Express application & HTTP server bootstrap
        ├── db/                  # Database management & seed definitions
        ├── middleware/          # Auth context, rate limiter, error handling
        ├── routes/              # Modular API route controllers
        └── services/            # Execution engine, email dispatchers
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or later (v20+ / v22+ recommended)
- **npm**: v9.0.0 or later

### Quick Start (Windows One-Click)

Simply double-click:
```bat
start-prismcode.bat
```
This script checks dependencies, installs missing modules, and boots the development server automatically.

---

### Manual Setup

#### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/samadrito16/Codearena.git
cd Codearena

# Install Frontend Dependencies
npm install

# Install Backend Dependencies
cd backend
npm install
cd ..
```

#### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
cd backend
copy .env.example .env
```

Edit `backend/.env` according to your preferences:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `8000` |
| `FRONTEND_URL` | Allowed CORS origin for frontend | `http://localhost:5173` |
| `SESSION_SECRET` | Secret key used for session cookie signing | `prismcode_default_session_secret` |
| `ONLINECOMPILER_API_KEY` | *(Optional)* OnlineCompiler.io API Key for live execution | `""` *(Uses fallback engine)* |
| `RESEND_API_KEY` | *(Optional)* Resend API key for password reset/verification emails | `""` *(Prints links to console in dev)* |
| `CLERK_SECRET_KEY` | *(Optional)* Clerk Backend Secret Key | `""` |
| `CLERK_PUBLISHABLE_KEY` | *(Optional)* Clerk Frontend Publishable Key | `""` |

#### 3. Run the Development Servers

In terminal 1 (Backend API):
```bash
cd backend
npm run dev
```
*API boots at `http://localhost:8000`.*

In terminal 2 (Frontend Client):
```bash
npm run dev
```
*Frontend boots at `http://localhost:5173`.*

---

## 🔑 Default Accounts

When the backend initializes for the first time, it automatically creates two demonstration accounts:

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@prismcode.com` | `Admin123!` | Full admin panel, problem CRUD, audit logs |
| **Developer User** | `alex@example.com` | `Alex123!` | Standard user workspace, progress tracking |

*(Note: Legacy login credentials for `admin@codearena.com` remain supported for backward compatibility).*

---

## 🧪 Testing & Verification

PrismCode includes automated test suites for security and administration:

```bash
cd backend

# Run the 32-point Authentication & Security Test Suite:
npx tsx scripts/testAuth.ts

# Run the 30-point Admin API & Problem Import Verification Suite:
npx tsx scripts/verify-admin-fixes.ts

# Run Production TypeScript Typecheck & Build:
npm run build
cd ..
npm run build
```

---

## 📜 Legal & Compliance

- **Terms of Service**: Available at `/terms`
- **Privacy Policy**: Available at `/privacy`
- **Controller**: Refract Labs
- **Support**: `support@refractlabs.com` | `legal@refractlabs.com`

---

## 📄 License

PrismCode is open-source software licensed under the [MIT License](LICENSE).

<p align="center">
  <sub>Built with care by <strong>Refract Labs</strong>. Empowering software engineers worldwide.</sub>
</p>
