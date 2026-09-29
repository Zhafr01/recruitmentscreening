# SKORGE - Enterprise BPA & Continuous Controls Governance Platform

A high-fidelity prototype of the core navigation and personalized End-User Dashboard, designed for operations control and regulatory compliance.

## Information Architecture (IA) Rationale
The platform balances the immediate urgency of human-in-the-loop workflows (approvals) with the long-term obligations of continuous compliance (controls).
Instead of a flat 8-item menu, the IA groups by mental model:
- **Home**: Dashboard
- **Work (things that need me)**: Approvals, My Requests
- **Govern (things I own)**: Controls, Automations
- **Insight**: Reports, Audit Trail

"Start" is not a destination, but a global action—triggerable via the prominent "New Workflow" button in the sidebar or the Command Palette (`Cmd+K`).

## Balancing Urgency vs. Long-term Compliance
The Dashboard layout is deliberately asymmetric to contrast these two operational speeds:
- **Zone A: "Now" (Top-left, dominant)**: A dense, fast-moving list of urgent approvals, sorted by a computed urgency score. Features live-ticking SLAs and sharp micro-animations.
- **Zone B: "Horizon" (Right column)**: A spacious, calm timeline of long-term compliance controls. Uses slower, easing motion to represent things that are weeks/months away from expiring.
- **Zone C: "Pulse" (Bottom band)**: Quick KPI tiles and automation health snapshots.

## The 3-Level Customization Pattern
Progressive disclosure is applied to dashboard customization to serve both casual and power users:
1. **Zero-config**: Persona presets (Approver, Control Owner, Executive) instantly reshape the dashboard.
2. **Light touch**: Individual widget contextual menus for quick resizing or hiding.
3. **Power mode**: A dedicated "Edit Layout" mode with drag-and-drop grid snapping and live widget library previews.

## Motion Principles
Animation is never decorative; it always communicates state, hierarchy, or causality.
- **Entrance**: Staggered, layout-aware reveals using a custom easing curve (`cubic-bezier(0.22, 1, 0.36, 1)`).
- **Physicality**: Spring physics for interactive elements like the batch-action floating bar and the slide-over drawer.
- **Causality**: Shared-element layout transitions connect list items to their deep-inspection drawers.

## Running the App
```bash
npm install
npm run dev
```

> Built with React, TypeScript, Tailwind CSS v4, Framer Motion, and Zustand.
