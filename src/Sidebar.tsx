import { Show } from "solid-js";
import { 
  IconHome, IconProjects, IconBoard, IconPipeline, IconAgent, 
  IconSkill, IconSoul, IconSandbox, IconMembers, IconInvites, 
  IconPanel, IconChevron, IconChat, IconCode, IconPreview, IconDeploy 
} from "./icons";

type NavItem = { label: string; icon: (p: any) => any; key: string };
type NavGroup = { title: string; items: NavItem[] };

const GROUPS: NavGroup[] = [
  {
    title: "Workspace",
    items: [
      { label: "Overview", icon: IconHome, key: "overview" },
      { label: "Chat Agents", icon: IconChat, key: "chat" },
      { label: "Projects", icon: IconProjects, key: "projects" },
      { label: "Code Inspector", icon: IconCode, key: "code" },
      { label: "Prototype Preview", icon: IconPreview, key: "preview" },
      { label: "CI/CD & Hosting", icon: IconDeploy, key: "cicd" },
      { label: "Board", icon: IconBoard, key: "board" },
      { label: "Pipeline", icon: IconPipeline, key: "pipeline" },
    ],
  },
  {
    title: "Agents",
    items: [
      { label: "Agent Grid", icon: IconAgent, key: "agents" },
      { label: "Skill Bank", icon: IconSkill, key: "skills" },
      { label: "SOUL Lab", icon: IconSoul, key: "soul" },
      { label: "Sandbox", icon: IconSandbox, key: "sandbox" },
    ],
  },
  {
    title: "Team",
    items: [
      { label: "Members", icon: IconMembers, key: "members" },
      { label: "Invites", icon: IconInvites, key: "invites" },
    ],
  },
];

export function Sidebar(props: {
  open: boolean;
  compact: boolean;
  onClose: () => void;
  onToggleCompact: () => void;
  active: string;
  onNavigate: (key: string) => void;
}) {
  return (
    <>
      <aside class={`sidebar ${props.compact ? "compact" : ""}`}>
        {/* Brand Header — Klik Logo atau Tombol Tunggal untuk Toggle Compact */}
        <div class="sb-brand">
          <div 
            class="sb-brand-inner" 
            onClick={props.onToggleCompact} 
            style={{ cursor: "pointer" }}
            title="Klik logo atau Ctrl+B untuk mengecilkan/memperbesar sidebar"
          >
            <div class="sb-logo">
              <IconShield size={18} />
            </div>
            <div>
              <div class="sb-title">Hermes</div>
              <div class="sb-sub">Console <span class="mono" style={{ "font-size": "0.65rem", opacity: 0.6 }}>(Ctrl+B)</span></div>
            </div>
          </div>
          <button 
            class="tb-toggle" 
            onClick={props.onToggleCompact} 
            aria-label="Kompak atau lebarkan sidebar (Ctrl+B)" 
            title="Toggle Sidebar (Ctrl+B)" 
            style={{ width: 30, height: 30 }}
          >
            <IconChevron class="ico-sm" style={{ transform: props.compact ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
        </div>

        {/* Nav */}
        <nav class="sb-nav">
          {GROUPS.map((g) => (
            <div>
              <div class="sb-group">{g.title}</div>
              {g.items.map((item) => {
                const active = props.active === item.key;
                const Icon = item.icon;
                return (
                  <button
                    class={`sb-item ${active ? "active" : ""}`}
                    onClick={() => props.onNavigate(item.key)}
                    title={props.compact ? item.label : ""}
                  >
                    <Icon class="ico ico-md" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer user */}
        <div class="sb-foot">
          <div class="sb-user">
            <div class="sb-avatar"><IconShield size={15} /></div>
            <div style={{ minWidth: 0 }}>
              <div class="sb-user-name">Eqii</div>
              <div class="sb-user-role">admin</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function IconShield(p: { size?: number; class?: string }) {
  return (
    <svg width={p.size ?? 17} height={p.size ?? 17} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={p.class} aria-hidden="true">
      <path d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7z" />
    </svg>
  );
}
