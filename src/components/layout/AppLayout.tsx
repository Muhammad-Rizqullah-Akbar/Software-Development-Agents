// App layout: sidebar + topbar + content (spec section 66)
// Restored interactive design: SVG icons, meaningful per item.
import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { useNotifications, useApprovals } from "../../stores";
import { IconHome, IconProjects, IconRuns, IconActivity, IconAgent, IconSkill, IconSoul, IconShield, IconSettings, IconSearch } from "../shared/icons";

const NAV = [
  { group: "Workspace", items: [
    { label: "Home", href: "/", icon: IconHome },
    { label: "Projects", href: "/projects", icon: IconProjects },
    { label: "Runs", href: "/runs", icon: IconRuns },
    { label: "Activity", href: "/activity", icon: IconActivity },
  ]},
  { group: "Agents", items: [
    { label: "Agents", href: "/agents", icon: IconAgent },
    { label: "Skills", href: "/skills", icon: IconSkill },
    { label: "SOUL", href: "/soul", icon: IconSoul },
  ]},
  { group: "Governance", items: [
    { label: "Governance", href: "/governance", icon: IconShield },
    { label: "Settings", href: "/settings", icon: IconSettings },
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
            <div class="sb-logo"><IconShield size={18} /></div>
            <div>
              <div class="sb-title">Software-Dev</div>
              <div class="sb-sub">Agents</div>
            </div>
          </A>
          <button class="tb-toggle" onClick={() => setCompact((c) => !c)} title="Toggle (Ctrl+B)" style={{ width: "30px", height: "30px" }}>
            <IconSearch class="ico-sm" />
          </button>
        </div>
        <nav class="sb-nav">
          {NAV.map((g) => (
            <div>
              <div class="sb-group">{g.group}</div>
              {g.items.map((it) => {
                const I = it.icon;
                return (
                  <A href={it.href} class="sb-item" activeClass="active" end>
                    <I class="ico-md" />
                    <span>{it.label}</span>
                    {it.href === "/activity" && attention() > 0 && <span class="attention-count">{attention()}</span>}
                  </A>
                );
              })}
            </div>
          ))}
        </nav>
        <div class="sb-foot">
          <div class="sb-avatar"><IconShield size={15} /></div>
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
