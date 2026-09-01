// Skill bank — TERPARTISI: global + bawaan tiap agent (spec 13, 87)
// Tampilan dipisah per card per OWNER agent. Global = satu bagian.
// Skill bawaan agent = dikelompokkan per owner → per agent card.
import { useSkills, useAgents, useOwners } from "../../stores";
import { PageHeader, Tag, StatusBadge } from "../../components/shared";
import { IconSkill, IconAgent, IconShield, IconLock } from "../../components/shared/icons";
import { dbList } from "../../adapters/mock/db";

export function SkillsPage() {
  const skills = useSkills();
  const agents = useAgents();
  const owners = useOwners();
  const agentSkills = () => dbList("agentSkills") as any[];

  // Skill yang terhubung ke agent (bawaan agent)
  const ownedSkillIds = () => new Set(agentSkills().map((a) => a.skillId));
  const globalSkills = () => skills().filter((s: any) => !ownedSkillIds().has(s.skillId));
  const skillById = (id: string) => skills().find((s: any) => s.skillId === id);
  const agentSkillsOf = (agentId: string) => agentSkills().filter((as) => as.agentId === agentId);

  return (
    <div>
      <PageHeader eyebrow="Capabilities Registry" title="Skill Bank" icon={IconSkill} />

      {/* GLOBAL SKILLS */}
      <div style={{ "margin-bottom": "var(--sp-6)" }}>
        <div class="card-head" style={{ padding: "var(--sp-3) 0" }}>
          <h3 style={{ margin: 0 }}><IconShield class="ico-md" style={{ "margin-right": "var(--sp-2)", color: "var(--teal)" }} /> Global Skills</h3>
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

      {/* AGENT-SPECIFIC SKILLS — dikelompokkan per OWNER, per agent card */}
      <div>
        <div class="card-head" style={{ padding: "var(--sp-3) 0" }}>
          <h3 style={{ margin: 0 }}><IconLock class="ico-md" style={{ "margin-right": "var(--sp-2)", color: "var(--accent)" }} /> Skill Bawaan Agent</h3>
        </div>
        {owners().map((o: any) => {
          const ownerAgents = agents().filter((a: any) => a.ownerId === o.ownerId);
          const hasAny = ownerAgents.some((a: any) => agentSkillsOf(a.agentId).length > 0);
          if (!hasAny) return null;
          return (
            <div class="card" style={{ "margin-bottom": "var(--sp-5)" }}>
              {/* Owner header card */}
              <div class="card-head">
                <div class="sb-avatar" style={{ background: "var(--ink)", color: "var(--accent)" }}>{o.displayName[0]}</div>
                <div style={{ flex: 1 }}>
                  <b>{o.displayName}</b>
                  <div style={{ "font-size": "0.75rem", color: "var(--ink-faint)" }}>{o.role}</div>
                </div>
                <StatusBadge status="active" label="Owner" />
              </div>
              {/* Tiap agent → card tersendiri */}
              <div style={{ display: "grid", "grid-template-columns": "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--sp-3)", padding: "var(--sp-4)" }}>
                {ownerAgents.map((a: any) => {
                  const asg = agentSkillsOf(a.agentId);
                  if (asg.length === 0) return null;
                  return (
                    <div class="card card-pad" style={{ "margin": 0 }}>
                      <div style={{ display: "flex", "align-items": "center", gap: "var(--sp-2)", "margin-bottom": "var(--sp-3)" }}>
                        <div class="sb-avatar" style={{ background: "var(--accent)" }}><IconAgent size={16} /></div>
                        <div style={{ flex: 1 }}>
                          <b>{a.name}</b>
                          <div style={{ "font-size": "0.72rem", color: "var(--ink-faint)" }}>{a.role}</div>
                        </div>
                        <IconLock class="ico-sm" style={{ color: "var(--accent)" }} />
                      </div>
                      <div style={{ display: "flex", "flex-wrap": "wrap", gap: "var(--sp-2)" }}>
                        {asg.map((as) => {
                          const sk = skillById(as.skillId);
                          if (!sk) return null;
                          return <Tag active={sk.type === "process"}>{sk.name}</Tag>;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
