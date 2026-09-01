// Project board with validated transitions (spec sections 73, 123)
import { createSignal, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import { useTasks, useExecutions, services, workspaceId, bumpDB } from "../../stores";
import { PageHeader, StatusBadge, TimelineProgress } from "../../components/shared";
import { IconBoard, IconBolt } from "../../components/shared/icons";
import type { TaskStatus } from "../../domain/enums";

// Kolom board = nilai kanonik TaskStatus (bukan invent baru)
const COLUMNS: TaskStatus[] = ["backlog", "ready", "in_progress", "blocked", "review", "verification", "done"];

export function ProjectBoard() {
  const params = useParams<{ projectId: string }>();
  const tasks = useTasks(params.projectId);
  const executions = useExecutions(params.projectId);
  const [toast, setToast] = createSignal<string | null>(null);

  const move = async (taskId: string, to: string) => {
    try {
      await services.task.move(workspaceId, taskId, to as any, "u-rizqullah");
      bumpDB();
      setToast(`Task ${taskId} → ${to}`);
      setTimeout(() => setToast(null), 2000);
    } catch (err: any) {
      setToast(err.message);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const execForTask = (taskId: string) => executions().find((e: any) => e.taskId === taskId && ["queued", "running", "waiting_approval"].includes(e.status));

  return (
    <div>
      <PageHeader eyebrow="Kolaborasi" title="Board" icon={IconBoard} />
      <div style={{ display: "grid", "grid-template-columns": "repeat(7,1fr)", gap: "var(--sp-3)", "align-items": "start", "min-width": "900px" }}>
        {COLUMNS.map((col) => {
          const colTasks = tasks().filter((t: any) => t.status === col);
          return (
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", "border-radius": "var(--r-md)", padding: "var(--sp-2)" }}>
              <div class="column-head"><b style={{ "font-size": "0.78rem" }}>{col}</b><span class="count">{colTasks.length}</span></div>
              {colTasks.map((t: any) => {
                const ex = execForTask(t.taskId);
                return (
                <div class="card" style={{ padding: "var(--sp-3)", "margin-bottom": "var(--sp-2)" }}>
                  <b style={{ "font-size": "0.8rem" }}>{t.title}</b>
                  <div class="mono" style={{ "font-size": "0.7rem", color: "var(--ink-faint)" }}>{t.taskId}{t.requirementId ? ` · ${t.requirementId}` : ""}</div>
                  <div style={{ "margin-top": "var(--sp-2)" }}>{t.priority && <StatusBadge status={t.priority} />}</div>
                  {ex && (
                    <div style={{ display: "flex", "align-items": "center", gap: "var(--sp-2)", "margin-top": "var(--sp-2)" }}>
                      <IconBolt class="ico-xs" style={{ color: "var(--accent)" }} />
                      <span class="mono" style={{ "font-size": "0.68rem", color: "var(--ink-faint)" }}>{ex.executionId}</span>
                      <a href={`/projects/${params.projectId}/work/${ex.executionId}`} class="btn btn-sm btn-primary" style={{ "margin-left": "auto", "font-size": "0.68rem", padding: "2px 8px" }}>Open Work</a>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: "var(--sp-1)", "margin-top": "var(--sp-2)" }}>
                    {COLUMNS.filter((c) => c !== col).slice(0, 2).map((c) => (
                      <button class="btn btn-sm" onClick={() => move(t.taskId, c)} style={{ "font-size": "0.68rem", padding: "2px 6px" }}>{c}</button>
                    ))}
                  </div>
                </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <Show when={toast()}><div class="toast">{toast()}</div></Show>
    </div>
  );
}
