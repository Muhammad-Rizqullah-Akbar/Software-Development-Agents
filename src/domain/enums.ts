// Domain canonical enums for Software-Development-Agents
// All status values are canonical. Presentation labels live in presentation layer.

export type ID = string;
export type ISODateString = string;

/** Canonical project roles */
export type ProjectRole =
  | "project_lead"
  | "contributor"
  | "reviewer"
  | "viewer";

/** Canonical agent assignment roles are contextual — defined per assignment. */

/** Approval status — never represent with boolean */
export type ApprovalStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "changes_requested"
  | "revoked"
  | "expired";

/** Two canonical skill types */
export type SkillType = "capability" | "process";

/** Canonical SDLC phase */
export type SDLCPhase =
  | "discover"
  | "define"
  | "design"
  | "plan"
  | "build"
  | "review"
  | "verify"
  | "release"
  | "operate"
  | "learn";

export type ProjectStatus =
  | "planning"
  | "active"
  | "paused"
  | "completed"
  | "archived";

export type RequirementStatus =
  | "draft"
  | "defined"
  | "approved"
  | "in_progress"
  | "implemented"
  | "verified"
  | "rejected"
  | "deprecated";

export type TaskStatus =
  | "backlog"
  | "ready"
  | "in_progress"
  | "blocked"
  | "review"
  | "verification"
  | "done"
  | "cancelled";

export type AgentAssignmentStatus =
  | "pending"
  | "active"
  | "paused"
  | "revoked"
  | "expired";

export type AgentSessionStatus =
  | "initializing"
  | "active"
  | "waiting"
  | "paused"
  | "completed"
  | "failed"
  | "terminated";

export type ExecutionStatus =
  | "queued"
  | "running"
  | "waiting_approval"
  | "succeeded"
  | "failed"
  | "cancelled"
  | "timed_out"
  | "blocked";

export type VerificationStatus =
  | "pending"
  | "running"
  | "passed"
  | "failed"
  | "blocked"
  | "cancelled";

export type ReleaseStatus =
  | "draft"
  | "candidate"
  | "verification"
  | "approved"
  | "staging"
  | "canary"
  | "production"
  | "rolled_back"
  | "failed";

export type DeploymentStatus =
  | "queued"
  | "deploying"
  | "healthy"
  | "failed"
  | "rolled_back"
  | "cancelled";

export type ReviewStatus =
  | "pending"
  | "changes_requested"
  | "approved"
  | "dismissed";

export type WorkflowRunStatus =
  | "queued"
  | "running"
  | "paused"
  | "waiting_approval"
  | "succeeded"
  | "failed"
  | "cancelled";

export type SandboxStatus =
  | "provisioning"
  | "ready"
  | "running"
  | "stopped"
  | "failed"
  | "terminated";

export type EnvironmentType = "development" | "staging" | "production";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type ReviewFindingSeverity =
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "suggestion";

export type ArtifactType =
  | "code"
  | "document"
  | "research_report"
  | "design"
  | "screenshot"
  | "test_report"
  | "security_report"
  | "build"
  | "release_bundle";

export type SOULStatus = "draft" | "testing" | "active" | "deprecated";
