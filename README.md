# SKORGE — BPA & Continuous Controls Governance Platform

> An enterprise-grade **Business Process Automation (BPA) & Continuous Controls Governance** platform. SKORGE serves as the connective tissue between day-to-day corporate operations and regulatory compliance, ensuring that business processes move fast while adhering to internal and external audit standards.

**Live Demo →** [https://Zhafr01.github.io/recruitmentscreening/](https://Zhafr01.github.io/recruitmentscreening/)

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [Key Features](#2-key-features)
3. [User Personas & Role-Based Dashboards](#3-user-personas--role-based-dashboards)
4. [Navigation Architecture](#4-navigation-architecture)
5. [Module Documentation](#5-module-documentation)
6. [Technical Specifications](#6-technical-specifications)
7. [Project Structure](#7-project-structure)
8. [Installation & Local Development](#8-installation--local-development)
9. [Deployment to GitHub Pages](#9-deployment-to-github-pages)
10. [Design System](#10-design-system)
11. [Keyboard Shortcuts](#11-keyboard-shortcuts)

---

## 1. Platform Overview

SKORGE orchestrates two categories of operations simultaneously:

### Human-in-the-Loop Workflows
Multi-tier approval chains for high-stakes corporate decisions:
- **Capital Expenditure (CapEx)** requests with amount-based routing
- **Vendor procurement** with SLA-bound review cycles
- **IT access grants** with security control cross-checks
- **Employee onboarding/offboarding** with multi-department coordination

Each approval step enforces **SLA policies** (e.g., *"Step must be approved within 24 hours"*) and supports dynamic delegation and sub-process spawning (e.g., a hardware purchase automatically spawning an IT security review).

### System Automations & Triggers

| Type | Description | Example |
| :--- | :--- | :--- |
| **Cron / Scheduled** | Recurring routines on defined cadences | Nightly data integrity checks at 12:00 AM |
| **Webhook / Event-Driven** | Triggered by external system events | SAP pushing an unpaid invoice > 30 days |
| **One-Time / Ad-Hoc** | Single-run pipelines for manual operations | Bulk data migration, ad-hoc audit export |

### Continuous Controls Registry
Beyond workflows, SKORGE functions as a living **compliance register** where organizations track:
- Information security controls (ISO27001, SOC2)
- Software license entitlements
- Vendor SLA agreements
- Data Privacy Impact Assessments (DPIA)
- Recurring compliance attestations

Every control has a lifecycle — from `effective_from` date through `expires_at` — and when a control enters its 30-day renewal window, SKORGE automatically flags it and can trigger a renewal workflow.

---

## 2. Key Features

| Feature | Description |
| :--- | :--- |
| **Role-Based Dashboard** | Dashboard layout and widget priority dynamically adapt to the user's active persona |
| **Real-Time SLA Countdown** | Live per-second countdown timers on every pending approval, with breach alerts |
| **Batch Approval Actions** | Select multiple approvals at once to Approve, Reject, or Delegate in bulk |
| **Slide-Over Detail Drawer** | Inspect any approval in a side panel without losing your list context |
| **Keyboard-First Navigation** | Power-user keyboard shortcuts for rapid triage (`j`/`k`, `Space`, `Enter`) |
| **Command Palette** | Global search and quick navigation via `⌘K` / `Ctrl+K` |
| **Drag-and-Drop Layout** | Reorder dashboard widgets via Edit Layout mode with Framer Motion Reorder |
| **Notification Center** | Centralized alert system with unread badge indicators |
| **Demo Account Switcher** | Instantly switch between 4 user personas via the profile menu |
| **Dark / Light Mode** | Full dual-theme support with CSS custom properties |

---

## 3. User Personas & Role-Based Dashboards

A single corporate employee often wears multiple hats. SKORGE resolves this tension by adapting the entire dashboard experience based on the user's primary role.

### Approver — *Arief Budi, Finance Manager*
- **Priority:** Eliminate operational bottlenecks — every minute of delay on a P1 approval costs the business.
- **Primary Widget:** Pending Approvals (dominates the dashboard)
- **Key Interactions:** Batch approvals, SLA breach alerts, delegation with comments
- **Secondary Widgets:** My Requests, Controls, Automations (compact)

### Requester — *Siti Aminah, Marketing Specialist*
- **Priority:** Transparency — know exactly where your requests stand across departments.
- **Primary Widget:** My Requests (full-width, stage-by-stage progress)
- **Key Interactions:** Real-time step tracking, current reviewer visibility
- **Secondary Widgets:** Approvals, Controls, Schedules (compact)

### Control Owner — *Dewi Anggraini, Head of IT Governance*
- **Priority:** Proactive compliance — no control should ever expire without a renewal workflow triggered.
- **Primary Widget:** Controls Registry (full-width, expiration timeline)
- **Key Interactions:** Filter by expiry window, view control health status, trigger renewal
- **Secondary Widgets:** Approvals, My Requests, Schedules (compact)

### Automation Owner — *R. Pratama, DevOps Engineer*
- **Priority:** Infrastructure confidence — monitor scheduled jobs without being buried in routine success logs.
- **Primary Widget:** Automations & Schedules (full-width, status grid)
- **Key Interactions:** Toggle Active/Paused, manual "Run Now" triggers, view cron syntax
- **Secondary Widgets:** Approvals, My Requests, Controls (compact)

### Switching Personas (Demo Mode)
> Click the **user profile avatar** in the top-right corner of the TopBar. A **Switch Account** dropdown will appear listing all 4 demo accounts. Selecting one instantly switches the dashboard layout, greeting name, role label, and widget hierarchy.

---

## 4. Navigation Architecture

The sidebar uses a **4-group information architecture** to accommodate all 8 modules without creating a confusing, bloated menu:

```
SKORGE
│
├── HOME
│   └── Dashboard           ← Personalized daily cockpit
│
├── WORK
│   ├── Approvals    [•3]   ← Pending sign-offs (with live badge)
│   └── My Requests         ← Submitted workflows & tracking
│
├── GOVERN
│   ├── Controls            ← Compliance controls & asset registry
│   └── Automations         ← Cron schedules & trigger management
│
└── INSIGHT
    ├── Reports             ← SLA analytics & team metrics
    └── Audit Trail         ← Searchable historical approval log
```

The sidebar supports **collapse mode** — click the panel toggle button (☰) in the header to reduce it to icon-only mode, freeing up horizontal space for content-heavy pages.

---

## 5. Module Documentation

### 5.1 Dashboard

The dashboard is the personalized daily cockpit. It contains a **Focus Strip** at the top showing urgent KPI alerts, followed by a vertical stack of widgets ordered by the user's persona priority.

**Edit Layout Mode:**
1. Click **Edit Layout** button in the top-right of the Dashboard header.
2. A drag handle appears above each widget showing its name.
3. Drag widgets up or down to reorder them to your preference.
4. Click **Save Layout** to persist the new arrangement, or **Cancel** to revert to the persona default.

> The dashboard uses Framer Motion's `Reorder` API (vertical flex axis) to ensure smooth, glitch-free drag-and-drop with no CSS transition conflicts.

---

### 5.2 Pending Approvals

Full-page approval management workspace with batch processing capabilities.

| Column | Description |
| :--- | :--- |
| **Checkbox** | Select for batch actions |
| **Priority** | P1 (red/critical), P2 (amber/high), P3 (grey/normal) |
| **Request** | Title, requester name, and step progress (`Step 2 of 4`) |
| **Amount** | Dollar value for CapEx/financial requests |
| **Related Control** | Badge linking this approval to a compliance control |
| **SLA Timer** | Live per-second countdown; turns red on breach |
| **Actions** | Inline Approve / Reject / Delegate |

**Batch Processing:**
1. Check one or more rows using the checkbox.
2. A bulk action bar slides up from the bottom of the list.
3. Choose **Delegate**, **Reject**, or **Approve** to apply to all selected items.

**Slide-Over Drawer:**
- Click any row to open the full detail panel on the right side.
- Shows the complete approval chain, submission timeline, attached comments, and requester metadata.
- The rest of the list dims but remains visible behind the drawer — context is never lost.

---

### 5.3 My Requests

Real-time tracker for all workflows you have submitted across any department.

| Field | Description |
| :--- | :--- |
| **Request ID** | Unique identifier (e.g., `REQ-4821`) |
| **Title** | Workflow name and type |
| **Status** | In Progress / Approved / Rejected |
| **Stage Progress** | Visual progress bar showing current `Step X of Y` |
| **Current Reviewer** | Person currently holding the request |
| **Submitted** | Original submission date |

Filter options: **All / In Progress / Approved / Rejected**

---

### 5.4 Controls Registry

The compliance asset register with proactive lifecycle management.

| Field | Description |
| :--- | :--- |
| **Control ID** | Reference code (e.g., `CTRL-01`) |
| **Name** | Full control title |
| **Type** | ISO27001, SOC2 CC6.1, DPIA, Vendor SLA, License |
| **Effective From** | Date the control became enforceable |
| **Expires At** | Expiration / renewal deadline |
| **Days Remaining** | Live countdown in days |
| **Status Badge** | Healthy / Expiring Soon / Breached |

**Alert Thresholds:**
- 🟢 **Healthy** — More than 30 days remaining
- 🟡 **Expiring Soon** — Within 30 days of expiry
- 🔴 **Breached** — Past the expiration date

---

### 5.5 Automations & Cron Schedules

Management panel for all scheduled and event-driven automations.

| Field | Description |
| :--- | :--- |
| **Title** | Automation job name |
| **Trigger Type** | Cron, Webhook, One-Time |
| **Cron Expression** | Raw cron syntax (e.g., `0 0 * * *`) |
| **Frequency** | Human-readable schedule (e.g., *"Every day at 12:00 AM"*) |
| **Status** | Active 🟢 / Paused ⚪ / Failed 🔴 |
| **Actions** | ⚡ Run Now · ⏸ Pause · ▶ Resume · 🔁 Retry (on failed) |

**SLA Tile:** Alongside the schedule grid, a Personal SLA tile shows your overall approval completion rate (%) and average cycle time for quick performance awareness.

---

### 5.6 SLA Reports & Analytics

Operational performance metrics:
- Personal SLA compliance percentage
- Team average SLA compliance comparison
- Average cycle time per workflow type
- Step-by-step bottleneck identification (which department is causing delays)
- Historical trend charts powered by Recharts

---

### 5.7 Audit Trail

Searchable, immutable log of all approval decisions. Suitable for internal and external auditor review.

- **Timestamps** — exact date/time of every action
- **Actor** — name of the user who took the action
- **Decision** — Approved / Rejected / Delegated
- **Comments** — justification or notes attached at time of decision
- **Workflow Context** — linked request ID and title

---

### 5.8 Command Palette

Activated via `⌘K` (Mac) or `Ctrl+K` (Windows/Linux):
- **Search** across all pages, approvals, controls, and requests
- **Navigate** directly to any module without clicking through the sidebar
- **Recent actions** shown as quick-access suggestions

---

## 6. Technical Specifications

### Core Stack

| Category | Technology | Version |
| :--- | :--- | :--- |
| **UI Framework** | React | `^19.2.8` |
| **Language** | TypeScript | via Vite |
| **Build Tool** | Vite | `^8.3.0` |
| **Styling** | Tailwind CSS v4 | `^4.3.3` |
| **Animation** | Framer Motion | `^13.4.4` |
| **State Management** | Zustand | `^5.0.15` |
| **Icons** | Lucide React | `^1.48.0` |
| **Date Utilities** | date-fns | `^4.4.0` |
| **Charts** | Recharts | `^3.10.1` |
| **Command Palette** | cmdk | `^1.1.1` |
| **Headless UI** | Radix UI | `^1.x / ^2.x` |

### Radix UI Primitives

| Primitive | Used For |
| :--- | :--- |
| `@radix-ui/react-dialog` | Approval slide-over detail drawer |
| `@radix-ui/react-dropdown-menu` | Persona switcher, filter menus |
| `@radix-ui/react-popover` | Notification center popup |
| `@radix-ui/react-tabs` | Tabbed sections in detail panels |
| `@radix-ui/react-slot` | Polymorphic component composition |
| `@radix-ui/react-tooltip` | Icon button hover labels |

### Dev Dependencies

| Tool | Purpose |
| :--- | :--- |
| `vite-tsconfig-paths` | `@/` path alias resolution |
| `@vitejs/plugin-react` | React Fast Refresh |
| `@tailwindcss/vite` | Tailwind v4 Vite plugin |
| `oxlint` | Fast Rust-based linter (no ESLint config needed) |
| `gh-pages` | GitHub Pages deployment via `npm run deploy` |

### Path Aliases

Configured in `tsconfig.json` and resolved by `vite-tsconfig-paths`:

```ts
// @/ maps to src/
import { useDashboardStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { mockApprovals } from '@/lib/mockData';
```

### State Architecture (Zustand)

```ts
// src/lib/store.ts
export type Persona = 'Approver' | 'Requester' | 'Control Owner' | 'Automation Owner';

interface DashboardState {
  persona: Persona;              // Active user role — drives layout
  setPersona: (p: Persona) => void;
  editMode: boolean;             // Dashboard drag-and-drop mode
  setEditMode: (m: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (o: boolean) => void;
  activePage: string;            // Current sidebar navigation item
  setActivePage: (p: string) => void;
  hasNotifications: boolean;
  setHasNotifications: (h: boolean) => void;
}

// Persistence: only `persona` survives browser refresh
// Storage key: 'bpa-dashboard-storage'
```

### Dashboard Layout Engine

Widget order and layout are determined by the active `persona` at runtime:

```ts
const PERSONA_LAYOUTS = {
  'Approver':         { order: ['approvals', 'requests', 'controls', 'schedules'] },
  'Requester':        { order: ['requests', 'approvals', 'controls', 'schedules'] },
  'Control Owner':    { order: ['controls', 'approvals', 'requests', 'schedules'] },
  'Automation Owner': { order: ['schedules', 'approvals', 'requests', 'controls'] },
};
```

When `persona` changes, `useEffect` resets `widgetOrder` state. When in **Edit Mode**, `Reorder.Group` allows drag-and-drop reordering without CSS transition conflicts.

---

## 7. Project Structure

```
bpa-dashboard/
├── public/
├── src/
│   ├── assets/                       # Static images/icons
│   │
│   ├── components/                   # Shared/global UI components
│   │   ├── AnimatedCounter.tsx       # Animated number with framer-motion
│   │   ├── AuditTrail.tsx            # Audit Trail full-page view
│   │   ├── CommandPalette.tsx        # ⌘K global command palette (cmdk)
│   │   ├── ControlsRegistry.tsx      # Controls full-page view
│   │   ├── CronSchedules.tsx         # Automations full-page view
│   │   ├── Layout.tsx                # Root layout (Sidebar + TopBar + content)
│   │   ├── MyRequests.tsx            # My Requests full-page view
│   │   ├── NotificationPopup.tsx     # Bell icon notification dropdown
│   │   ├── NotificationsPage.tsx     # Notifications full-page view
│   │   ├── PendingApprovals.tsx      # Approvals full-page view
│   │   ├── SLAReports.tsx            # SLA Reports full-page view
│   │   ├── Sidebar.tsx               # Collapsible sidebar navigation
│   │   ├── Toast.tsx                 # Global toast notification provider
│   │   ├── TopBar.tsx                # Header bar + demo account switcher
│   │   ├── WorkflowCatalog.tsx       # New Workflow initiation catalog
│   │   └── ui/                       # Low-level primitive components
│   │
│   ├── features/                     # Feature-scoped dashboard widgets
│   │   ├── approvals/
│   │   │   ├── ApprovalsWidget.tsx   # Dashboard compact approvals widget
│   │   │   └── ApprovalDrawer.tsx    # Slide-over detail drawer
│   │   ├── controls/
│   │   │   └── ControlsWidget.tsx    # Dashboard controls widget
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx         # Widget layout composer
│   │   │   └── FocusStrip.tsx        # Top urgency strip (KPI alerts)
│   │   ├── requests/
│   │   │   └── MyRequestsWidget.tsx  # Dashboard requests widget
│   │   └── schedules/
│   │       └── SchedulesWidget.tsx   # Dashboard automations widget
│   │
│   ├── lib/
│   │   ├── mockData.ts               # Typed mock data (approvals, schedules)
│   │   ├── store.ts                  # Zustand global state store
│   │   └── utils.ts                  # cn() className utility
│   │
│   ├── data.js                       # Seed data (controls, requests, etc.)
│   ├── App.tsx                       # Root app with page router logic
│   ├── index.css                     # Global CSS + Tailwind + design tokens
│   └── main.tsx                      # ReactDOM render entry point
│
├── vite.config.ts                    # Vite config (base URL, plugins)
├── tsconfig.json                     # TypeScript config
├── package.json
└── README.md
```

---

## 8. Installation & Local Development

### Prerequisites

| Requirement | Minimum Version |
| :--- | :--- |
| Node.js | `>= 18.x` (LTS) |
| npm | `>= 9.x` |
| Git | Any recent version |

### Step-by-Step Setup

```bash
# 1. Clone the repository
git clone https://github.com/Zhafr01/recruitmentscreening.git
cd recruitmentscreening

# 2. Install all dependencies
npm install

# 3. Start the local development server
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

The dev server supports **Hot Module Replacement (HMR)** — changes to any `.tsx`, `.ts`, or `.css` file will reflect instantly without a full page reload.

### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Compile TypeScript + bundle for production into `dist/` |
| `npm run preview` | Serve the production `dist/` build locally for testing |
| `npm run lint` | Run oxlint static analysis across all source files |
| `npm run predeploy` | Automatically runs before `deploy` (executes `npm run build`) |
| `npm run deploy` | Build production bundle and publish to GitHub Pages |

---

## 9. Deployment to GitHub Pages

### How It Works

The `gh-pages` package pushes the contents of the `dist/` folder to a dedicated `gh-pages` branch on the repository. GitHub Pages serves content from that branch automatically.

### Configuration

**`vite.config.ts`** — The `base` option is required to match the GitHub repository name so that all asset URLs resolve correctly on the subdomain:

```ts
export default defineConfig({
  base: '/recruitmentscreening/',
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});
```

**`package.json`** — Deploy scripts:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Deployment Workflow

```bash
# 1. Stage your changes
git add .

# 2. Commit
git commit -m "feat: describe your changes"

# 3. Push source code to main branch
git push origin main

# 4. Build and publish to GitHub Pages
npm run deploy
```

The live site will be updated at:
**https://Zhafr01.github.io/recruitmentscreening/**

> **Note:** GitHub Pages may take 1–3 minutes to propagate changes. Always perform a **hard refresh** (`Ctrl+Shift+R` on Windows/Linux, `Cmd+Shift+R` on Mac) to bypass browser cache and see the latest version.

---

## 10. Design System

### Color Tokens

All colors are defined as CSS custom properties in `src/index.css`. The system supports both **light** and **dark** themes natively via `prefers-color-scheme` media query.

| Token | Light Value | Dark Value | Usage |
| :--- | :--- | :--- | :--- |
| `--color-base` | `#F8F7F4` | `#0F1117` | Page background |
| `--color-surface` | `#FFFFFF` | `#1A1D27` | Card / panel backgrounds |
| `--color-surface-raised` | `#F3F4F6` | `#22263A` | Hover backgrounds |
| `--color-accent` | `#1A56DB` | `#3B7BF5` | Primary CTAs, active indicators |
| `--color-text-ink` | `#1A1B25` | `#E8E9F0` | Primary body text |
| `--color-text-muted` | `#6B7280` | `#9CA3AF` | Secondary / helper text |
| `--color-text-faint` | `#9CA3AF` | `#4B5563` | Labels, placeholders |
| `--color-border` | `#E5E7EB` | `#2E3347` | Default border |
| `--color-breach` | `#EF4444` | `#F87171` | Errors, SLA breaches, critical |
| `--color-warning` | `#F59E0B` | `#FBBF24` | Warnings, approaching deadlines |
| `--color-healthy` | `#10B981` | `#34D399` | Active, compliant, successful |
| `--color-info` | `#3B82F6` | `#60A5FA` | Informational badges, in-progress |

### Typography

| Role | Font | Weight |
| :--- | :--- | :--- |
| UI / Body | `Inter` (Google Fonts) | 400, 500, 600 |
| Monospace | `JetBrains Mono` | 400 — used for IDs, cron syntax, SLA timers |

### Component Principles

| Principle | Implementation |
| :--- | :--- |
| **Glassmorphism** | `backdrop-blur-xl` + semi-transparent `bg-surface/60` on overlaying surfaces |
| **Entrance Animations** | Staggered `framer-motion` `opacity + y` transitions on list items |
| **Hover States** | `bg-surface-raised` lift on interactive table rows and cards |
| **Focus Rings** | `ring-2 ring-accent/50` for keyboard accessibility |
| **Borders** | `border-border/40–50` with reduced opacity for a lighter, premium feel |
| **Spacing Scale** | 4px base unit; 20px (`p-5`) standard card padding |
| **Card Radius** | `rounded-xl` (12px) for panels; `rounded-md` (6px) for badges/inputs |

### Utility Function

```ts
// src/lib/utils.ts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn('base-class', condition && 'conditional-class')} />
```

---

## 11. Keyboard Shortcuts

| Shortcut | Context | Action |
| :--- | :--- | :--- |
| `⌘K` / `Ctrl+K` | Global | Open Command Palette |
| `j` | Approvals list | Move focus to the **next** item |
| `k` | Approvals list | Move focus to the **previous** item |
| `Space` | Approvals list | **Toggle selection** on the focused item |
| `Enter` | Approvals list | **Open** the slide-over detail drawer for the focused item |
| `Esc` | Any overlay | **Close** the active drawer, dialog, or palette |

> Keyboard shortcuts on the Approvals list are disabled when the slide-over drawer is open to prevent conflicts.

---

## License

This project was developed as a design challenge submission for **SKORGE** — a conceptual enterprise BPA & Continuous Controls Governance platform prototype.

---

*SKORGE — Built with React 19 · Vite 8 · Tailwind CSS 4 · Framer Motion 13 · Radix UI · Zustand 5*
