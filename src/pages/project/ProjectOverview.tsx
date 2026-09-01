// Project overview with Hermes chat (spec sections 69, 74, 113-114)
import { createSignal, Show, For } from "solid-js";
import { useParams } from "@solidjs/router";
import { useProject, useTasks, useRequirements, useSessions, useExecutions, useWorkFields, useAssignments, useAgents, hermes, workspaceId } from "../../stores";
import { MetricCard, StatusBadge, Tag, TimelineProgress } from "../../components/shared";
import { IconAgent, IconChat, IconSend, IconRuns, IconProjects, IconClock, IconBolt, IconShield, IconCheck } from "../../components/shared/icons";
import { dbList } from "../../adapters/mock/db";

export function ProjectOverview() {
  const params = useParams<{ projectId: string }>();
  const project = useProject(params.projectId)();
  const tasks = useTasks(params.projectId);
  const requirements = useRequirements(params.projectId);
  const sessions = useSessions(params.projectId);
  const executions = useExecutions(params.projectId);

  const [chat, setChat] = createSignal("");
  const [messages, setMessages] = createSignal<Array<{ role: string; text: string; proposal?: any }>>([
    { role: "hermes", text: "Halo Eqii. Saya Hermes. Apa yang ingin kamu bangun? Aku bisa menghasilkan requirements, rencana, workflow, dan rekomendasi agent." },
  ]);
  const [thinking, setThinking] = createSignal(false);

  const send = async () => {
    const text = chat().trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setChat("");
    setThinking(true);
    const resp = await hermes.sendMessage({ workspaceId, projectId: params.projectId, message: text });
    setThinking(false);
    setMessages((m) => [...m, { role: "hermes", text: resp.message, proposal: resp.proposal }]);
  };

  const counts = {
    tasks: tasks().length,
    requirements: requirements().length,
    sessions: sessions().length,
    running: executions().filter((e: any) => e.status === "running").length,
  };

  // Work fields + participants
  const workFields = useWorkFields(params.projectId);
  const assignments = useAssignments(params.projectId);
  const agents = useAgents();
  const fieldAgents = (fieldId: string) => {
    const parts = dbList("workFieldParticipants").filter((p: any) => p.workFieldId === fieldId);
    return parts.map((p: any) => {
      const asg = assignments().find((a: any) => a.agentAssignmentId === p.agentAssignmentId);
      const ag = agents().find((a: any) => a.agentId === asg?.agentId);
      return { name: ag?.name, subContext: p.subContext, agentId: ag?.agentId };
    });
  };

  const workflow = [
    { name: "Define", state: "done" },
    { name: "Design", state: "done" },
    { name: "Plan", state: "done" },
    { name: "Build", state: "cur" },
    { name: "Review", state: "todo" },
    { name: "Verify", state: "todo" },
    { name: "Release", state: "todo" },
  ];

  return (
    <div>
      <div class="grid grid-4" style={{ "margin-bottom": "var(--sp-6)" }}>
        <MetricCard label="Phase" value={project?.phase ?? "—"} sub="fase SDLC saat ini" icon={IconProjects} />
        <MetricCard label="Requirements" value={String(counts.requirements)} icon={IconClock} />
        <MetricCard label="Tasks" value={String(counts.tasks)} icon={IconRuns} />
        <MetricCard label="Running Executions" value={String(counts.running)} icon={IconBolt} />
      </div>

      {/* Workflow progress (spec 186) */}
      <div class="card card-pad" style={{ "margin-bottom": "var(--sp-6)" }}>
        <div style={{ display: "flex", "align-items": "center", "margin-bottom": "var(--sp-4)" }}>
          <h3 style={{ flex: 1, margin: 0 }}>Workflow — Feature Development</h3>
          <Tag>OAuth Authentication</Tag>
        </div>
        <TimelineProgress value={57} />
        <div class="tl-labels">
          {workflow.map((w) => (
            <span class={`lbl ${w.state}`}>
              {w.state === "done" && <IconCheck class="ico-xs" />}
              {w.state === "cur" && <IconBolt class="ico-xs" />}
              {w.name}
            </span>
          ))}
        </div>
      </div>

      {/* Work field collaboration (spec 165-166, 187) */}
      <div style={{ "margin-bottom": "var(--sp-6)" }}>
        <h3 style={{ "margin-bottom": "var(--sp-3)" }}>Work Fields</h3>
        <div class="grid grid-2">
          {workFields().map((wf: any) => (
            <div class="card">
              <div class="card-head"><h3>{wf.name}</h3><Tag>{wf.subContexts.join(" · ")}</Tag></div>
              <div>
                {fieldAgents(wf.workFieldId).map((p: any) => (
                  <div class="activity-item" style={{ display: "flex", "align-items": "center", gap: "var(--sp-3)" }}>
                    <IconAgent class="ico-md" style={{ color: "var(--accent)" }} />
                    <b style={{ flex: 1 }}>{p.name}</b>
                    <StatusBadge status={p.agentId === "a-ravix" ? "waiting" : "in_progress"} label={p.subContext} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="card" style={{ "margin-bottom": "var(--sp-6)" }}>
        <div class="card-head"><h3><IconAgent class="ico-md" style={{ "margin-right": "var(--sp-2)" }} /> Hermes</h3><StatusBadge status="active" label="Terhubung" /></div>
        <div style={{ display: "grid", "grid-template-columns": "1fr 1fr" }}>
          <div style={{ "border-right": "1px solid var(--line)" }}>
            <div class="messages" style={{ height: "300px" }}>
              <For each={messages()}>
                {(m) => (
                  <div class={`message ${m.role === "user" ? "mine" : ""}`}>
                    {m.text}
                    <Show when={m.proposal}>
                      <div class="proposal">
                        <b>Proposal:</b>
                        <div style={{ "font-size": "0.82rem", "margin-top": "var(--sp-2)" }}>
                          {m.proposal.proposedWorkflow && <div>Workflow: <Tag>{m.proposal.proposedWorkflow}</Tag></div>}
                          {m.proposal.requirementIds && <div>Requirements: {m.proposal.requirementIds.join(", ")}</div>}
                          {m.proposal.taskIds && <div>Tasks: {m.proposal.taskIds.join(", ")}</div>}
                          {m.proposal.requiredSkills && <div>Skills: {m.proposal.requiredSkills.join(", ")}</div>}
                          {m.proposal.risk && <div>Risk: <StatusBadge status={m.proposal.risk} /></div>}
                        </div>
                        <button class="btn btn-sm btn-primary" style={{ "margin-top": "var(--sp-3)" }}>Review Plan</button>
                      </div>
                    </Show>
                  </div>
                )}
              </For>
              <Show when={thinking()}><div class="message">Hermes sedang berpikir...</div></Show>
            </div>
            <div class="composer">
              <input value={chat()} onInput={(e) => setChat(e.currentTarget.value)} placeholder="Misal: 'Build authentication.' atau 'Buatkan rencana'" onKeyDown={(e) => e.key === "Enter" && send()} />
              <button class="btn btn-primary" onClick={send}>Kirim</button>
            </div>
          </div>

          <div style={{ padding: "var(--sp-5)" }}>
            <div class="eyebrow">Kontek</div>
            <h3 style={{ "margin-top": "var(--sp-2)", "margin-bottom": "var(--sp-4)" }}>Halaman ini di-scope ke {project?.name}</h3>
            <div style={{ display: "flex", "flex-direction": "column", gap: "var(--sp-2)", "font-size": "0.85rem" }}>
              <div><b>Current phase:</b> {project?.phase}</div>
              <div><b>Active sessions:</b> {sessions().filter((s: any) => s.status === "active").length}</div>
              <div><b>Requirement coverage:</b> {requirements().filter((r: any) => r.status === "verified").length}/{requirements().length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
