// Global agents registry (spec section 86)
import { useAgents, useAssignments, useSessions, useSkills } from "../../stores";
import { PageHeader, StatusBadge, Tag } from "../../components/shared";

export function AgentsPage() {
  const agents = useAgents();
  const assignments = useAssignments();
  const sessions = useSessions();

  return (
    <div>
      <PageHeader eyebrow="Agent Registry" title="Agents" />
      <div class="grid grid-3">
        {agents().map((a: any) => {
          const activeAssign = assignments().filter((x: any) => x.agentId === a.agentId && x.status === "active").length;
          const activeSess = sessions().filter((s: any) => s.agentId === a.agentId && s.status === "active").length;
          return (
            <div class="card card-pad">
              <h3>{a.name}</h3>
              <p style={{ "font-size": "0.82rem", color: "var(--ink-soft)" }}>{a.description}</p>
              <div style={{ display: "flex", gap: "var(--sp-3)", "margin-top": "var(--sp-3)", "font-size": "0.8rem" }}>
                <span>Assignments: <b>{activeAssign}</b></span>
                <span>Sessions: <b>{activeSess}</b></span>
              </div>
              <div style={{ display: "flex", gap: "var(--sp-2)", "margin-top": "var(--sp-3)" }}>
                <Tag>v{a.currentVersionId}</Tag>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
