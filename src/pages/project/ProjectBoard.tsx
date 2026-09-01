// Project board with validated transitions (spec sections 73, 123)
import { createSignal, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import { useTasks, services, workspaceId, bumpDB, repos } from "../../stores";
import { PageHeader, StatusBadge, Tag } from "../../components/shared";

const COLUMNS = ["backlog", "ready", "in_progress", "blocked", "review", "verification", "done"];

export function ProjectBoard() {
  const params = useParams<{ projectId: string }>();
  const tasks = useTasks(params.projectId);
  const [toast, setToast] = createSignal<string | null>(null);

  const move = async (taskId: string, to: string) => {
    try {
      await services.task.move(workspaceId, taskId, to as any, "u-eqii");
      bumpDB();
      setToast(`Task ${taskId} → ${to}`);
      setTimeout(() => setToast(null), 2000);
    } catch (err: any) {
      setToast(err.message);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div>
      <PageHeader eyebrow="Kolaborasi" title="Board" />
      <div style={{ display: "grid", "grid-template-columns": "repeat(7,1fr)", gap: "var(--sp-3)", "align-items": "start", "min-width": "900px" }}>
        {COLUMNS.map((col) => {
          const colTasks = tasks().filter((t: any) => t.status === col);
          return (
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", "border-radius": "var(--r-md)", padding: "var(--sp-2)" }}>
              <div class="column-head"><b style={{ "font-size": "0.78rem" }}>{col}</b><span class="count">{colTasks.length}</span></div>
              {colTasks.map((t: any) => (
                <div class="card" style={{ padding: "var(--sp-3)", "margin-bottom": "var(--sp-2)" }}>
                  <b style={{ "font-size": "0.8rem" }}>{t.title}</b>
                  <div class="mono" style={{ "font-size": "0.7rem", color: "var(--ink-faint)" }}>{t.taskId}</div>
                  {t.priority && <StatusBadge status={t.priority} />}
                  <div style={{ display: "flex", gap: "var(--sp-1)", "margin-top": "var(--sp-2)" }}>
                    {COLUMNS.filter((c) => c !== col).slice(0, 2).map((c) => (
                      <button class="btn btn-sm" onClick={() => move(t.taskId, c)} style={{ "font-size": "0.68rem", padding: "2px 6px" }}>{c}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <Show when={toast()}><div class="toast">{toast()}</div></Show>
    </div>
  );
}
