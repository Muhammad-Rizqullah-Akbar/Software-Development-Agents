// Project layout with nested navigation (spec sections 66-68)
import { useParams, A } from "@solidjs/router";
import { useProject } from "../../stores";
import { StatusBadge } from "../../components/shared";

const PROJECT_NAV = [
  { label: "Overview", href: "" },
  { label: "Requirements", href: "/requirements" },
  { label: "Board", href: "/board" },
  { label: "Team", href: "/team" },
  { label: "Agents", href: "/agents" },
  { label: "Releases", href: "/releases" },
  { label: "Activity", href: "/activity" },
];

export function ProjectLayout(props: { children?: any }) {
  const params = useParams<{ projectId: string }>();
  const project = useProject(params.projectId)();
  const base = `/projects/${params.projectId}`;

  return (
    <div>
      <div class="page-head">
        <div>
          <div class="eyebrow">Project</div>
          <h1>{project?.name ?? "Loading..."}</h1>
          <div style={{ "font-size": "0.8rem", color: "var(--ink-faint)" }}>
            {project?.description}
          </div>
        </div>
        <div style={{ "margin-left": "auto" }}>
          {project && <StatusBadge status={project.status} />}
        </div>
      </div>

      <div class="tabs">
        {PROJECT_NAV.map((n) => (
          <A href={base + n.href} class="tab" activeClass="active" end={n.href === ""}>
            {n.label}
          </A>
        ))}
      </div>

      {props.children}
    </div>
  );
}
