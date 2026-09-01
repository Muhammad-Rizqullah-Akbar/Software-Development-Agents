# Changelog

Semua perubahan signifikan pada **Software-Development-Agents** dicatat di sini.

Format mengikuti [Conventional Commits](https://www.conventionalcommits.org/):
`<type>: <description>` dengan scope & body eksplisit.

---

## [v0.1.0] — 2026-09-01

### Commit 3: `feat: integration readiness pass + restore interactive icon design`

**Hash:** `41e4b7a`

**Ringkasan:** Membuat frontend *backend-ready* — satu sumber kebenaran untuk seluruh kontrak domain, serta memulihkan desain interaktif (icon SVG + timeline animasi) dari iterasi sebelumnya.

**Perubahan (27 file, +601/−153):**

**Integration readiness (single source of truth):**
- `src/domain/index.ts` — barrel kanonik (models, enums, contracts, state-machines)
- `src/domain/events.ts` — katalog `DomainEvents` + mapper status→event
  (`projectStatusEvent`, `taskStatusEvent`, `sessionStatusEvent`, `executionStatusEvent`, `requirementStatusEvent`)
- `src/services/index.ts` — service kini memakai `DomainEvents` (bukan string bebas / template literal)
- `src/env.ts` — environment config boundaries (`appConfig`: workspace, user, adapter toggles)
- `src/stores/index.ts` — memakai `appConfig`, bukan hardcoded identity
- `src/pages/project/ProjectBoard.tsx` — kolom memakai `TaskStatus` kanonik
- `ARCHITECTURE.md` — audit single-source-of-truth + jalur implementasi backend

**Restore desain interaktif:**
- `src/components/shared/icons.tsx` — SVG icon system (icon bermakna per state)
- `StatusBadge` — icon + label, bukan dot (tanpa emoji, tanpa huruf-as-icon)
- `PageHeader`/`MetricCard` — dukung icon
- `TimelineProgress` — timeline beranimasi (marching wave, ping ring)
- `AppLayout` — sidebar nav memakai icon SVG
- Home/Projects/Agents/Overview — icon + timeline + Hermes chat interaktif
- Activity pages — memakai `eventLabel()` dari DomainEvents

**Verifikasi:** `tsc --noEmit` 0 errors · `vite build` 56 modules ✓

---

### Commit 2: `refactor: transform UI prototype into backend-ready frontend system`

**Hash:** `6557fb1`

**Ringkasan:** Mengubah UI prototype menjadi implementasi frontend lengkap dari domain SDLC, dengan mock infrastruktur persistent, kontrak data kanonik, dan batas integrasi Hermes/9router.

**Perubahan (39 file, +3784/−1074):**

- `src/domain/models.ts` — semua entity kanonik (Project, Agent, AgentAssignment, AgentSession, Execution, Verification, Evidence, Release, Deployment, Approval, AuditEvent, Gateway, Model, dll)
- `src/domain/enums.ts` — semua status kanonik (TaskStatus, ExecutionStatus, ReleaseStatus, dll)
- `src/domain/contracts.ts` — query + pagination contracts
- `src/domain/state-machines.ts` — validasi transisi status
- `src/repositories/index.ts` — 40+ repository interface contracts
- `src/adapters/mock/` — persistent db (localStorage) + mock repositories
- `src/adapters/index.ts` — `MockHermesAdapter`, `MockModelGateway`
- `src/services/index.ts` — application service layer (state transitions + audit)
- `src/stores/index.ts` — reactive single source of truth (cross-page consistency)
- `src/mocks/fixtures.ts` — 9 projects, multi-user, assignments, sessions, executions, requirements, tasks, approvals, verifications, releases
- `src/app/routes.tsx` — real nested router (`@solidjs/router`), project-scoped routes
- Pecah monolitik `src/pages.tsx` → modular global + project pages

**Pemisahan kanonik:** Agent ≠ AgentAssignment ≠ AgentSession ≠ Execution · Workflow ≠ WorkflowRun · Skill ≠ Capability ≠ Permission ≠ Policy · Verification ≠ Evidence · Release ≠ Deployment · Gateway ≠ Model (9router sebagai adapter)

**Verifikasi:** `tsc --noEmit` 0 errors · `vite build` 53 modules ✓

---

### Commit 1: `feat: inisialisasi Hermes Console - UI testing SolidJS SDLC multi-agent`

**Hash:** `44fed4a`

**Ringkasan:** Inisialisasi project & UI prototype SolidJS. **Masih tahap development & UI testing — belum siap produksi.**

**Perubahan (15 file, +2774):**

- Scaffold Vite + SolidJS + TypeScript (`package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`)
- `.gitignore` — mengecualikan `node_modules/`, `dist/`, `.env`
- `README.md` — dokumentasi project & status development
- UI prototype: sidebar, topbar, components, icons, pages
- `package-lock.json` — lockfile dependensi

**Catatan:** Repo ini sengaja hanya berisi UI console (SolidJS). Tools sourcing & backend berada di luar repo.

---

## Kontributor

Hanya **Muhammad-Rizqullah-Akbar** (inirizqullahakbar@gmail.com) — tanpa agents sebagai contributor.

## Status

- **Fase:** Development — Frontend-Ready, Backend-Ready
- **Persistensi:** localStorage (mock), siap migrasi PostgreSQL + object storage
