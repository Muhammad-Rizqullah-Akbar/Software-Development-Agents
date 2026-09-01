// Reusable shared UI components (spec section 98)
// Domain-status-driven, presentation mapping only. No fake status.

import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import { useProjects } from "../../stores";

const STATUS_LABEL: Record<string, string> = {
  planning: "Planning", active: "Active", paused: "Paused", completed: "Completed", archived: "Archived",
  backlog: "Backlog", ready: "Ready", in_progress: "In Progress", blocked: "Blocked", review: "Review",
  verification: "Verification", done: "Done", cancelled: "Cancelled",
  pending: "Pending", approved: "Approved", rejected: "Rejected", changes_requested: "Changes Requested",
  revoked: "Revoked", expired: "Expired",
  queued: "Queued", running: "Running", waiting_approval: "Waiting Approval", succeeded: "Succeeded", failed: "Failed",
  timed_out: "Timed Out", draft: "Draft", candidate: "Candidate", staging: "Staging", canary: "Canary",
  production: "Production", rolled_back: "Rolled Back",
  healthy: "Healthy", deploying: "Deploying",
  passed: "Passed", initializing: "Initializing", waiting: "Waiting",
};

function tone(status: string): string {
  if (["done", "passed", "healthy", "approved", "active", "succeeded", "completed", "production"].includes(status)) return "green";
  if (["failed", "blocked", "rejected", "critical", "high"].includes(status)) return "red";
  if (["in_progress", "running", "queued", "verification", "review", "pending", "waiting_approval", "staging", "canary", "deploying", "testing"].includes(status)) return "orange";
  return "gray";
}

export function StatusBadge(props: { status: string; label?: string }) {
  const t = tone(props.status);
  return (
    <span class={`status-badge ${t}`}>
      <span class="sb-dot" />
      {props.label ?? STATUS_LABEL[props.status] ?? props.status}
    </span>
  );
}

export function MetricCard(props: { label: string; value: string; sub?: string; tone?: string }) {
  return (
    <div class="card card-pad metric-card">
      <div class="eyebrow">{props.label}</div>
      <div class="val">{props.value}</div>
      <Show when={props.sub}><div class="sub">{props.sub}</div></Show>
    </div>
  );
}

export function PageHeader(props: { eyebrow?: string; title: string; actions?: JSX.Element }) {
  return (
    <div class="page-head">
      <div>
        <Show when={props.eyebrow}><div class="eyebrow">{props.eyebrow}</div></Show>
        <h1>{props.title}</h1>
      </div>
      <div style={{ "margin-left": "auto", display: "flex", gap: "var(--sp-3)", "align-items": "center" }}>
        {props.actions}
      </div>
    </div>
  );
}

export function Tag(props: { children: JSX.Element; active?: boolean }) {
  return <span class={`tag ${props.active ? "tag-on" : ""}`}>{props.children}</span>;
}

export function DataTable(props: { head: string[]; rows: JSX.Element[][] }) {
  return (
    <div class="card" style={{ overflow: "auto" }}>
      <table class="table">
        <thead><tr>{props.head.map((h) => <th>{h}</th>)}</tr></thead>
        <tbody>{props.rows.map((r) => <tr>{r.map((c) => <td>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export function EmptyState(props: { title: string; message?: string }) {
  return (
    <div class="empty-state">
      <div class="eyebrow">{props.title}</div>
      <p>{props.message ?? "Belum ada data."}</p>
    </div>
  );
}

export function ProjectSwitcher(props: { value: string; onChange: (id: string) => void }) {
  const { list } = useProjects();
  return (
    <div class="project-switcher">
      <label class="eyebrow">Project</label>
      <select class="form-select" value={props.value} onChange={(e) => props.onChange(e.currentTarget.value)}>
        <option value="">— Semua project —</option>
        <For each={list()}>{(p) => <option value={p.projectId}>{p.name}</option>}</For>
      </select>
    </div>
  );
}
