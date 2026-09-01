// Project activity (spec sections 64, 105)
import { useParams } from "@solidjs/router";
import { dbList } from "../../adapters/mock/db";
import { PageHeader } from "../../components/shared";

export function ProjectActivity() {
  const params = useParams<{ projectId: string }>();
  const events = dbList("auditEvents")
    .filter((e: any) => e.projectId === params.projectId)
    .slice()
    .reverse();

  return (
    <div>
      <PageHeader eyebrow="Audit" title="Project Activity" />
      <div class="card">
        {events.length === 0 && <div class="empty-state"><div class="eyebrow">Kosong</div><p>Belum ada aktivitas.</p></div>}
        {events.map((e: any) => (
          <div class="activity-item">
            <div style={{ flex: 1 }}>
              <b>{e.action}</b>
              <span class="mono" style={{ "font-size": "0.72rem", color: "var(--ink-faint)", "margin-left": "var(--sp-2)" }}>{e.resourceType}:{e.resourceId}</span>
            </div>
            <span class="mono" style={{ "font-size": "0.72rem", color: "var(--ink-faint)" }}>{e.occurredAt.slice(11, 19)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
