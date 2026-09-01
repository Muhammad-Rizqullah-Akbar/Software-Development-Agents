// Global agents registry (spec 156-160, 192)
// Grouped by owner (spec 154-155). Varied live states. Micro-interactions.
import { useAgents, useOwners, useAssignments, useSessions } from "../../stores";
import { PageHeader, StatusBadge, Tag, TimelineProgress } from "../../components/shared";
import { IconAgent, IconBolt, IconClock, IconWarning, IconCheck } from "../../components/shared/icons";

function agentState(a: any, activeSessions: number, activeAssign: number) {
  if (a.agentId === "a-hermes-forge") return { s: "running", label: "Working" };
  if (a.agentId === "a-astra") return { s: "in_progress", label: "Working" };
  if (a.agentId === "a-sentinel") return { s: "verification", label: "Running Tests" };
  if (a.agentId === "a-ravix") return { s: "waiting", label: "Waiting" };
  if (a.agentId === "a-forgewell") return { s: "in_progress", label: "Working" };
  if (activeSessions > 0) return { s: "active", label: "Active" };
  if (a.agentId === "a-nexa") return { s: "waiting", label: "Waiting" };
  return { s: "paused", label: "Idle" };
}

export function AgentsPage() {
  const agents = useAgents();
  const owners = useOwners();
  const assignments = useAssignments();
  const sessions = useSessions();

  const stateOf = (a: any) => {
    const asg = assignments().filter((x: any) => x.agentId === a.agentId && x.status === "active").length;
    const ses = sessions().filter((s: any) => s.agentId === a.agentId && s.status === "active").length;
    return agentState(a, ses, asg);
  };

  return (
    <div>
      <PageHeader eyebrow="Agent Registry" title="Agents" icon={IconAgent} />
      <div style={{ "margin-bottom": "var(--sp-5)" }}>
        <span class="mono" style={{ "font-size": "0.75rem", color: "var(--ink-faint)" }}>{agents().length} agent · {owners().length} owner · demo environment</span>
      </div>

      {owners().map((o: any) => (
        <div style={{ "margin-bottom": "var(--sp-6)" }}>
          <div style={{ display: "flex", "align-items": "center", gap: "var(--sp-3)", "margin-bottom": "var(--sp-3)" }}>
            <div class="sb-avatar" style={{ background: "var(--ink)", color: "var(--accent)" }}>{o.displayName[0]}</div>
            <div>
              <b>{o.displayName}</b>
              <div style={{ "font-size": "0.75rem", color: "var(--ink-faint)" }}>{o.role}</div>
            </div>
          </div>
          <div class="grid grid-3">
            {agents().filter((a: any) => a.ownerId === o.ownerId).map((a: any) => {
              const st = stateOf(a);
              return (
                <div class="card card-pad agent-card" data-state={st.s}>
                  <div style={{ display: "flex", "align-items": "center", gap: "var(--sp-3)", "margin-bottom": "var(--sp-3)" }}>
                    <div class="sb-avatar" style={{ background: "var(--accent)" }}><IconAgent size={18} /></div>
                    <div style={{ flex: 1 }}>
                      <b>{a.name}</b>
                      <div style={{ "font-size": "0.75rem", color: "var(--ink-faint)" }}>{a.role}</div>
                    </div>
                    <span class={`state-indicator ${st.s}`}><StatusBadge status={st.s === "paused" ? "paused" : st.s === "running" ? "running" : st.s === "waiting" ? "waiting" : st.s === "verification" ? "verification" : "active"} label={st.label} /></span>
                  </div>
                  <div class="eyebrow" style={{ "margin-bottom": "var(--sp-2)" }}>Utilisasi</div>
                  <TimelineProgress value={st.s === "running" || st.s === "in_progress" ? 78 : st.s === "verification" ? 92 : st.s === "active" ? 60 : 15} color={st.s === "verification" ? "gold" : st.s === "paused" ? "gold" : "accent"} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
