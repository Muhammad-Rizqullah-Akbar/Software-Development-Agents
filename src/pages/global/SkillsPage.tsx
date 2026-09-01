// Skill bank — TERPARTISI: global + bawaan tiap agent (spec 13, 87)
// Skill global = tersedia di bank umum. Skill agent = bawaan tiap agent
// (via agentSkills mapping), tidak bisa diganggu gugat.
import { useSkills, useAgents } from "../../stores";
import { PageHeader, Tag, StatusBadge } from "../../components/shared";
import { IconSkill, IconAgent, IconShield, IconLock } from "../../components/shared/icons";
import { dbList } from "../../adapters/mock/db";

export function SkillsPage() {
  const skills = useSkills();
  const agents = useAgents();
  const agentSkills = () => dbList("agentSkills") as any[];

  // Skill yang terhubung ke agent (bawaan agent)
  const ownedSkillIds = () => new Set(agentSkills().map((a) => a.skillId));
  const globalSkills = () => skills().filter((s: any) => !ownedSkillIds().has(s.skillId));
  const agentOfSkill = (skillId: string) => agents().filter((a: any) => agentSkills().some((as) => as.agentId === a.agentId && as.skillId === skillId));

  return (
    <div>
      <PageHeader eyebrow="Capabilities Registry" title="Skill Bank" icon={IconSkill} />

      {/* GLOBAL SKILLS */}
      <div style={{ "margin-bottom": "var(--sp-6)" }}>
        <div class="card-head" style={{ padding: "var(--sp-3) 0" }}>
          <h3 style={{ margin: 0 }}><IconShield class="ico-md" style={{ "margin-right": "var(--sp-2)", color: "var(--teal)" }} /> Global Skills</h3>
          <span style={{ "font-size": "0.78rem", color: "var(--ink-faint)" }}>Tersedia umum · tidak terikat agent</span>
        </div>
        <div class="card">
          <table class="table">
            <thead><tr><th>Skill</th><th>Type</th><th>Kategori</th><th>Risk</th></tr></thead>
            <tbody>
              {globalSkills().map((s: any) => (
                <tr>
                  <td><b>{s.name}</b></td>
                  <td><Tag>{s.type}</Tag></td>
                  <td>{s.category}</td>
                  <td><StatusBadge status={s.riskLevel} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AGENT-SPECIFIC SKILLS */}
      <div>
        <div class="card-head" style={{ padding: "var(--sp-3) 0" }}>
          <h3 style={{ margin: 0 }}><IconLock class="ico-md" style={{ "margin-right": "var(--sp-2)", color: "var(--accent)" }} /> Skill Bawaan Agent</h3>
          <span style={{ "font-size": "0.78rem", color: "var(--ink-faint)" }}>Terikat agent · tidak bisa diganggu gugat</span>
        </div>
        {agents().map((a: any) => {
          const agentSkillList = agentSkills().filter((as) => as.agentId === a.agentId);
          if (agentSkillList.length === 0) return null;
          return (
            <div class="card" style={{ "margin-bottom": "var(--sp-4)" }}>
              <div class="card-head">
                <div class="sb-avatar" style={{ background: "var(--accent)" }}><IconAgent size={16} /></div>
                <h3 style={{ margin: 0 }}>{a.name}</h3>
                <StatusBadge status="active" label="Bawaan" />
              </div>
              <div style={{ padding: "var(--sp-4)", display: "flex", "flex-wrap": "wrap", gap: "var(--sp-2)" }}>
                {agentSkillList.map((as) => {
                  const sk = skills().find((s: any) => s.skillId === as.skillId);
                  if (!sk) return null;
                  return <Tag active={sk.type === "process"}>{sk.name} <span class="mono" style={{ "font-size": "0.66rem", opacity: 0.7 }}>({sk.type})</span></Tag>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
