// SOUL Lab (spec 14, 88) — SOUL BAWAAN TIAP AGENT
// SOUL adalah behavioral config yang TERIKAT pada agent. Immutable:
// tidak bisa diganggu gugat / diedit dari UI. Hanya tampil read-only
// beserta versi & status. Global vs agent SOUL terpartisi jelas.
import { createSignal, Show } from "solid-js";
import { useAgents } from "../../stores";
import { dbList } from "../../adapters/mock/db";
import { PageHeader, StatusBadge } from "../../components/shared";
import { IconSoul, IconAgent, IconLock } from "../../components/shared/icons";

export function SoulPage() {
  const agents = useAgents();
  const [agentId, setAgentId] = createSignal(agents()[0]?.agentId ?? "");
  const selected = () => agents().find((a: any) => a.agentId === agentId());
  const souls = () => dbList("souls").filter((s: any) => s.agentId === agentId());

  return (
    <div>
      <PageHeader eyebrow="Behavioral Config" title="SOUL Lab" icon={IconSoul} />

      <div style={{ display: "flex", gap: "var(--sp-3)", "margin-bottom": "var(--sp-5)", "align-items": "center", "flex-wrap": "wrap" }}>
        <label class="eyebrow">Agent</label>
        <select class="form-select" value={agentId()} onChange={(e) => setAgentId(e.currentTarget.value)} style={{ "min-width": "220px" }}>
          {agents().map((a: any) => <option value={a.agentId}>{a.name} — {a.role}</option>)}
        </select>
        <StatusBadge status="active" label="Bawaan agent · immutable" />
      </div>

      <Show when={selected()}>
        <div class="card card-pad" style={{ "margin-bottom": "var(--sp-5)" }}>
          <div style={{ display: "flex", "align-items": "center", gap: "var(--sp-3)" }}>
            <div class="sb-avatar" style={{ background: "var(--ink)", color: "var(--accent)" }}><IconAgent size={18} /></div>
            <div style={{ flex: 1 }}>
              <b>{selected()?.name}</b>
              <div style={{ "font-size": "0.78rem", color: "var(--ink-faint)" }}>{selected()?.role} · {selected()?.description}</div>
            </div>
            <StatusBadge status="approved" label="Terikat agent" />
          </div>
        </div>
      </Show>

      <div class="grid grid-2">
        {souls().map((s: any) => (
          <div class="card card-pad">
            <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center", "margin-bottom": "var(--sp-2)" }}>
              <b><IconLock class="ico-sm" style={{ "margin-right": "var(--sp-1)", color: "var(--accent)" }} /> SOUL v{s.version}</b>
              <StatusBadge status={s.status} />
            </div>
            <div style={{ "font-size": "0.72rem", color: "var(--ink-faint)", "margin-bottom": "var(--sp-3)" }} class="mono">
              soulId: {s.soulId} · agentId: {s.agentId}
            </div>
            <pre class="codeblock" style={{ "font-size": "0.75rem", "margin-top": "var(--sp-2)" }}>{s.content}</pre>
            <div style={{ "margin-top": "var(--sp-3)", display: "flex", "align-items": "center", gap: "var(--sp-2)" }}>
              <IconLock class="ico-xs" style={{ color: "var(--ink-faint)" }} />
              <span style={{ "font-size": "0.72rem", color: "var(--ink-faint)" }}>Read-only · tidak dapat diedit / diganggu gugat</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
