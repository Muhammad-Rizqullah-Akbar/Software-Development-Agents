// SOUL Lab (spec section 88)
import { createSignal } from "solid-js";
import { useAgents } from "../../stores";
import { dbList } from "../../adapters/mock/db";
import { PageHeader, StatusBadge } from "../../components/shared";
import { IconSoul } from "../../components/shared/icons";

export function SoulPage() {
  const agents = useAgents();
  const [agentId, setAgentId] = createSignal("a-hermes");
  const souls = () => dbList("souls").filter((s: any) => s.agentId === agentId());

  return (
    <div>
      <PageHeader eyebrow="Behavioral Config" title="SOUL Lab" icon={IconSoul} />
      <div style={{ display: "flex", gap: "var(--sp-3)", "margin-bottom": "var(--sp-5)", "align-items": "center" }}>
        <label class="eyebrow">Agent</label>
        <select class="form-select" value={agentId()} onChange={(e) => setAgentId(e.currentTarget.value)}>
          {agents().map((a: any) => <option value={a.agentId}>{a.name}</option>)}
        </select>
      </div>
      <div class="grid grid-2">
        {souls().map((s: any) => (
          <div class="card card-pad">
            <div style={{ display: "flex", "justify-content": "space-between" }}>
              <b>SOUL v{s.version}</b>
              <StatusBadge status={s.status} />
            </div>
            <pre class="codeblock" style={{ "font-size": "0.75rem", "margin-top": "var(--sp-3)" }}>{s.content}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
