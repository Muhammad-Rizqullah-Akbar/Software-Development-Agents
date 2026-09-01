// Home / Command center (spec sections 69, 133, 134)
import { createSignal } from "solid-js";
import { useProjects, useSessions, useExecutions, useApprovals, useNotifications } from "../../stores";
import { MetricCard, PageHeader, StatusBadge, Tag } from "../../components/shared";

export function HomePage() {
  const projects = useProjects();
  const sessions = useSessions();
  const executions = useExecutions();
  const approvals = useApprovals();
  const notifications = useNotifications();

  const runningExecs = () => executions().filter((e: any) => ["queued", "running"].includes(e.status)).length;
  const activeSessions = () => sessions().filter((s: any) => s.status === "active").length;

  return (
    <div>
      <PageHeader eyebrow="Command Center" title="Software-Development-Agents" actions={
        <>
          <input class="form-input" placeholder="Apa yang ingin kamu bangun?" style={{ width: "320px" }} />
          <button class="btn btn-primary">Tanya Hermes</button>
        </>
      } />

      <div class="grid grid-4" style={{ "margin-bottom": "var(--sp-6)" }}>
        <MetricCard label="Active Projects" value={String(projects.list().filter((p: any) => p.status === "active").length)} sub="dari total projects" />
        <MetricCard label="Active Sessions" value={String(activeSessions())} />
        <MetricCard label="Running Executions" value={String(runningExecs())} />
        <MetricCard label="Pending Approvals" value={String(approvals().length)} tone="orange" />
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
