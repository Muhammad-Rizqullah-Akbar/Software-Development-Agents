import type {
  ID,
  ISODateString,
  ProjectRole,
  ApprovalStatus,
  SkillType,
  SDLCPhase,
  ProjectStatus,
  RequirementStatus,
  TaskStatus,
  AgentAssignmentStatus,
  AgentSessionStatus,
  ExecutionStatus,
  VerificationStatus,
  ReleaseStatus,
  DeploymentStatus,
  ReviewStatus,
  WorkflowRunStatus,
  SandboxStatus,
  EnvironmentType,
  RiskLevel,
  ReviewFindingSeverity,
  ArtifactType,
  SOULStatus,
} from "./enums";

// ============ Identity ============
export interface Workspace {
  workspaceId: ID;
  name: string;
  createdAt: ISODateString;
}

export interface User {
  userId: ID;
  email: string;
  displayName: string;
  workspaceId: ID;
  createdAt: ISODateString;
}

// ============ Project ============
export interface Project {
  projectId: ID;
  workspaceId: ID;
  name: string;
  description: string;
  status: ProjectStatus;
  phase: SDLCPhase;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface ProjectMembership {
  membershipId: ID;
  workspaceId: ID;
  projectId: ID;
  userId: ID;
  role: ProjectRole;
  joinedAt: ISODateString;
}

// ============ Agent ============
export interface AgentOwner {
  ownerId: ID;
  workspaceId: ID;
  displayName: string;
  role: string;
  focus: string[];
}

export interface Agent {
  agentId: ID;
  workspaceId: ID;
  name: string;
  description: string;
  role: string;
  ownerId: ID;
  currentVersionId?: ID;
  createdAt: ISODateString;
}

// Work Field = kolaborasi multi-agent dalam satu area project
export interface WorkField {
  workFieldId: ID;
  workspaceId: ID;
  projectId: ID;
  name: string;
  subContexts: string[];
  artifactIds: ID[];
}

export interface WorkFieldParticipant {
  workFieldParticipantId: ID;
  workFieldId: ID;
  agentAssignmentId: ID;
  subContext: string;
}

// Finding (hasil review/security) — canonical, link ke task/execution
export interface Finding {
  findingId: ID;
  workspaceId: ID;
  projectId: ID;
  taskId?: ID;
  executionId?: ID;
  severity: ReviewFindingSeverity;
  category: string;
  file?: string;
  issue: string;
  status: "open" | "resolved";
  resolution?: string;
  createdAt: ISODateString;
}

// WorkReport — hasil agent yang bisa diakses dari task card
export interface WorkReport {
  reportId: ID;
  workspaceId: ID;
  projectId: ID;
  taskId: ID;
  agentId: ID;
  summary: string;
  changes: string[];
  testsPassed?: number;
  securityResolved?: number;
  artifacts: string[];
  recommendation: string;
  createdAt: ISODateString;
}

// Handoff — transfer kerja antar agent dalam work field
export interface Handoff {
  handoffId: ID;
  workspaceId: ID;
  projectId: ID;
  workFieldId: ID;
  fromAgentId: ID;
  toAgentId: ID;
  message: string;
  createdAt: ISODateString;
}

export interface AgentVersion {
  agentVersionId: ID;
  agentId: ID;
  version: string;
  soulId?: ID;
  createdAt: ISODateString;
}

export interface AgentAssignment {
  agentAssignmentId: ID;
  workspaceId: ID;
  projectId: ID;
  agentId: ID;
  userId: ID; // owner of the request
  role: string; // contextual project role for agent
  scope: string;
  status: AgentAssignmentStatus;
  approvalStatus: ApprovalStatus;
  requestedAt: ISODateString;
  decidedAt?: ISODateString;
}

export interface AgentSession {
  agentSessionId: ID;
  workspaceId: ID;
  projectId: ID;
  agentAssignmentId: ID;
  agentId: ID;
  status: AgentSessionStatus;
  context: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

// ============ Agent capability ============
export interface Skill {
  skillId: ID;
  workspaceId: ID;
  name: string;
  type: SkillType;
  category: string;
  version: string;
  description: string;
  riskLevel: RiskLevel;
}

export interface AgentSkill {
  agentSkillId: ID;
  agentId: ID;
  skillId: ID;
}

export interface Capability {
  capabilityId: ID;
  name: string;
  description: string;
  sensitive: boolean;
}

export interface Tool {
  toolId: ID;
  name: string;
  description: string;
}

export interface SOUL {
  soulId: ID;
  agentId: ID;
  version: string;
  status: SOULStatus;
  content: string;
  createdAt: ISODateString;
}

// ============ Authorization ============
export interface Permission {
  permissionId: ID;
  name: string;
  capabilityId: ID;
  description: string;
}

export interface Policy {
  policyId: ID;
  workspaceId: ID;
  name: string;
  allowCapabilityIds: ID[];
  denyCapabilityIds: ID[];
  approvalRequiredCapabilityIds: ID[];
}

export interface PermissionGrant {
  permissionGrantId: ID;
  permissionId: ID;
  projectId: ID;
  agentAssignmentId: ID;
  grantedByUserId: ID;
  expiresAt?: ISODateString;
  status: ApprovalStatus;
}

// ============ Software development ============
export interface Requirement {
  requirementId: ID;
  workspaceId: ID;
  projectId: ID;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  status: RequirementStatus;
  ownerUserId?: ID;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface AcceptanceCriterion {
  acceptanceCriterionId: ID;
  requirementId: ID;
  description: string;
  satisfied: boolean;
}

export interface ArchitectureDecision {
  architectureDecisionId: ID;
  workspaceId: ID;
  projectId: ID;
  title: string;
  context: string;
  decision: string;
  status: "proposed" | "accepted" | "superseded";
  createdAt: ISODateString;
}

export interface Epic {
  epicId: ID;
  workspaceId: ID;
  projectId: ID;
  name: string;
  description: string;
}

export interface Task {
  taskId: ID;
  workspaceId: ID;
  projectId: ID;
  requirementId?: ID;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  status: TaskStatus;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface TaskAssignment {
  taskAssignmentId: ID;
  taskId: ID;
  agentAssignmentId: ID;
  userId?: ID;
}

// ============ Workflow ============
export interface Workflow {
  workflowId: ID;
  workspaceId: ID;
  name: string;
  description: string;
  stepIds: ID[];
}

export interface WorkflowStep {
  workflowStepId: ID;
  workflowId: ID;
  name: string;
  type: string;
  order: number;
  agentId?: ID;
  skillIds: ID[];
  gate?: boolean;
  approvalRequired: boolean;
}

export interface WorkflowRun {
  workflowRunId: ID;
  workspaceId: ID;
  projectId: ID;
  workflowId: ID;
  status: WorkflowRunStatus;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

// ============ Execution ============
export interface Execution {
  executionId: ID;
  workspaceId: ID;
  projectId: ID;
  agentSessionId?: ID;
  taskId?: ID;
  workflowRunId?: ID;
  status: ExecutionStatus;
  input: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface ExecutionEvent {
  executionEventId: ID;
  executionId: ID;
  timestamp: ISODateString;
  type: string;
  message: string;
  metadata?: Record<string, unknown>;
}

export interface ExecutionUsage {
  executionId: ID;
  gatewayId?: ID;
  modelId?: ID;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  estimatedCost?: number;
  currency?: string;
  durationMs?: number;
}

export interface Sandbox {
  sandboxId: ID;
  executionId: ID;
  projectId: ID;
  filesystemScope: string;
  networkScope: string;
  capabilityIds: ID[];
  environmentVariables: boolean;
  secretAccess: "restricted" | "none";
  resourceLimits: string;
  status: SandboxStatus;
}

export interface Environment {
  environmentId: ID;
  projectId: ID;
  type: EnvironmentType;
  name: string;
  status: string;
  endpoint?: string;
  configurationSummary: string;
}

// ============ Quality ============
export interface Verification {
  verificationId: ID;
  workspaceId: ID;
  projectId: ID;
  executionId?: ID;
  taskId?: ID;
  requirementId?: ID;
  status: VerificationStatus;
  type: string;
  startedAt?: ISODateString;
  completedAt?: ISODateString;
}

export interface VerificationCheck {
  verificationCheckId: ID;
  verificationId: ID;
  name: string;
  status: VerificationStatus;
}

export interface CodeReview {
  codeReviewId: ID;
  workspaceId: ID;
  projectId: ID;
  taskId?: ID;
  executionId?: ID;
  status: ReviewStatus;
  reviewerId?: ID;
  createdAt: ISODateString;
}

export interface ReviewFinding {
  reviewFindingId: ID;
  codeReviewId: ID;
  severity: ReviewFindingSeverity;
  file?: string;
  line?: number;
  description: string;
  resolution?: string;
  resolved: boolean;
}

export interface Evidence {
  evidenceId: ID;
  workspaceId: ID;
  projectId: ID;
  requirementId?: ID;
  taskId?: ID;
  executionId?: ID;
  verificationId?: ID;
  releaseId?: ID;
  type: string;
  summary: string;
  createdAt: ISODateString;
}

// ============ Release ============
export interface Release {
  releaseId: ID;
  workspaceId: ID;
  projectId: ID;
  version: string;
  status: ReleaseStatus;
  createdAt: ISODateString;
}

export interface ReleaseGate {
  releaseGateId: ID;
  releaseId: ID;
  name: string;
  passed: boolean;
}

export interface Deployment {
  deploymentId: ID;
  workspaceId: ID;
  projectId: ID;
  releaseId: ID;
  environmentId: ID;
  status: DeploymentStatus;
  createdAt: ISODateString;
}

// ============ Governance ============
export interface Approval {
  approvalId: ID;
  requestedByUserId: ID;
  reviewedByUserId?: ID;
  resourceType: string;
  resourceId: ID;
  action: string;
  riskLevel: RiskLevel;
  status: ApprovalStatus;
  requestedAt: ISODateString;
  decidedAt?: ISODateString;
}

export interface AuditEvent {
  auditEventId: ID;
  workspaceId: ID;
  projectId?: ID;
  actorUserId?: ID;
  action: string;
  resourceType: string;
  resourceId: ID;
  metadata?: Record<string, unknown>;
  occurredAt: ISODateString;
}

export interface Notification {
  notificationId: ID;
  userId: ID;
  title: string;
  body: string;
  read: boolean;
  createdAt: ISODateString;
}

// ============ Model infrastructure ============
export interface Gateway {
  gatewayId: ID;
  workspaceId: ID;
  name: string;
  provider: string;
  modelIds: ID[];
}

export interface Model {
  modelId: ID;
  gatewayId: ID;
  name: string;
  provider: string;
  costPer1KInput?: number;
  costPer1KOutput?: number;
}

export interface ModelCapability {
  modelCapabilityId: ID;
  modelId: ID;
  capability: string;
}

export interface RoutingPolicy {
  routingPolicyId: ID;
  workspaceId: ID;
  name: string;
  ruleIds: ID[];
}

export interface RoutingRule {
  routingRuleId: ID;
  routingPolicyId: ID;
  match: string;
  modelId: ID;
}

// ============ Artifact ============
export interface Artifact {
  id: ID;
  projectId: ID;
  executionId?: ID;
  sessionId?: ID;
  createdBy?: ID;
  type: ArtifactType;
  storageKey?: string;
  version: string;
  metadata?: Record<string, unknown>;
  createdAt: ISODateString;
}
