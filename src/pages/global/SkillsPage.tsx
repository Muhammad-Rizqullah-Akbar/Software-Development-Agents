// Skill bank (spec section 87)
import { useSkills } from "../../stores";
import { PageHeader, Tag, StatusBadge } from "../../components/shared";
import { IconSkill } from "../../components/shared/icons";

export function SkillsPage() {
  const skills = useSkills();

  return (
    <div>
      <PageHeader eyebrow="Capabilities Registry" title="Skill Bank" icon={IconSkill} />
      <div class="card">
        <table class="table">
          <thead><tr><th>Skill</th><th>Type</th><th>Kategori</th><th>Risk</th></tr></thead>
          <tbody>
            {skills().map((s: any) => (
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
  );
}
