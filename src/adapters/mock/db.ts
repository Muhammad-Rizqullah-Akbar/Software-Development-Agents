// Persistent mock database backed by localStorage (spec sections 43-44)
// This is the single source of truth for all mock repositories.
// State persists across reloads. Never reset on reload.

const STORAGE_KEY = "software-development-agents.db.v3";

export interface DBShape {
  version: number;
  // identity
  users: any[];
  workspaces: any[];
  // project
  projects: any[];
  memberships: any[];
  // agent
  agents: any[];
  agentOwners: any[];
  agentVersions: any[];
  assignments: any[];
  sessions: any[];
  workFields: any[];
  workFieldParticipants: any[];
  findings: any[];
  workReports: any[];
  handoffs: any[];
  // capability
  skills: any[];
  agentSkills: any[];
  souls: any[];
  tools: any[];
  capabilities: any[];
  permissions: any[];
  policies: any[];
  permissionGrants: any[];
  // sdlc
  requirements: any[];
  acceptanceCriteria: any[];
  architectureDecisions: any[];
  epics: any[];
  tasks: any[];
  taskAssignments: any[];
  // workflow
  workflows: any[];
  workflowSteps: any[];
  workflowRuns: any[];
  // execution
  executions: any[];
  executionEvents: any[];
  executionUsage: any[];
  sandboxes: any[];
  environments: any[];
  // quality
  verifications: any[];
  verificationChecks: any[];
  codeReviews: any[];
  reviewFindings: any[];
  evidence: any[];
  // release
  releases: any[];
  releaseGates: any[];
  deployments: any[];
  // governance
  approvals: any[];
  auditEvents: any[];
  notifications: any[];
  // model infra
  gateways: any[];
  models: any[];
  modelCapabilities: any[];
  routingPolicies: any[];
  routingRules: any[];
  // artifacts
  artifacts: any[];
}

export const emptyDB = (): DBShape => ({
  version: 1,
  users: [],
  workspaces: [],
  projects: [],
  memberships: [],
  agents: [],
  agentOwners: [],
  agentVersions: [],
  assignments: [],
  sessions: [],
  workFields: [],
  workFieldParticipants: [],
  findings: [],
  workReports: [],
  handoffs: [],
  skills: [],
  agentSkills: [],
  souls: [],
  tools: [],
  capabilities: [],
  permissions: [],
  policies: [],
  permissionGrants: [],
  requirements: [],
  acceptanceCriteria: [],
  architectureDecisions: [],
  epics: [],
  tasks: [],
  taskAssignments: [],
  workflows: [],
  workflowSteps: [],
  workflowRuns: [],
  executions: [],
  executionEvents: [],
  executionUsage: [],
  sandboxes: [],
  environments: [],
  verifications: [],
  verificationChecks: [],
  codeReviews: [],
  reviewFindings: [],
  evidence: [],
  releases: [],
  releaseGates: [],
  deployments: [],
  approvals: [],
  auditEvents: [],
  notifications: [],
  gateways: [],
  models: [],
  modelCapabilities: [],
  routingPolicies: [],
  routingRules: [],
  artifacts: [],
});

function load(): DBShape {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyDB();
    const parsed = JSON.parse(raw) as DBShape;
    if (!parsed || parsed.version !== 2) return emptyDB();
    // ensure all arrays exist
    const base = emptyDB();
    for (const key of Object.keys(base)) {
      if (!Array.isArray((parsed as any)[key])) (parsed as any)[key] = [];
    }
    return parsed;
  } catch {
    return emptyDB();
  }
}

let cache: DBShape | null = null;

export function getDB(): DBShape {
  if (!cache) cache = load();
  return cache;
}

export function saveDB(db: DBShape): void {
  cache = db;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {
    // quota exceeded — fail silently in mock
  }
}

export function resetDB(): void {
  cache = emptyDB();
  localStorage.removeItem(STORAGE_KEY);
}

/** Insert a row into a collection and persist. Returns the row. */
export function dbInsert<K extends keyof DBShape>(table: K, row: any): any {
  const db = getDB();
  (db[table] as any[]).push(row);
  saveDB(db);
  return row;
}

/** Update a row by id within a collection. */
export function dbUpdate<K extends keyof DBShape>(table: K, idField: string, id: string, patch: any): any {
  const db = getDB();
  const arr = db[table] as any[];
  const idx = arr.findIndex((r) => r[idField] === id);
  if (idx === -1) return null;
  arr[idx] = { ...arr[idx], ...patch };
  saveDB(db);
  return arr[idx];
}

export function dbList<K extends keyof DBShape>(table: K): any[] {
  return getDB()[table] as any[];
}

/** Seed fixtures on first load if the DB is empty/absent or malformed. */
export function ensureSeeded(seed: () => DBShape): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveDB(seed());
      return;
    }
    const parsed = JSON.parse(raw) as DBShape;
    // validate version + required arrays; reseed if mismatch/corrupt
    const base = emptyDB();
    for (const key of Object.keys(base)) {
      if (!Array.isArray((parsed as any)[key])) {
        saveDB(seed());
        return;
      }
    }
    if (parsed.version !== 3) {
      saveDB(seed());
      return;
    }
  } catch {
    // localStorage corrupt — reseed fresh
    saveDB(seed());
  }
}
