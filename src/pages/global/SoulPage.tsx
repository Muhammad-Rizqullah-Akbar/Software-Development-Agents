// SOUL Lab (spec 14, 88) — SOUL BAWAAN TIAP AGENT
// Tampilan dipisah per OWNER agent. Tiap agent punya card SOUL sendiri.
// SOUL immutable: read-only, tidak bisa diganggu gugat.
import { useAgents, useOwners } from "../../stores";
import { dbList } from "../../adapters/mock/db";
import { PageHeader, StatusBadge } from "../../components/shared";
import { IconSoul, IconAgent, IconLock } from "../../components/shared/icons";

export function SoulPage() {
  const agents = useAgents();
  const owners = useOwners();
  const souls = () => dbList("souls") as any[];
  const soulOf = (agentId: string) => souls().filter((s: any) => s.agentId === agentId);

  return (
    <div>
      <PageHeader eyebrow="Behavioral Config" title="SOUL Lab" icon={IconSoul} />
      <div style={{ "margin-bottom": "var(--sp-5)" }}>
        <span class="mono" style={{ "font-size": "0.75rem", color: "var(--ink-faint)" }}>SOUL bawaan tiap agent · read-only · tidak dapat diganggu gugat</span>
      </div>

      {owners().map((o: any) => {
        const ownerAgents = agents().filter((a: any) => a.ownerId === o.ownerId && soulOf(a.agentId).length > 0);
        if (ownerAgents.length === 0) return null;
        return (
          <div class="card" style={{ "margin-bottom": "var(--sp-6)" }}>
            {/* Owner header card */}
            <div class="card-head">
              <div class="sb-avatar" style={{ background: "var(--ink)", color: "var(--accent)" }}>{o.displayName[0]}</div>
              <div style={{ flex: 1 }}>
                <b>{o.displayName}</b>
                <div style={{ "font-size": "0.75rem", color: "var(--ink-faint)" }}>{o.role}</div>
              </div>
              <StatusBadge status="active" label="Owner" />
            </div>
            {/* Tiap agent → card SOUL sendiri */}
            <div style={{ display: "grid", "grid-template-columns": "repeat(auto-fill, minmax(320px, 1fr))", gap: "var(--sp-4)", padding: "var(--sp-4)" }}>
              {ownerAgents.map((a: any) => (
                <div class="card card-pad" style={{ "margin": 0 }}>
                  <div style={{ display: "flex", "align-items": "center", gap: "var(--sp-2)", "margin-bottom": "var(--sp-3)" }}>
                    <div class="sb-avatar" style={{ background: "var(--accent)" }}><IconAgent size={16} /></div>
                    <div style={{ flex: 1 }}>
                      <b>{a.name}</b>
                      <div style={{ "font-size": "0.72rem", color: "var(--ink-faint)" }}>{a.role}</div>
                    </div>
                    <IconLock class="ico-sm" style={{ color: "var(--accent)" }} />
                  </div>
                  {soulOf(a.agentId).map((s: any) => (
                    <div>
                      <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center", "margin-bottom": "var(--sp-2)" }}>
                        <b>SOUL v{s.version}</b>
                        <StatusBadge status={s.status} />
                      </div>
                      <pre class="codeblock" style={{ "font-size": "0.75rem", "margin-top": "var(--sp-2)" }}>{s.content}</pre>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
