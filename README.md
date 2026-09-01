# Software Development Agents

> ⚠️ **STATUS: MASIH DALAM TAHAP DEVELOPMENT — Frontend-Ready, Backend-Ready.**
> Ini adalah implementasi **frontend lengkap** dari domain Software-Development-Agents, dengan mock infrastruktur yang persistent, kontrak data kanonik, state machine eksplisit, serta batas integrasi Hermes & 9router.

Frontend dirancang **seolah-olah backend final sudah ada**. Lapisan eksekusi backend di-mock untuk sekarang. Saat backend nyata ditambahkan, tidak perlu rewrite arsitektur.

## Arsitektur Berlapis

```text
UI / Pages
    ↓
Application Services
    ↓
Domain Contracts
    ↓
Repository Interfaces
    ↓
Mock Implementations (localStorage)
```

**Target migrasi masa depan:**
```text
Mock Hermes Adapter   →   Real Hermes Adapter
Mock Model Gateway    →   NineRouterGatewayAdapter
Mock Repositories     →   Real Repositories (PostgreSQL)
```

## Struktur Repository

```text
src/
  app/          — router & app entry
  domain/       — models, enums, contracts, state-machines (kanonik)
  services/     — application services (state transitions + audit)
  repositories/ — repository interface contracts
  adapters/
    mock/       — mock db (localStorage) + mock repositories
  stores/       — reactive domain state (single source of truth)
  pages/
    global/     — Home, Projects, Agents, Skills, SOUL, Runs, Activity, Governance, Settings
    project/    — Project Overview, Requirements, Board, Team, Agents, Releases, Activity
  components/
    layout/     — AppLayout (sidebar + topbar)
    shared/     — StatusBadge, MetricCard, PageHeader, DataTable, Tag, EmptyState
  mocks/        — fixtures (8-12 projects, users, agents, tasks, dll)
```

## Konsep Kanonik

- **Agent** ≠ **AgentAssignment** ≠ **AgentSession** ≠ **Execution**
- **Workflow** (definisi) ≠ **WorkflowRun** (runtime)
- **Skill** ≠ **Capability** ≠ **Permission** ≠ **Policy**
- **Requirement** ↔ **Task** (many-to-many via traceability)
- **Verification** ≠ **Evidence**
- **Release** ≠ **Deployment**
- **Gateway** ≠ **Model**; 9router adalah adapter, bukan primitif domain

## Status Transisi Tervalidasi

`StateMachine` mencegah transisi status ilegal. Contoh:
- Task: `backlog → ready → in_progress → review → verification → done`
- Execution: `queued → running → succeeded/failed`
- Release: `draft → candidate → verification → approved → staging → production`

## Menjalankan Lokal

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run typecheck # npx tsc --noEmit
```

## Persistensi Mock

State disimpan di `localStorage` (key `software-development-agents.db.v1`) dan **tidak direset saat reload**. State lintas halaman konsisten karena ada satu reactive store sebagai sumber kebenaran.
