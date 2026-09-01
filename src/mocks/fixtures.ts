// Demo fixtures (spec section 131)
// 8-12 projects, multiple users, agents, assignments, sessions, executions,
// requirements, tasks, pending approvals, blocked tasks, failed verification,
// successful releases, security findings. Not every project succeeds.

import type { DBShape } from "../adapters/mock/db";

const now = "2026-09-01T10:00:00.000Z";

export function buildFixtures(): DBShape {
  return {
    version: 1,
    users: [
      { userId: "u-eqii", email: "inirizqullahakbar@gmail.com", displayName: "Eqii", workspaceId: "ws-main", createdAt: now },
      { userId: "u-mutiah", email: "mutiah@example.com", displayName: "Mutiah", workspaceId: "ws-main", createdAt: now },
      { userId: "u-rafi", email: "rafi@example.com", displayName: "Rafi", workspaceId: "ws-main", createdAt: now },
    ],
    workspaces: [{ workspaceId: "ws-main", name: "Software-Development-Agents", createdAt: now }],
    projects: [
      { projectId: "p-auth", workspaceId: "ws-main", name: "Auth Service", description: "Authentication & authorization microservice", status: "active", phase: "build", createdAt: now, updatedAt: now },
      { projectId: "p-console", workspaceId: "ws-main", name: "Agent Console", description: "Frontend control tower for agentic SDLC", status: "active", phase: "verify", createdAt: now, updatedAt: now },
      { projectId: "p-scraper", workspaceId: "ws-main", name: "Job Scraper", description: "LinkedIn & GitHub job sourcing pipeline", status: "completed", phase: "operate", createdAt: now, updatedAt: now },
      { projectId: "p-mobile", workspaceId: "ws-main", name: "Mobile Companion", description: "Mobile agent controller via Tailscale", status: "planning", phase: "design", createdAt: now, updatedAt: now },
      { projectId: "p-billing", workspaceId: "ws-main", name: "Billing System", description: "Usage-based billing for executions", status: "active", phase: "review", createdAt: now, updatedAt: now },
      { projectId: "p-docs", workspaceId: "ws-main", name: "Developer Docs", description: "Documentation portal for SDA platform", status: "active", phase: "build", createdAt: now, updatedAt: now },
      { projectId: "p-analytics", workspaceId: "ws-main", name: "Analytics Dashboard", description: "Observability & metrics", status: "paused", phase: "plan", createdAt: now, updatedAt: now },
      { projectId: "p-legacy", workspaceId: "ws-main", name: "Legacy Monolith", description: "Deprecated system pending migration", status: "archived", phase: "operate", createdAt: now, updatedAt: now },
      { projectId: "p-ml", workspaceId: "ws-main", name: "ML Router", description: "Model routing experiments", status: "planning", phase: "discover", createdAt: now, updatedAt: now },
    ],
    memberships: [
      { membershipId: "m-1", workspaceId: "ws-main", projectId: "p-auth", userId: "u-eqii", role: "project_lead", joinedAt: now },
      { membershipId: "m-2", workspaceId: "ws-main", projectId: "p-auth", userId: "u-mutiah", role: "contributor", joinedAt: now },
      { membershipId: "m-3", workspaceId: "ws-main", projectId: "p-console", userId: "u-eqii", role: "project_lead", joinedAt: now },
      { membershipId: "m-4", workspaceId: "ws-main", projectId: "p-console", userId: "u-rafi", role: "reviewer", joinedAt: now },
      { membershipId: "m-5", workspaceId: "ws-main", projectId: "p-mobile", userId: "u-eqii", role: "project_lead", joinedAt: now },
      { membershipId: "m-6", workspaceId: "ws-main", projectId: "p-billing", userId: "u-eqii", role: "project_lead", joinedAt: now },
    ],
    agents: [
      { agentId: "a-hermes", workspaceId: "ws-main", name: "Hermes Researcher", description: "Evidence-first lead development agent", currentVersionId: "av-1", createdAt: now },
      { agentId: "a-airin", workspaceId: "ws-main", name: "Airin", description: "Writing & web research specialist", currentVersionId: "av-2", createdAt: now },
      { agentId: "a-security", workspaceId: "ws-main", name: "Security Reviewer", description: "Security analysis & threat modeling", currentVersionId: "av-3", createdAt: now },
      { agentId: "a-qa", workspaceId: "ws-main", name: "QA Verifier", description: "Testing & verification specialist", currentVersionId: "av-4", createdAt: now },
    ],
    agentVersions: [
      { agentVersionId: "av-1", agentId: "a-hermes", version: "v3", soulId: "soul-1", createdAt: now },
      { agentVersionId: "av-2", agentId: "a-airin", version: "v2", soulId: "soul-2", createdAt: now },
      { agentVersionId: "av-3", agentId: "a-security", version: "v1", soulId: "soul-3", createdAt: now },
      { agentVersionId: "av-4", agentId: "a-qa", version: "v1", soulId: "soul-4", createdAt: now },
    ],
    assignments: [
      { agentAssignmentId: "asg-1", workspaceId: "ws-main", projectId: "p-auth", agentId: "a-hermes", userId: "u-eqii", role: "Research Analyst", scope: "Requirements + planning", status: "active", approvalStatus: "approved", requestedAt: now, decidedAt: now },
      { agentAssignmentId: "asg-2", workspaceId: "ws-main", projectId: "p-auth", agentId: "a-security", userId: "u-mutiah", role: "Security Reviewer", scope: "Threat modeling + review", status: "active", approvalStatus: "approved", requestedAt: now, decidedAt: now },
      { agentAssignmentId: "asg-3", workspaceId: "ws-main", projectId: "p-console", agentId: "a-airin", userId: "u-rafi", role: "Documentation Specialist", scope: "Docs + research", status: "pending", approvalStatus: "pending", requestedAt: now },
      { agentAssignmentId: "asg-4", workspaceId: "ws-main", projectId: "p-billing", agentId: "a-qa", userId: "u-eqii", role: "QA Verifier", scope: "Verification", status: "active", approvalStatus: "approved", requestedAt: now, decidedAt: now },
    ],
    sessions: [
      { agentSessionId: "s-101", workspaceId: "ws-main", projectId: "p-auth", agentAssignmentId: "asg-1", agentId: "a-hermes", status: "active", context: "Auth requirements analysis", createdAt: now, updatedAt: now },
      { agentSessionId: "s-102", workspaceId: "ws-main", projectId: "p-auth", agentAssignmentId: "asg-2", agentId: "a-security", status: "active", context: "Security review of auth flow", createdAt: now, updatedAt: now },
      { agentSessionId: "s-103", workspaceId: "ws-main", projectId: "p-billing", agentAssignmentId: "asg-4", agentId: "a-qa", status: "waiting", context: "Billing verification queue", createdAt: now, updatedAt: now },
    ],
    skills: [
      { skillId: "sk-react", workspaceId: "ws-main", name: "React", type: "capability", category: "Frontend", version: "v1", description: "UI development", riskLevel: "low" },
      { skillId: "sk-solid", workspaceId: "ws-main", name: "SolidJS", type: "capability", category: "Frontend", version: "v1", description: "Reactive UI", riskLevel: "low" },
      { skillId: "sk-node", workspaceId: "ws-main", name: "Node.js", type: "capability", category: "Backend", version: "v1", description: "Server runtime", riskLevel: "low" },
      { skillId: "sk-sec", workspaceId: "ws-main", name: "Security Analysis", type: "capability", category: "Security", version: "v1", description: "Threat modeling", riskLevel: "high" },
      { skillId: "sk-tdd", workspaceId: "ws-main", name: "Test-Driven Development", type: "process", category: "Process", version: "v1", description: "Red-green-refactor", riskLevel: "low" },
      { skillId: "sk-plan", workspaceId: "ws-main", name: "Writing Plans", type: "process", category: "Process", version: "v1", description: "Plan authoring", riskLevel: "low" },
      { skillId: "sk-review", workspaceId: "ws-main", name: "Requesting Code Review", type: "process", category: "Process", version: "v1", description: "Review workflow", riskLevel: "medium" },
      { skillId: "sk-verify", workspaceId: "ws-main", name: "Verification Before Completion", type: "process", category: "Process", version: "v1", description: "Verify before done", riskLevel: "medium" },
    ],
    agentSkills: [
      { agentSkillId: "ags-1", agentId: "a-hermes", skillId: "sk-solid" },
      { agentSkillId: "ags-2", agentId: "a-hermes", skillId: "sk-plan" },
      { agentSkillId: "ags-3", agentId: "a-airin", skillId: "sk-react" },
      { agentSkillId: "ags-4", agentId: "a-security", skillId: "sk-sec" },
      { agentSkillId: "ags-5", agentId: "a-qa", skillId: "sk-tdd" },
      { agentSkillId: "ags-6", agentId: "a-qa", skillId: "sk-verify" },
    ],
    souls: [
      { soulId: "soul-1", agentId: "a-hermes", version: "v3", status: "active", content: "Evidence-first researcher. Prime directive: conclusions never stronger than evidence.", createdAt: now },
      { soulId: "soul-2", agentId: "a-airin", version: "v2", status: "active", content: "Writing specialist. Clear, sourced, useful.", createdAt: now },
      { soulId: "soul-3", agentId: "a-security", version: "v1", status: "draft", content: "Security reviewer. Threat-model everything. Never assume trust.", createdAt: now },
      { soulId: "soul-4", agentId: "a-qa", version: "v1", status: "testing", content: "QA verifier. Verification before completion. Evidence required.", createdAt: now },
    ],
    tools: [
      { toolId: "tool-fs", name: "filesystem", description: "Read/write files" },
      { toolId: "tool-git", name: "git", description: "Version control" },
      { toolId: "tool-web", name: "web", description: "Web access" },
      { toolId: "tool-browser", name: "browser", description: "Browser automation" },
      { toolId: "tool-test", name: "testing", description: "Run tests" },
      { toolId: "tool-pkg", name: "package-manager", description: "Install packages" },
    ],
    capabilities: [
      { capabilityId: "cap-project.read", name: "project.read", description: "Read project", sensitive: false },
      { capabilityId: "cap-project.write", name: "project.write", description: "Write project", sensitive: false },
      { capabilityId: "cap-repo.read", name: "repository.read", description: "Read repository", sensitive: false },
      { capabilityId: "cap-repo.write", name: "repository.write", description: "Write repository", sensitive: false },
      { capabilityId: "cap-test.run", name: "test.run", description: "Run tests", sensitive: false },
      { capabilityId: "cap-web.read", name: "web.read", description: "Read web", sensitive: false },
      { capabilityId: "cap-deploy", name: "production.deploy", description: "Deploy to production", sensitive: true },
      { capabilityId: "cap-secrets", name: "secrets.read", description: "Read secrets", sensitive: true },
      { capabilityId: "cap-db.modify", name: "database.modify", description: "Modify database", sensitive: true },
    ],
    permissions: [
      { permissionId: "perm-1", name: "Allow project write", capabilityId: "cap-project.write", description: "Write access to project" },
      { permissionId: "perm-2", name: "Allow repo write", capabilityId: "cap-repo.write", description: "Write access to repository" },
      { permissionId: "perm-3", name: "Allow test run", capabilityId: "cap-test.run", description: "Run test suite" },
      { permissionId: "perm-4", name: "Deploy production", capabilityId: "cap-deploy", description: "Production deployment" },
    ],
    policies: [
      { policyId: "pol-1", workspaceId: "ws-main", name: "Default Agent Policy", allowCapabilityIds: ["cap-project.read", "cap-project.write", "cap-repo.read", "cap-repo.write", "cap-test.run", "cap-web.read"], denyCapabilityIds: ["cap-secrets"], approvalRequiredCapabilityIds: ["cap-deploy", "cap-db.modify"] },
    ],
    permissionGrants: [
      { permissionGrantId: "pg-1", permissionId: "perm-1", projectId: "p-auth", agentAssignmentId: "asg-1", grantedByUserId: "u-eqii", status: "approved" },
      { permissionGrantId: "pg-2", permissionId: "perm-3", projectId: "p-auth", agentAssignmentId: "asg-1", grantedByUserId: "u-eqii", status: "approved" },
    ],
    requirements: [
      { requirementId: "r-021", workspaceId: "ws-main", projectId: "p-auth", title: "User authentication", description: "Users must be able to sign in securely", priority: "critical", status: "in_progress", ownerUserId: "u-eqii", createdAt: now, updatedAt: now },
      { requirementId: "r-022", workspaceId: "ws-main", projectId: "p-auth", title: "Role-based access control", description: "Support project roles", priority: "high", status: "approved", ownerUserId: "u-mutiah", createdAt: now, updatedAt: now },
      { requirementId: "r-023", workspaceId: "ws-main", projectId: "p-console", title: "Project switching", description: "Persistent project switcher", priority: "high", status: "verified", ownerUserId: "u-eqii", createdAt: now, updatedAt: now },
      { requirementId: "r-024", workspaceId: "ws-main", projectId: "p-billing", title: "Usage metering", description: "Track token usage per execution", priority: "medium", status: "defined", ownerUserId: "u-eqii", createdAt: now, updatedAt: now },
    ],
    acceptanceCriteria: [
      { acceptanceCriterionId: "ac-1", requirementId: "r-021", description: "User can sign in with email + password", satisfied: true },
      { acceptanceCriterionId: "ac-2", requirementId: "r-021", description: "Session persists across reload", satisfied: false },
      { acceptanceCriterionId: "ac-3", requirementId: "r-022", description: "Project lead can assign roles", satisfied: false },
    ],
    architectureDecisions: [
      { architectureDecisionId: "ad-1", workspaceId: "ws-main", projectId: "p-auth", title: "Use JWT for sessions", context: "Stateless auth needed", decision: "Use signed JWT with short expiry + refresh", status: "accepted", createdAt: now },
      { architectureDecisionId: "ad-2", workspaceId: "ws-main", projectId: "p-console", title: "SolidJS frontend", context: "Reactive performance", decision: "Use SolidJS + Vite", status: "accepted", createdAt: now },
    ],
    epics: [
      { epicId: "ep-1", workspaceId: "ws-main", projectId: "p-auth", name: "Core Auth", description: "Foundation auth features" },
    ],
    tasks: [
      { taskId: "t-101", workspaceId: "ws-main", projectId: "p-auth", requirementId: "r-021", title: "Implement login endpoint", description: "POST /auth/login", priority: "critical", status: "in_progress", createdAt: now, updatedAt: now },
      { taskId: "t-102", workspaceId: "ws-main", projectId: "p-auth", requirementId: "r-021", title: "Implement JWT middleware", description: "Verify tokens", priority: "high", status: "review", createdAt: now, updatedAt: now },
      { taskId: "t-103", workspaceId: "ws-main", projectId: "p-auth", requirementId: "r-021", title: "Write auth tests", description: "Unit + integration", priority: "high", status: "verification", createdAt: now, updatedAt: now },
      { taskId: "t-104", workspaceId: "ws-main", projectId: "p-auth", requirementId: "r-022", title: "RBAC policy engine", description: "Role checks", priority: "medium", status: "blocked", createdAt: now, updatedAt: now },
      { taskId: "t-105", workspaceId: "ws-main", projectId: "p-console", title: "Project switcher UI", description: "Dropdown switcher", priority: "high", status: "done", createdAt: now, updatedAt: now },
      { taskId: "t-106", workspaceId: "ws-main", projectId: "p-billing", title: "Token counter service", description: "Count tokens", priority: "medium", status: "ready", createdAt: now, updatedAt: now },
    ],
    taskAssignments: [
      { taskAssignmentId: "ta-1", taskId: "t-101", agentAssignmentId: "asg-1" },
      { taskAssignmentId: "ta-2", taskId: "t-102", agentAssignmentId: "asg-2" },
      { taskAssignmentId: "ta-3", taskId: "t-103", agentAssignmentId: "asg-4" },
    ],
    workflows: [
      { workflowId: "wf-secure", workspaceId: "ws-main", name: "Secure Feature Development", description: "Feature workflow with security gates", stepIds: ["ws-1", "ws-2", "ws-3", "ws-4", "ws-5", "ws-6", "ws-7", "ws-8", "ws-9"] },
      { workflowId: "wf-debug", workspaceId: "ws-main", name: "Systematic Debugging", description: "Diagnosis to regression verification", stepIds: ["ws-10", "ws-11", "ws-12", "ws-13", "ws-14", "ws-15", "ws-16", "ws-17"] },
    ],
    workflowSteps: [
      { workflowStepId: "ws-1", workflowId: "wf-secure", name: "Brainstorm", type: "process", order: 1, skillIds: [], gate: false, approvalRequired: false },
      { workflowStepId: "ws-2", workflowId: "wf-secure", name: "Specification", type: "process", order: 2, skillIds: [], gate: false, approvalRequired: true },
      { workflowStepId: "ws-3", workflowId: "wf-secure", name: "Approval", type: "gate", order: 3, skillIds: [], gate: true, approvalRequired: true },
      { workflowStepId: "ws-4", workflowId: "wf-secure", name: "Writing Plan", type: "process", order: 4, skillIds: ["sk-plan"], gate: false, approvalRequired: false },
      { workflowStepId: "ws-5", workflowId: "wf-secure", name: "Implementation", type: "process", order: 5, skillIds: [], gate: false, approvalRequired: false },
      { workflowStepId: "ws-6", workflowId: "wf-secure", name: "TDD", type: "process", order: 6, skillIds: ["sk-tdd"], gate: false, approvalRequired: false },
      { workflowStepId: "ws-7", workflowId: "wf-secure", name: "Code Review", type: "process", order: 7, skillIds: ["sk-review"], gate: false, approvalRequired: true },
      { workflowStepId: "ws-8", workflowId: "wf-secure", name: "Verification", type: "process", order: 8, skillIds: ["sk-verify"], gate: true, approvalRequired: false },
      { workflowStepId: "ws-9", workflowId: "wf-secure", name: "Release", type: "gate", order: 9, skillIds: [], gate: true, approvalRequired: true },
      { workflowStepId: "ws-10", workflowId: "wf-debug", name: "Failure", type: "process", order: 1, skillIds: [], gate: false, approvalRequired: false },
      { workflowStepId: "ws-11", workflowId: "wf-debug", name: "Diagnosis", type: "process", order: 2, skillIds: [], gate: false, approvalRequired: false },
      { workflowStepId: "ws-12", workflowId: "wf-debug", name: "Hypothesis", type: "process", order: 3, skillIds: [], gate: false, approvalRequired: false },
      { workflowStepId: "ws-13", workflowId: "wf-debug", name: "Experiment", type: "process", order: 4, skillIds: [], gate: false, approvalRequired: false },
      { workflowStepId: "ws-14", workflowId: "wf-debug", name: "Evidence", type: "process", order: 5, skillIds: [], gate: false, approvalRequired: false },
      { workflowStepId: "ws-15", workflowId: "wf-debug", name: "Root Cause", type: "process", order: 6, skillIds: [], gate: false, approvalRequired: false },
      { workflowStepId: "ws-16", workflowId: "wf-debug", name: "Fix", type: "process", order: 7, skillIds: [], gate: false, approvalRequired: false },
      { workflowStepId: "ws-17", workflowId: "wf-debug", name: "Regression Verification", type: "process", order: 8, skillIds: ["sk-verify"], gate: true, approvalRequired: false },
    ],
    workflowRuns: [
      { workflowRunId: "wfr-1", workspaceId: "ws-main", projectId: "p-auth", workflowId: "wf-secure", status: "running", createdAt: now, updatedAt: now },
    ],
    executions: [
      { executionId: "ex-8821", workspaceId: "ws-main", projectId: "p-auth", agentSessionId: "s-101", taskId: "t-101", status: "running", input: "Implement login endpoint", createdAt: now, updatedAt: now },
      { executionId: "ex-8820", workspaceId: "ws-main", projectId: "p-auth", agentSessionId: "s-101", taskId: "t-101", status: "succeeded", input: "Draft login endpoint", createdAt: now, updatedAt: now },
      { executionId: "ex-8819", workspaceId: "ws-main", projectId: "p-auth", agentSessionId: "s-102", taskId: "t-102", status: "failed", input: "Security scan of JWT middleware", createdAt: now, updatedAt: now },
      { executionId: "ex-8818", workspaceId: "ws-main", projectId: "p-billing", agentSessionId: "s-103", taskId: "t-106", status: "queued", input: "Run billing tests", createdAt: now, updatedAt: now },
    ],
    executionEvents: [
      { executionEventId: "ee-1", executionId: "ex-8821", timestamp: now, type: "started", message: "Execution started" },
      { executionEventId: "ee-2", executionId: "ex-8821", timestamp: now, type: "tool_call", message: "git commit" },
    ],
    executionUsage: [
      { executionId: "ex-8820", gatewayId: "gw-1", modelId: "md-1", inputTokens: 1200, outputTokens: 800, totalTokens: 2000, estimatedCost: 0.02, currency: "USD", durationMs: 3500 },
    ],
    sandboxes: [
      { sandboxId: "sb-1", executionId: "ex-8821", projectId: "p-auth", filesystemScope: "project-worktree", networkScope: "isolated", capabilityIds: ["cap-repo.write", "cap-test.run"], environmentVariables: true, secretAccess: "restricted", resourceLimits: "2vcpu 2GB", status: "running" },
    ],
    environments: [
      { environmentId: "env-dev", projectId: "p-auth", type: "development", name: "Development", status: "active", configurationSummary: "local dev", endpoint: "http://localhost:5173" },
      { environmentId: "env-stage", projectId: "p-auth", type: "staging", name: "Staging", status: "ready", configurationSummary: "staging server" },
      { environmentId: "env-prod", projectId: "p-auth", type: "production", name: "Production", status: "inactive", configurationSummary: "prod cluster" },
    ],
    verifications: [
      { verificationId: "v-1", workspaceId: "ws-main", projectId: "p-auth", executionId: "ex-8819", taskId: "t-102", status: "failed", type: "security", startedAt: now, completedAt: now },
      { verificationId: "v-2", workspaceId: "ws-main", projectId: "p-console", taskId: "t-105", status: "passed", type: "e2e", startedAt: now, completedAt: now },
    ],
    verificationChecks: [
      { verificationCheckId: "vc-1", verificationId: "v-1", name: "XSS scan", status: "passed" },
      { verificationCheckId: "vc-2", verificationId: "v-1", name: "Auth bypass", status: "failed" },
    ],
    codeReviews: [
      { codeReviewId: "cr-1", workspaceId: "ws-main", projectId: "p-auth", taskId: "t-102", status: "changes_requested", reviewerId: "u-mutiah", createdAt: now },
    ],
    reviewFindings: [
      { reviewFindingId: "rf-1", codeReviewId: "cr-1", severity: "high", file: "middleware/jwt.ts", line: 42, description: "Token not checked against revocation list", resolved: false },
      { reviewFindingId: "rf-2", codeReviewId: "cr-1", severity: "medium", file: "middleware/jwt.ts", line: 55, description: "Missing audience claim validation", resolved: true, resolution: "Added audience check" },
    ],
    evidence: [
      { evidenceId: "ev-1", workspaceId: "ws-main", projectId: "p-auth", taskId: "t-103", verificationId: "v-2", type: "test_report", summary: "All auth unit tests passed", createdAt: now },
    ],
    releases: [
      { releaseId: "rel-1", workspaceId: "ws-main", projectId: "p-console", version: "v0.1.0", status: "production", createdAt: now },
      { releaseId: "rel-2", workspaceId: "ws-main", projectId: "p-auth", version: "v0.2.0-rc", status: "candidate", createdAt: now },
    ],
    releaseGates: [
      { releaseGateId: "rg-1", releaseId: "rel-2", name: "Build", passed: true },
      { releaseGateId: "rg-2", releaseId: "rel-2", name: "Unit Tests", passed: true },
      { releaseGateId: "rg-3", releaseId: "rel-2", name: "Security Scan", passed: false },
      { releaseGateId: "rg-4", releaseId: "rel-2", name: "Approval", passed: false },
    ],
    deployments: [
      { deploymentId: "dep-1", workspaceId: "ws-main", projectId: "p-console", releaseId: "rel-1", environmentId: "env-prod", status: "healthy", createdAt: now },
    ],
    approvals: [
      { approvalId: "appr-1", requestedByUserId: "u-rafi", resourceType: "agent_assignment", resourceId: "asg-3", action: "request_agent", riskLevel: "medium", status: "pending", requestedAt: now },
      { approvalId: "appr-2", requestedByUserId: "u-eqii", resourceType: "release", resourceId: "rel-2", action: "release.approved", riskLevel: "high", status: "pending", requestedAt: now },
    ],
    auditEvents: [
      { auditEventId: "aud-1", workspaceId: "ws-main", projectId: "p-auth", actorUserId: "u-eqii", action: "project.created", resourceType: "project", resourceId: "p-auth", occurredAt: now },
      { auditEventId: "aud-2", workspaceId: "ws-main", projectId: "p-auth", actorUserId: "u-mutiah", action: "agent.requested", resourceType: "agent_assignment", resourceId: "asg-3", occurredAt: now },
      { auditEventId: "aud-3", workspaceId: "ws-main", projectId: "p-auth", action: "execution.failed", resourceType: "execution", resourceId: "ex-8819", occurredAt: now },
    ],
    notifications: [
      { notificationId: "nt-1", userId: "u-eqii", title: "Agent request awaiting approval", body: "Rafi requested Airin for p-console", read: false, createdAt: now },
      { notificationId: "nt-2", userId: "u-eqii", title: "Verification failed", body: "Security scan failed on t-102", read: false, createdAt: now },
    ],
    gateways: [
      { gatewayId: "gw-1", workspaceId: "ws-main", name: "9router", provider: "9router", modelIds: ["md-1", "md-2"] },
    ],
    models: [
      { modelId: "md-1", gatewayId: "gw-1", name: "deepseek-v4-flash", provider: "9router", costPer1KInput: 0.0005, costPer1KOutput: 0.0015 },
      { modelId: "md-2", gatewayId: "gw-1", name: "gpt-5.6-luna", provider: "9router", costPer1KInput: 0.001, costPer1KOutput: 0.003 },
    ],
    modelCapabilities: [
      { modelCapabilityId: "mc-1", modelId: "md-1", capability: "text" },
      { modelCapabilityId: "mc-2", modelId: "md-2", capability: "text" },
    ],
    routingPolicies: [
      { routingPolicyId: "rp-1", workspaceId: "ws-main", name: "Default routing", ruleIds: ["rr-1"] },
    ],
    routingRules: [
      { routingRuleId: "rr-1", routingPolicyId: "rp-1", match: "default", modelId: "md-1" },
    ],
    artifacts: [
      { id: "art-1", projectId: "p-auth", executionId: "ex-8820", type: "code", version: "v1", storageKey: "s3://auth/middleware.ts", createdAt: now },
      { id: "art-2", projectId: "p-auth", executionId: "ex-8819", type: "security_report", version: "v1", storageKey: "s3://auth/scan.json", createdAt: now },
    ],
  };
}
