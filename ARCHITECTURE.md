# Architecture & Integration Readiness

## Single Source of Truth

Semua kontrak domain bersumber dari barrel berikut. Komponen tidak mengimpor entity/enum dari jalur lain.

| Kontrak | Sumber Kebenaran |
|---|---|
| Entity types | `src/domain/models.ts` (re-export `src/domain/index.ts`) |
| Enum / status | `src/domain/enums.ts` (re-export `src/domain/index.ts`) |
| ID naming | `type ID = string` di `src/domain/enums.ts` |
| State transitions | `src/domain/state-machines.ts` |
| Domain events / audit | `src/domain/events.ts` (`DomainEvents` catalog) |
| Query / pagination | `src/domain/contracts.ts` (`Paginated`, query objects) |
| Repository contracts | `src/repositories/index.ts` |
| Service contracts | `src/services/index.ts` |
| Adapter contracts | `src/adapters/index.ts` (Hermes, ModelGateway) |
| Environment boundaries | `src/env.ts` (`appConfig`) |

## Definisi Kanonik (satu arti per entity)

| Entity | Arti tunggal |
|---|---|
| Project | Unit kerja terisolasi dengan workspaceId, status, fase SDLC |
| Requirement | Kebutuhan bisnis, punya acceptance criteria, status sendiri |
| Task | Item kerja, trace ke requirement & assignment |
| Workflow | Definisi proses (statis) |
| Agent | Definisi global agent (behavioral config + versions) |
| AgentAssignment | Ikatan agent ↔ project ↔ role (kontekstual per project) |
| AgentSession | Sesi kerja agent dalam satu project (isolasi konteks) |
| Execution | Eksekusi konkret (punya status, events, usage) |
| Verification | Proses validasi (status passed/failed) |
| Evidence | Bukti verifikasi (test report, scan, dll) |
| Release | Kandidat rilis (status + gates) |
| Deployment | Instansi deployment ke environment |
| Approval | Persetujuan first-class (risiko, status) |
| AuditEvent | Jejak mutasi penting |
| Gateway | Infrastruktur model gateway (provider-agnostic) |
| Model | Konfigurasi model di dalam gateway |

## Hubungan yang Tidak Boleh Dilanggar

```
Agent → AgentAssignment → AgentSession → Execution
Workflow → WorkflowRun → Execution
Requirement ↔ Task (many-to-many)
Verification ≠ Evidence
Release → ReleaseGate → Deployment
```

## Kepatuhan: Tidak Ada Duplikasi Nama/Status

- Setiap status memakai satu enum kanonik (`TaskStatus`, `ExecutionStatus`, dll).
- Tidak ada `Run`/`Job`/`DeploymentTarget`/`QAResult` sebagai nama pengganti entity kanonik.
- `9router` hanya muncul sebagai adapter (`NineRouterGatewayAdapter` masa depan), bukan primitif domain.
- Hermes hanya sebagai adapter/runtime boundary, bukan dependency UI.

## Backend Implementation Path

Backend dapat diimplementasikan tanpa mendesain ulang domain/frontend:

```
Web App (SolidJS)
    ↓ service calls
API (service contracts sudah ditetapkan)
    ↓
PostgreSQL (entity relasi di models.ts sudah relasional-ready)
    ↓
Queue / Event Bus (DomainEvents sebagai katalog event)
    ↓
Hermes Agent Runtime (implementasi HermesAdapter)
    ↓
Execution Workers (ExecutionRepository → Worker)
    ↓
Sandbox (Sandbox model + kontrak)
    ↓
Object Storage (Artifact.storageKey, bukan blob di relasional)
    ↓
Verification (VerificationRepository + evidence)
    ↓
Release (ReleaseRepository + gates + deployment)
```

**Migrasi adapter:**
- `MockRepositories` → `RealRepositories` (PostgreSQL) — ganti implementasi, kontrak tetap.
- `MockHermesAdapter` → `RealHermesAdapter` — tanpa ubah Hermes Chat/Execution UI.
- `MockModelGateway` → `NineRouterGatewayAdapter` — tanpa ubah Model/Routing UI.

**Instruksi untuk tahap berikutnya:** "Now implement the backend and infrastructure for the existing system."
