import { For, createSignal } from "solid-js";
import { Metric, Status, Tag, TimelineProgress } from "./components";
import { 
  IconCheck, IconBolt, IconSpark, IconClock, IconSoul, IconPlus, 
  IconPlay, IconSave, IconAgent, IconSearch, IconCode, IconPreview, 
  IconChat, IconPanel, IconBoard, IconSandbox, IconDeploy, IconGithub, IconServer, IconExternal 
} from "./icons";

/* ===================== OVERVIEW ===================== */
export function OverviewPage(props: { onCreateProject: () => void; onNavigate: (page: string) => void }) {
  return (
    <div>
      <div class="page-head">
        <div>
          <div class="eyebrow">Workspace Overview</div>
          <h1>Selamat datang, Eqii</h1>
        </div>
        <button class="btn btn-primary" onClick={props.onCreateProject}>
          <IconPlus class="ico-sm" />
          Buat Proyek
        </button>
      </div>

      <div class="grid grid-4" style={{ "margin-bottom": "var(--sp-6)" }}>
        <Metric label="Agent Aktif" value="5" sub="2 milik teman" />
        <Metric label="Skill Terdaftar" value="38" sub="12 kategori" />
        <Metric label="Task Aktif" value="14" sub="7 sedang jalan" />
        <Metric label="Sprint" value="S2" sub="8 dari 10 selesai" />
      </div>

      {/* Timeline project progress */}
      <div class="card card-pad" style={{ "margin-bottom": "var(--sp-6)" }}>
        <div style={{ display: "flex", "align-items": "center", "margin-bottom": "var(--sp-5)" }}>
          <h3 style={{ flex: 1, margin: 0 }}>Progress Proyek — Hermes Console</h3>
          <Status kind="accent">iterative</Status>
        </div>
        <TimelineProgress
          value={62}
          labels={[
            { label: "Planning", state: "done" },
            { label: "Desain", state: "done" },
            { label: "Build 62%", state: "cur" },
            { label: "Test", state: "todo" },
            { label: "Rilis", state: "todo" },
          ]}
        />
      </div>

      <div class="grid grid-2">
        {/* Agent grid preview */}
        <div class="card">
          <div class="card-head">
            <h3>Agent Grid</h3>
            <button class="btn btn-sm btn-ghost" onClick={() => props.onNavigate("agents")}>kelola</button>
          </div>
          <div>
            {[
              { name: "Hermes Researcher", role: "default · milik Anda", st: <Status kind="online">aktif</Status>, bg: "var(--ink)", fg: "var(--accent)", tags: ["research", "evidence", "sourcing"] },
              { name: "Airin", role: "airin-research · milik teman", st: <Status kind="busy">sibuk</Status>, bg: "var(--teal)", fg: "#fff", tags: ["writing", "web-research", "backend"] },
            ].map((a, i) => (
              <div style={{ padding: "var(--sp-4)", "border-bottom": i === 0 ? "1px solid var(--line)" : "none", display: "flex", "flex-direction": "column", gap: "var(--sp-3)" }}>
                <div style={{ display: "flex", "align-items": "center", gap: "var(--sp-4)" }}>
                  <div style={{ width: 42, height: 42, "border-radius": "var(--r-md)", background: a.bg, color: a.fg, display: "grid", "place-items": "center", "flex-shrink": 0 }}><IconAgent class="ico-lg" /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ "font-weight": 600 }}>{a.name}</div>
                    <div style={{ "font-size": "0.78rem", color: "var(--ink-faint)", "font-family": "var(--font-mono)" }}>{a.role}</div>
                  </div>
                  {a.st}
                </div>
                <div style={{ display: "flex", "flex-wrap": "wrap", gap: "var(--sp-2)" }}>
                  <For each={a.tags}>{(t) => <Tag>{t}</Tag>}</For>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div class="card">
          <div class="card-head"><h3>Aktivitas Terbaru</h3></div>
          <div>
            {[
              { ico: <IconCheck class="ico-md" />, c: "var(--teal)", t: <><b>Airin</b> menyelesaikan <span class="mono">task #142</span> — draft backend API</> },
              { ico: <IconBolt class="ico-md" />, c: "var(--accent)", t: <><b>Routing</b> skill <Tag>research</Tag> → tugas riset frontend</> },
              { ico: <IconSoul class="ico-md" />, c: "var(--gold)", t: <><b>Eqii</b> deploy SOUL v3 di SOUL Lab</> },
              { ico: <IconSpark class="ico-md" />, c: "var(--blue)", t: <><b>Sistem</b> routing 3 task ke agent berdasarkan skill</> },
            ].map((a) => (
              <div class="activity-item">
                <span style={{ color: a.c, display: "inline-flex" }}>{a.ico}</span>
                <span>{a.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== PROJECTS (MODULAR) ===================== */
export function ProjectsPage(props: { onCreateProject: () => void }) {
  const [filter, setFilter] = createSignal<"all" | "active" | "completed" | "planning">("all");

  const projectsList = [
    { id: "P1", name: "Hermes Agent Console", category: "Fullstack SaaS", status: "active", progress: 62, agent: "Hermes Researcher", tech: ["SolidJS", "TypeScript", "Vite", "Node.js"], desc: "Kontrol tower & kolaborasi multi-agent untuk ekosistem Hermes." },
    { id: "P2", name: "Cognitive Labs Runtime", category: "Backend API", status: "active", progress: 85, agent: "Airin", tech: ["Node.js", "Express", "SQLite"], desc: "Runtime backend penyedia API port 3001 untuk UI Labs." },
    { id: "P3", name: "LinkedIn & GitHub Job Scraper", category: "Data Pipeline", status: "completed", progress: 100, agent: "Hermes Researcher", tech: ["Python", "JobSpy", "gh CLI"], desc: "Automated sourcing script untuk menarik job listing & GitHub repos." },
    { id: "P4", name: "Mobile Agent Controller", category: "Mobile App", status: "planning", progress: 15, agent: "Twin (Eqii)", tech: ["React Native", "Tailscale API"], desc: "Aplikasi mobile companion untuk mengontrol agent dari HP via Tailscale." }
  ];

  const filtered = () => {
    if (filter() === "all") return projectsList;
    return projectsList.filter(p => p.status === filter());
  };

  return (
    <div>
      <div class="page-head">
        <div>
          <div class="eyebrow">Modular Workspaces</div>
          <h1>Daftar Proyek</h1>
        </div>
        <button class="btn btn-primary" onClick={props.onCreateProject}>
          <IconPlus class="ico-sm" /> Buat Proyek Baru
        </button>
      </div>

      {/* Filter Tabs */}
      <div class="tabs">
        <button class={`tab ${filter() === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>Semua (4)</button>
        <button class={`tab ${filter() === "active" ? "active" : ""}`} onClick={() => setFilter("active")}>Sedang Berjalan (2)</button>
        <button class={`tab ${filter() === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>Selesai (1)</button>
        <button class={`tab ${filter() === "planning" ? "active" : ""}`} onClick={() => setFilter("planning")}>Dalam Planning (1)</button>
      </div>

      <div class="grid grid-2">
        <For each={filtered()}>
          {(p) => (
            <div class="card card-pad">
              <div style={{ display: "flex", "align-items": "flex-start", "justify-content": "space-between", "margin-bottom": "var(--sp-2)" }}>
                <div>
                  <span class="mono" style={{ "font-size": "0.72rem", color: "var(--ink-faint)" }}>{p.id} · {p.category}</span>
                  <h3 style={{ margin: "2px 0 0" }}>{p.name}</h3>
                </div>
                <Status kind={p.status === "completed" ? "online" : p.status === "active" ? "accent" : "busy"}>
                  {p.status === "completed" ? "Selesai" : p.status === "active" ? "Berjalan" : "Planning"}
                </Status>
              </div>

              <p style={{ "font-size": "0.86rem", color: "var(--ink-soft)", "margin-bottom": "var(--sp-4)" }}>{p.desc}</p>

              <div style={{ "margin-bottom": "var(--sp-4)" }}>
                <div style={{ display: "flex", "justify-content": "space-between", "font-size": "0.74rem", color: "var(--ink-faint)", "margin-bottom": 4 }}>
                  <span>Progress</span>
                  <span class="mono">{p.progress}%</span>
                </div>
                <TimelineProgress value={p.progress} color={p.status === "completed" ? "teal" : "accent"} />
              </div>

              <div style={{ display: "flex", "align-items": "center", "justify-content": "space-between", "border-top": "1px solid var(--line)", "padding-top": "var(--sp-3)" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <For each={p.tech}>{(t) => <Tag>{t}</Tag>}</For>
                </div>
                <span class="mono" style={{ "font-size": "0.72rem", color: "var(--ink-faint)" }}>{p.agent}</span>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

/* ===================== SKILL BANK (CATEGORIZED & DETAILED) ===================== */
export function SkillsPage(props: { onOpenAddSkill: () => void }) {
  const [activeTab, setActiveTab] = createSignal<"web" | "mobile" | "tools" | "agent">("web");

  const skillsData = {
    web: [
      { name: "SolidJS & Vite SPA", cat: "Frontend", level: "Expert", tools: "Vite, TypeScript, JSX, Signals", desc: "Build reactivity tanpa virtual DOM, surgical DOM updates, bundle minimal." },
      { name: "Node.js & Express REST API", cat: "Backend", level: "Advanced", tools: "Node.js, Express, Cors, JWT", desc: "Endpoint API modular, middleware autentikasi, handler JSON." },
      { name: "Tailwind / Custom CSS System", cat: "Frontend", level: "Expert", tools: "CSS Variables, Design Tokens, Flex/Grid", desc: "Anti-AI-slop design system, token warna & spacing disiplin." },
      { name: "SQLite & Prisma ORM", cat: "Database", level: "Intermediate", tools: "SQLite, Prisma, SQL", desc: "Manajemen relasi data lokal, FTS5 search index." }
    ],
    mobile: [
      { name: "React Native Mobile Shell", cat: "Cross-Platform", level: "Intermediate", tools: "React Native, Expo, TS", desc: "UI native untuk Android & iOS dengan integrasi Tailscale API." },
      { name: "Tailscale P2P Networking", cat: "Network", level: "Expert", tools: "Tailscale CLI, MagicDNS, WireGuard", desc: "Menghubungkan HP & PC secara aman tanpa public IP exposure." }
    ],
    tools: [
      { name: "JobSpy LinkedIn Scraper", cat: "Data Sourcing", level: "Expert", tools: "Python, JobSpy, pandas", desc: "Scraping lowongan kerja remote LinkedIn & export CSV." },
      { name: "GitHub CLI & REST Integration", cat: "DevTools", level: "Advanced", tools: "gh CLI, GitHub REST API", desc: "Pencarian repository, issue tracking, dan otomatisasi PR." },
      { name: "Hermes Agent Framework", cat: "AI Core", level: "Master", tools: "hermes-agent, SOUL.md, profiles", desc: "Orchestration multi-agent, memori terisolasi, SOUL lab." }
    ],
    agent: [
      { name: "Evidence-First Research", cat: "Agent SOUL", level: "Expert", tools: "SOUL.md default", desc: "Riset faktual berbasis Tier 1/2 evidence dengan epistemic rating." },
      { name: "Devil's Advocate Review", cat: "Agent SOUL", level: "Expert", tools: "DeepSeek v4 flash, advocate SOUL", desc: "Kritik metodologis, identifikasi bias, dan stress test hipotesis." }
    ]
  };

  return (
    <div>
      <div class="page-head">
        <div>
          <div class="eyebrow">Capabilities Registry</div>
          <h1>Skill Bank & Toolset</h1>
        </div>
        <button class="btn btn-primary" onClick={props.onOpenAddSkill}>
          <IconPlus class="ico-sm" /> Tambah Skill Baru
        </button>
      </div>

      <div class="tabs">
        <button class={`tab ${activeTab() === "web" ? "active" : ""}`} onClick={() => setActiveTab("web")}>Web Development</button>
        <button class={`tab ${activeTab() === "mobile" ? "active" : ""}`} onClick={() => setActiveTab("mobile")}>Mobile Development</button>
        <button class={`tab ${activeTab() === "tools" ? "active" : ""}`} onClick={() => setActiveTab("tools")}>Tools & Automation</button>
        <button class={`tab ${activeTab() === "agent" ? "active" : ""}`} onClick={() => setActiveTab("agent")}>Agent Persona Skills</button>
      </div>

      <div class="card">
        <table class="table">
          <thead>
            <tr>
              <th>Skill / Framework</th>
              <th>Kategori</th>
              <th>Penguasaan / Level</th>
              <th>Tools & Kode Terkait</th>
              <th>Deskripsi Capaian</th>
            </tr>
          </thead>
          <tbody>
            <For each={skillsData[activeTab()]}>
              {(s) => (
                <tr>
                  <td><b>{s.name}</b></td>
                  <td><Tag>{s.cat}</Tag></td>
                  <td><Status kind={s.level === "Master" || s.level === "Expert" ? "online" : "accent"}>{s.level}</Status></td>
                  <td><span class="mono" style={{ "font-size": "0.78rem" }}>{s.tools}</span></td>
                  <td style={{ color: "var(--ink-soft)", "font-size": "0.84rem" }}>{s.desc}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===================== CI/CD & HOSTING PAGE ===================== */
export function CicdPage() {
  const deployments = [
    { name: "Hermes Console UI", env: "Production Staging", host: "Localhost / Tailscale", port: "5173", repo: "github.com/eqii/hermes-console", status: "online", lastDeploy: "2 menit lalu (v0.1.0)" },
    { name: "Cognitive Labs Runtime", env: "API Server", host: "Node Server (Local)", port: "3001", repo: "github.com/eqii/cognitive-labs", status: "online", lastDeploy: "1 jam lalu (v1.2.4)" },
    { name: "9Router AI Proxy", env: "Local Model Gate", host: "localhost", port: "20128", repo: "npm/9router", status: "online", lastDeploy: "Active daemon" }
  ];

  return (
    <div>
      <div class="page-head">
        <div>
          <div class="eyebrow">Infrastructure & Deployment</div>
          <h1>CI/CD & Hosting Control</h1>
        </div>
        <button class="btn btn-primary">
          <IconDeploy class="ico-sm" /> Trigger New Build
        </button>
      </div>

      <div class="grid grid-3" style={{ "margin-bottom": "var(--sp-6)" }}>
        <Metric label="Active Services" value="3 Running" sub="All ports healthy" />
        <Metric label="Build Target" value="Vite + Node" sub="TypeScript strict" />
        <Metric label="Tailscale Route" value="100.92.133.9" sub="P2P Mobile Enabled" />
      </div>

      <div class="card card-pad" style={{ "margin-bottom": "var(--sp-6)" }}>
        <div class="card-head" style={{ padding: "0 0 var(--sp-4) 0", "border-bottom": "1px solid var(--line)" }}>
          <h3>Services & Hostings Dashboard</h3>
        </div>
        <div class="cicd-grid">
          <For each={deployments}>
            {(d) => (
              <div class="cicd-card">
                <div class="cicd-card-head">
                  <span class="mono" style={{ "font-size": "0.72rem", color: "var(--ink-faint)" }}>{d.env}</span>
                  <Status kind="online">Active</Status>
                </div>
                <h4>{d.name}</h4>
                <div class="cicd-meta">
                  <span><IconServer class="ico-xs" /> Host: {d.host}:{d.port}</span>
                  <span><IconGithub class="ico-xs" /> {d.repo}</span>
                </div>
                <div style={{ display: "flex", "align-items": "center", "justify-content": "space-between", "margin-top": "auto", "padding-top": "var(--sp-3)", "border-top": "1px solid var(--line)" }}>
                  <span class="mono" style={{ "font-size": "0.7rem", color: "var(--ink-faint)" }}>{d.lastDeploy}</span>
                  <a class="link" href={`http://100.92.133.9:${d.port}`} target="_blank" style={{ display: "inline-flex", "align-items": "center", gap: 4, "font-size": "0.78rem" }}>
                    Open <IconExternal class="ico-xs" />
                  </a>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}

/* ===================== CHAT ===================== */
export function ChatPage(props: { agent: string; onAgent: (name: string) => void; text: string; onText: (value: string) => void; messages: string[]; onSend: () => void }) {
  const agents = ["Hermes Researcher", "Airin", "Advocate"];
  return <div>
    <div class="page-head"><div><div class="eyebrow">Agent Communication</div><h1>Chat Agents</h1></div><button class="btn"><IconPanel class="ico-sm" /> Panel konteks</button></div>
    <div class="chat-layout">
      <aside class="card chat-agents"><div class="card-head"><h3>Agent terdaftar</h3></div><For each={agents}>{(a) => <button class={`agent-row ${props.agent === a ? "selected" : ""}`} onClick={() => props.onAgent(a)}><IconAgent class="ico-md" /><span>{a}</span><Status kind={a === "Airin" ? "busy" : "online"}>{a === "Airin" ? "sibuk" : "aktif"}</Status></button>}</For></aside>
      <section class="card chat-window"><div class="chat-head"><IconAgent class="ico-lg" /><div><h3>{props.agent}</h3><div class="chat-meta"><IconSpark class="ico-xs" /> skill routing aktif</div></div></div><div class="messages"><For each={props.messages}>{(m, i) => <div class={`message ${i() % 2 ? "mine" : "agent"}`}>{m}</div>}</For></div><form class="composer" onSubmit={(e) => { e.preventDefault(); props.onSend(); }}><input value={props.text} onInput={(e) => props.onText(e.currentTarget.value)} placeholder="Tulis instruksi untuk agent..." /><button class="btn btn-primary" type="submit"><IconBolt class="ico-sm" /> Kirim</button></form></section>
    </div>
  </div>;
}

/* ===================== CODE INSPECTOR ===================== */
export function CodePage() {
  return <div><div class="page-head"><div><div class="eyebrow">Project workspace</div><h1>Code Inspector</h1></div><button class="btn btn-primary"><IconPlay class="ico-sm" /> Jalankan preview</button></div><div class="inspector-layout"><aside class="card file-tree"><div class="card-head"><h3>hermes-console</h3></div><button class="file selected"><IconCode class="ico-sm" /> src</button><button class="file indent"><IconCode class="ico-sm" /> App.tsx</button><button class="file indent"><IconCode class="ico-sm" /> pages.tsx</button><button class="file indent"><IconCode class="ico-sm" /> styles.css</button><button class="file"><IconCode class="ico-sm" /> package.json</button></aside><section class="card code-inspector"><div class="code-tabs"><span class="code-tab active">App.tsx</span><span class="code-tab">pages.tsx</span><span class="code-tab">styles.css</span></div><pre class="codeblock">{`import { createSignal } from "solid-js";
import { Sidebar } from "./Sidebar";

export function App() {
  const [active, setActive] = createSignal("overview");
  const [compact, setCompact] = createSignal(false);

  return (
    <Shell compact={compact()}>
      <Sidebar onNavigate={setActive} />
      <ProjectView page={active()} />
    </Shell>
  );
}`}</pre><div class="code-foot"><Status kind="online">build passed</Status><span class="mono">TypeScript · 48 lines</span></div></section></div></div>;
}

/* ===================== PROTOTYPE PREVIEW ===================== */
export function PreviewPage() {
  const [mode, setMode] = createSignal<"desktop" | "tablet" | "mobile">("desktop");
  return <div><div class="page-head"><div><div class="eyebrow">Live prototype</div><h1>Prototype Preview</h1></div><div class="preview-controls"><For each={["desktop", "tablet", "mobile"] as const}>{(m) => <button class={`device-btn ${mode() === m ? "active" : ""}`} onClick={() => setMode(m)}><IconPreview class="ico-sm" /> {m}</button>}</For></div><button class="btn btn-primary"><IconPreview class="ico-sm" /> Buka link staging</button></div><div class={`preview-stage ${mode()}`}><div class="preview-browser"><div class="browser-bar"><span class="browser-title">Hermes Console / {mode()}</span><span class="mono">staging</span></div><div class="preview-body"><div class="preview-nav"><IconAgent class="ico-lg" /><IconBoard class="ico-lg" /><IconSoul class="ico-lg" /></div><div class="preview-screen"><div class="eyebrow">Project Preview</div><h2>Dashboard yang sedang dikerjakan</h2><TimelineProgress value={68} labels={[{ label: "Design", state: "done" }, { label: "Build", state: "cur" }, { label: "QA", state: "todo" }]} /><div class="preview-cards"><div class="preview-card"><IconCode class="ico-lg" /><b>Frontend surface</b><span>SolidJS components</span></div><div class="preview-card"><IconBolt class="ico-lg" /><b>Live pipeline</b><span>3 agents connected</span></div></div></div></div></div></div></div>;
}

/* ===================== AGENTS ===================== */
export function AgentsPage() {
  const agents = [
    {
      name: "Hermes Researcher", owner: "default · pemilik: Eqii",
      st: <Status kind="online">aktif</Status>, bg: "var(--ink)", fg: "var(--accent)",
      tags: ["research", "evidence", "writing", "sourcing", "linkedin", "github"],
      wl: 38, acc: 94, accColor: "teal" as const,
    },
    {
      name: "Airin", owner: "airin-research · pemilik: teman",
      st: <Status kind="busy">sibuk</Status>, bg: "var(--teal)", fg: "#fff",
      tags: ["writing", "web-research", "funfact", "backend"],
      wl: 72, acc: 88, accColor: "gold" as const,
    },
  ];

  return (
    <div>
      <div class="page-head">
        <div>
          <div class="eyebrow">Orchestration</div>
          <h1>Agent Grid</h1>
        </div>
        <button class="btn btn-primary"><IconPlus class="ico-sm" /> Daftarkan Agent</button>
      </div>

      <div style={{ background: "var(--blue-bg)", border: "1px solid rgba(26,95,180,0.25)", "border-radius": "var(--r-md)", padding: "var(--sp-5)", "margin-bottom": "var(--sp-6)", display: "flex", gap: "var(--sp-3)", "align-items": "flex-start" }}>
        <span style={{ color: "var(--blue)", "margin-top": 2, display: "inline-flex" }}><IconBolt class="ico-md" /></span>
        <div>
          <b>Routing Otomatis Berbasis Skill</b>
          <div style={{ "font-size": "0.85rem", color: "var(--ink-soft)", "margin-top": 4 }}>
            Task masuk → mesin routing mencocokkan skill agent → agent yang cocok otomatis ter-trigger.
          </div>
        </div>
      </div>

      <div class="grid grid-2">
        <For each={agents}>
          {(a) => (
            <div class="card card-pad">
              <div style={{ display: "flex", gap: "var(--sp-4)", "align-items": "flex-start" }}>
                <div style={{ width: 52, height: 52, "border-radius": "var(--r-md)", background: a.bg, color: a.fg, display: "grid", "place-items": "center", "flex-shrink": 0 }}><IconAgent class="ico-xl" /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", "align-items": "center", gap: "var(--sp-3)" }}>
                    <b style={{ "font-size": "1.05rem" }}>{a.name}</b>
                    {a.st}
                  </div>
                  <div style={{ "font-size": "0.78rem", color: "var(--ink-faint)", "font-family": "var(--font-mono)" }}>{a.owner}</div>
                </div>
              </div>
              <div style={{ "border-top": "1px solid var(--line)", margin: "var(--sp-5) 0" }} />
              <div style={{ display: "flex", "flex-wrap": "wrap", gap: "var(--sp-2)", "margin-bottom": "var(--sp-5)" }}>
                <For each={a.tags}>{(t) => <Tag>{t}</Tag>}</For>
              </div>
              <div class="eyebrow" style={{ "margin-bottom": "var(--sp-2)" }}>Workload {a.wl}%</div>
              <TimelineProgress value={a.wl} />
              <div class="eyebrow" style={{ "margin-top": "var(--sp-5)", "margin-bottom": "var(--sp-2)" }}>Akurasi output {a.acc}%</div>
              <TimelineProgress value={a.acc} color={a.accColor} />
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

/* ===================== BOARD ===================== */
type Card = { t: string; tag: string; tag2?: string; p?: "high" | "med" | "low"; as?: string; ac?: string; who?: string; prog?: number; done?: boolean };
type Col = { name: string; count: number; cards: Card[] };

const COLS: Col[] = [
  {
    name: "Backlog", count: 4,
    cards: [
      { t: "Design token untuk design system", tag: "FE", tag2: "frontend" },
      { t: "Schema tabel agents & skills", tag: "BE", tag2: "backend" },
      { t: "Riset best practice multi-tenant auth", tag: "riset" },
    ],
  },
  {
    name: "To Do", count: 3,
    cards: [
      { t: "Routing UI: skill → agent", tag: "FE", tag2: "frontend", p: "high", as: "H", ac: "var(--accent)", who: "Hermes Researcher" },
      { t: "Endpoint: daftar skill per agent", tag: "BE", tag2: "backend", p: "med", as: "A", ac: "var(--teal)", who: "Airin" },
      { t: "Tulis draft user guide", tag: "writing", p: "low", as: "H", ac: "var(--accent)", who: "Hermes Researcher" },
    ],
  },
  {
    name: "In Progress", count: 2,
    cards: [
      { t: "#FE-201 Fix form login (SolidJS)", tag: "FE", tag2: "frontend", p: "high", as: "H", ac: "var(--accent)", who: "Hermes Researcher", prog: 60 },
      { t: "#BE-112 Auth middleware JWT", tag: "BE", tag2: "backend", p: "med", as: "A", ac: "var(--teal)", who: "Airin", prog: 80 },
    ],
  },
  {
    name: "Done", count: 5,
    cards: [
      { t: "PRD Hermes Console", tag: "riset", done: true },
      { t: "Setup Vite + SolidJS", tag: "frontend", done: true },
      { t: "Schema user & team", tag: "backend", done: true },
      { t: "Draft brand guidelines", tag: "writing", done: true },
    ],
  },
];

const PRIO_BORDER: Record<string, string> = { high: "var(--red)", med: "var(--gold)", low: "var(--teal)" };
const PRIO_LEFT: Record<string, string> = { high: "3px solid var(--red)", med: "3px solid var(--gold)", low: "3px solid var(--teal)" };

export function BoardPage() {
  return (
    <div>
      <div class="page-head">
        <div>
          <div class="eyebrow">Sprint 2 · Cognitive Labs</div>
          <h1>Board — Kolaborasi Multi-Agent</h1>
        </div>
        <div style={{ display: "flex", gap: "var(--sp-4)" }}>
          <Status kind="online">2 agent aktif</Status>
          <Status kind="busy">7 sedang jalan</Status>
        </div>
      </div>

      <div style={{ display: "grid", "grid-template-columns": "repeat(4,1fr)", gap: "var(--sp-4)", "align-items": "start" }}>
        <For each={COLS}>
          {(col) => (
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", "border-radius": "var(--r-md)", padding: "var(--sp-3)" }}>
              <div class="column-head">
                <span style={{ "font-weight": 650, "font-size": "0.88rem" }}>{col.name}</span>
                <span class="count">{col.count}</span>
              </div>
              <For each={col.cards}>
                {(c) => (
                  <div style={{
                    background: "#fff", border: `1px solid ${c.p ? PRIO_BORDER[c.p] : "var(--line)"}`,
                    "border-left": c.p ? PRIO_LEFT[c.p] : "3px solid var(--line)",
                    "border-radius": "var(--r-sm)", padding: "var(--sp-4)", "margin-bottom": "var(--sp-3)",
                    "box-shadow": "var(--shadow-1)", cursor: "grab", opacity: c.done ? 0.62 : 1,
                  }}>
                    <div style={{ display: "flex", gap: "var(--sp-2)", "margin-bottom": "var(--sp-3)", "align-items": "center" }}>
                      <Tag active>{c.tag}</Tag>
                      {c.tag2 && <Tag>{c.tag2}</Tag>}
                      {c.prog !== undefined && <Status kind="accent">trigered</Status>}
                      {c.done && <span style={{ color: "var(--teal)", display: "inline-flex" }}><IconCheck class="ico-sm" /></span>}
                    </div>
                    <div style={{ "font-weight": 600, "font-size": "0.9rem", "margin-bottom": "var(--sp-2)" }}>{c.t}</div>
                    {c.who && (
                      <div style={{ display: "flex", "align-items": "center", gap: "var(--sp-2)", "font-size": "0.76rem", color: "var(--ink-faint)" }}>
                        <span style={{ width: 22, height: 22, "border-radius": "50%", display: "grid", "place-items": "center", "font-size": "0.6rem", "font-weight": 700, color: "#fff", background: c.ac }}>{c.as}</span>
                        <span>{c.who}</span>
                      </div>
                    )}
                    {c.prog !== undefined && <div style={{ "margin-top": "var(--sp-3)" }}><TimelineProgress value={c.prog} color={c.tag === "FE" ? "accent" : "teal"} /></div>}
                  </div>
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

/* ===================== SOUL LAB ===================== */
export function SoulPage() {
  return (
    <div>
      <div class="page-head">
        <div>
          <div class="eyebrow">SOUL Editor</div>
          <h1>Ubah persona, uji, lalu rilis</h1>
        </div>
        <button class="btn"><IconSave class="ico-sm" /> Simpan draft</button>
        <button class="btn btn-primary"><IconPlay class="ico-sm" /> Uji di sandbox</button>
      </div>

      <div class="tabs">
        {["Editor", "Versi", "A/B Test", "Aktivitas"].map((t, i) => (
          <button class={`tab ${i === 0 ? "active" : ""}`}>{t}</button>
        ))}
      </div>

      <div class="grid grid-2">
        <div>
          <div class="eyebrow" style={{ "margin-bottom": "var(--sp-2)" }}>SOUL.md — draft</div>
          <pre class="codeblock">{`# SOUL.md — Hermes Researcher
# Evidence-First Cognitive Intelligence

## 01 — IDENTITY
Kamu adalah Hermes, Peneliti Utama.
Fungsi utama: mengubah informasi mentah
menjadi pengetahuan yang dapat dipertanggungjawabkan.

## 02 — PRIME DIRECTIVE
Kesimpulan tidak boleh lebih kuat dari evidence.

## 03 — SUMBER & VERIFIKASI
Selalu sertakan sumber untuk klaim faktual.`}</pre>
          <div style={{ display: "flex", "justify-content": "space-between", "margin-top": "var(--sp-3)", "align-items": "center" }}>
            <span class="mono" style={{ "font-size": "0.75rem", color: "var(--ink-faint)" }}>UTF-8 · 41 baris · draft 2 mnt lalu</span>
            <Status kind="accent"><IconPlus class="ico-xs" /> +3 baris vs v2</Status>
          </div>
        </div>

        <div>
          <div class="eyebrow" style={{ "margin-bottom": "var(--sp-2)" }}>A/B Test — bandingkan persona</div>
          <div style={{ display: "grid", "grid-template-columns": "1fr auto 1fr", gap: "var(--sp-4)", "align-items": "stretch" }}>
            <div class="card card-pad">
              <div class="eyebrow">A · v2 (produksi)</div>
              <div style={{ "font-size": "0.85rem", "margin": "var(--sp-3) 0" }}>Balasan terhadap:<br /><i>"tolong cari kerja remote"</i></div>
              <pre class="codeblock" style={{ "font-size": "0.72rem", padding: "var(--sp-3)" }}>{`"Saya akan cari. Tapi sebelum itu,
jelaskan target role, lokasi, level?"`}</pre>
              <div style={{ "display": "flex", "align-items": "center", "gap": 5, "margin-top": "var(--sp-3)", "font-size": "0.72rem", color: "var(--ink-faint)" }}><IconClock class="ico-xs" /> 71%</div>
            </div>
            <div style={{ "align-self": "center", "font-family": "var(--font-mono)", "font-weight": 700, color: "var(--ink-faint)" }}>VS</div>
            <div class="card card-pad" style={{ "border-color": "var(--teal)" }}>
              <div class="eyebrow" style={{ color: "var(--teal)" }}>B · v3 (draft)</div>
              <div style={{ "font-size": "0.85rem", "margin": "var(--sp-3) 0" }}>Balasan terhadap prompt yang sama:</div>
              <pre class="codeblock" style={{ "font-size": "0.72rem", padding: "var(--sp-3)" }}>{`"Oke, saya cari sekarang."
# langsung jalankan sourcing.py
python sourcing.py "software engineer" remote 10`}</pre>
              <div style={{ "display": "flex", "align-items": "center", "gap": 5, "margin-top": "var(--sp-3)", "font-size": "0.72rem", color: "var(--teal)", "font-weight": 600 }}><IconCheck class="ico-xs" /> 89%</div>
            </div>
          </div>

          <div style={{ "margin-top": "var(--sp-6)" }}>
            <div class="eyebrow" style={{ "margin-bottom": "var(--sp-3)" }}>Hasil uji (20 prompt)</div>
            <div class="card">
              <table class="table">
                <thead><tr><th>Metrik</th><th>A</th><th>B</th></tr></thead>
                <tbody>
                  <tr><td>Relevansi</td><td class="mono">7.1</td><td class="mono" style={{ color: "var(--teal)" }}><b>8.6</b></td></tr>
                  <tr><td>Kecepatan</td><td class="mono">3.2s</td><td class="mono" style={{ color: "var(--teal)" }}><b>1.8s</b></td></tr>
                  <tr><td>Error</td><td class="mono">3</td><td class="mono" style={{ color: "var(--teal)" }}><b>0</b></td></tr>
                </tbody>
              </table>
            </div>
            <button class="btn btn-primary" style={{ width: "100%", "margin-top": "var(--sp-4)", display: "inline-flex", "align-items": "center", "justify-content": "center", gap: 8 }}>
              <IconCheck class="ico-sm" /> Promosikan B ke produksi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
