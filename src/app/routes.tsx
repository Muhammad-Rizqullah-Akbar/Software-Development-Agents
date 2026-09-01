// Application router (spec sections 67, 125)
// Real nested routes using @solidjs/router.

import { Router, Route, Navigate } from "@solidjs/router";
import { Layout } from "../components/layout/AppLayout";
import { HomePage } from "../pages/global/HomePage";
import { ProjectsPage } from "../pages/global/ProjectsPage";
import { AgentsPage } from "../pages/global/AgentsPage";
import { SkillsPage } from "../pages/global/SkillsPage";
import { SoulPage } from "../pages/global/SoulPage";
import { RunsPage } from "../pages/global/RunsPage";
import { ActivityPage } from "../pages/global/ActivityPage";
import { SettingsPage } from "../pages/global/SettingsPage";
import { GovernancePage } from "../pages/global/GovernancePage";
import { ProjectLayout } from "../pages/project/ProjectLayout";
import { ProjectOverview } from "../pages/project/ProjectOverview";
import { ProjectRequirements } from "../pages/project/ProjectRequirements";
import { ProjectBoard } from "../pages/project/ProjectBoard";
import { ProjectTeam } from "../pages/project/ProjectTeam";
import { ProjectAgents } from "../pages/project/ProjectAgents";
import { ProjectReleases } from "../pages/project/ProjectReleases";
import { ProjectActivity } from "../pages/project/ProjectActivity";
import { ProjectWorkView } from "../pages/project/ProjectWorkView";

export function AppRoutes() {
  return (
    <Router root={Layout}>
      <Route path="/" component={HomePage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/projects/:projectId" component={ProjectLayout}>
        <Route path="/" component={ProjectOverview} />
        <Route path="/requirements" component={ProjectRequirements} />
        <Route path="/board" component={ProjectBoard} />
        <Route path="/team" component={ProjectTeam} />
        <Route path="/agents" component={ProjectAgents} />
        <Route path="/releases" component={ProjectReleases} />
        <Route path="/activity" component={ProjectActivity} />
        <Route path="/work/:executionId" component={ProjectWorkView} />
      </Route>
      <Route path="/agents" component={AgentsPage} />
      <Route path="/skills" component={SkillsPage} />
      <Route path="/soul" component={SoulPage} />
      <Route path="/runs" component={RunsPage} />
      <Route path="/activity" component={ActivityPage} />
      <Route path="/governance" component={GovernancePage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/404" component={HomePage} />
    </Router>
  );
}
