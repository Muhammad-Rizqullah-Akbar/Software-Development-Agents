// Repository interfaces (spec section 40-42)
// Each repository must support query objects & pagination.

import type {
  Project,
  ProjectMembership,
  Agent,
  AgentVersion,
  AgentAssignment,
  AgentSession,
  Skill,
  AgentSkill,
  SOUL,
  Tool,
  Capability,
  Permission,
  Policy,
  PermissionGrant,
  Requirement,
  AcceptanceCriterion,
  ArchitectureDecision,
  Epic,
  Task,
  TaskAssignment,
  Workflow,
  WorkflowRun,
  Execution,
  ExecutionEvent,
  ExecutionUsage,
  Sandbox,
  Environment,
  Verification,
  VerificationCheck,
  CodeReview,
  ReviewFinding,
  Evidence,
  Release,
  ReleaseGate,
  Deployment,
  Approval,
  AuditEvent,
  Notification,
  Gateway,
  Model,
  RoutingPolicy,
  RoutingRule,
  Artifact,
} from "../domain/models";
import type { Paginated, ProjectQuery, TaskQuery, RequirementQuery, ExecutionQuery, AgentQuery } from "../domain/contracts";
import type { ID } from "../domain/enums";

export interface ProjectRepository {
  create(input: Omit<Project, "projectId" | "createdAt" | "updatedAt">): Promise<Project>;
  get(id: ID): Promise<Project | null>;
  list(query: ProjectQuery): Promise<Paginated<Project>>;
  update(id: ID, input: Partial<Project>): Promise<Project>;
}

export interface MembershipRepository {
  create(input: Omit<ProjectMembership, "membershipId" | "joinedAt">): Promise<ProjectMembership>;
  listByProject(projectId: ID): Promise<ProjectMembership[]>;
  getByUserProject(userId: ID, projectId: ID): Promise<ProjectMembership | null>;
  updateRole(membershipId: ID, role: ProjectMembership["role"]): Promise<ProjectMembership>;
  remove(membershipId: ID): Promise<void>;
}

export interface AgentRepository {
  create(input: Omit<Agent, "agentId" | "createdAt">): Promise<Agent>;
  get(id: ID): Promise<Agent | null>;
  list(query: AgentQuery): Promise<Paginated<Agent>>;
}

export interface AgentVersionRepository {
  create(input: Omit<AgentVersion, "agentVersionId" | "createdAt">): Promise<AgentVersion>;
  listByAgent(agentId: ID): Promise<AgentVersion[]>;
}

export interface AgentAssignmentRepository {
  create(input: Omit<AgentAssignment, "agentAssignmentId" | "requestedAt">): Promise<AgentAssignment>;
  get(id: ID): Promise<AgentAssignment | null>;
  listByProject(projectId: ID): Promise<AgentAssignment[]>;
  updateStatus(id: ID, status: AgentAssignment["status"]): Promise<AgentAssignment>;
  updateApproval(id: ID, approvalStatus: AgentAssignment["approvalStatus"]): Promise<AgentAssignment>;
}

export interface AgentSessionRepository {
  create(input: Omit<AgentSession, "agentSessionId" | "createdAt" | "updatedAt">): Promise<AgentSession>;
  get(id: ID): Promise<AgentSession | null>;
  listByProject(projectId: ID): Promise<AgentSession[]>;
  updateStatus(id: ID, status: AgentSession["status"]): Promise<AgentSession>;
}

export interface SkillRepository {
  create(input: Omit<Skill, "skillId">): Promise<Skill>;
  list(query: BaseListQuery): Promise<Paginated<Skill>>;
  get(id: ID): Promise<Skill | null>;
}

export interface AgentSkillRepository {
  listByAgent(agentId: ID): Promise<AgentSkill[]>;
  add(agentId: ID, skillId: ID): Promise<AgentSkill>;
}

export interface SoulRepository {
  create(input: Omit<SOUL, "soulId" | "createdAt">): Promise<SOUL>;
  listByAgent(agentId: ID): Promise<SOUL[]>;
  get(id: ID): Promise<SOUL | null>;
}

export interface ToolRepository {
  list(query: BaseListQuery): Promise<Paginated<Tool>>;
  get(id: ID): Promise<Tool | null>;
}

export interface CapabilityRepository {
  list(query: BaseListQuery): Promise<Paginated<Capability>>;
  get(id: ID): Promise<Capability | null>;
}

export interface PermissionRepository {
  list(query: BaseListQuery): Promise<Paginated<Permission>>;
  get(id: ID): Promise<Permission | null>;
}

export interface PolicyRepository {
  list(query: BaseListQuery): Promise<Paginated<Policy>>;
  get(id: ID): Promise<Policy | null>;
}

export interface PermissionGrantRepository {
  create(input: Omit<PermissionGrant, "permissionGrantId">): Promise<PermissionGrant>;
  listByAssignment(agentAssignmentId: ID): Promise<PermissionGrant[]>;
}

export interface RequirementRepository {
  create(input: Omit<Requirement, "requirementId" | "createdAt" | "updatedAt">): Promise<Requirement>;
  get(id: ID): Promise<Requirement | null>;
  list(query: RequirementQuery): Promise<Paginated<Requirement>>;
  update(id: ID, input: Partial<Requirement>): Promise<Requirement>;
}

export interface AcceptanceCriterionRepository {
  create(input: Omit<AcceptanceCriterion, "acceptanceCriterionId">): Promise<AcceptanceCriterion>;
  listByRequirement(requirementId: ID): Promise<AcceptanceCriterion[]>;
}

export interface ArchitectureDecisionRepository {
  create(input: Omit<ArchitectureDecision, "architectureDecisionId" | "createdAt">): Promise<ArchitectureDecision>;
  listByProject(projectId: ID): Promise<ArchitectureDecision[]>;
}

export interface EpicRepository {
  create(input: Omit<Epic, "epicId">): Promise<Epic>;
  listByProject(projectId: ID): Promise<Epic[]>;
}

export interface TaskRepository {
  create(input: Omit<Task, "taskId" | "createdAt" | "updatedAt">): Promise<Task>;
  get(id: ID): Promise<Task | null>;
  list(query: TaskQuery): Promise<Paginated<Task>>;
  update(id: ID, input: Partial<Task>): Promise<Task>;
}

export interface TaskAssignmentRepository {
  assign(taskId: ID, agentAssignmentId: ID): Promise<TaskAssignment>;
  listByTask(taskId: ID): Promise<TaskAssignment[]>;
}

export interface WorkflowRepository {
  create(input: Omit<Workflow, "workflowId">): Promise<Workflow>;
  get(id: ID): Promise<Workflow | null>;
  list(query: BaseListQuery): Promise<Paginated<Workflow>>;
}

export interface WorkflowRunRepository {
  create(input: Omit<WorkflowRun, "workflowRunId" | "createdAt" | "updatedAt">): Promise<WorkflowRun>;
  listByProject(projectId: ID): Promise<WorkflowRun[]>;
  updateStatus(id: ID, status: WorkflowRun["status"]): Promise<WorkflowRun>;
}

export interface ExecutionRepository {
  create(input: Omit<Execution, "executionId" | "createdAt" | "updatedAt">): Promise<Execution>;
  get(id: ID): Promise<Execution | null>;
  list(query: ExecutionQuery): Promise<Paginated<Execution>>;
  updateStatus(id: ID, status: Execution["status"]): Promise<Execution>;
}

export interface ExecutionEventRepository {
  append(input: Omit<ExecutionEvent, "executionEventId">): Promise<ExecutionEvent>;
  listByExecution(executionId: ID): Promise<ExecutionEvent[]>;
}

export interface SandboxRepository {
  create(input: Omit<Sandbox, "sandboxId">): Promise<Sandbox>;
  getByExecution(executionId: ID): Promise<Sandbox | null>;
  updateStatus(id: ID, status: Sandbox["status"]): Promise<Sandbox>;
}

export interface EnvironmentRepository {
  listByProject(projectId: ID): Promise<Environment[]>;
  get(id: ID): Promise<Environment | null>;
}

export interface VerificationRepository {
  create(input: Omit<Verification, "verificationId">): Promise<Verification>;
  get(id: ID): Promise<Verification | null>;
  listByProject(projectId: ID): Promise<Verification[]>;
  updateStatus(id: ID, status: Verification["status"]): Promise<Verification>;
}

export interface VerificationCheckRepository {
  create(input: Omit<VerificationCheck, "verificationCheckId">): Promise<VerificationCheck>;
  listByVerification(verificationId: ID): Promise<VerificationCheck[]>;
}

export interface CodeReviewRepository {
  create(input: Omit<CodeReview, "codeReviewId" | "createdAt">): Promise<CodeReview>;
  listByProject(projectId: ID): Promise<CodeReview[]>;
  updateStatus(id: ID, status: CodeReview["status"]): Promise<CodeReview>;
}

export interface ReviewFindingRepository {
  create(input: Omit<ReviewFinding, "reviewFindingId">): Promise<ReviewFinding>;
  listByReview(codeReviewId: ID): Promise<ReviewFinding[]>;
  resolve(id: ID, resolution: string): Promise<ReviewFinding>;
}

export interface EvidenceRepository {
  create(input: Omit<Evidence, "evidenceId" | "createdAt">): Promise<Evidence>;
  listByProject(projectId: ID): Promise<Evidence[]>;
}

export interface ReleaseRepository {
  create(input: Omit<Release, "releaseId" | "createdAt">): Promise<Release>;
  get(id: ID): Promise<Release | null>;
  listByProject(projectId: ID): Promise<Release[]>;
  updateStatus(id: ID, status: Release["status"]): Promise<Release>;
}

export interface ReleaseGateRepository {
  create(input: Omit<ReleaseGate, "releaseGateId">): Promise<ReleaseGate>;
  listByRelease(releaseId: ID): Promise<ReleaseGate[]>;
}

export interface DeploymentRepository {
  create(input: Omit<Deployment, "deploymentId" | "createdAt">): Promise<Deployment>;
  listByProject(projectId: ID): Promise<Deployment[]>;
  updateStatus(id: ID, status: Deployment["status"]): Promise<Deployment>;
}

export interface ApprovalRepository {
  create(input: Omit<Approval, "approvalId" | "requestedAt">): Promise<Approval>;
  listPending(): Promise<Approval[]>;
  decide(id: ID, status: Approval["status"], reviewedByUserId: ID): Promise<Approval>;
}

export interface AuditRepository {
  append(input: Omit<AuditEvent, "auditEventId" | "occurredAt">): Promise<AuditEvent>;
  list(query: BaseListQuery): Promise<Paginated<AuditEvent>>;
}

export interface NotificationRepository {
  create(input: Omit<Notification, "notificationId" | "createdAt">): Promise<Notification>;
  listByUser(userId: ID): Promise<Notification[]>;
  markRead(id: ID): Promise<Notification>;
}

export interface GatewayRepository {
  list(query: BaseListQuery): Promise<Paginated<Gateway>>;
  get(id: ID): Promise<Gateway | null>;
}

export interface ModelRepository {
  listByGateway(gatewayId: ID): Promise<Model[]>;
  get(id: ID): Promise<Model | null>;
}

export interface RoutingPolicyRepository {
  list(query: BaseListQuery): Promise<Paginated<RoutingPolicy>>;
  get(id: ID): Promise<RoutingPolicy | null>;
}

export interface ArtifactRepository {
  create(input: Omit<Artifact, "id" | "createdAt">): Promise<Artifact>;
  listByProject(projectId: ID): Promise<Artifact[]>;
}

// Lightweight query used by simple repositories
interface BaseListQuery {
  workspaceId: string;
  search?: string;
  cursor?: string;
  limit?: number;
}
