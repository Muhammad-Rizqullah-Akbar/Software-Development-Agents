// Project team & agent requests (spec sections 70, 112)
import { createSignal, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import { useMembers, useAssignments, useAgents, services, workspaceId, bumpDB, currentUserId } from "../../stores";
import { PageHeader, StatusBadge } from "../../components/shared";

export function ProjectTeam() {
  const params = useParams<{ projectId: string }>();
  const members = useMembers(params.projectId);
  const assignments = useAssignments(params.projectId);
  const agents = useAgents();
  const [showModal, setShowModal] = createSignal(false);
  const [agentId, setAgentId] = createSignal("a-hermes");
  const [role, setRole] = createSignal("contributor");
  const [scope, setScope] = createSignal("");
  const [toast, setToast] = createSignal<string | null>(null);

  const request = async (e: Event) => {
    e.preventDefault();
    await services.assignment.request({ workspaceId, projectId: params.projectId, agentId: agentId(), userId: currentUserId, role: role(), scope: scope() || "General" });
    bumpDB();
    setShowModal(false);
    setToast("Agent request dikirim, menunggu persetujuan Project Lead.");
    setTimeout(() => setToast(null), 3000);
  };

  const decide = async (assignmentId: string, approved: boolean) => {
    await services.assignment.decide(assignmentId, approved, currentUserId);
    bumpDB();
  };

  return (
    <div>
      <PageHeader eyebrow="Kolaborasi" title="Team & Agents" actions={
        <button class="btn btn-primary" onClick={() => setShowModal(true)}>+ Request Agent</button>
      } />

      <h3 style={{ "margin-bottom": "var(--sp-3)" }}>Members</h3>
      <div class="card" style={{ "margin-bottom": "var(--sp-6)" }}>
        {members().map((m: any) => (
          <div class="activity-item" style={{ display: "flex", "align-items": "center", gap: "var(--sp-3)" }}>
            <b style={{ flex: 1 }}>{m.userId}</b>
            <StatusBadge status={m.role === "project_lead" ? "approved" : "active"} label={m.role} />
          </div>
        ))}
      </div>

      <h3 style={{ "margin-bottom": "var(--sp-3)" }}>Agent Assignments</h3>
      <div class="card">
        <table class="table">
          <thead><tr><th>Agent</th><th>Role</th><th>Scope</th><th>Status</th><th>Approval</th><th></th></tr></thead>
          <tbody>
            {assignments().map((a: any) => (
              <tr>
                <td>{agents().find((x: any) => x.agentId === a.agentId)?.name}</td>
                <td>{a.role}</td>
                <td>{a.scope}</td>
                <td><StatusBadge status={a.status} /></td>
                <td><StatusBadge status={a.approvalStatus} /></td>
                <td>
                  {a.approvalStatus === "pending" && (
                    <div style={{ display: "flex", gap: "var(--sp-1)" }}>
                      <button class="btn btn-sm" onClick={() => decide(a.agentAssignmentId, true)}>Approve</button>
                      <button class="btn btn-sm" onClick={() => decide(a.agentAssignmentId, false)}>Reject</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Show when={showModal()}>
        <div class="modal-backdrop" onClick={() => setShowModal(false)}>
          <div class="modal-card" onClick={(e) => e.stopPropagation()}>
            <div class="modal-head"><h3>Request Agent</h3></div>
            <form onSubmit={request}>
              <div class="modal-body">
                <div class="form-group"><label>Agent</label>
                  <select class="form-select" value={agentId()} onChange={(e) => setAgentId(e.currentTarget.value)}>
                    {agents().map((a: any) => <option value={a.agentId}>{a.name}</option>)}
                  </select>
                </div>
                <div class="form-group"><label>Project Role</label>
                  <select class="form-select" value={role()} onChange={(e) => setRole(e.currentTarget.value)}>
                    <option value="contributor">Contributor</option><option value="reviewer">Reviewer</option><option value="viewer">Viewer</option>
                  </select>
                </div>
                <div class="form-group"><label>Scope</label><input class="form-input" value={scope()} onInput={(e) => setScope(e.currentTarget.value)} placeholder="Misal: Requirements + planning" /></div>
              </div>
              <div class="modal-foot">
                <button type="button" class="btn" onClick={() => setShowModal(false)}>Batal</button>
                <button type="submit" class="btn btn-primary">Kirim Request</button>
              </div>
            </form>
          </div>
        </div>
      </Show>

      <Show when={toast()}><div class="toast">{toast()}</div></Show>
    </div>
  );
}
