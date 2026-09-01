// Project releases & deployments (spec sections 83-85, 52)
import { createSignal, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import { useReleases, services, workspaceId, bumpDB } from "../../stores";
import { PageHeader, StatusBadge } from "../../components/shared";
import { dbList } from "../../adapters/mock/db";

export function ProjectReleases() {
  const params = useParams<{ projectId: string }>();
  const releases = useReleases(params.projectId);
  const [toast, setToast] = createSignal<string | null>(null);

  const approve = async (releaseId: string) => {
    await services.release.approve(workspaceId, releaseId, true, "u-eqii");
    bumpDB();
    setToast("Release disetujui.");
    setTimeout(() => setToast(null), 2500);
  };

  const deploy = async (releaseId: string) => {
    await services.release.deploy(workspaceId, releaseId, "env-stage");
    bumpDB();
    setToast("Deployment dimulai ke staging.");
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div>
      <PageHeader eyebrow="Release Gates" title="Releases" />
      <div class="card">
        <table class="table">
          <thead><tr><th>Release</th><th>Version</th><th>Status</th><th>Gates</th><th></th></tr></thead>
          <tbody>
            {releases().map((r: any) => {
              const gates = dbList("releaseGates").filter((g: any) => g.releaseId === r.releaseId);
              const passed = gates.filter((g: any) => g.passed).length;
              return (
                <tr>
                  <td class="mono">{r.releaseId}</td>
                  <td>{r.version}</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td class="mono">{passed}/{gates.length}</td>
                  <td>
                    <div style={{ display: "flex", gap: "var(--sp-1)" }}>
                      {r.status === "candidate" && <button class="btn btn-sm" onClick={() => approve(r.releaseId)}>Approve</button>}
                      {(r.status === "approved" || r.status === "candidate") && <button class="btn btn-sm btn-primary" onClick={() => deploy(r.releaseId)}>Deploy</button>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Show when={toast()}><div class="toast">{toast()}</div></Show>
    </div>
  );
}
