// Global runs (Executions) page (spec section 76)
import { useExecutions, useAgents, useSessions, repos } from "../../stores";
import { PageHeader, StatusBadge } from "../../components/shared";

export function RunsPage() {
  const executions = useExecutions();
  const agents = useAgents();
  const sessions = useSessions();

  const agentName = (id?: string) => agents().find((a: any) => a.agentId === id)?.name ?? "—";

  return (
    <div>
      <PageHeader eyebrow="Execution History" title="Runs" />
      <div class="card" style={{ overflow: "auto" }}>
        <table class="table">
          <thead><tr><th>Execution</th><th>Project</th><th>Agent</th><th>Task</th><th>Status</th><th>Input</th></tr></thead>
          <tbody>
            {executions().slice().reverse().map((e: any) => {
              const sess = sessions().find((s: any) => s.agentSessionId === e.agentSessionId);
              return (
                <tr>
                  <td class="mono">{e.executionId}</td>
                  <td class="mono">{e.projectId}</td>
                  <td>{agentName(sess?.agentId)}</td>
                  <td class="mono">{e.taskId ?? "—"}</td>
                  <td><StatusBadge status={e.status} /></td>
                  <td style={{ "max-width": "260px", overflow: "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" }}>{e.input}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
