// Application service layer (spec sections 46-47, 123)
// UI calls services. Services call repositories/adapters.
// Services enforce validated state transitions and emit audit events.

import type { RepositoryRegistry } from "../adapters/mock/repositories";
import type { StateMachine } from "../domain/state-machines";
import type {
  ID, ProjectStatus, TaskStatus, ExecutionStatus, RequirementStatus,
  AgentAssignmentStatus, AgentSessionStatus, ReleaseStatus, DeploymentStatus,
  VerificationStatus,
} from "../domain/enums";

export class ProjectService {
  constructor(private repos: RepositoryRegistry) {}
  async create(input: { workspaceId: ID; name: string; description: string; leadUserId: ID }) {
    const project = await this.repos.project.create({
      workspaceId: input.workspaceId, name: input.name, description: input.description,
      status: "planning" as ProjectStatus, phase: "discover",
    } as any);
    await this.repos.membership.create({
      workspaceId: input.workspaceId, projectId: project.projectId, userId: input.leadUserId, role: "project_lead",
    } as any);
    await this.audit(input.workspaceId, project.projectId, input.leadUserId, "project.created", "project", project.projectId);
    return project;
  }
  async setStatus(workspaceId: ID, projectId: ID, status: ProjectStatus, actorId: ID) {
    const p = await this.repos.project.get(projectId);
    if (!p) throw new Error("Project not found");
    await this.repos.project.update(projectId, { status });
    await this.audit(workspaceId, projectId, actorId, `project.${status}`, "project", projectId);
    return this.repos.project.get(projectId);
  }
  private async audit(workspaceId: ID, projectId: ID | undefined, actorUserId: ID | undefined, action: string, resourceType: string, resourceId: ID) {
    await this.repos.audit.append({ workspaceId, projectId, actorUserId, action, resourceType, resourceId } as any);
  }
}

export class AgentAssignmentService {
  constructor(private repos: RepositoryRegistry, private machine: typeof StateMachine) {}
  async request(input: { workspaceId: ID; projectId: ID; agentId: ID; userId: ID; role: string; scope: string }) {
    const assignment = await this.repos.assignment.create({
      workspaceId: input.workspaceId, projectId: input.projectId, agentId: input.agentId,
      userId: input.userId, role: input.role, scope: input.scope,
      status: "pending" as AgentAssignmentStatus, approvalStatus: "pending",
    } as any);
    await this.repos.approval.create({
      requestedByUserId: input.userId, resourceType: "agent_assignment", resourceId: assignment.agentAssignmentId,
      action: "request_agent", riskLevel: "medium", status: "pending",
    } as any);
    await this.repos.audit.append({ workspaceId: input.workspaceId, projectId: input.projectId, actorUserId: input.userId, action: "agent.requested", resourceType: "agent_assignment", resourceId: assignment.agentAssignmentId } as any);
    return assignment;
  }
  async decide(requestId: ID, approved: boolean, reviewerId: ID) {
    const a = await this.repos.assignment.get(requestId);
    if (!a) throw new Error("Assignment not found");
    const status = approved ? "approved" : "rejected";
    await this.repos.assignment.updateApproval(requestId, status as any);
    if (approved) await this.repos.assignment.updateStatus(requestId, "active");
    await this.repos.audit.append({ workspaceId: a.workspaceId, projectId: a.projectId, actorUserId: reviewerId, action: approved ? "agent.approved" : "agent.rejected", resourceType: "agent_assignment", resourceId: requestId } as any);
    return this.repos.assignment.get(requestId);
  }
}

export class AgentSessionService {
  constructor(private repos: RepositoryRegistry, private machine: typeof StateMachine) {}
  async start(workspaceId: ID, projectId: ID, assignmentId: ID, agentId: ID, context: string) {
    const session = await this.repos.session.create({
      workspaceId, projectId, agentAssignmentId: assignmentId, agentId,
      status: "active" as AgentSessionStatus, context,
    } as any);
    await this.repos.audit.append({ workspaceId, projectId, action: "session.started", resourceType: "agent_session", resourceId: session.agentSessionId } as any);
    return session;
  }
  async transition(workspaceId: ID, sessionId: ID, to: AgentSessionStatus, actorId: ID) {
    const s = await this.repos.session.get(sessionId);
    if (!s) throw new Error("Session not found");
    if (!this.machine.canTransitionSession(s.status, to)) throw new Error(`Invalid session transition ${s.status} -> ${to}`);
    await this.repos.session.updateStatus(sessionId, to);
    await this.repos.audit.append({ workspaceId, projectId: s.projectId, actorUserId: actorId, action: `session.${to}`, resourceType: "agent_session", resourceId: sessionId } as any);
    return this.repos.session.get(sessionId);
  }
}

export class TaskService {
  constructor(private repos: RepositoryRegistry, private machine: typeof StateMachine) {}
  async create(input: { workspaceId: ID; projectId: ID; requirementId?: ID; title: string; description: string; priority: string }) {
    const task = await this.repos.task.create({
      workspaceId: input.workspaceId, projectId: input.projectId, requirementId: input.requirementId,
      title: input.title, description: input.description, priority: input.priority, status: "backlog" as TaskStatus,
    } as any);
    await this.repos.audit.append({ workspaceId: input.workspaceId, projectId: input.projectId, action: "task.created", resourceType: "task", resourceId: task.taskId } as any);
    return task;
  }
  async move(workspaceId: ID, taskId: ID, to: TaskStatus, actorId: ID) {
    const t = await this.repos.task.get(taskId);
    if (!t) throw new Error("Task not found");
    if (!this.machine.canTransitionTask(t.status, to)) throw new Error(`Invalid task transition ${t.status} -> ${to}`);
    await this.repos.task.update(taskId, { status: to });
    await this.repos.audit.append({ workspaceId, projectId: t.projectId, actorUserId: actorId, action: `task.${to}`, resourceType: "task", resourceId: taskId } as any);
    return this.repos.task.get(taskId);
  }
}

export class RequirementService {
  constructor(private repos: RepositoryRegistry, private machine: typeof StateMachine) {}
  async create(input: { workspaceId: ID; projectId: ID; title: string; description: string; priority: string; ownerUserId?: ID }) {
    const req = await this.repos.requirement.create({
      workspaceId: input.workspaceId, projectId: input.projectId, title: input.title, description: input.description,
      priority: input.priority, ownerUserId: input.ownerUserId, status: "draft" as RequirementStatus,
    } as any);
    await this.repos.audit.append({ workspaceId: input.workspaceId, projectId: input.projectId, action: "requirement.created", resourceType: "requirement", resourceId: req.requirementId } as any);
    return req;
  }
  async transition(workspaceId: ID, requirementId: ID, to: RequirementStatus, actorId: ID) {
    const r = await this.repos.requirement.get(requirementId);
    if (!r) throw new Error("Requirement not found");
    if (!this.machine.canTransitionRequirement(r.status, to)) throw new Error(`Invalid requirement transition`);
    await this.repos.requirement.update(requirementId, { status: to });
    await this.repos.audit.append({ workspaceId, projectId: r.projectId, actorUserId: actorId, action: `requirement.${to}`, resourceType: "requirement", resourceId: requirementId } as any);
    return this.repos.requirement.get(requirementId);
  }
}

export class ExecutionService {
  constructor(private repos: RepositoryRegistry, private machine: typeof StateMachine) {}
  async start(workspaceId: ID, projectId: ID, input: { agentSessionId?: ID; taskId?: ID; input: string }) {
    const exec = await this.repos.execution.create({
      workspaceId, projectId, agentSessionId: input.agentSessionId, taskId: input.taskId,
      status: "running" as ExecutionStatus, input: input.input,
    } as any);
    await this.repos.executionEvent.append({ executionId: exec.executionId, timestamp: new Date().toISOString(), type: "started", message: "Execution started" } as any);
    await this.repos.audit.append({ workspaceId, projectId, action: "execution.started", resourceType: "execution", resourceId: exec.executionId } as any);
    return exec;
  }
  async transition(workspaceId: ID, executionId: ID, to: ExecutionStatus, actorId: ID) {
    const e = await this.repos.execution.get(executionId);
    if (!e) throw new Error("Execution not found");
    if (!this.machine.canTransitionExecution(e.status, to)) throw new Error(`Invalid execution transition`);
    await this.repos.execution.updateStatus(executionId, to);
    await this.repos.executionEvent.append({ executionId, timestamp: new Date().toISOString(), type: to, message: `Execution ${to}` } as any);
    await this.repos.audit.append({ workspaceId, projectId: e.projectId, actorUserId: actorId, action: `execution.${to}`, resourceType: "execution", resourceId: executionId } as any);
    return this.repos.execution.get(executionId);
  }
}

export class VerificationService {
  constructor(private repos: RepositoryRegistry, private machine: typeof StateMachine) {}
  async run(workspaceId: ID, projectId: ID, input: { taskId?: ID; executionId?: ID; type: string }) {
    const v = await this.repos.verification.create({
      workspaceId, projectId, taskId: input.taskId, executionId: input.executionId, type: input.type,
      status: "running" as VerificationStatus, startedAt: new Date().toISOString(),
    } as any);
    await this.repos.audit.append({ workspaceId, projectId, action: "verification.started", resourceType: "verification", resourceId: v.verificationId } as any);
    return v;
  }
  async complete(workspaceId: ID, verificationId: ID, passed: boolean) {
    await this.repos.verification.updateStatus(verificationId, passed ? "passed" : "failed");
    const v = await this.repos.verification.get(verificationId);
    await this.repos.audit.append({ workspaceId, projectId: v!.projectId, action: passed ? "verification.passed" : "verification.failed", resourceType: "verification", resourceId: verificationId } as any);
    return this.repos.verification.get(verificationId);
  }
}

export class ReleaseService {
  constructor(private repos: RepositoryRegistry, private machine: typeof StateMachine) {}
  async create(workspaceId: ID, projectId: ID, version: string) {
    const rel = await this.repos.release.create({ workspaceId, projectId, version, status: "draft" } as any);
    await this.repos.audit.append({ workspaceId, projectId, action: "release.created", resourceType: "release", resourceId: rel.releaseId } as any);
    return rel;
  }
  async approve(workspaceId: ID, releaseId: ID, approved: boolean, reviewerId: ID) {
    const r = await this.repos.release.get(releaseId);
    if (!r) throw new Error("Release not found");
    const to = approved ? "approved" : "failed";
    await this.repos.release.updateStatus(releaseId, to as ReleaseStatus);
    await this.repos.approval.create({ requestedByUserId: reviewerId, resourceType: "release", resourceId: releaseId, action: "release.approved", riskLevel: "high", status: approved ? "approved" : "rejected" } as any);
    await this.repos.audit.append({ workspaceId, projectId: r.projectId, actorUserId: reviewerId, action: approved ? "release.approved" : "release.rejected", resourceType: "release", resourceId: releaseId } as any);
    return this.repos.release.get(releaseId);
  }
  async deploy(workspaceId: ID, releaseId: ID, environmentId: ID) {
    const r = await this.repos.release.get(releaseId);
    if (!r) throw new Error("Release not found");
    const dep = await this.repos.deployment.create({ workspaceId, projectId: r.projectId, releaseId, environmentId, status: "deploying" } as any);
    await this.repos.release.updateStatus(releaseId, "staging");
    await this.repos.audit.append({ workspaceId, projectId: r.projectId, action: "deployment.started", resourceType: "deployment", resourceId: dep.deploymentId } as any);
    return dep;
  }
}

// ============ Composite services ============
export class Services {
  project: ProjectService;
  assignment: AgentAssignmentService;
  session: AgentSessionService;
  task: TaskService;
  requirement: RequirementService;
  execution: ExecutionService;
  verification: VerificationService;
  release: ReleaseService;
  constructor(private repos: RepositoryRegistry, private machine: typeof StateMachine) {
    this.project = new ProjectService(repos);
    this.assignment = new AgentAssignmentService(repos, machine);
    this.session = new AgentSessionService(repos, machine);
    this.task = new TaskService(repos, machine);
    this.requirement = new RequirementService(repos, machine);
    this.execution = new ExecutionService(repos, machine);
    this.verification = new VerificationService(repos, machine);
    this.release = new ReleaseService(repos, machine);
  }
}
