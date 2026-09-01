// App layout: sidebar + topbar + content (spec section 66)
import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { useNotifications, useApprovals } from "../../stores";

const NAV = [
  { group: "Workspace", items: [
    { label: "Home", href: "/", key: "home" },
    { label: "Projects", href: "/projects", key: "projects" },
    { label: "Runs", href: "/runs", key: "runs" },
    { label: "Activity", href: "/activity", key: "activity" },
  ]},
  { group: "Agents", items: [
    { label: "Agents", href: "/agents", key: "agents" },
    { label: "Skills", href: "/skills", key: "skills" },
    { label: "SOUL", href: "/soul", key: "soul" },
  ]},
  { group: "Governance", items: [
    { label: "Governance", href: "/governance", key: "governance" },
    { label: "Settings", href: "/settings", key: "settings" },
  ]},
];

export function Layout(props: { children?: any }) {
  const [compact, setCompact] = createSignal(false);
  const notifications = useNotifications();
  const approvals = useApprovals();
  const attention = () => notifications().filter((n: any) => !n.read).length + approvals().length;

  return (
    <div class="shell">
      <aside class={`sidebar ${compact() ? "compact" : ""}`}>
        <div class="sb-brand">
          <A href="/" class="sb-brand-inner" style={{ "text-decoration": "none", color: "inherit" }}>
            <div class="sb-logo">S</div>
            <div>
              <div class="sb-title">Software-Dev</div>
              <div class="sb-sub">Agents</div>
            </div>
          </A>
          <button class="tb-toggle" onClick={() => setCompact((c) => !c)} title="Toggle (Ctrl+B)" style={{ width: "30px", height: "30px" }}>
            <span class="mono" style={{ "font-size": "0.7rem" }}>«</span>
          </button>
        </div>
        <nav class="sb-nav">
          {NAV.map((g) => (
            <div>
              <div class="sb-group">{g.group}</div>
              {g.items.map((it) => (
                <A href={it.href} class="sb-item" activeClass="active" end>
                  <span>{it.label}</span>
                  {it.key === "activity" && attention() > 0 && <span class="attention-count">{attention()}</span>}
                </A>
              ))}
            </div>
          ))}
        </nav>
        <div class="sb-foot">
          <div class="sb-avatar">E</div>
          <div style={{ "min-width": 0 }}>
            <div class="sb-user-name">Eqii</div>
            <div class="sb-user-role">admin</div>
          </div>
        </div>
      </aside>
      <div class={`shell-main ${compact() ? "compact-main" : ""}`}>
        <header class="topbar">
          <div class="tb-crumb"><span class="tb-workspace">Software-Development-Agents</span></div>
          <span class="tb-env">dev</span>
          <div class="tb-spacer" />
          <span class="mono" style={{ "font-size": "0.72rem", color: "var(--ink-faint)" }}>Hermes-ready · 9router-ready</span>
        </header>
        <main class="content">{props.children}</main>
      </div>
    </div>
  );
}
