import { createSignal, createEffect, onCleanup, For, Show } from "solid-js";
import { IconSpark, IconClock, IconBolt, IconCheck } from "./icons";
import type { JSX } from "solid-js";

/* ============================================================
   TIMELINE PROGRESS BAR
   - garis track jelas
   - fill terisi dari 0% ke target
   - head dot bergerak dari kiri ke posisi (0% → value)
   - gelombang marching maju dari head (berulang, halus, tidak flicker)
   ============================================================ */
export function TimelineProgress(props: {
  value: number;
  color?: "accent" | "teal" | "gold";
  labels?: { label: string; state: "done" | "cur" | "todo" }[];
}) {
  const color = () => props.color ?? "accent";
  const [pct, setPct] = createSignal(0);

  // Animasi fill naik dari 0 ke target secara halus (sekali, ease-out)
  createEffect(() => {
    const target = Math.max(0, Math.min(100, props.value));
    let start: number | null = null;
    const dur = 800;
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
    <div>
      <div class="tl">
        <div class="tl-track">
          <span class={fillClass()} style={{ width: `${pct()}%` }} />
        </div>
        {/* gelombang marching dari head ke arah tujuan */}
        <div class={marchClass()} style={{ left: `calc(${pct()}% - 6px)` }} />
        {/* titik kepala yang bergerak dari 0 ke posisi */}
        <div class={headClass()} style={{ left: `${pct()}%` }} />
      </div>

      <Show when={props.labels}>
        <div class="tl-labels">
          <For each={props.labels}>
            {(l) => (
              <span class={`lbl ${l.state}`}>
                <Show when={l.state === "done"}><IconCheck class="ico-xs" /></Show>
                <Show when={l.state === "cur"}><IconBolt class="ico-xs" /></Show>
                {l.label}
              </span>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}

/* ============================================================
   STATUS — icon + label, tanpa dot
   ============================================================ */
const STATUS_ICON = { online: IconSpark, busy: IconClock, accent: IconBolt, off: IconClock };
const STATUS_COLOR = {
  online: "var(--teal)",
  busy: "var(--gold)",
  accent: "var(--accent-deep)",
  off: "var(--ink-faint)",
};

export function Status(props: { kind: "online" | "busy" | "accent" | "off"; children: JSX.Element }) {
  const Icon = STATUS_ICON[props.kind];
  return (
    <span class="status" style={{ color: STATUS_COLOR[props.kind] }}>
      <Icon class="ico-sm" />
      {props.children}
    </span>
  );
}

/* ============================================================
   TAG
   ============================================================ */
export function Tag(props: { active?: boolean; children: JSX.Element }) {
  return <span class={`tag ${props.active ? "tag-on" : ""}`}>{props.children}</span>;
}

/* ============================================================
   METRIC
   ============================================================ */
export function Metric(props: { label: string; value: string; sub: string }) {
  return (
    <div class="metric-card">
      <div class="eyebrow">{props.label}</div>
      <div class="val">{props.value}</div>
      <div class="sub">{props.sub}</div>
    </div>
  );
}
