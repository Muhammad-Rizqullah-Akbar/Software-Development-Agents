// Project requirements with traceability (spec sections 70, 49)
import { createSignal, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import { useRequirements, services, workspaceId, bumpDB, currentUserId } from "../../stores";
import { PageHeader, StatusBadge } from "../../components/shared";
import { IconClock } from "../../components/shared/icons";
import { dbList } from "../../adapters/mock/db";

export function ProjectRequirements() {
  const params = useParams<{ projectId: string }>();
  const requirements = useRequirements(params.projectId);
  const [showModal, setShowModal] = createSignal(false);
  const [title, setTitle] = createSignal("");
  const [desc, setDesc] = createSignal("");
  const [priority, setPriority] = createSignal("medium");

  const create = async (e: Event) => {
    e.preventDefault();
    if (!title().trim()) return;
    await services.requirement.create({ workspaceId, projectId: params.projectId, title: title(), description: desc(), priority: priority(), ownerUserId: currentUserId });
    bumpDB();
    setTitle(""); setDesc(""); setShowModal(false);
  };

  return (
    <div>
      <PageHeader eyebrow="Traceability" title="Requirements" icon={IconClock} actions={
        <button class="btn btn-primary" onClick={() => setShowModal(true)}>+ Requirement</button>
      } />
      <div class="card">
        <table class="table">
          <thead><tr><th>Requirement</th><th>Priority</th><th>Status</th><th>Acceptance</th></tr></thead>
          <tbody>
            {requirements().map((r: any) => {
              const ac = dbList("acceptanceCriteria").filter((a: any) => a.requirementId === r.requirementId);
              const done = ac.filter((a: any) => a.satisfied).length;
              return (
                <tr>
                  <td><b>{r.requirementId}</b> — {r.title}</td>
                  <td><StatusBadge status={r.priority} /></td>
                  <td><StatusBadge status={r.status} /></td>
                  <td class="mono">{done}/{ac.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Show when={showModal()}>
        <div class="modal-backdrop" onClick={() => setShowModal(false)}>
          <div class="modal-card" onClick={(e) => e.stopPropagation()}>
            <div class="modal-head"><h3>Buat Requirement</h3></div>
            <form onSubmit={create}>
              <div class="modal-body">
                <div class="form-group"><label>Judul</label><input class="form-input" value={title()} onInput={(e) => setTitle(e.currentTarget.value)} required /></div>
                <div class="form-group"><label>Deskripsi</label><textarea class="form-textarea" rows={3} value={desc()} onInput={(e) => setDesc(e.currentTarget.value)} /></div>
                <div class="form-group"><label>Prioritas</label>
                  <select class="form-select" value={priority()} onChange={(e) => setPriority(e.currentTarget.value)}>
                    <option value="critical">Critical</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div class="modal-foot">
                <button type="button" class="btn" onClick={() => setShowModal(false)}>Batal</button>
                <button type="submit" class="btn btn-primary">Buat</button>
              </div>
            </form>
          </div>
        </div>
      </Show>
    </div>
  );
}
