// Icon system — inline SVG stroke-based, menerima class & size
import type { JSX } from "solid-js";

export type IconProps = {
  size?: number;
  class?: string;
  style?: JSX.CSSProperties | string;
};

function Svg(props: IconProps & { children: JSX.Element }) {
  return (
    <svg
      width={props.size ?? 17}
      height={props.size ?? 17}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={`ico ${props.class ?? ""}`}
      style={props.style}
      aria-hidden="true"
    >
      {props.children}
    </svg>
  );
}

export const IconHome = (p: IconProps) => (<Svg {...p}><path d="M3 12l9-9 9 9" /><path d="M5 10v10h14V10" /></Svg>);
export const IconProjects = (p: IconProps) => (<Svg {...p}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></Svg>);
export const IconBoard = (p: IconProps) => (<Svg {...p}><path d="M4 6h16M4 12h16M4 18h16" /></Svg>);
export const IconPipeline = (p: IconProps) => (<Svg {...p}><path d="M4 12h16M13 5l7 7-7 7" /></Svg>);
export const IconAgent = (p: IconProps) => (<Svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" /></Svg>);
export const IconSkill = (p: IconProps) => (<Svg {...p}><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" /></Svg>);
export const IconSoul = (p: IconProps) => (<Svg {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" /></Svg>);
export const IconSandbox = (p: IconProps) => (<Svg {...p}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></Svg>);
export const IconMembers = (p: IconProps) => (<Svg {...p}><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" /><path d="M16 8a3 3 0 100 6M21 20c0-2.5-1.6-4.3-4-4.8" /></Svg>);
export const IconInvites = (p: IconProps) => (<Svg {...p}><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></Svg>);
export const IconSearch = (p: IconProps) => (<Svg {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></Svg>);
export const IconPlus = (p: IconProps) => (<Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>);
export const IconSpark = (p: IconProps) => (<Svg {...p}><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" /></Svg>);
export const IconClock = (p: IconProps) => (<Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>);
export const IconCheck = (p: IconProps) => (<Svg {...p}><path d="M20 6L9 17l-5-5" /></Svg>);
export const IconBolt = (p: IconProps) => (<Svg {...p}><path d="M13 2L3 14h7l-1 8 10-12h-7z" /></Svg>);
export const IconChevron = (p: IconProps) => (<Svg {...p}><path d="M15 18l-6-6 6-6" /></Svg>);
export const IconPanel = (p: IconProps) => (<Svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16" /></Svg>);
export const IconLock = (p: IconProps) => (<Svg {...p}><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></Svg>);
export const IconSave = (p: IconProps) => (<Svg {...p}><path d="M19 21l-7-4-7 4V5a2 2 0 012-2h10a2 2 0 012 2z" /></Svg>);
export const IconPlay = (p: IconProps) => (<Svg {...p}><polygon points="6 3 20 12 6 21 6 3" /></Svg>);
export const IconChat = (p: IconProps) => (<Svg {...p}><path d="M20 11a7 7 0 01-7 7H8l-4 3v-5a7 7 0 01-1-5 7 7 0 017-7h3a7 7 0 017 7z" /></Svg>);
export const IconCode = (p: IconProps) => (<Svg {...p}><path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" /></Svg>);
export const IconPreview = (p: IconProps) => (<Svg {...p}><rect x="3" y="4" width="18" height="15" rx="2" /><path d="M3 8h18M8 12h8M8 15h5" /></Svg>);

// Icon Tambahan Baru
export const IconDeploy = (p: IconProps) => (<Svg {...p}><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></Svg>);
export const IconGithub = (p: IconProps) => (<Svg {...p}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></Svg>);
export const IconServer = (p: IconProps) => (<Svg {...p}><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></Svg>);
export const IconClose = (p: IconProps) => (<Svg {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Svg>);
export const IconExternal = (p: IconProps) => (<Svg {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></Svg>);
