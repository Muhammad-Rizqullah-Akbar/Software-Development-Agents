// Governance (spec sections 62-65)
import { dbList } from "../../adapters/mock/db";
import { PageHeader, StatusBadge } from "../../components/shared";

export function GovernancePage() {
  const capabilities = dbList("capabilities") as any[];
  const policies = dbList("policies") as any[];

  return (
    <div>
      <PageHeader eyebrow="Authorization" title="Governance" />

      <div class="card" style={{ "margin-bottom": "var(--sp-6)" }}>
        <div class="card-head"><h3>Capabilities</h3></div>
        <table class="table">
          <thead><tr><th>Capability</th><th>Sensitive</th><th>Deskripsi</th></tr></thead>
          <tbody>
            {capabilities.map((c) => (
              <tr>
                <td class="mono">{c.name}</td>
                <td><StatusBadge status={c.sensitive ? "critical" : "done"} label={c.sensitive ? "Sensitive" : "Safe"} /></td>
                <td>{c.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div class="card">
        <div class="card-head"><h3>Policies</h3></div>
        <table class="table">
          <thead><tr><th>Policy</th><th>Allow</th><th>Deny</th><th>Approval Required</th></tr></thead>
          <tbody>
            {policies.map((p) => (
              <tr>
                <td><b>{p.name}</b></td>
                <td>{p.allowCapabilityIds.length} capability</td>
                <td>{p.denyCapabilityIds.length} capability</td>
                <td>{p.approvalRequiredCapabilityIds.length} capability</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
