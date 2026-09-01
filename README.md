# Software Development Agents

> ⚠️ **STATUS: MASIH DALAM TAHAP DEVELOPMENT — UI TESTING SAJA.**
> Aplikasi ini belum siap untuk produksi. Saat ini hanya tahap eksplorasi & pengujian UI (UI testing).

Kontrol tower & kolaborasi multi-agent untuk ekosistem Hermes Agent. Platform ini dirancang untuk mengelola pipeline Software Development Lifecycle (SDLC) secara end-to-end — dari ide, PRD/BRD, desain, build, testing, sandbox security, hingga CI/CD deployment.

## ✨ Fitur Utama (Dalam Pengembangan)

- **Project Planner** — Alur SDLC bertahap (Define → Plan → Design → Build → Verify) dengan timeline progress.
- **Agent Grid** — Melihat & mengelompokkan agent berdasarkan skill, workload, dan akurasi output.
- **Skill Bank** — Katalog skill & framework yang terstruktur per kategori (Web, Mobile, Tools, Agent Persona).
- **SOUL Lab** — Editor & A/B testing persona agent (SOUL.md).
- **Board** — Kanban kolaborasi multi-agent (Jira-style) dengan routing berbasis skill.
- **Chat Agents** — Komunikasi langsung dengan agent.
- **Code Inspector** — Inspeksi kode project langsung di UI.
- **Prototype Preview** — Live preview 3 mode (Desktop, Tablet, Mobile).
- **CI/CD & Hosting Control** — Dashboard monitoring service & deployment.

## 🛠️ Tech Stack

- **SolidJS** + **TypeScript** (`.tsx`)
- **Vite** build tool
- **CSS Design Tokens** (anti-AI-slop, ink & paper palette)

## 🚀 Menjalankan Lokal

```bash
npm install
npm run dev       # dev server di http://localhost:5173
npm run build     # production build
```

## 📌 Catatan Pengembangan

- Repository ini **sengaja dibatasi** hanya berisi UI console (SolidJS).
- Tools sourcing & backend berada di luar repo ini.
- Semua fitur masih dalam tahap iterasi desain & UI testing, belum terintegrasi dengan backend Hermes sungguhan.
