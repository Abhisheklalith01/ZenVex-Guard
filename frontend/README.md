# ZenVex Guard — Frontend Architecture & Developer Guide

The ZenVex Guard frontend is a high-performance, dark-themed cybersecurity command centre built with React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, and Recharts.

---

## 1. Directory Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # Sticky header with brand, navigation & live defense badge
│   │   ├── Footer.tsx              # Footer with 1930 Helpline, Sanchar Saathi & disclaimers
│   │   ├── LandingPage.tsx         # Hero, interactive threat simulation & architecture
│   │   ├── Dashboard.tsx           # Command Centre with Recharts metrics & live threat stream
│   │   ├── MessageScanner.tsx      # Multi-channel text analysis & progress telemetry
│   │   ├── UrlScanner.tsx          # Air-gapped 14-point URL structural inspection
│   │   ├── InvestigationReport.tsx # Forensic dossier with highlighted spans & tabs
│   │   ├── ScamLibrary.tsx         # Searchable directory of 9 Indian scam playbooks
│   │   └── ProtectionCentre.tsx    # Emergency incident response protocols & hygiene guides
│   ├── services/
│   │   └── api.ts                  # Central API service with timeout & retry handling
│   ├── types/
│   │   └── intelligence.ts         # TypeScript interfaces matching backend models
│   ├── App.tsx                     # Main layout controller & navigation state
│   ├── main.tsx                    # React DOM entry point
│   └── index.css                   # Tailwind directives & glassmorphism utilities
├── dist/                           # Compiled production build (served by FastAPI)
├── index.html                      # HTML5 entry with Inter font & theme metadata
├── package.json                    # Dependencies & npm scripts
├── tailwind.config.js              # Custom navy palette, electric violet, and cyan glows
├── tsconfig.json                   # TypeScript compiler configuration
└── vite.config.ts                  # Vite build setup with proxy to localhost:8000
```

---

## 2. Component Hierarchy & Data Flow

```
App.tsx (Holds activeTab, report, prefilledMessage, prefilledUrl)
│
├── Navbar (Global header with tab switching and Quick Scan CTA)
│
├── [activeTab === 'home']            ──> LandingPage
├── [activeTab === 'dashboard']       ──> Dashboard
├── [activeTab === 'message-scanner'] ──> MessageScanner ──(onScanComplete)──┐
├── [activeTab === 'url-scanner']     ──> UrlScanner     ──(onScanComplete)──┤
├── [activeTab === 'report']          ──> InvestigationReport <─────────────┘
├── [activeTab === 'library']         ──> ScamLibrary ──(onTestExample)──> MessageScanner
└── [activeTab === 'protection']      ──> ProtectionCentre
│
└── Footer (Global footer with 1930 hotlines and legal advisory)
```

---

## 3. Key Modules & Developer Interfaces

### `src/services/api.ts`
Centralizes all HTTP communication with the backend. Automatically detects dev port `5173` and routes to `http://127.0.0.1:8000`, while using relative paths in production:
- `api.scanText(text: string): Promise<ScanResponse>`
- `api.scanUrl(url: string): Promise<ScanResponse>`
- `api.getExamples(): Promise<Example[]>`
- `api.getPlaybooks(): Promise<Playbook[]>`
- `api.getStats(): Promise<IntelligenceStats>`
- `api.checkHealth(): Promise<{ status, platform, version }>`

### `src/types/intelligence.ts`
TypeScript interfaces mirroring backend Pydantic schemas:
- `ScanResponse`: Main report containing `risk`, `scam_type`, `indicators`, `urls`, `spans`, `explanation`, `actions`, `helplines`.
- `Span`: `{ start: number, end: number, kind: 'url' | 'indicator', id: string }` used by `InvestigationReport.tsx` for precise text highlighting without altering character positions.

### `src/components/InvestigationReport.tsx`
Renders the forensic dossier:
- **Highlighted Text Renderer:** Maps sorted `spans` into original text substrings, highlighting indicators in rose (`bg-rose-500/25`) and URLs in cyan (`bg-cyan-500/25`).
- **Score Gauge:** Displays 0–100 score with visual breakdowns for text rules, URL heuristics, and ML inference.
- **Dossier Operations:** 1-click clipboard formatting and JSON export download.

---

## 4. How to Extend the Frontend Code

### Adding a New Screen or Tab
1. Create your component in `src/components/MyNewView.tsx`.
2. Add a navigation entry in `src/components/Navbar.tsx` inside the `navItems` array.
3. In `src/App.tsx`, import your component and render it conditionally:
   ```tsx
   {activeTab === 'my-view' && <MyNewView />}
   ```

### Adding a New Demonstration Template
1. Open `src/components/MessageScanner.tsx` or `src/services/api.ts`.
2. Append a new object to the fallback list or update `backend/app/engine/examples.py`.
3. The button will immediately render in the **Demonstration Scenarios** ribbon.

### Customizing Colors & Visual Theme
Theme tokens are configured in `tailwind.config.js`:
- Navy background shades: `navy-950` (`#070B14`), `navy-900` (`#0B0F19`), `navy-850` (`#0E1526`).
- Primary brand accent: `violet-500` (`#8b5cf6`), `violet-600` (`#7c3aed`).
- Secondary tech accent: `cyan-400` (`#22d3ee`), `cyan-500` (`#06b6d4`).
- Glassmorphism utility: `.glass-panel` in `src/index.css`.

---

## 5. Development & Production Commands

```bash
# Run local Vite dev server with Hot Module Replacement (HMR)
npm run dev

# Compile TypeScript and bundle production assets
npm run build

# Preview the production build locally
npm run preview
```

When `npm run build` runs, assets are written to `frontend/dist/`. The FastAPI backend automatically detects this folder and serves it at `http://127.0.0.1:8000`.
