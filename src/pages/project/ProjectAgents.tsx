// Project agents & sessions & executions (spec sections 7-9, 86)
import { createSignal, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import { useAssignments, useSessions, useExecutions, services, workspaceId, bumpDB, useAgents } from "../../stores";
import { PageHeader, StatusBadge } from "../../components/shared";
import { IconAgent, IconBolt } from "../../components/shared/icons";

export function ProjectAgents() {
  const params = useParams<{ projectId: string }>();
  const assignments = useAssignments(params.projectId);
  const sessions = useSessions(params.projectId);
  const executions = useExecutions(params.projectId);
  const agents = useAgents();
  const [toast, setToast] = createSignal<string | null>(null);

  const startSession = async (assignmentId: string, agentId: string) => {
    const s = await services.session.start(workspaceId, params.projectId, assignmentId, agentId, "Session dimulai oleh Project Lead");
    bumpDB();
    const exec = await services.execution.start(workspaceId, params.projectId, { agentSessionId: s.agentSessionId, input: "Eksekusi awal" });
    bumpDB();
    setToast(`Session ${s.agentSessionId} dibuat, execution ${exec.executionId} berjalan.`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div>
      <PageHeader eyebrow="Eksekusi" title="Project Agents" icon={IconAgent} />

      <h3 style={{ "margin-bottom": "var(--sp-3)" }}>Assignments</h3>
      <div class="card" style={{ "margin-bottom": "var(--sp-6)" }}>
        <table class="table">
          <thead><tr><th>Agent</th><th>Role</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {assignments().filter((a: any) => a.status === "active").map((a: any) => (
              <tr>
                <td>{agents().find((x: any) => x.agentId === a.agentId)?.name}</td>
                <td>{a.role}</td>
                <td><StatusBadge status={a.status} /></td>
                <td><button class="btn btn-sm btn-primary" onClick={() => startSession(a.agentAssignmentId, a.agentId)}>Start Session</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ "margin-bottom": "var(--sp-3)" }}>Sessions</h3>
      <div class="card" style={{ "margin-bottom": "var(--sp-6)" }}>
        {sessions().map((s: any) => (
          <div class="activity-item" style={{ display: "flex", "align-items": "center", gap: "var(--sp-3)" }}>
            <b style={{ flex: 1 }}>{s.agentSessionId}</b>
            <span style={{ "font-size": "0.8rem", color: "var(--ink-faint)" }}>{s.context}</span>
            <StatusBadge status={s.status} />
          </div>
        ))}
      </div>

      <h3 style={{ "margin-bottom": "var(--sp-3)" }}>Executions</h3>
      <div class="card">
        <table class="table">
          <thead><tr><th>Execution</th><th>Status</th><th>Input</th></tr></thead>
          <tbody>
            {executions().map((e: any) => (
              <tr>
                <td class="mono">{e.executionId}</td>
                <td><StatusBadge status={e.status} /></td>
                <td style={{ "font-size": "0.8rem" }}>{e.input}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Show when={toast()}><div class="toast">{toast()}</div></Show>
    </div>
  );
}
