// Home / Command center (spec sections 69, 133, 134)
import { createSignal } from "solid-js";
import { useProjects, useSessions, useExecutions, useApprovals, useNotifications, useVerifications, useOwners } from "../../stores";
import { MetricCard, PageHeader, StatusBadge, Tag } from "../../components/shared";
import { IconProjects, IconAgent, IconRuns, IconClock, IconChat, IconSend, IconShield, IconCheck, IconWarning } from "../../components/shared/icons";

export function HomePage() {
  const projects = useProjects();
  const sessions = useSessions();
  const executions = useExecutions();
  const approvals = useApprovals();
  const notifications = useNotifications();
  const [prompt, setPrompt] = createSignal("");
  const [reply, setReply] = createSignal<string | null>(null);

  const runningExecs = () => executions().filter((e: any) => ["queued", "running"].includes(e.status)).length;
  const activeSessions = () => sessions().filter((s: any) => s.status === "active").length;
  const verifications = useVerifications("p-console");
  const verificationFailures = () => verifications().filter((v: any) => v.status === "failed").length;
  const activeProjects = () => projects.list().filter((p: any) => p.status === "active").length;

  const ask = () => {
    if (!prompt().trim()) return;
    setReply(`Hermes menerima instruksi: "${prompt()}". Sistem akan menghasilkan requirements, rencana, dan rekomendasi agent untuk project ini.`);
    setPrompt("");
  };

  return (
    <div>
      <PageHeader eyebrow="Command Center" title="Software-Development-Agents" icon={IconProjects} actions={
        <>
          <div class="search-inline">
            <IconChat class="ico-md" />
            <input class="form-input" placeholder="Apa yang ingin kamu bangun?" value={prompt()} onInput={(e) => setPrompt(e.currentTarget.value)} style={{ width: "320px" }} onKeyDown={(e) => e.key === "Enter" && ask()} />
            <button class="btn btn-primary" onClick={ask}><IconSend class="ico-sm" /> Tanya Hermes</button>
          </div>
        </>
      } />

      {reply() && (
        <div class="card card-pad" style={{ "margin-bottom": "var(--sp-6)", "border-left": "3px solid var(--accent)" }}>
          <div style={{ display: "flex", gap: "var(--sp-3)" }}>
            <IconAgent class="ico-lg" style={{ color: "var(--accent)" }} />
            <div><b>Hermes</b><p style={{ "font-size": "0.88rem", color: "var(--ink-soft)", "margin-top": "var(--sp-1)" }}>{reply()}</p></div>
          </div>
        </div>
      )}

      <div class="grid grid-4" style={{ "margin-bottom": "var(--sp-6)" }}>
        <MetricCard label="Active Projects" value={String(activeProjects())} sub="dari total projects" icon={IconProjects} />
        <MetricCard label="Agent Sessions" value={String(activeSessions())} sub="running" icon={IconAgent} />
        <MetricCard label="Executions" value={String(runningExecs())} sub="running" icon={IconRuns} />
        <MetricCard label="Verification Failures" value={String(verificationFailures())} sub="perlu perhatian" tone="orange" icon={IconWarning} />
      </div>

      {/* Spotlight: current active project (spec 184-185) */}
      <div class="card card-pad" style={{ "margin-bottom": "var(--sp-6)", "border-left": "3px solid var(--accent)" }}>
        <div style={{ display: "flex", "align-items": "center", gap: "var(--sp-4)" }}>
          <div class="sb-avatar" style={{ background: "var(--accent)" }}><IconProjects size={20} /></div>
          <div style={{ flex: 1 }}>
            <div class="eyebrow">Active Workspace</div>
            <b style={{ "font-size": "1.1rem" }}>Hermes Console</b>
            <div style={{ "font-size": "0.82rem", color: "var(--ink-faint)" }}>Project Lead: Rizqullah Akbar · Phase: build</div>
          </div>
          <a href="/projects/p-console/board" class="btn btn-primary">Buka Project</a>
        </div>
      </div>

      <div class="grid grid-2">
        <div class="card">
          <div class="card-head"><h3>Butuh Perhatian</h3></div>
          <div style={{ padding: "var(--sp-3)" }}>
            {notifications().length === 0 && <div class="empty-state"><div class="eyebrow">Semua bersih</div><p>Tidak ada yang butuh perhatian.</p></div>}
            {notifications().map((n: any) => (
              <div class="activity-item"><div><b>{n.title}</b><div style={{ "font-size": "0.8rem", color: "var(--ink-faint)" }}>{n.body}</div></div></div>
            ))}
          </div>
        </div>

        <div class="card">
          <div class="card-head"><h3>Proyek Terbaru</h3></div>
          <div>
            {projects.list().slice(0, 5).map((p: any) => (
              <div class="activity-item" style={{ display: "flex", "align-items": "center", gap: "var(--sp-3)" }}>
                <b style={{ flex: 1 }}>{p.name}</b>
                <span class="mono" style={{ "font-size": "0.72rem", color: "var(--ink-faint)" }}>{p.phase}</span>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
