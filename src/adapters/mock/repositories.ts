// Mock repository implementations (spec sections 43-44, 109)
// Persist via localStorage db. Implement the repository contracts.

import { dbInsert, dbList, dbUpdate, getDB } from "./db";
import type * as T from "../../domain/models";
import type * as R from "../../repositories";
import type { Paginated } from "../../domain/contracts";
import type { ID } from "../../domain/enums";

function paginate<T>(items: T[], cursor?: string, limit = 50): Paginated<T> {
  const start = cursor ? parseInt(cursor, 10) || 0 : 0;
  const slice = items.slice(start, start + limit);
  const next = start + slice.length;
  return { items: slice, nextCursor: next < items.length ? String(next) : undefined, hasMore: next < items.length };
}

function nowISO() { return new Date().toISOString(); }
function id(prefix: string) { return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`; }

function filterSearch<T>(items: T[], search?: string): T[] {
  if (!search) return items;
  const q = search.toLowerCase();
  return items.filter((it) => JSON.stringify(it).toLowerCase().includes(q));
}

// ============ Project ============
export const ProjectRepository: R.ProjectRepository = {
  async create(input) {
    const row = { ...input, projectId: id("p"), createdAt: nowISO(), updatedAt: nowISO() };
    dbInsert("projects", row); return row;
  },
  async get(id) { return dbList("projects").find((p) => p.projectId === id) ?? null; },
  async list(query) {
    let items = dbList("projects") as T.Project[];
    items = items.filter((p) => p.workspaceId === query.workspaceId);
    if (query.status?.length) items = items.filter((p) => query.status!.includes(p.status));
    items = filterSearch(items, query.search);
    return paginate(items, query.cursor, query.limit);
  },
  async update(id, input) {
    return dbUpdate("projects", "projectId", id, { ...input, updatedAt: nowISO() });
  },
};

// ============ Membership ============
export const MembershipRepository: R.MembershipRepository = {
  async create(input) { const row = { ...input, membershipId: id("m"), joinedAt: nowISO() }; dbInsert("memberships", row); return row; },
  async listByProject(projectId) { return dbList("memberships").filter((m) => m.projectId === projectId); },
  async getByUserProject(userId, projectId) { return dbList("memberships").find((m) => m.userId === userId && m.projectId === projectId) ?? null; },
  async updateRole(membershipId, role) { return dbUpdate("memberships", "membershipId", membershipId, { role }); },
  async remove(membershipId) { const db = getDB(); db.memberships = db.memberships.filter((m) => m.membershipId !== membershipId); },
};

// ============ Agent ============
export const AgentRepository: R.AgentRepository = {
  async create(input) { const row = { ...input, agentId: id("a"), createdAt: nowISO() }; dbInsert("agents", row); return row; },
  async get(id) { return dbList("agents").find((a) => a.agentId === id) ?? null; },
  async list(query) { return paginate(filterSearch(dbList("agents") as T.Agent[], query.search), query.cursor, query.limit); },
};

export const AgentVersionRepository: R.AgentVersionRepository = {
  async create(input) { const row = { ...input, agentVersionId: id("av"), createdAt: nowISO() }; dbInsert("agentVersions", row); return row; },
  async listByAgent(agentId) { return dbList("agentVersions").filter((v) => v.agentId === agentId); },
};

export const AgentAssignmentRepository: R.AgentAssignmentRepository = {
  async create(input) { const row = { ...input, agentAssignmentId: id("asg"), requestedAt: nowISO() }; dbInsert("assignments", row); return row; },
  async get(id) { return dbList("assignments").find((a) => a.agentAssignmentId === id) ?? null; },
  async listByProject(projectId) { return dbList("assignments").filter((a) => a.projectId === projectId); },
  async updateStatus(id, status) { return dbUpdate("assignments", "agentAssignmentId", id, { status }); },
  async updateApproval(id, approvalStatus) { return dbUpdate("assignments", "agentAssignmentId", id, { approvalStatus, decidedAt: nowISO() }); },
};

export const AgentSessionRepository: R.AgentSessionRepository = {
  async create(input) { const row = { ...input, agentSessionId: id("s"), createdAt: nowISO(), updatedAt: nowISO() }; dbInsert("sessions", row); return row; },
  async get(id) { return dbList("sessions").find((s) => s.agentSessionId === id) ?? null; },
  async listByProject(projectId) { return dbList("sessions").filter((s) => s.projectId === projectId); },
  async updateStatus(id, status) { return dbUpdate("sessions", "agentSessionId", id, { status, updatedAt: nowISO() }); },
};

// ============ Skills ============
export const SkillRepository: R.SkillRepository = {
  async create(input) { const row = { ...input, skillId: id("sk") }; dbInsert("skills", row); return row; },
  async list(query) { return paginate(filterSearch(dbList("skills") as T.Skill[], query.search), query.cursor, query.limit); },
  async get(id) { return dbList("skills").find((s) => s.skillId === id) ?? null; },
};

export const AgentSkillRepository: R.AgentSkillRepository = {
  async listByAgent(agentId) { return dbList("agentSkills").filter((s) => s.agentId === agentId); },
  async add(agentId, skillId) { const row = { agentSkillId: id("ags"), agentId, skillId }; dbInsert("agentSkills", row); return row; },
};

export const SoulRepository: R.SoulRepository = {
  async create(input) { const row = { ...input, soulId: id("soul"), createdAt: nowISO() }; dbInsert("souls", row); return row; },
  async listByAgent(agentId) { return dbList("souls").filter((s) => s.agentId === agentId); },
  async get(id) { return dbList("souls").find((s) => s.soulId === id) ?? null; },
};

export const ToolRepository: R.ToolRepository = {
  async list(query) { return paginate(filterSearch(dbList("tools") as T.Tool[], query.search), query.cursor, query.limit); },
  async get(id) { return dbList("tools").find((t) => t.toolId === id) ?? null; },
};

export const CapabilityRepository: R.CapabilityRepository = {
  async list(query) { return paginate(filterSearch(dbList("capabilities") as T.Capability[], query.search), query.cursor, query.limit); },
  async get(id) { return dbList("capabilities").find((c) => c.capabilityId === id) ?? null; },
};

export const PermissionRepository: R.PermissionRepository = {
  async list(query) { return paginate(filterSearch(dbList("permissions") as T.Permission[], query.search), query.cursor, query.limit); },
  async get(id) { return dbList("permissions").find((p) => p.permissionId === id) ?? null; },
};

export const PolicyRepository: R.PolicyRepository = {
  async list(query) { return paginate(filterSearch(dbList("policies") as T.Policy[], query.search), query.cursor, query.limit); },
  async get(id) { return dbList("policies").find((p) => p.policyId === id) ?? null; },
};

export const PermissionGrantRepository: R.PermissionGrantRepository = {
  async create(input) { const row = { ...input, permissionGrantId: id("pg") }; dbInsert("permissionGrants", row); return row; },
  async listByAssignment(agentAssignmentId) { return dbList("permissionGrants").filter((g) => g.agentAssignmentId === agentAssignmentId); },
};

// ============ SDLC ============
export const RequirementRepository: R.RequirementRepository = {
  async create(input) { const row = { ...input, requirementId: id("r"), createdAt: nowISO(), updatedAt: nowISO() }; dbInsert("requirements", row); return row; },
  async get(id) { return dbList("requirements").find((r) => r.requirementId === id) ?? null; },
  async list(query) {
    let items = (dbList("requirements") as T.Requirement[]).filter((r) => r.projectId === query.projectId);
    if (query.status?.length) items = items.filter((r) => query.status!.includes(r.status));
    items = filterSearch(items, query.search);
    return paginate(items, query.cursor, query.limit);
  },
  async update(id, input) { return dbUpdate("requirements", "requirementId", id, { ...input, updatedAt: nowISO() }); },
};

export const AcceptanceCriterionRepository: R.AcceptanceCriterionRepository = {
  async create(input) { const row = { ...input, acceptanceCriterionId: id("ac") }; dbInsert("acceptanceCriteria", row); return row; },
  async listByRequirement(requirementId) { return dbList("acceptanceCriteria").filter((c) => c.requirementId === requirementId); },
};

export const ArchitectureDecisionRepository: R.ArchitectureDecisionRepository = {
  async create(input) { const row = { ...input, architectureDecisionId: id("ad"), createdAt: nowISO() }; dbInsert("architectureDecisions", row); return row; },
  async listByProject(projectId) { return dbList("architectureDecisions").filter((d) => d.projectId === projectId); },
};

export const EpicRepository: R.EpicRepository = {
  async create(input) { const row = { ...input, epicId: id("ep") }; dbInsert("epics", row); return row; },
  async listByProject(projectId) { return dbList("epics").filter((e) => e.projectId === projectId); },
};

export const TaskRepository: R.TaskRepository = {
  async create(input) { const row = { ...input, taskId: id("t"), createdAt: nowISO(), updatedAt: nowISO() }; dbInsert("tasks", row); return row; },
  async get(id) { return dbList("tasks").find((t) => t.taskId === id) ?? null; },
  async list(query) {
    let items = (dbList("tasks") as T.Task[]).filter((t) => t.projectId === query.projectId);
    if (query.status?.length) items = items.filter((t) => query.status!.includes(t.status));
    items = filterSearch(items, query.search);
    return paginate(items, query.cursor, query.limit);
  },
  async update(id, input) { return dbUpdate("tasks", "taskId", id, { ...input, updatedAt: nowISO() }); },
};

export const TaskAssignmentRepository: R.TaskAssignmentRepository = {
  async assign(taskId, agentAssignmentId) { const row = { taskAssignmentId: id("ta"), taskId, agentAssignmentId }; dbInsert("taskAssignments", row); return row; },
  async listByTask(taskId) { return dbList("taskAssignments").filter((t) => t.taskId === taskId); },
};

// ============ Workflow ============
export const WorkflowRepository: R.WorkflowRepository = {
  async create(input) { const row = { ...input, workflowId: id("wf") }; dbInsert("workflows", row); return row; },
  async get(id) { return dbList("workflows").find((w) => w.workflowId === id) ?? null; },
  async list(query) { return paginate(filterSearch(dbList("workflows") as T.Workflow[], query.search), query.cursor, query.limit); },
};

export const WorkflowRunRepository: R.WorkflowRunRepository = {
  async create(input) { const row = { ...input, workflowRunId: id("wfr"), createdAt: nowISO(), updatedAt: nowISO() }; dbInsert("workflowRuns", row); return row; },
  async listByProject(projectId) { return dbList("workflowRuns").filter((w) => w.projectId === projectId); },
  async updateStatus(id, status) { return dbUpdate("workflowRuns", "workflowRunId", id, { status, updatedAt: nowISO() }); },
};

// ============ Execution ============
export const ExecutionRepository: R.ExecutionRepository = {
  async create(input) { const row = { ...input, executionId: id("ex"), createdAt: nowISO(), updatedAt: nowISO() }; dbInsert("executions", row); return row; },
  async get(id) { return dbList("executions").find((e) => e.executionId === id) ?? null; },
  async list(query) {
    let items = (dbList("executions") as T.Execution[]).filter((e) => e.projectId === query.projectId);
    if (query.status?.length) items = items.filter((e) => query.status!.includes(e.status));
    items = filterSearch(items, query.search);
    return paginate(items, query.cursor, query.limit);
  },
  async updateStatus(id, status) { return dbUpdate("executions", "executionId", id, { status, updatedAt: nowISO() }); },
};

export const ExecutionEventRepository: R.ExecutionEventRepository = {
  async append(input) { const row = { ...input, executionEventId: id("ee") }; dbInsert("executionEvents", row); return row; },
  async listByExecution(executionId) { return dbList("executionEvents").filter((e) => e.executionId === executionId); },
};

export const SandboxRepository: R.SandboxRepository = {
  async create(input) { const row = { ...input, sandboxId: id("sb") }; dbInsert("sandboxes", row); return row; },
  async getByExecution(executionId) { return dbList("sandboxes").find((s) => s.executionId === executionId) ?? null; },
  async updateStatus(id, status) { return dbUpdate("sandboxes", "sandboxId", id, { status }); },
};

export const EnvironmentRepository: R.EnvironmentRepository = {
  async listByProject(projectId) { return dbList("environments").filter((e) => e.projectId === projectId); },
  async get(id) { return dbList("environments").find((e) => e.environmentId === id) ?? null; },
};

// ============ Quality ============
export const VerificationRepository: R.VerificationRepository = {
  async create(input) { const row = { ...input, verificationId: id("v") }; dbInsert("verifications", row); return row; },
  async get(id) { return dbList("verifications").find((v) => v.verificationId === id) ?? null; },
  async listByProject(projectId) { return dbList("verifications").filter((v) => v.projectId === projectId); },
  async updateStatus(id, status) { return dbUpdate("verifications", "verificationId", id, { status, completedAt: status === "passed" || status === "failed" ? nowISO() : undefined }); },
};

export const VerificationCheckRepository: R.VerificationCheckRepository = {
  async create(input) { const row = { ...input, verificationCheckId: id("vc") }; dbInsert("verificationChecks", row); return row; },
  async listByVerification(verificationId) { return dbList("verificationChecks").filter((v) => v.verificationId === verificationId); },
};

export const CodeReviewRepository: R.CodeReviewRepository = {
  async create(input) { const row = { ...input, codeReviewId: id("cr"), createdAt: nowISO() }; dbInsert("codeReviews", row); return row; },
  async listByProject(projectId) { return dbList("codeReviews").filter((r) => r.projectId === projectId); },
  async updateStatus(id, status) { return dbUpdate("codeReviews", "codeReviewId", id, { status }); },
};

export const ReviewFindingRepository: R.ReviewFindingRepository = {
  async create(input) { const row = { ...input, reviewFindingId: id("rf") }; dbInsert("reviewFindings", row); return row; },
  async listByReview(codeReviewId) { return dbList("reviewFindings").filter((f) => f.codeReviewId === codeReviewId); },
  async resolve(id, resolution) { return dbUpdate("reviewFindings", "reviewFindingId", id, { resolution, resolved: true }); },
};

export const EvidenceRepository: R.EvidenceRepository = {
  async create(input) { const row = { ...input, evidenceId: id("ev"), createdAt: nowISO() }; dbInsert("evidence", row); return row; },
  async listByProject(projectId) { return dbList("evidence").filter((e) => e.projectId === projectId); },
};

// ============ Release ============
export const ReleaseRepository: R.ReleaseRepository = {
  async create(input) { const row = { ...input, releaseId: id("rel"), createdAt: nowISO() }; dbInsert("releases", row); return row; },
  async get(id) { return dbList("releases").find((r) => r.releaseId === id) ?? null; },
  async listByProject(projectId) { return dbList("releases").filter((r) => r.projectId === projectId); },
  async updateStatus(id, status) { return dbUpdate("releases", "releaseId", id, { status }); },
};

export const ReleaseGateRepository: R.ReleaseGateRepository = {
  async create(input) { const row = { ...input, releaseGateId: id("rg") }; dbInsert("releaseGates", row); return row; },
  async listByRelease(releaseId) { return dbList("releaseGates").filter((g) => g.releaseId === releaseId); },
};

export const DeploymentRepository: R.DeploymentRepository = {
  async create(input) { const row = { ...input, deploymentId: id("dep"), createdAt: nowISO() }; dbInsert("deployments", row); return row; },
  async listByProject(projectId) { return dbList("deployments").filter((d) => d.projectId === projectId); },
  async updateStatus(id, status) { return dbUpdate("deployments", "deploymentId", id, { status }); },
};

// ============ Governance ============
export const ApprovalRepository: R.ApprovalRepository = {
  async create(input) { const row = { ...input, approvalId: id("appr"), requestedAt: nowISO() }; dbInsert("approvals", row); return row; },
  async listPending() { return dbList("approvals").filter((a) => a.status === "pending"); },
  async decide(id, status, reviewedByUserId) { return dbUpdate("approvals", "approvalId", id, { status, reviewedByUserId, decidedAt: nowISO() }); },
};

export const AuditRepository: R.AuditRepository = {
  async append(input) { const row = { ...input, auditEventId: id("aud"), occurredAt: nowISO() }; dbInsert("auditEvents", row); return row; },
  async list(query) { return paginate(dbList("auditEvents") as T.AuditEvent[], query.cursor, query.limit); },
};

export const NotificationRepository: R.NotificationRepository = {
  async create(input) { const row = { ...input, notificationId: id("nt"), createdAt: nowISO() }; dbInsert("notifications", row); return row; },
  async listByUser(userId) { return dbList("notifications").filter((n) => n.userId === userId); },
  async markRead(id) { return dbUpdate("notifications", "notificationId", id, { read: true }); },
};

// ============ Model infra ============
export const GatewayRepository: R.GatewayRepository = {
  async list(query) { return paginate(filterSearch(dbList("gateways") as T.Gateway[], query.search), query.cursor, query.limit); },
  async get(id) { return dbList("gateways").find((g) => g.gatewayId === id) ?? null; },
};

export const ModelRepository: R.ModelRepository = {
  async listByGateway(gatewayId) { return dbList("models").filter((m) => m.gatewayId === gatewayId); },
  async get(id) { return dbList("models").find((m) => m.modelId === id) ?? null; },
};

export const RoutingPolicyRepository: R.RoutingPolicyRepository = {
  async list(query) { return paginate(filterSearch(dbList("routingPolicies") as T.RoutingPolicy[], query.search), query.cursor, query.limit); },
  async get(id) { return dbList("routingPolicies").find((p) => p.routingPolicyId === id) ?? null; },
};

export const ArtifactRepository: R.ArtifactRepository = {
  async create(input) { const row = { ...input, id: id("art"), createdAt: nowISO() }; dbInsert("artifacts", row); return row; },
  async listByProject(projectId) { return dbList("artifacts").filter((a) => a.projectId === projectId); },
};

// ============ Composite registry ============
export const repositories = {
  project: ProjectRepository,
  membership: MembershipRepository,
  agent: AgentRepository,
  agentVersion: AgentVersionRepository,
  assignment: AgentAssignmentRepository,
  session: AgentSessionRepository,
  skill: SkillRepository,
  agentSkill: AgentSkillRepository,
  soul: SoulRepository,
  tool: ToolRepository,
  capability: CapabilityRepository,
  permission: PermissionRepository,
  policy: PolicyRepository,
  permissionGrant: PermissionGrantRepository,
  requirement: RequirementRepository,
  acceptanceCriterion: AcceptanceCriterionRepository,
  architectureDecision: ArchitectureDecisionRepository,
  epic: EpicRepository,
  task: TaskRepository,
  taskAssignment: TaskAssignmentRepository,
  workflow: WorkflowRepository,
  workflowRun: WorkflowRunRepository,
  execution: ExecutionRepository,
  executionEvent: ExecutionEventRepository,
  sandbox: SandboxRepository,
  environment: EnvironmentRepository,
  verification: VerificationRepository,
  verificationCheck: VerificationCheckRepository,
  codeReview: CodeReviewRepository,
  reviewFinding: ReviewFindingRepository,
  evidence: EvidenceRepository,
  release: ReleaseRepository,
  releaseGate: ReleaseGateRepository,
  deployment: DeploymentRepository,
  approval: ApprovalRepository,
  audit: AuditRepository,
  notification: NotificationRepository,
  gateway: GatewayRepository,
  model: ModelRepository,
  routingPolicy: RoutingPolicyRepository,
  artifact: ArtifactRepository,
};

export type RepositoryRegistry = typeof repositories;
