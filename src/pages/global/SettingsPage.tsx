// Settings (spec section 66)
import { useAgents } from "../../stores";
import { dbList } from "../../adapters/mock/db";
import { PageHeader, StatusBadge } from "../../components/shared";

export function SettingsPage() {
  const agents = useAgents();
  const models = dbList("models") as any[];
  const gateways = dbList("gateways") as any[];

  return (
    <div>
      <PageHeader eyebrow="Configuration" title="Settings" />
      <div class="grid grid-2">
        <div class="card card-pad">
          <h3>Model Gateway</h3>
          <p style={{ "font-size": "0.85rem", color: "var(--ink-soft)" }}>Provider-agnostic. Adapter 9router akan menggantikan mock.</p>
          <div style={{ "margin-top": "var(--sp-3)" }}>
            {gateways.map((g) => <div style={{ padding: "var(--sp-2) 0" }}><b>{g.name}</b> <span class="mono" style={{ "font-size": "0.72rem", color: "var(--ink-faint)" }}>{g.provider}</span></div>)}
            {models.map((m) => (
              <div style={{ display: "flex", "justify-content": "space-between", padding: "var(--sp-2) 0" }}>
                <b>{m.name}</b>
                <span class="mono" style={{ "font-size": "0.72rem", color: "var(--ink-faint)" }}>{m.provider}</span>
              </div>
            ))}
          </div>
        </div>
        <div class="card card-pad">
          <h3>Agents Terdaftar</h3>
          <p style={{ "font-size": "0.85rem", color: "var(--ink-soft)" }}>Definisi global agent, terpisah dari project assignments.</p>
          <div style={{ "margin-top": "var(--sp-3)" }}>
            {agents().map((a: any) => (
              <div style={{ display: "flex", "justify-content": "space-between", padding: "var(--sp-2) 0" }}>
                <b>{a.name}</b>
                <StatusBadge status="active" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
