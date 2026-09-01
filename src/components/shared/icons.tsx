// Icon system — inline SVG stroke-based (restored from previous design)
// Meaningful icon per state. No emoji, no letter-as-icon.
import type { JSX } from "solid-js";

export type IconProps = { size?: number; class?: string; style?: JSX.CSSProperties | string };

function Svg(props: IconProps & { children: JSX.Element }) {
  return (
    <svg
      width={props.size ?? 17} height={props.size ?? 17} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"
      class={`ico ${props.class ?? ""}`} style={props.style} aria-hidden="true"
    >{props.children}</svg>
  );
}

export const IconHome = (p: IconProps) => (<Svg {...p}><path d="M3 12l9-9 9 9" /><path d="M5 10v10h14V10" /></Svg>);
export const IconProjects = (p: IconProps) => (<Svg {...p}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></Svg>);
export const IconBoard = (p: IconProps) => (<Svg {...p}><path d="M4 6h16M4 12h16M4 18h16" /></Svg>);
export const IconAgent = (p: IconProps) => (<Svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" /></Svg>);
export const IconSkill = (p: IconProps) => (<Svg {...p}><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" /></Svg>);
export const IconSoul = (p: IconProps) => (<Svg {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></Svg>);
export const IconRuns = (p: IconProps) => (<Svg {...p}><path d="M13 2L3 14h7l-1 8 10-12h-7z" /></Svg>);
export const IconActivity = (p: IconProps) => (<Svg {...p}><path d="M22 12h-4l-3 8-6-16-3 8H2" /></Svg>);
export const IconSettings = (p: IconProps) => (<Svg {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></Svg>);
export const IconShield = (p: IconProps) => (<Svg {...p}><path d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7z" /></Svg>);
export const IconPlus = (p: IconProps) => (<Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>);
export const IconCheck = (p: IconProps) => (<Svg {...p}><path d="M20 6L9 17l-5-5" /></Svg>);
export const IconClock = (p: IconProps) => (<Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>);
export const IconBolt = (p: IconProps) => (<Svg {...p}><path d="M13 2L3 14h7l-1 8 10-12h-7z" /></Svg>);
export const IconSpark = (p: IconProps) => (<Svg {...p}><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" /></Svg>);
export const IconChat = (p: IconProps) => (<Svg {...p}><path d="M20 11a7 7 0 01-7 7H8l-4 3v-5a7 7 0 01-1-5 7 7 0 017-7h3a7 7 0 017 7z" /></Svg>);
export const IconSend = (p: IconProps) => (<Svg {...p}><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></Svg>);
export const IconLock = (p: IconProps) => (<Svg {...p}><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></Svg>);
export const IconClose = (p: IconProps) => (<Svg {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Svg>);
export const IconChevron = (p: IconProps) => (<Svg {...p}><path d="M15 18l-6-6 6-6" /></Svg>);
export const IconSearch = (p: IconProps) => (<Svg {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></Svg>);
export const IconDeploy = (p: IconProps) => (<Svg {...p}><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></Svg>);
export const IconWarning = (p: IconProps) => (<Svg {...p}><path d="M12 9v4M12 17h.01M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0z" /></Svg>);
