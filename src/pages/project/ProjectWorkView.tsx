// WORK VIEW — deep work surface (spec 171-175, 188, 195-199)
// File explorer, code viewer, terminal (streaming), live preview, sandbox,
// findings, reports, execution timeline. Semua data dari mock db yang sama.

import { createSignal, For, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import { useExecutions, useExecutionEvents, useSandboxes, useFindings, useWorkReports, useAgents, useSessions, useProject } from "../../stores";
import { PageHeader, StatusBadge, TimelineProgress } from "../../components/shared";
import { IconRuns, IconAgent, IconBolt, IconCheck, IconWarning, IconShield } from "../../components/shared/icons";
import { dbList } from "../../adapters/mock/db";

const CODE = `// src/auth/oauth.service.ts
import { auth, encode, decode } from "@core";

export class OAuthService {
  // + token issuer validation (finding #31)
  private verifyIssuer(token: string): boolean {
    const { iss } = decode(token);
    return iss === "https://auth.hermes.dev";
  }

  async exchange(code: string) {
    const token = await auth.exchange(code);
    if (!this.verifyIssuer(token)) throw new Error("invalid issuer");
    return token;
  }
}`;

const FILES = [
  { name: "src/auth/oauth.service.ts", status: "modified", diff: "+12 -3" },
  { name: "src/auth/auth.controller.ts", status: "modified", diff: "+8 -1" },
  { name: "src/auth/auth.test.ts", status: "passing", diff: "+24" },
  { name: "src/auth/oauth.service.spec.ts", status: "new", diff: "+18" },
];

export function ProjectWorkView() {
  const params = useParams<{ projectId: string; executionId: string }>();
  const executions = useExecutions(params.projectId);
  const events = useExecutionEvents(params.executionId);
  const sandboxes = useSandboxes(params.projectId);
  const findings = useFindings(params.projectId);
  const reports = useWorkReports(params.projectId);
  const agents = useAgents();
  const sessions = useSessions(params.projectId);
  const project = useProject(params.projectId)();

  const exec = () => executions().find((e: any) => e.executionId === params.executionId);
  const session = () => sessions().find((s: any) => s.agentSessionId === exec()?.agentSessionId);
  const agent = () => agents().find((a: any) => a.agentId === session()?.agentId);
  const sandbox = () => sandboxes().find((s: any) => s.executionId === params.executionId);
  const execFindings = () => findings().filter((f: any) => f.executionId === params.executionId);
  const execReports = () => reports().filter((r: any) => r.taskId === exec()?.taskId);
  const [openFile, setOpenFile] = createSignal(FILES[0].name);

  return (
    <div>
      <PageHeader eyebrow="Live Work" title="Work View" icon={IconRuns} actions={
        <a href={`/projects/${params.projectId}/board`} class="btn">← Kembali ke Board</a>
      } />

      {/* Header bar: execution + agent */}
      <div class="card card-pad" style={{ "margin-bottom": "var(--sp-5)" }}>
        <div style={{ display: "flex", "align-items": "center", gap: "var(--sp-4)" }}>
          <div class="sb-avatar" style={{ background: "var(--accent)" }}><IconAgent size={18} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", "align-items": "center", gap: "var(--sp-3)" }}>
              <b>{agent()?.name ?? "Agent"}</b>
              <span class="mono" style={{ "font-size": "0.72rem", color: "var(--ink-faint)" }}>{exec()?.executionId}</span>
            </div>
            <div style={{ "font-size": "0.82rem", color: "var(--ink-faint)" }}>{exec()?.input} · {project?.name}</div>
          </div>
          <StatusBadge status={exec()?.status ?? "queued"} />
        </div>
      </div>

      {/* Work surface */}
      <div style={{ display: "grid", "grid-template-columns": "220px 1fr 300px", gap: "var(--sp-4)", "align-items": "start" }}>
        {/* File Explorer (spec 195) */}
        <div class="card">
          <div class="card-head"><h3>File Explorer</h3></div>
          <div style={{ padding: "var(--sp-2)" }}>
            <For each={FILES}>
              {(f) => (
                <button class="file" style={{ display: "flex", "justify-content": "space-between", "align-items": "center" }} onClick={() => setOpenFile(f.name)}>
                  <span class="mono" style={{ "font-size": "0.72rem" }}>{f.name}</span>
                  {f.status === "modified" && <span style={{ color: "var(--gold)" }}>•</span>}
                  {f.status === "passing" && <IconCheck class="ico-xs" style={{ color: "var(--teal)" }} />}
                  {f.status === "new" && <span style={{ color: "var(--accent)" }}>+</span>}
                </button>
              )}
            </For>
          </div>
        </div>

        {/* Code Viewer + Terminal (spec 172, 196) */}
        <div style={{ display: "flex", "flex-direction": "column", gap: "var(--sp-4)" }}>
          <div class="card">
            <div class="card-head">
              <h3 class="mono" style={{ "font-size": "0.8rem" }}>{openFile()}</h3>
              <StatusBadge status="in_progress" label="Modified" />
            </div>
            <pre class="codeblock" style={{ "font-size": "0.72rem", "margin": 0, "border-radius": 0, "box-shadow": "none", "white-space": "pre", "overflow-x": "auto" }}>{CODE}</pre>
          </div>
          <div class="card">
            <div class="card-head"><h3>Terminal</h3><StatusBadge status="running" label="Streaming" /></div>
            <div style={{ background: "#0b0e11", color: "#9fe870", padding: "var(--sp-4)", "font-family": "var(--font-mono)", "font-size": "0.72rem", "line-height": "1.7", "max-height": "220px", overflow: "auto" }}>
              <For each={events()}>
                {(e: any) => <div>{e.timestamp.slice(11, 19)} <span style={{ color: "#d6d3c9" }}>{e.message}</span></div>}
              </For>
              <div style={{ color: "#d6d3c9" }}>_</div>
            </div>
          </div>
        </div>

        {/* Right panel: sandbox + findings + reports (spec 174, 176-177) */}
        <div style={{ display: "flex", "flex-direction": "column", gap: "var(--sp-4)" }}>
          <Show when={sandbox()}>
            {(sb) => (
              <div class="card card-pad">
                <div class="card-head" style={{ padding: "0 0 var(--sp-3)" }}><h3>Sandbox #{sb().sandboxId.replace("sb-", "")}</h3><StatusBadge status={sb().status} /></div>
                <div style={{ "font-size": "0.78rem", "margin-top": "var(--sp-2)" }}>
                  <div><b>Filesystem:</b> <span class="mono">{sb().filesystemScope}</span></div>
                  <div><b>Network:</b> {sb().networkScope}</div>
                  <div><b>Secrets:</b> {sb().secretAccess}</div>
                  <div><b>Capabilities:</b> <span class="mono" style={{ "font-size": "0.68rem" }}>{sb().capabilityIds.length} cap</span></div>
                </div>
              </div>
            )}
          </Show>

          <div class="card">
            <div class="card-head"><h3>Findings</h3></div>
            <div style={{ padding: "var(--sp-2)" }}>
              <For each={execFindings()}>
                {(f: any) => (
                  <div class="activity-item">
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: "var(--sp-2)", "align-items": "center" }}>
                        <StatusBadge status={f.severity} label={f.severity} />
                        {f.status === "resolved" ? <IconCheck class="ico-xs" style={{ color: "var(--teal)" }} /> : <IconWarning class="ico-xs" style={{ color: "var(--red)" }} />}
                      </div>
                      <div style={{ "font-size": "0.8rem", "margin-top": "var(--sp-1)" }}>{f.issue}</div>
                      <div class="mono" style={{ "font-size": "0.68rem", color: "var(--ink-faint)" }}>{f.file}</div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>

          <Show when={execReports().length > 0}>
            <div class="card">
              <div class="card-head"><h3>Report</h3><StatusBadge status="done" label="Available" /></div>
              <div style={{ padding: "var(--sp-4)" }}>
                <For each={execReports()}>
                  {(r: any) => (
                    <div>
                      <p style={{ "font-size": "0.82rem" }}>{r.summary}</p>
                      <div style={{ "font-size": "0.75rem", "margin-top": "var(--sp-2)" }}>
                        <b>Tests:</b> {r.testsPassed} passed · <b>Security:</b> {r.securityResolved} resolved
                      </div>
                      <div style={{ "font-size": "0.75rem", "margin-top": "var(--sp-1)" }}>
                        <b>Artifacts:</b> {r.artifacts.join(", ")}
                      </div>
                      <div style={{ "font-size": "0.75rem", "margin-top": "var(--sp-1)", color: "var(--teal)" }}>
                        <IconCheck class="ico-xs" /> {r.recommendation}
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}
