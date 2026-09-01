/**
 * DOMAIN EVENTS — Single Source of Truth
 * ======================================
 * Semua domain event / audit action didefinisikan di satu tempat.
 * Service layer mengeluarkan event via katalog ini.
 * UI / audit log hanya menampilkan dari katalog ini (bukan string bebas).
 *
 * Konvensi: <resource>.<action>
 */

export const DomainEvents = {
  // Project
  PROJECT_CREATED: "project.created",
  PROJECT_UPDATED: "project.updated",
  PROJECT_ARCHIVED: "project.archived",
  PROJECT_COMPLETED: "project.completed",

  // Membership
  MEMBER_INVITED: "member.invited",
  MEMBER_ROLE_ASSIGNED: "member.role_assigned",
  MEMBER_REMOVED: "member.removed",

  // Agent
  AGENT_REQUESTED: "agent.requested",
  AGENT_APPROVED: "agent.approved",
  AGENT_REJECTED: "agent.rejected",
  AGENT_REVOKED: "agent.revoked",
  AGENT_CHANGES_REQUESTED: "agent.changes_requested",

  // Session
  SESSION_STARTED: "session.started",
  SESSION_PAUSED: "session.paused",
  SESSION_RESUMED: "session.resumed",
  SESSION_TERMINATED: "session.terminated",
  SESSION_FAILED: "session.failed",

  // Execution
  EXECUTION_STARTED: "execution.started",
  EXECUTION_SUCCEEDED: "execution.succeeded",
  EXECUTION_FAILED: "execution.failed",
  EXECUTION_CANCELLED: "execution.cancelled",
  EXECUTION_WAITING_APPROVAL: "execution.waiting_approval",

  // Requirement
  REQUIREMENT_CREATED: "requirement.created",
  REQUIREMENT_UPDATED: "requirement.updated",
  REQUIREMENT_APPROVED: "requirement.approved",
  REQUIREMENT_VERIFIED: "requirement.verified",

  // Task
  TASK_CREATED: "task.created",
  TASK_MOVED: "task.moved",
  TASK_BLOCKED: "task.blocked",
  TASK_DONE: "task.done",

  // Verification
  VERIFICATION_STARTED: "verification.started",
  VERIFICATION_PASSED: "verification.passed",
  VERIFICATION_FAILED: "verification.failed",

  // Review
  REVIEW_CREATED: "review.created",
  REVIEW_APPROVED: "review.approved",
  REVIEW_CHANGES_REQUESTED: "review.changes_requested",

  // Artifact / Evidence
  ARTIFACT_CREATED: "artifact.created",
  EVIDENCE_CREATED: "evidence.created",

  // Release & Deployment
  RELEASE_CREATED: "release.created",
  RELEASE_APPROVED: "release.approved",
  RELEASE_ROLLED_BACK: "release.rolled_back",
  DEPLOYMENT_STARTED: "deployment.started",
  DEPLOYMENT_COMPLETED: "deployment.completed",
  DEPLOYMENT_FAILED: "deployment.failed",
} as const;

export type DomainEventAction = (typeof DomainEvents)[keyof typeof DomainEvents];

/** Resolve event action → label presentasi yang ramah (bukan mengarang). */
export function eventLabel(action: string): string {
  const map: Record<string, string> = {
    [DomainEvents.PROJECT_CREATED]: "Project dibuat",
    [DomainEvents.PROJECT_UPDATED]: "Project diperbarui",
    [DomainEvents.MEMBER_INVITED]: "Anggota diundang",
    [DomainEvents.MEMBER_ROLE_ASSIGNED]: "Peran anggota ditetapkan",
    [DomainEvents.AGENT_REQUESTED]: "Agent diminta",
    [DomainEvents.AGENT_APPROVED]: "Agent disetujui",
    [DomainEvents.AGENT_REJECTED]: "Agent ditolak",
    [DomainEvents.AGENT_REVOKED]: "Agent dicabut",
    [DomainEvents.SESSION_STARTED]: "Sesi dimulai",
    [DomainEvents.SESSION_PAUSED]: "Sesi dijeda",
    [DomainEvents.SESSION_TERMINATED]: "Sesi diakhiri",
    [DomainEvents.EXECUTION_STARTED]: "Eksekusi dimulai",
    [DomainEvents.EXECUTION_SUCCEEDED]: "Eksekusi berhasil",
    [DomainEvents.EXECUTION_FAILED]: "Eksekusi gagal",
    [DomainEvents.REQUIREMENT_CREATED]: "Requirement dibuat",
    [DomainEvents.REQUIREMENT_VERIFIED]: "Requirement terverifikasi",
    [DomainEvents.TASK_CREATED]: "Task dibuat",
    [DomainEvents.TASK_DONE]: "Task selesai",
    [DomainEvents.VERIFICATION_STARTED]: "Verifikasi dimulai",
    [DomainEvents.VERIFICATION_PASSED]: "Verifikasi lolos",
    [DomainEvents.VERIFICATION_FAILED]: "Verifikasi gagal",
    [DomainEvents.REVIEW_CREATED]: "Review dibuat",
    [DomainEvents.REVIEW_APPROVED]: "Review disetujui",
    [DomainEvents.RELEASE_CREATED]: "Release dibuat",
    [DomainEvents.RELEASE_APPROVED]: "Release disetujui",
    [DomainEvents.DEPLOYMENT_STARTED]: "Deployment dimulai",
    [DomainEvents.DEPLOYMENT_COMPLETED]: "Deployment selesai",
    [DomainEvents.DEPLOYMENT_FAILED]: "Deployment gagal",
  };
  return map[action] ?? action;
}

/**
 * Peta status transisi → event kanonik.
 * Mencegah service mengarang nama event dari status (mis. `task.${to}`).
 * Gunakan ini untuk audit saat status berubah.
 */
const TASK_STATUS_EVENT: Record<string, string> = {
  done: DomainEvents.TASK_DONE,
  blocked: DomainEvents.TASK_BLOCKED,
  in_progress: DomainEvents.TASK_MOVED,
};

export function taskStatusEvent(status: string): string {
  return TASK_STATUS_EVENT[status] ?? DomainEvents.TASK_MOVED;
}

const SESSION_STATUS_EVENT: Record<string, string> = {
  paused: DomainEvents.SESSION_PAUSED,
  active: DomainEvents.SESSION_RESUMED,
  terminated: DomainEvents.SESSION_TERMINATED,
  failed: DomainEvents.SESSION_FAILED,
  completed: DomainEvents.SESSION_TERMINATED,
};

export function sessionStatusEvent(status: string): string {
  return SESSION_STATUS_EVENT[status] ?? DomainEvents.SESSION_STARTED;
}

const EXECUTION_STATUS_EVENT: Record<string, string> = {
  succeeded: DomainEvents.EXECUTION_SUCCEEDED,
  failed: DomainEvents.EXECUTION_FAILED,
  cancelled: DomainEvents.EXECUTION_CANCELLED,
  waiting_approval: DomainEvents.EXECUTION_WAITING_APPROVAL,
};

export function executionStatusEvent(status: string): string {
  return EXECUTION_STATUS_EVENT[status] ?? DomainEvents.EXECUTION_STARTED;
}

const REQUIREMENT_STATUS_EVENT: Record<string, string> = {
  verified: DomainEvents.REQUIREMENT_VERIFIED,
  approved: DomainEvents.REQUIREMENT_APPROVED,
};

export function requirementStatusEvent(status: string): string {
  return REQUIREMENT_STATUS_EVENT[status] ?? DomainEvents.REQUIREMENT_UPDATED;
}

const PROJECT_STATUS_EVENT: Record<string, string> = {
  completed: DomainEvents.PROJECT_COMPLETED,
  archived: DomainEvents.PROJECT_ARCHIVED,
};

export function projectStatusEvent(status: string): string {
  return PROJECT_STATUS_EVENT[status] ?? DomainEvents.PROJECT_UPDATED;
}
