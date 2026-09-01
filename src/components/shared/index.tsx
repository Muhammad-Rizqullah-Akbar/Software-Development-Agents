// Reusable shared UI components (spec section 98)
// Domain-status-driven, presentation mapping only. No fake status.
// Uses SVG icons (restored interactive design). No emoji, no letter-as-icon.

import { createEffect, createSignal, For, Show, onCleanup } from "solid-js";
import type { JSX } from "solid-js";
import { useProjects } from "../../stores";
import {
  IconCheck, IconBolt, IconClock, IconSpark, IconWarning, IconShield, IconSearch, IconLock,
} from "./icons";

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
  critical: "Critical", high: "High", medium: "Medium", low: "Low",
};

function tone(status: string): string {
  if (["done", "passed", "healthy", "approved", "active", "succeeded", "completed", "production", "low"].includes(status)) return "green";
  if (["failed", "blocked", "rejected", "critical", "high", "timed_out"].includes(status)) return "red";
  if (["in_progress", "running", "queued", "verification", "review", "pending", "waiting_approval", "staging", "canary", "deploying", "testing", "medium", "planning", "waiting"].includes(status)) return "orange";
  return "gray";
}

function statusIcon(status: string) {
  if (["done", "passed", "healthy", "approved", "succeeded", "completed", "production", "low"].includes(status)) return IconCheck;
  if (["failed", "blocked", "rejected", "critical", "high", "timed_out"].includes(status)) return IconWarning;
  if (["in_progress", "running", "queued", "review", "verification", "deploying", "waiting_approval", "medium"].includes(status)) return IconBolt;
  if (["pending", "waiting", "planning"].includes(status)) return IconClock;
  if (["active", "candidate"].includes(status)) return IconSpark;
  return IconShield;
}

export function StatusBadge(props: { status: string; label?: string }) {
  const Icon = statusIcon(props.status);
  const t = tone(props.status);
  return (
    <span class={`status-badge ${t}`}>
      <Icon class="ico-sm" />
      {props.label ?? STATUS_LABEL[props.status] ?? props.status}
    </span>
  );
}

export function MetricCard(props: { label: string; value: string; sub?: string; icon?: any; tone?: string }) {
  const I = props.icon;
  return (
    <div class="card card-pad metric-card">
      <div style={{ display: "flex", "justify-content": "space-between", "align-items": "flex-start" }}>
        <div class="eyebrow">{props.label}</div>
        {I && <span style={{ color: "var(--accent)" }}><I class="ico-lg" /></span>}
      </div>
      <div class="val">{props.value}</div>
      <Show when={props.sub}><div class="sub">{props.sub}</div></Show>
    </div>
  );
}

export function PageHeader(props: { eyebrow?: string; title: string; actions?: JSX.Element; icon?: any }) {
  const I = props.icon;
  return (
    <div class="page-head">
      <div style={{ display: "flex", "align-items": "center", gap: "var(--sp-3)" }}>
        {I && <span style={{ color: "var(--accent)" }}><I class="ico-xl" /></span>}
        <div>
          <Show when={props.eyebrow}><div class="eyebrow">{props.eyebrow}</div></Show>
          <h1>{props.title}</h1>
        </div>
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

/**
 * TimelineProgress — progress bar bertema timeline (restored interactive design).
 * Titik bergerak dari 0% ke nilai target, gelombang marching maju, ping ring.
 */
export function TimelineProgress(props: { value: number; color?: "accent" | "teal" | "gold" }) {
  const color = () => props.color ?? "accent";
  const [pct, setPct] = createSignal(0);

  createEffect(() => {
    const target = Math.max(0, Math.min(100, props.value));
    let start: number | null = null;
    const dur = 700;
    let raf = 0;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(target * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    onCleanup(() => cancelAnimationFrame(raf));
  });

  const fillClass = () => `tl-fill ${color()}`;
  const headClass = () => `tl-head ${color()}`;
  const marchClass = () => `tl-march ${color()}`;

  return (
    <div class="tl">
      <div class="tl-track"><span class={fillClass()} style={{ width: `${pct()}%` }} /></div>
      <div class={marchClass()} style={{ left: `calc(${pct()}% - 6px)` }} />
      <div class={headClass()} style={{ left: `${pct()}%` }} />
    </div>
  );
}
