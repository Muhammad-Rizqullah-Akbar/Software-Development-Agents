// Global agents registry (spec section 86)
import { useAgents, useAssignments, useSessions } from "../../stores";
import { PageHeader, StatusBadge, Tag, TimelineProgress } from "../../components/shared";
import { IconAgent } from "../../components/shared/icons";

export function AgentsPage() {
  const agents = useAgents();
  const assignments = useAssignments();
  const sessions = useSessions();

  return (
    <div>
      <PageHeader eyebrow="Agent Registry" title="Agents" icon={IconAgent} />
      <div class="grid grid-3">
        {agents().map((a: any) => {
          const activeAssign = assignments().filter((x: any) => x.agentId === a.agentId && x.status === "active").length;
          const activeSess = sessions().filter((s: any) => s.agentId === a.agentId && s.status === "active").length;
          return (
            <div class="card card-pad">
              <div style={{ display: "flex", "align-items": "center", gap: "var(--sp-3)", "margin-bottom": "var(--sp-3)" }}>
                <div class="sb-avatar"><IconAgent size={18} /></div>
                <h3 style={{ margin: 0 }}>{a.name}</h3>
              </div>
              <p style={{ "font-size": "0.82rem", color: "var(--ink-soft)" }}>{a.description}</p>
              <div style={{ display: "flex", gap: "var(--sp-4)", "margin-top": "var(--sp-3)", "font-size": "0.8rem" }}>
                <span>Assignments: <b>{activeAssign}</b></span>
                <span>Sessions: <b>{activeSess}</b></span>
              </div>
              <div style={{ "margin-top": "var(--sp-4)" }}>
                <div class="eyebrow" style={{ "margin-bottom": "var(--sp-2)" }}>Utilisasi</div>
                <TimelineProgress value={Math.min(100, activeSess * 40 + 20)} color={activeSess > 0 ? "accent" : "gold"} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
