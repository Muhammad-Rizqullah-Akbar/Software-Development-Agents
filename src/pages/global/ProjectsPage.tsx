// Projects list (spec sections 68, 131)
import { createSignal, Show, For } from "solid-js";
import { useProjects, services, currentUserId, workspaceId, bumpDB } from "../../stores";
import { PageHeader, StatusBadge, Tag } from "../../components/shared";

export function ProjectsPage() {
  const { list, query, setQuery } = useProjects();
  const [showModal, setShowModal] = createSignal(false);
  const [name, setName] = createSignal("");
  const [desc, setDesc] = createSignal("");
  const [toast, setToast] = createSignal<string | null>(null);

  const create = async (e: Event) => {
    e.preventDefault();
    if (!name().trim()) return;
    await services.project.create({ workspaceId, name: name(), description: desc(), leadUserId: currentUserId });
    bumpDB();
    setName(""); setDesc(""); setShowModal(false);
    setToast(`Proyek "${name()}" dibuat.`);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div>
      <PageHeader eyebrow="Workspace" title="Projects" actions={
        <button class="btn btn-primary" onClick={() => setShowModal(true)}>+ Buat Proyek</button>
      } />

      <div class="filter-bar">
        <input class="form-input" placeholder="Cari project..." value={query().search} onInput={(e) => setQuery((q) => ({ ...q, search: e.currentTarget.value }))} style={{ width: "240px" }} />
        {["active", "planning", "completed", "paused", "archived"].map((s) => (
          <button class={`tag ${query().status.includes(s) ? "tag-on" : ""}`} onClick={() => setQuery((q) => ({ ...q, status: q.status.includes(s) ? q.status.filter((x) => x !== s) : [...q.status, s] }))}>{s}</button>
        ))}
      </div>

      <div class="grid grid-3">
        <For each={list()}>
          {(p: any) => (
            <a href={`/projects/${p.projectId}`} style={{ "text-decoration": "none", color: "inherit" }}>
              <div class="card card-pad project-card">
                <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center", "margin-bottom": "var(--sp-2)" }}>
                  <h3>{p.name}</h3>
                  <StatusBadge status={p.status} />
                </div>
                <p style={{ "font-size": "0.85rem", color: "var(--ink-soft)" }}>{p.description}</p>
                <div style={{ display: "flex", gap: "var(--sp-2)", "margin-top": "var(--sp-3)" }}>
                  <Tag>{p.phase}</Tag>
                </div>
              </div>
            </a>
          )}
        </For>
      </div>

      <Show when={showModal()}>
        <div class="modal-backdrop" onClick={() => setShowModal(false)}>
          <div class="modal-card" onClick={(e) => e.stopPropagation()}>
            <div class="modal-head"><h3>Buat Proyek Baru</h3></div>
            <form onSubmit={create}>
              <div class="modal-body">
                <div class="form-group"><label>Nama Proyek</label><input class="form-input" value={name()} onInput={(e) => setName(e.currentTarget.value)} required /></div>
                <div class="form-group"><label>Deskripsi</label><textarea class="form-textarea" rows={3} value={desc()} onInput={(e) => setDesc(e.currentTarget.value)} /></div>
              </div>
              <div class="modal-foot">
                <button type="button" class="btn" onClick={() => setShowModal(false)}>Batal</button>
                <button type="submit" class="btn btn-primary">Buat Proyek</button>
              </div>
            </form>
          </div>
        </div>
      </Show>

      <Show when={toast()}>
        <div class="toast">{toast()}</div>
      </Show>
    </div>
  );
}
