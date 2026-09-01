import type {
  TaskStatus,
  ExecutionStatus,
  AgentAssignmentStatus,
  AgentSessionStatus,
  VerificationStatus,
  ReleaseStatus,
  DeploymentStatus,
  RequirementStatus,
} from "./enums";

/**
 * Canonical state transitions (spec section 48, 122).
 * UI must prevent impossible transitions by consulting these.
 */

const TASK_TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
  backlog: ["ready", "cancelled"],
  ready: ["in_progress", "backlog", "cancelled"],
  in_progress: ["blocked", "review", "verification", "cancelled"],
  blocked: ["in_progress", "cancelled"],
  review: ["verification", "in_progress", "done"],
  verification: ["done", "in_progress", "review"],
  done: [],
  cancelled: [],
};

const EXECUTION_TRANSITIONS: Record<ExecutionStatus, ExecutionStatus[]> = {
  queued: ["running", "cancelled"],
  running: ["waiting_approval", "succeeded", "failed", "blocked", "cancelled", "timed_out"],
  waiting_approval: ["running", "succeeded", "failed", "cancelled"],
  succeeded: [],
  failed: ["queued"], // retry
  cancelled: [],
  timed_out: ["queued"], // retry
  blocked: ["running", "cancelled"],
};

const ASSIGNMENT_TRANSITIONS: Record<AgentAssignmentStatus, AgentAssignmentStatus[]> = {
  pending: ["active", "revoked", "expired"],
  active: ["paused", "revoked", "expired"],
  paused: ["active", "revoked", "expired"],
  revoked: [],
  expired: [],
};

const SESSION_TRANSITIONS: Record<AgentSessionStatus, AgentSessionStatus[]> = {
  initializing: ["active", "failed", "terminated"],
  active: ["waiting", "paused", "completed", "failed", "terminated"],
  waiting: ["active", "paused", "terminated"],
  paused: ["active", "terminated"],
  completed: [],
  failed: [],
  terminated: [],
};

const VERIFICATION_TRANSITIONS: Record<VerificationStatus, VerificationStatus[]> = {
  pending: ["running", "cancelled"],
  running: ["passed", "failed", "blocked", "cancelled"],
  passed: [],
  failed: ["running"], // rerun
  blocked: ["running", "cancelled"],
  cancelled: [],
};

const RELEASE_TRANSITIONS: Record<ReleaseStatus, ReleaseStatus[]> = {
  draft: ["candidate", "failed"],
  candidate: ["verification", "approved", "failed"],
  verification: ["approved", "failed", "rolled_back"],
  approved: ["staging", "canary", "production", "rolled_back"],
  staging: ["canary", "production", "rolled_back", "failed"],
  canary: ["production", "rolled_back", "failed"],
  production: ["rolled_back"],
  rolled_back: [],
  failed: [],
};

const DEPLOYMENT_TRANSITIONS: Record<DeploymentStatus, DeploymentStatus[]> = {
  queued: ["deploying", "cancelled"],
  deploying: ["healthy", "failed", "rolled_back"],
  healthy: ["rolled_back"],
  failed: [],
  rolled_back: [],
  cancelled: [],
};

const REQUIREMENT_TRANSITIONS: Record<RequirementStatus, RequirementStatus[]> = {
  draft: ["defined", "rejected", "deprecated"],
  defined: ["approved", "draft", "rejected", "deprecated"],
  approved: ["in_progress", "deprecated"],
  in_progress: ["implemented", "rejected", "deprecated"],
  implemented: ["verified", "in_progress", "deprecated"],
  verified: ["deprecated"],
  rejected: ["draft", "deprecated"],
  deprecated: [],
};

function canTransition<T extends string>(
  map: Record<T, T[]>,
  from: T,
  to: T
): boolean {
  if (from === to) return true;
  return (map[from] ?? []).includes(to);
}

export const StateMachine = {
  canTransitionTask: (from: TaskStatus, to: TaskStatus) =>
    canTransition(TASK_TRANSITIONS, from, to),
  canTransitionExecution: (from: ExecutionStatus, to: ExecutionStatus) =>
    canTransition(EXECUTION_TRANSITIONS, from, to),
  canTransitionAssignment: (from: AgentAssignmentStatus, to: AgentAssignmentStatus) =>
    canTransition(ASSIGNMENT_TRANSITIONS, from, to),
  canTransitionSession: (from: AgentSessionStatus, to: AgentSessionStatus) =>
    canTransition(SESSION_TRANSITIONS, from, to),
  canTransitionVerification: (from: VerificationStatus, to: VerificationStatus) =>
    canTransition(VERIFICATION_TRANSITIONS, from, to),
  canTransitionRelease: (from: ReleaseStatus, to: ReleaseStatus) =>
    canTransition(RELEASE_TRANSITIONS, from, to),
  canTransitionDeployment: (from: DeploymentStatus, to: DeploymentStatus) =>
    canTransition(DEPLOYMENT_TRANSITIONS, from, to),
  canTransitionRequirement: (from: RequirementStatus, to: RequirementStatus) =>
    canTransition(REQUIREMENT_TRANSITIONS, from, to),
};
