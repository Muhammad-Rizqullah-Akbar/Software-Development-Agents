// Global activity / audit (spec section 64, 91)
import { useAudit } from "../../stores";
import { PageHeader } from "../../components/shared";

export function ActivityPage() {
  const audit = useAudit();
  return (
    <div>
      <PageHeader eyebrow="Audit Trail" title="Activity" />
      <div class="card">
        {audit().slice(0, 50).map((e: any) => (
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
