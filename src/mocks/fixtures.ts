// Demo fixtures — LIVE OPERATING DEMONSTRATION (spec 153-207)
// Semua data berasal dari satu sumber kebenaran (mock db).
// Ini FIKTIF/demo, bukan representasi dunia nyata.
// Distribusi: 3 owner, 15 agent, 10 project, work fields, findings, reports.

import type { DBShape } from "../adapters/mock/db";

const now = "2026-09-01T14:00:00.000Z";
const t = (h: number) => new Date(new Date(now).getTime() - h * 3600_000).toISOString();

export function buildFixtures(): DBShape {
  return {
    version: 3,
    users: [
      { userId: "u-rizqullah", email: "rizqullah@demo.com", displayName: "Rizqullah Akbar", workspaceId: "ws-main", createdAt: t(48) },
      { userId: "u-farid", email: "farid@demo.com", displayName: "Maestro Farid W", workspaceId: "ws-main", createdAt: t(48) },
      { userId: "u-elon", email: "elon@demo.com", displayName: "Elon Musk", workspaceId: "ws-main", createdAt: t(48) },
    ],
    workspaces: [{ workspaceId: "ws-main", name: "Software-Development-Agents", createdAt: t(48) }],

    // ============ OWNERS (spec 154-155) ============
    agentOwners: [
      { ownerId: "o-rizqullah", workspaceId: "ws-main", displayName: "Rizqullah Akbar", role: "AI Systems & Product Engineering", focus: ["Agentic software development", "Full-stack engineering", "AI orchestration", "Developer tooling"] },
      { ownerId: "o-farid", workspaceId: "ws-main", displayName: "Maestro Farid W", role: "Engineering & Automation", focus: ["Backend engineering", "Automation", "Infrastructure", "DevOps", "Systems reliability"] },
      { ownerId: "o-elon", workspaceId: "ws-main", displayName: "Elon Musk", role: "Product Engineering & Systems", focus: ["Systems engineering", "Product prototyping", "Infrastructure", "Optimization"] },
    ],

    // ============ PROJECTS (spec 161-162) ============
    projects: [
      { projectId: "p-console", workspaceId: "ws-main", name: "Hermes Console", description: "Kontrol tower & kolaborasi multi-agent", status: "active", phase: "build", leadId: "u-rizqullah", createdAt: t(40), updatedAt: t(1) },
      { projectId: "p-ai-research", workspaceId: "ws-main", name: "AI Research Workspace", description: "Workspace riset AI berbasis evidence", status: "active", phase: "build", leadId: "u-farid", createdAt: t(36), updatedAt: t(2) },
      { projectId: "p-commerce", workspaceId: "ws-main", name: "Autonomous Commerce Platform", description: "Platform commerce otonom", status: "active", phase: "review", leadId: "u-elon", createdAt: t(34), updatedAt: t(3) },
      { projectId: "p-dev-analytics", workspaceId: "ws-main", name: "Developer Analytics", description: "Analitik perilaku developer", status: "active", phase: "verify", leadId: "u-rizqullah", createdAt: t(30), updatedAt: t(5) },
      { projectId: "p-healthcare", workspaceId: "ws-main", name: "Healthcare Workflow Platform", description: "Platform alur kerja healthcare", status: "active", phase: "design", leadId: "u-farid", createdAt: t(28), updatedAt: t(6) },
      { projectId: "p-collab", workspaceId: "ws-main", name: "Real-Time Collaboration Suite", description: "Suite kolaborasi real-time", status: "active", phase: "build", leadId: "u-elon", createdAt: t(26), updatedAt: t(4) },
      { projectId: "p-infra", workspaceId: "ws-main", name: "Infrastructure Control Center", description: "Pusat kontrol infrastruktur", status: "active", phase: "plan", leadId: "u-farid", createdAt: t(24), updatedAt: t(7) },
      { projectId: "p-marketplace", workspaceId: "ws-main", name: "AI Agent Marketplace", description: "Marketplace agent AI", status: "planning", phase: "discover", leadId: "u-rizqullah", createdAt: t(20), updatedAt: t(8) },
      { projectId: "p-iot", workspaceId: "ws-main", name: "IoT Monitoring Platform", description: "Platform monitoring IoT", status: "active", phase: "build", leadId: "u-elon", createdAt: t(18), updatedAt: t(9) },
      { projectId: "p-identity", workspaceId: "ws-main", name: "Secure Identity Platform", description: "Platform identitas aman", status: "active", phase: "verify", leadId: "u-rizqullah", createdAt: t(16), updatedAt: t(10) },
    ],
    memberships: [
      // Rizqullah
      { membershipId: "m-1", workspaceId: "ws-main", projectId: "p-console", userId: "u-rizqullah", role: "project_lead", joinedAt: t(40) },
      { membershipId: "m-2", workspaceId: "ws-main", projectId: "p-ai-research", userId: "u-rizqullah", role: "contributor", joinedAt: t(36) },
      { membershipId: "m-3", workspaceId: "ws-main", projectId: "p-identity", userId: "u-rizqullah", role: "reviewer", joinedAt: t(16) },
      { membershipId: "m-4", workspaceId: "ws-main", projectId: "p-dev-analytics", userId: "u-rizqullah", role: "project_lead", joinedAt: t(30) },
      { membershipId: "m-5", workspaceId: "ws-main", projectId: "p-marketplace", userId: "u-rizqullah", role: "project_lead", joinedAt: t(20) },
      // Farid
      { membershipId: "m-6", workspaceId: "ws-main", projectId: "p-ai-research", userId: "u-farid", role: "project_lead", joinedAt: t(36) },
      { membershipId: "m-7", workspaceId: "ws-main", projectId: "p-console", userId: "u-farid", role: "reviewer", joinedAt: t(40) },
      { membershipId: "m-8", workspaceId: "ws-main", projectId: "p-infra", userId: "u-farid", role: "project_lead", joinedAt: t(24) },
      { membershipId: "m-9", workspaceId: "ws-main", projectId: "p-healthcare", userId: "u-farid", role: "project_lead", joinedAt: t(28) },
      // Elon
      { membershipId: "m-10", workspaceId: "ws-main", projectId: "p-commerce", userId: "u-elon", role: "project_lead", joinedAt: t(34) },
      { membershipId: "m-11", workspaceId: "ws-main", projectId: "p-infra", userId: "u-elon", role: "contributor", joinedAt: t(24) },
      { membershipId: "m-12", workspaceId: "ws-main", projectId: "p-collab", userId: "u-elon", role: "reviewer", joinedAt: t(26) },
      { membershipId: "m-13", workspaceId: "ws-main", projectId: "p-iot", userId: "u-elon", role: "project_lead", joinedAt: t(18) },
    ],

    // ============ AGENTS (spec 156-159) ============
    agents: [
      // Rizqullah Akbar
      { agentId: "a-hermes-forge", workspaceId: "ws-main", name: "Hermes Forge", description: "Lead Development Agent — orkestrasi & full-stack", role: "Lead Development Agent", ownerId: "o-rizqullah", currentVersionId: "av-hf", createdAt: t(45) },
      { agentId: "a-ravix", workspaceId: "ws-main", name: "Ravix", description: "Security Engineering Agent — threat modeling & audit", role: "Security Engineering Agent", ownerId: "o-rizqullah", currentVersionId: "av-rv", createdAt: t(44) },
      { agentId: "a-astra", workspaceId: "ws-main", name: "Astra Code", description: "Frontend Engineering Agent — React/SolidJS/TS", role: "Frontend Engineering Agent", ownerId: "o-rizqullah", currentVersionId: "av-as", createdAt: t(43) },
      { agentId: "a-sentinel", workspaceId: "ws-main", name: "Sentinel QA", description: "Quality Assurance Agent — unit/integration/e2e", role: "Quality Assurance Agent", ownerId: "o-rizqullah", currentVersionId: "av-sq", createdAt: t(42) },
      { agentId: "a-nexa", workspaceId: "ws-main", name: "Nexa Architect", description: "Software Architecture Agent — system & API design", role: "Software Architecture Agent", ownerId: "o-rizqullah", currentVersionId: "av-nx", createdAt: t(41) },
      // Maestro Farid W
      { agentId: "a-forgewell", workspaceId: "ws-main", name: "Forgewell", description: "Backend Engineering Agent — Node.js & API", role: "Backend Engineering Agent", ownerId: "o-farid", currentVersionId: "av-fw", createdAt: t(45) },
      { agentId: "a-arclight", workspaceId: "ws-main", name: "Arclight", description: "Systems Analysis Agent — performance & dependencies", role: "Systems Analysis Agent", ownerId: "o-farid", currentVersionId: "av-al", createdAt: t(44) },
      { agentId: "a-kairo", workspaceId: "ws-main", name: "Kairo DevOps", description: "DevOps Agent — Docker, CI/CD, observability", role: "DevOps Agent", ownerId: "o-farid", currentVersionId: "av-kd", createdAt: t(43) },
      { agentId: "a-helix", workspaceId: "ws-main", name: "Helix Backend", description: "Backend Optimization Agent — performance & caching", role: "Backend Optimization Agent", ownerId: "o-farid", currentVersionId: "av-hx", createdAt: t(42) },
      { agentId: "a-atlas", workspaceId: "ws-main", name: "Atlas Infra", description: "Infrastructure Agent — infra planning & deployment", role: "Infrastructure Agent", ownerId: "o-farid", currentVersionId: "av-at", createdAt: t(41) },
      // Elon Musk
      { agentId: "a-vector", workspaceId: "ws-main", name: "Vector", description: "Systems Engineering Agent — architecture & optimization", role: "Systems Engineering Agent", ownerId: "o-elon", currentVersionId: "av-vec", createdAt: t(45) },
      { agentId: "a-falcon", workspaceId: "ws-main", name: "Falcon Code", description: "Rapid Prototyping Agent — full-stack experiments", role: "Rapid Prototyping Agent", ownerId: "o-elon", currentVersionId: "av-fc", createdAt: t(44) },
      { agentId: "a-orion", workspaceId: "ws-main", name: "Orion Systems", description: "Distributed Systems Agent — messaging & scaling", role: "Distributed Systems Agent", ownerId: "o-elon", currentVersionId: "av-or", createdAt: t(43) },
      { agentId: "a-tesla-forge", workspaceId: "ws-main", name: "Tesla Forge", description: "Application Engineering Agent — full-stack & refactor", role: "Application Engineering Agent", ownerId: "o-elon", currentVersionId: "av-tf", createdAt: t(42) },
      { agentId: "a-gridpilot", workspaceId: "ws-main", name: "GridPilot", description: "Infrastructure Optimization Agent — resource & deploy", role: "Infrastructure Optimization Agent", ownerId: "o-elon", currentVersionId: "av-gp", createdAt: t(41) },
    ],
    agentVersions: [
      { agentVersionId: "av-hf", agentId: "a-hermes-forge", version: "v3", soulId: "soul-hf", createdAt: t(45) },
      { agentVersionId: "av-rv", agentId: "a-ravix", version: "v2", soulId: "soul-rv", createdAt: t(44) },
      { agentVersionId: "av-as", agentId: "a-astra", version: "v2", soulId: "soul-as", createdAt: t(43) },
      { agentVersionId: "av-sq", agentId: "a-sentinel", version: "v1", soulId: "soul-sq", createdAt: t(42) },
      { agentVersionId: "av-nx", agentId: "a-nexa", version: "v1", soulId: "soul-nx", createdAt: t(41) },
      { agentVersionId: "av-fw", agentId: "a-forgewell", version: "v2", soulId: "soul-fw", createdAt: t(45) },
      { agentVersionId: "av-al", agentId: "a-arclight", version: "v1", soulId: "soul-al", createdAt: t(44) },
      { agentVersionId: "av-kd", agentId: "a-kairo", version: "v1", soulId: "soul-kd", createdAt: t(43) },
      { agentVersionId: "av-hx", agentId: "a-helix", version: "v1", soulId: "soul-hx", createdAt: t(42) },
      { agentVersionId: "av-at", agentId: "a-atlas", version: "v1", soulId: "soul-at", createdAt: t(41) },
      { agentVersionId: "av-vec", agentId: "a-vector", version: "v1", soulId: "soul-vec", createdAt: t(45) },
      { agentVersionId: "av-fc", agentId: "a-falcon", version: "v1", soulId: "soul-fc", createdAt: t(44) },
      { agentVersionId: "av-or", agentId: "a-orion", version: "v1", soulId: "soul-or", createdAt: t(43) },
      { agentVersionId: "av-tf", agentId: "a-tesla-forge", version: "v1", soulId: "soul-tf", createdAt: t(42) },
      { agentVersionId: "av-gp", agentId: "a-gridpilot", version: "v1", soulId: "soul-gp", createdAt: t(41) },
    ],
    souls: [
      { soulId: "soul-hf", agentId: "a-hermes-forge", version: "v3", status: "active", content: "Lead development agent. Orkestrasi, planning, verification-before-completion.", createdAt: t(45) },
      { soulId: "soul-rv", agentId: "a-ravix", version: "v2", status: "active", content: "Security reviewer. Threat-model everything. Never assume trust.", createdAt: t(44) },
      { soulId: "soul-as", agentId: "a-astra", version: "v2", status: "active", content: "Frontend specialist. Accessible, responsive, typed.", createdAt: t(43) },
      { soulId: "soul-sq", agentId: "a-sentinel", version: "v1", status: "testing", content: "QA verifier. Evidence required before done.", createdAt: t(42) },
      { soulId: "soul-nx", agentId: "a-nexa", version: "v1", status: "active", content: "Architect. Decisions with context and consequences.", createdAt: t(41) },
      { soulId: "soul-fw", agentId: "a-forgewell", version: "v2", status: "active", content: "Backend engineer. Robust, tested APIs.", createdAt: t(45) },
      { soulId: "soul-al", agentId: "a-arclight", version: "v1", status: "active", content: "Systems analyst. Map dependencies, find bottlenecks.", createdAt: t(44) },
      { soulId: "soul-kd", agentId: "a-kairo", version: "v1", status: "active", content: "DevOps. Reproducible builds, observable systems.", createdAt: t(43) },
      { soulId: "soul-hx", agentId: "a-helix", version: "v1", status: "active", content: "Backend optimizer. Cache, profile, tune.", createdAt: t(42) },
      { soulId: "soul-at", agentId: "a-atlas", version: "v1", status: "draft", content: "Infra planner. Resource-conscious architecture.", createdAt: t(41) },
      { soulId: "soul-vec", agentId: "a-vector", version: "v1", status: "active", content: "Systems engineer. Holistic performance.", createdAt: t(45) },
      { soulId: "soul-fc", agentId: "a-falcon", version: "v1", status: "active", content: "Prototyper. Ship experiments fast.", createdAt: t(44) },
      { soulId: "soul-or", agentId: "a-orion", version: "v1", status: "active", content: "Distributed systems. Scale with messaging.", createdAt: t(43) },
      { soulId: "soul-tf", agentId: "a-tesla-forge", version: "v1", status: "testing", content: "Application engineer. Feature-driven.", createdAt: t(42) },
      { soulId: "soul-gp", agentId: "a-gridpilot", version: "v1", status: "active", content: "Infra optimizer. Deploy efficiently.", createdAt: t(41) },
    ],

    // ============ ASSIGNMENTS (spec 164, 169) ============
    assignments: [
      // Hermes Console (p-console)
      { agentAssignmentId: "asg-hf", workspaceId: "ws-main", projectId: "p-console", agentId: "a-hermes-forge", userId: "u-rizqullah", role: "Lead Development Agent", scope: "OAuth Authentication · Backend", status: "active", approvalStatus: "approved", requestedAt: t(10), decidedAt: t(9) },
      { agentAssignmentId: "asg-astra", workspaceId: "ws-main", projectId: "p-console", agentId: "a-astra", userId: "u-rizqullah", role: "Frontend Engineer", scope: "OAuth Authentication · Frontend", status: "active", approvalStatus: "approved", requestedAt: t(10), decidedAt: t(9) },
      { agentAssignmentId: "asg-sentinel", workspaceId: "ws-main", projectId: "p-console", agentId: "a-sentinel", userId: "u-rizqullah", role: "QA Engineer", scope: "OAuth Authentication · Testing", status: "active", approvalStatus: "approved", requestedAt: t(10), decidedAt: t(9) },
      { agentAssignmentId: "asg-ravix", workspaceId: "ws-main", projectId: "p-console", agentId: "a-ravix", userId: "u-rizqullah", role: "Security Reviewer", scope: "OAuth Authentication · Security", status: "active", approvalStatus: "approved", requestedAt: t(10), decidedAt: t(9) },
      // AI Research (p-ai-research)
      { agentAssignmentId: "asg-nexa", workspaceId: "ws-main", projectId: "p-ai-research", agentId: "a-nexa", userId: "u-farid", role: "Architect", scope: "Research workspace architecture", status: "active", approvalStatus: "approved", requestedAt: t(8), decidedAt: t(7) },
      { agentAssignmentId: "asg-forgewell", workspaceId: "ws-main", projectId: "p-ai-research", agentId: "a-forgewell", userId: "u-farid", role: "Backend Engineer", scope: "Research API", status: "active", approvalStatus: "approved", requestedAt: t(8), decidedAt: t(7) },
      // Pending request (Astra Code untuk project lain — pending approval)
      { agentAssignmentId: "asg-pending", workspaceId: "ws-main", projectId: "p-commerce", agentId: "a-astra", userId: "u-elon", role: "Frontend Engineer", scope: "Commerce storefront", status: "pending", approvalStatus: "pending", requestedAt: t(1) },
    ],

    // ============ SESSIONS (spec 169) ============
    sessions: [
      { agentSessionId: "s-182", workspaceId: "ws-main", projectId: "p-console", agentAssignmentId: "asg-hf", agentId: "a-hermes-forge", status: "active", context: "Implement OAuth callback", createdAt: t(6), updatedAt: t(0.1) },
      { agentSessionId: "s-184", workspaceId: "ws-main", projectId: "p-console", agentAssignmentId: "asg-astra", agentId: "a-astra", status: "active", context: "Implement OAuth login UI", createdAt: t(5), updatedAt: t(0.2) },
      { agentSessionId: "s-186", workspaceId: "ws-main", projectId: "p-console", agentAssignmentId: "asg-ravix", agentId: "a-ravix", status: "waiting", context: "Security review OAuth flow", createdAt: t(4), updatedAt: t(0.5) },
      { agentSessionId: "s-188", workspaceId: "ws-main", projectId: "p-console", agentAssignmentId: "asg-sentinel", agentId: "a-sentinel", status: "active", context: "Integration testing", createdAt: t(3), updatedAt: t(0.3) },
      { agentSessionId: "s-201", workspaceId: "ws-main", projectId: "p-ai-research", agentAssignmentId: "asg-forgewell", agentId: "a-forgewell", status: "active", context: "Research API build", createdAt: t(7), updatedAt: t(1) },
    ],

    // ============ WORK FIELDS (spec 165-168, 187) ============
    workFields: [
      { workFieldId: "wf-auth", workspaceId: "ws-main", projectId: "p-console", name: "Authentication", subContexts: ["Backend", "Frontend", "Security", "Testing"], artifactIds: ["art-api-contract", "art-ad-oauth"] },
      { workFieldId: "wf-onboarding", workspaceId: "ws-main", projectId: "p-console", name: "Onboarding", subContexts: ["Frontend", "Backend"], artifactIds: [] },
    ],
    workFieldParticipants: [
      { workFieldParticipantId: "wfp-1", workFieldId: "wf-auth", agentAssignmentId: "asg-hf", subContext: "Backend" },
      { workFieldParticipantId: "wfp-2", workFieldId: "wf-auth", agentAssignmentId: "asg-astra", subContext: "Frontend" },
      { workFieldParticipantId: "wfp-3", workFieldId: "wf-auth", agentAssignmentId: "asg-ravix", subContext: "Security Review" },
      { workFieldParticipantId: "wfp-4", workFieldId: "wf-auth", agentAssignmentId: "asg-sentinel", subContext: "Test Waiting" },
    ],

    // ============ FINDINGS (spec 176, 189) ============
    findings: [
      { findingId: "f-31", workspaceId: "ws-main", projectId: "p-console", taskId: "t-102", executionId: "ex-8823", severity: "high", category: "Security", file: "auth.service.ts", issue: "Token issuer validation missing", status: "resolved", resolution: "Added issuer claim validation", createdAt: t(5) },
      { findingId: "f-32", workspaceId: "ws-main", projectId: "p-console", taskId: "t-104", executionId: "ex-8822", severity: "medium", category: "Quality", file: "LoginForm.tsx", issue: "Missing error-state accessibility label", status: "open", createdAt: t(2) },
      { findingId: "f-33", workspaceId: "ws-main", projectId: "p-ai-research", taskId: "t-201", severity: "low", category: "Performance", file: "research.service.ts", issue: "Unnecessary query re-fetch", status: "open", createdAt: t(4) },
    ],

    // ============ WORK REPORTS (spec 177) ============
    workReports: [
      { reportId: "rpt-1", workspaceId: "ws-main", projectId: "p-console", taskId: "t-101", agentId: "a-hermes-forge", summary: "OAuth callback implemented successfully.", changes: ["auth.service.ts", "auth.controller.ts", "auth.test.ts"], testsPassed: 18, securityResolved: 1, artifacts: ["API contract", "test report", "implementation diff"], recommendation: "Ready for verification.", createdAt: t(1) },
      { reportId: "rpt-2", workspaceId: "ws-main", projectId: "p-console", taskId: "t-103", agentId: "a-sentinel", summary: "Integration tests completed for auth flow.", changes: ["auth.integration.test.ts"], testsPassed: 22, securityResolved: 0, artifacts: ["test report"], recommendation: "Passed.", createdAt: t(0.5) },
    ],

    // ============ HANDOFFS (spec 167) ============
    handoffs: [
      { handoffId: "h-1", workspaceId: "ws-main", projectId: "p-console", workFieldId: "wf-auth", fromAgentId: "a-hermes-forge", toAgentId: "a-astra", message: "Backend implementation completed. Received API contract v3.", createdAt: t(4) },
      { handoffId: "h-2", workspaceId: "ws-main", projectId: "p-console", workFieldId: "wf-auth", fromAgentId: "a-astra", toAgentId: "a-sentinel", message: "UI integration complete. Started integration testing.", createdAt: t(2.5) },
      { handoffId: "h-3", workspaceId: "ws-main", projectId: "p-console", workFieldId: "wf-auth", fromAgentId: "a-sentinel", toAgentId: "a-ravix", message: "Requested security review.", createdAt: t(1.5) },
    ],

    // ============ SKILLS / CAPABILITIES ============
    skills: [
      { skillId: "sk-fullstack", workspaceId: "ws-main", name: "Full-Stack Development", type: "capability", category: "Engineering", version: "v1", description: "Full-stack development", riskLevel: "low" },
      { skillId: "sk-security", workspaceId: "ws-main", name: "Security Analysis", type: "capability", category: "Security", version: "v1", description: "Threat modeling & audit", riskLevel: "high" },
      { skillId: "sk-frontend", workspaceId: "ws-main", name: "Frontend Engineering", type: "capability", category: "Frontend", version: "v1", description: "React/SolidJS/TS", riskLevel: "low" },
      { skillId: "sk-qa", workspaceId: "ws-main", name: "Quality Assurance", type: "capability", category: "QA", version: "v1", description: "Testing", riskLevel: "low" },
      { skillId: "sk-arch", workspaceId: "ws-main", name: "Software Architecture", type: "capability", category: "Architecture", version: "v1", description: "System design", riskLevel: "medium" },
      { skillId: "sk-backend", workspaceId: "ws-main", name: "Backend Engineering", type: "capability", category: "Backend", version: "v1", description: "Node.js & API", riskLevel: "low" },
      { skillId: "sk-devops", workspaceId: "ws-main", name: "DevOps", type: "capability", category: "Infrastructure", version: "v1", description: "Docker/CI/CD", riskLevel: "medium" },
      { skillId: "sk-systems", workspaceId: "ws-main", name: "Systems Engineering", type: "capability", category: "Systems", version: "v1", description: "Architecture & optimization", riskLevel: "medium" },
      { skillId: "sk-prototype", workspaceId: "ws-main", name: "Rapid Prototyping", type: "capability", category: "Engineering", version: "v1", description: "Prototypes", riskLevel: "low" },
      { skillId: "sk-distributed", workspaceId: "ws-main", name: "Distributed Systems", type: "capability", category: "Systems", version: "v1", description: "Scaling & messaging", riskLevel: "high" },
      // Process skills (spec 13)
      { skillId: "sk-brainstorm", workspaceId: "ws-main", name: "Brainstorming", type: "process", category: "Process", version: "v1", description: "Generate ideas", riskLevel: "low" },
      { skillId: "sk-write-plans", workspaceId: "ws-main", name: "Writing Plans", type: "process", category: "Process", version: "v1", description: "Author plans", riskLevel: "low" },
      { skillId: "sk-execute-plans", workspaceId: "ws-main", name: "Executing Plans", type: "process", category: "Process", version: "v1", description: "Execute plans", riskLevel: "low" },
      { skillId: "sk-tdd", workspaceId: "ws-main", name: "Test-Driven Development", type: "process", category: "Process", version: "v1", description: "Red-green-refactor", riskLevel: "low" },
      { skillId: "sk-verify", workspaceId: "ws-main", name: "Verification Before Completion", type: "process", category: "Process", version: "v1", description: "Verify before done", riskLevel: "medium" },
      { skillId: "sk-review", workspaceId: "ws-main", name: "Requesting Code Review", type: "process", category: "Process", version: "v1", description: "Review workflow", riskLevel: "medium" },
      // Global-only skills — tidak terikat agent manapun (partisi global)
      { skillId: "sk-git-worktree", workspaceId: "ws-main", name: "Using Git Worktrees", type: "process", category: "Process", version: "v1", description: "Isolated worktrees", riskLevel: "low" },
      { skillId: "sk-parallel-dispatch", workspaceId: "ws-main", name: "Parallel Agent Dispatch", type: "process", category: "Process", version: "v1", description: "Run agents in parallel", riskLevel: "medium" },
      { skillId: "sk-debug", workspaceId: "ws-main", name: "Systematic Debugging", type: "process", category: "Process", version: "v1", description: "Diagnosis to fix", riskLevel: "low" },
      { skillId: "sk-sql", workspaceId: "ws-main", name: "PostgreSQL / SQL", type: "capability", category: "Database", version: "v1", description: "Relational data modeling", riskLevel: "low" },
      { skillId: "sk-docker", workspaceId: "ws-main", name: "Docker", type: "capability", category: "Infrastructure", version: "v1", description: "Containerization", riskLevel: "low" },
      { skillId: "sk-web-research", workspaceId: "ws-main", name: "Web Research", type: "capability", category: "Research", version: "v1", description: "Evidence-based research", riskLevel: "low" },
      { skillId: "sk-api-design", workspaceId: "ws-main", name: "REST API Design", type: "capability", category: "Backend", version: "v1", description: "Resource-oriented APIs", riskLevel: "low" },
      { skillId: "sk-observability", workspaceId: "ws-main", name: "Observability", type: "capability", category: "Infrastructure", version: "v1", description: "Logs, metrics, tracing", riskLevel: "low" },
    ],
    agentSkills: [
      { agentSkillId: "ags-hf-1", agentId: "a-hermes-forge", skillId: "sk-fullstack" },
      { agentSkillId: "ags-hf-2", agentId: "a-hermes-forge", skillId: "sk-brainstorm" },
      { agentSkillId: "ags-hf-3", agentId: "a-hermes-forge", skillId: "sk-write-plans" },
      { agentSkillId: "ags-hf-4", agentId: "a-hermes-forge", skillId: "sk-tdd" },
      { agentSkillId: "ags-hf-5", agentId: "a-hermes-forge", skillId: "sk-verify" },
      { agentSkillId: "ags-rv-1", agentId: "a-ravix", skillId: "sk-security" },
      { agentSkillId: "ags-as-1", agentId: "a-astra", skillId: "sk-frontend" },
      { agentSkillId: "ags-sq-1", agentId: "a-sentinel", skillId: "sk-qa" },
      { agentSkillId: "ags-sq-2", agentId: "a-sentinel", skillId: "sk-tdd" },
      { agentSkillId: "ags-nx-1", agentId: "a-nexa", skillId: "sk-arch" },
      { agentSkillId: "ags-fw-1", agentId: "a-forgewell", skillId: "sk-backend" },
      { agentSkillId: "ags-kd-1", agentId: "a-kairo", skillId: "sk-devops" },
      { agentSkillId: "ags-vec-1", agentId: "a-vector", skillId: "sk-systems" },
      { agentSkillId: "ags-fc-1", agentId: "a-falcon", skillId: "sk-prototype" },
      { agentSkillId: "ags-or-1", agentId: "a-orion", skillId: "sk-distributed" },
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
      { permissionGrantId: "pg-1", permissionId: "perm-1", projectId: "p-console", agentAssignmentId: "asg-hf", grantedByUserId: "u-rizqullah", status: "approved" },
      { permissionGrantId: "pg-2", permissionId: "perm-3", projectId: "p-console", agentAssignmentId: "asg-sentinel", grantedByUserId: "u-rizqullah", status: "approved" },
    ],

    // ============ REQUIREMENTS / TASKS ============
    requirements: [
      { requirementId: "r-021", workspaceId: "ws-main", projectId: "p-console", title: "User authentication", description: "Users must be able to sign in securely via OAuth", priority: "critical", status: "in_progress", ownerUserId: "u-rizqullah", createdAt: t(9), updatedAt: t(1) },
      { requirementId: "r-022", workspaceId: "ws-main", projectId: "p-console", title: "Role-based access control", description: "Support project roles", priority: "high", status: "approved", ownerUserId: "u-rizqullah", createdAt: t(8), updatedAt: t(2) },
      { requirementId: "r-101", workspaceId: "ws-main", projectId: "p-ai-research", title: "Evidence-first research", description: "Research must cite sources", priority: "high", status: "in_progress", ownerUserId: "u-farid", createdAt: t(7), updatedAt: t(1) },
      { requirementId: "r-201", workspaceId: "ws-main", projectId: "p-commerce", title: "Autonomous checkout", description: "Automated order flow", priority: "critical", status: "defined", ownerUserId: "u-elon", createdAt: t(6), updatedAt: t(2) },
    ],
    acceptanceCriteria: [
      { acceptanceCriterionId: "ac-1", requirementId: "r-021", description: "User can sign in via OAuth", satisfied: true },
      { acceptanceCriterionId: "ac-2", requirementId: "r-021", description: "Session persists across reload", satisfied: false },
      { acceptanceCriterionId: "ac-3", requirementId: "r-022", description: "Project lead can assign roles", satisfied: false },
    ],
    architectureDecisions: [
      { architectureDecisionId: "ad-1", workspaceId: "ws-main", projectId: "p-console", title: "Use OAuth 2.0 with PKCE", context: "Secure auth for SPA", decision: "OAuth 2.0 authorization code + PKCE", status: "accepted", createdAt: t(9) },
      { architectureDecisionId: "ad-2", workspaceId: "ws-main", projectId: "p-console", title: "SolidJS frontend", context: "Reactive performance", decision: "Use SolidJS + Vite", status: "accepted", createdAt: t(9) },
    ],
    epics: [
      { epicId: "ep-1", workspaceId: "ws-main", projectId: "p-console", name: "Core Auth", description: "Foundation auth features" },
    ],
    tasks: [
      { taskId: "t-101", workspaceId: "ws-main", projectId: "p-console", requirementId: "r-021", title: "Implement OAuth backend", description: "OAuth callback + token exchange", priority: "critical", status: "done", createdAt: t(8), updatedAt: t(1) },
      { taskId: "t-102", workspaceId: "ws-main", projectId: "p-console", requirementId: "r-021", title: "Implement OAuth callback", description: "Handle authorization code", priority: "critical", status: "in_progress", createdAt: t(7), updatedAt: t(0.1) },
      { taskId: "t-103", workspaceId: "ws-main", projectId: "p-console", requirementId: "r-021", title: "OAuth login UI", description: "Login form + redirect", priority: "high", status: "review", createdAt: t(6), updatedAt: t(1) },
      { taskId: "t-104", workspaceId: "ws-main", projectId: "p-console", requirementId: "r-022", title: "RBAC policy engine", description: "Role checks", priority: "medium", status: "verification", createdAt: t(5), updatedAt: t(2) },
      { taskId: "t-105", workspaceId: "ws-main", projectId: "p-console", title: "Accessibility pass", description: "ARIA + focus", priority: "medium", status: "blocked", createdAt: t(4), updatedAt: t(3) },
      { taskId: "t-106", workspaceId: "ws-main", projectId: "p-console", title: "Auth integration tests", description: "E2E auth flow", priority: "high", status: "ready", createdAt: t(3), updatedAt: t(2) },
      { taskId: "t-201", workspaceId: "ws-main", projectId: "p-ai-research", title: "Research API build", description: "Evidence retrieval endpoint", priority: "high", status: "in_progress", createdAt: t(6), updatedAt: t(1) },
      { taskId: "t-301", workspaceId: "ws-main", projectId: "p-commerce", title: "Checkout flow", description: "Autonomous checkout", priority: "critical", status: "in_progress", createdAt: t(5), updatedAt: t(2) },
    ],
    taskAssignments: [
      { taskAssignmentId: "ta-1", taskId: "t-101", agentAssignmentId: "asg-hf" },
      { taskAssignmentId: "ta-2", taskId: "t-102", agentAssignmentId: "asg-hf" },
      { taskAssignmentId: "ta-3", taskId: "t-103", agentAssignmentId: "asg-astra" },
      { taskAssignmentId: "ta-4", taskId: "t-104", agentAssignmentId: "asg-ravix" },
      { taskAssignmentId: "ta-5", taskId: "t-201", agentAssignmentId: "asg-forgewell" },
    ],

    // ============ WORKFLOWS ============
    workflows: [
      { workflowId: "wf-secure", workspaceId: "ws-main", name: "Secure Feature Development", description: "Feature workflow with security gates", stepIds: ["ws-1", "ws-2", "ws-3", "ws-4", "ws-5", "ws-6", "ws-7", "ws-8", "ws-9"] },
    ],
    workflowSteps: [
      { workflowStepId: "ws-1", workflowId: "wf-secure", name: "Define", type: "process", order: 1, skillIds: [], gate: false, approvalRequired: false },
      { workflowStepId: "ws-2", workflowId: "wf-secure", name: "Design", type: "process", order: 2, skillIds: [], gate: false, approvalRequired: false },
      { workflowStepId: "ws-3", workflowId: "wf-secure", name: "Plan", type: "process", order: 3, skillIds: [], gate: false, approvalRequired: false },
      { workflowStepId: "ws-4", workflowId: "wf-secure", name: "Build", type: "process", order: 4, skillIds: [], gate: false, approvalRequired: false },
      { workflowStepId: "ws-5", workflowId: "wf-secure", name: "Review", type: "process", order: 5, skillIds: [], gate: false, approvalRequired: true },
      { workflowStepId: "ws-6", workflowId: "wf-secure", name: "Verify", type: "process", order: 6, skillIds: [], gate: true, approvalRequired: false },
      { workflowStepId: "ws-7", workflowId: "wf-secure", name: "Release", type: "gate", order: 7, skillIds: [], gate: true, approvalRequired: true },
    ],
    workflowRuns: [
      { workflowRunId: "wfr-1", workspaceId: "ws-main", projectId: "p-console", workflowId: "wf-secure", status: "running", createdAt: t(9), updatedAt: t(0.5) },
    ],

    // ============ EXECUTIONS (spec 170, 175) ============
    executions: [
      { executionId: "ex-8821", workspaceId: "ws-main", projectId: "p-console", agentSessionId: "s-182", taskId: "t-102", status: "running", input: "Implement OAuth callback", createdAt: t(0.5), updatedAt: t(0.05) },
      { executionId: "ex-8822", workspaceId: "ws-main", projectId: "p-console", agentSessionId: "s-184", taskId: "t-103", status: "running", input: "OAuth UI update", createdAt: t(0.6), updatedAt: t(0.1) },
      { executionId: "ex-8823", workspaceId: "ws-main", projectId: "p-console", agentSessionId: "s-186", taskId: "t-104", status: "waiting_approval", input: "Security review OAuth flow", createdAt: t(2), updatedAt: t(1) },
      { executionId: "ex-8824", workspaceId: "ws-main", projectId: "p-console", agentSessionId: "s-188", taskId: "t-106", status: "queued", input: "Run integration tests", createdAt: t(1), updatedAt: t(1) },
      { executionId: "ex-8820", workspaceId: "ws-main", projectId: "p-console", agentSessionId: "s-182", taskId: "t-101", status: "succeeded", input: "OAuth backend implementation", createdAt: t(3), updatedAt: t(1.5) },
      { executionId: "ex-8819", workspaceId: "ws-main", projectId: "p-console", agentSessionId: "s-186", taskId: "t-104", status: "failed", input: "Security scan attempt", createdAt: t(4), updatedAt: t(3) },
    ],
    executionEvents: [
      { executionEventId: "ee-1", executionId: "ex-8821", timestamp: t(0.4), type: "started", message: "Reading auth.service.ts" },
      { executionEventId: "ee-2", executionId: "ex-8821", timestamp: t(0.3), type: "tool_call", message: "Running integration tests" },
      { executionEventId: "ee-3", executionId: "ex-8821", timestamp: t(0.2), type: "info", message: "Analyzing test failure" },
      { executionEventId: "ee-4", executionId: "ex-8821", timestamp: t(0.1), type: "tool_call", message: "Applying fix" },
      { executionEventId: "ee-5", executionId: "ex-8822", timestamp: t(0.5), type: "tool_call", message: "Updating LoginForm.tsx" },
      { executionEventId: "ee-6", executionId: "ex-8822", timestamp: t(0.3), type: "tool_call", message: "npm test" },
    ],
    executionUsage: [
      { executionId: "ex-8820", gatewayId: "gw-1", modelId: "md-1", inputTokens: 1200, outputTokens: 800, totalTokens: 2000, estimatedCost: 0.02, currency: "USD", durationMs: 3500 },
      { executionId: "ex-8821", gatewayId: "gw-1", modelId: "md-1", inputTokens: 800, outputTokens: 400, totalTokens: 1200, estimatedCost: 0.012, currency: "USD", durationMs: 1200 },
    ],
    sandboxes: [
      { sandboxId: "sb-192", executionId: "ex-8821", projectId: "p-console", filesystemScope: "project/worktree-192", networkScope: "Restricted", capabilityIds: ["cap-repo.read", "cap-repo.write", "cap-test.run", "cap-web.read"], environmentVariables: true, secretAccess: "none", resourceLimits: "2vcpu 2GB", status: "running" },
      { sandboxId: "sb-193", executionId: "ex-8822", projectId: "p-console", filesystemScope: "project/worktree-193", networkScope: "Restricted", capabilityIds: ["cap-repo.read", "cap-repo.write"], environmentVariables: true, secretAccess: "none", resourceLimits: "1vcpu 1GB", status: "running" },
    ],
    environments: [
      { environmentId: "env-dev", projectId: "p-console", type: "development", name: "Development", status: "active", configurationSummary: "local dev", endpoint: "http://localhost:5173" },
      { environmentId: "env-stage", projectId: "p-console", type: "staging", name: "Staging", status: "ready", configurationSummary: "staging server" },
      { environmentId: "env-prod", projectId: "p-console", type: "production", name: "Production", status: "inactive", configurationSummary: "prod cluster" },
    ],

    // ============ VERIFICATION / EVIDENCE ============
    verifications: [
      { verificationId: "v-1", workspaceId: "ws-main", projectId: "p-console", executionId: "ex-8823", taskId: "t-104", status: "failed", type: "security", startedAt: t(2), completedAt: t(1) },
      { verificationId: "v-2", workspaceId: "ws-main", projectId: "p-console", taskId: "t-101", status: "passed", type: "integration", startedAt: t(1.5), completedAt: t(1) },
      { verificationId: "v-3", workspaceId: "ws-main", projectId: "p-console", taskId: "t-106", status: "running", type: "e2e", startedAt: t(0.2) },
    ],
    verificationChecks: [
      { verificationCheckId: "vc-1", verificationId: "v-1", name: "XSS scan", status: "passed" },
      { verificationCheckId: "vc-2", verificationId: "v-1", name: "Auth bypass", status: "failed" },
      { verificationCheckId: "vc-3", verificationId: "v-2", name: "OAuth flow", status: "passed" },
    ],
    codeReviews: [
      { codeReviewId: "cr-1", workspaceId: "ws-main", projectId: "p-console", taskId: "t-103", status: "changes_requested", reviewerId: "u-farid", createdAt: t(2) },
    ],
    reviewFindings: [
      { reviewFindingId: "rf-1", codeReviewId: "cr-1", severity: "medium", file: "LoginForm.tsx", line: 42, description: "Missing error-state accessibility label", resolved: false },
    ],
    evidence: [
      { evidenceId: "ev-1", workspaceId: "ws-main", projectId: "p-console", taskId: "t-101", verificationId: "v-2", type: "test_report", summary: "All auth integration tests passed (22)", createdAt: t(1) },
      { evidenceId: "ev-2", workspaceId: "ws-main", projectId: "p-console", taskId: "t-102", executionId: "ex-8820", type: "diff", summary: "Implementation diff for auth.service.ts", createdAt: t(1) },
    ],

    // ============ RELEASES / DEPLOYMENTS (spec 190) ============
    releases: [
      { releaseId: "rel-141", workspaceId: "ws-main", projectId: "p-console", version: "v1.4.1", status: "production", createdAt: t(30) },
      { releaseId: "rel-142", workspaceId: "ws-main", projectId: "p-console", version: "v1.4.2", status: "candidate", createdAt: t(1) },
    ],
    releaseGates: [
      { releaseGateId: "rg-1", releaseId: "rel-142", name: "Build", passed: true },
      { releaseGateId: "rg-2", releaseId: "rel-142", name: "Unit Tests", passed: true },
      { releaseGateId: "rg-3", releaseId: "rel-142", name: "Security Scan", passed: false },
      { releaseGateId: "rg-4", releaseId: "rel-142", name: "Approval", passed: false },
    ],
    deployments: [
      { deploymentId: "dep-1", workspaceId: "ws-main", projectId: "p-console", releaseId: "rel-141", environmentId: "env-prod", status: "healthy", createdAt: t(30) },
    ],

    // ============ APPROVALS (spec 191) ============
    approvals: [
      { approvalId: "appr-1", requestedByUserId: "u-elon", resourceType: "agent_assignment", resourceId: "asg-pending", action: "request_agent", riskLevel: "medium", status: "pending", requestedAt: t(1) },
      { approvalId: "appr-2", requestedByUserId: "u-rizqullah", resourceType: "release", resourceId: "rel-142", action: "release.approved", riskLevel: "high", status: "pending", requestedAt: t(0.8) },
      { approvalId: "appr-3", requestedByUserId: "u-rizqullah", resourceType: "permission", resourceId: "perm-4", action: "production.deploy", riskLevel: "critical", status: "pending", requestedAt: t(0.6) },
    ],

    // ============ AUDIT / NOTIFICATIONS (spec 180) ============
    auditEvents: [
      { auditEventId: "aud-1", workspaceId: "ws-main", projectId: "p-console", actorUserId: "u-rizqullah", action: "project.created", resourceType: "project", resourceId: "p-console", occurredAt: t(40) },
      { auditEventId: "aud-2", workspaceId: "ws-main", projectId: "p-console", action: "execution.started", resourceType: "execution", resourceId: "ex-8821", occurredAt: t(0.5) },
      { auditEventId: "aud-3", workspaceId: "ws-main", projectId: "p-console", action: "artifact.created", resourceType: "artifact", resourceId: "art-api-contract", occurredAt: t(4) },
      { auditEventId: "aud-4", workspaceId: "ws-main", projectId: "p-console", action: "review.changes_requested", resourceType: "review", resourceId: "cr-1", occurredAt: t(2) },
      { auditEventId: "aud-5", workspaceId: "ws-main", projectId: "p-console", action: "finding.created", resourceType: "finding", resourceId: "f-32", occurredAt: t(2) },
      { auditEventId: "aud-6", workspaceId: "ws-main", projectId: "p-console", action: "release.created", resourceType: "release", resourceId: "rel-142", occurredAt: t(1) },
      { auditEventId: "aud-7", workspaceId: "ws-main", projectId: "p-console", action: "verification.failed", resourceType: "verification", resourceId: "v-1", occurredAt: t(1) },
    ],
    notifications: [
      { notificationId: "nt-1", userId: "u-rizqullah", title: "Agent request awaiting approval", body: "Elon requested Astra Code for p-commerce", read: false, createdAt: t(1) },
      { notificationId: "nt-2", userId: "u-rizqullah", title: "Verification failed", body: "Security scan failed on t-104", read: false, createdAt: t(1) },
      { notificationId: "nt-3", userId: "u-rizqullah", title: "Release awaiting approval", body: "v1.4.2 release candidate", read: false, createdAt: t(0.8) },
      { notificationId: "nt-4", userId: "u-rizqullah", title: "Permission request", body: "Production deployment", read: false, createdAt: t(0.6) },
    ],

    // ============ GATEWAY / MODEL ============
    gateways: [{ gatewayId: "gw-1", workspaceId: "ws-main", name: "9router", provider: "9router", modelIds: ["md-1", "md-2"] }],
    models: [
      { modelId: "md-1", gatewayId: "gw-1", name: "deepseek-v4-flash", provider: "9router", costPer1KInput: 0.0005, costPer1KOutput: 0.0015 },
      { modelId: "md-2", gatewayId: "gw-1", name: "gpt-5.6-luna", provider: "9router", costPer1KInput: 0.001, costPer1KOutput: 0.003 },
    ],
    modelCapabilities: [
      { modelCapabilityId: "mc-1", modelId: "md-1", capability: "text" },
      { modelCapabilityId: "mc-2", modelId: "md-2", capability: "text" },
    ],
    routingPolicies: [{ routingPolicyId: "rp-1", workspaceId: "ws-main", name: "Default routing", ruleIds: ["rr-1"] }],
    routingRules: [{ routingRuleId: "rr-1", routingPolicyId: "rp-1", match: "default", modelId: "md-1" }],

    // ============ ARTIFACTS (spec 168) ============
    artifacts: [
      { id: "art-api-contract", projectId: "p-console", executionId: "ex-8820", type: "document", version: "v3", storageKey: "s3://console/api-contract-v3.md", metadata: { updatedBy: "a-hermes-forge", consumedBy: ["a-astra", "a-sentinel", "a-ravix"] }, createdAt: t(4) },
      { id: "art-ad-oauth", projectId: "p-console", type: "document", version: "v1", storageKey: "s3://console/ad-oauth.md", createdAt: t(9) },
      { id: "art-oauth-service", projectId: "p-console", executionId: "ex-8820", type: "code", version: "v1", storageKey: "s3://console/auth/oauth.service.ts", createdAt: t(1) },
    ],
  };
}
