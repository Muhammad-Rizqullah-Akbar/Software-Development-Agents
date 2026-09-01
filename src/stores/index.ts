// Application container & reactive store (spec sections 45, 93, 94)
// Single source of truth. Provides domain state reactively so cross-page
// state stays consistent. UI state (modal, tabs) stays separate.

import { createSignal, createMemo } from "solid-js";
import { ensureSeeded, dbList } from "../adapters/mock/db";
import { buildFixtures } from "../mocks/fixtures";
import { repositories, type RepositoryRegistry } from "../adapters/mock/repositories";
import { StateMachine } from "../domain/state-machines";
import { Services } from "../services";
import { MockHermesAdapter, MockModelGateway } from "../adapters";

ensureSeeded(buildFixtures);

export const repos: RepositoryRegistry = repositories;
export const services = new Services(repositories, StateMachine);
export const hermes = new MockHermesAdapter(repositories);
export const modelGateway = new MockModelGateway(repositories);

export const currentUserId = "u-eqii";
export const workspaceId = "ws-main";

// Reactive domain state version — bump after any mutation so selectors recompute.
const [dbVersion, setDbVersion] = createSignal(0);
export function bumpDB() { setDbVersion((v) => v + 1); }

// Reactive selectors over the persistent DB
export function useProjects() {
  const [query, setQuery] = createSignal({ search: "", status: [] as string[] });
  const list = createMemo(() => {
    void dbVersion();
    const q = query();
    let items = dbList("projects").filter((p) => p.workspaceId === workspaceId);
    if (q.search) items = items.filter((p) => (p.name + p.description).toLowerCase().includes(q.search.toLowerCase()));
    if (q.status.length) items = items.filter((p) => q.status.includes(p.status));
    return items;
  });
  return { list, query, setQuery };
}

export function useTasks(projectId?: string) {
  const list = createMemo(() => {
    void dbVersion();
    let items = dbList("tasks");
    if (projectId) items = items.filter((t) => t.projectId === projectId);
    return items;
  });
  return list;
}

export function useAssignments(projectId?: string) {
  const list = createMemo(() => {
    void dbVersion();
    let items = dbList("assignments");
    if (projectId) items = items.filter((a) => a.projectId === projectId);
    return items;
  });
  return list;
}

export function useSessions(projectId?: string) {
  const list = createMemo(() => {
    void dbVersion();
    let items = dbList("sessions");
    if (projectId) items = items.filter((s) => s.projectId === projectId);
    return items;
  });
  return list;
}

export function useExecutions(projectId?: string) {
  const list = createMemo(() => {
    void dbVersion();
    let items = dbList("executions");
    if (projectId) items = items.filter((e) => e.projectId === projectId);
    return items;
  });
  return list;
}

export function useRequirements(projectId?: string) {
  const list = createMemo(() => {
    void dbVersion();
    let items = dbList("requirements");
    if (projectId) items = items.filter((r) => r.projectId === projectId);
    return items;
  });
  return list;
}

export function useApprovals() {
  const list = createMemo(() => {
    void dbVersion();
    return dbList("approvals").filter((a) => a.status === "pending");
  });
  return list;
}

export function useNotifications() {
  const list = createMemo(() => {
    void dbVersion();
    return dbList("notifications").filter((n) => n.userId === currentUserId);
  });
  return list;
}

export function useAudit() {
  const list = createMemo(() => {
    void dbVersion();
    return dbList("auditEvents").slice().reverse();
  });
  return list;
}

export function useAgents() {
  const list = createMemo(() => {
    void dbVersion();
    return dbList("agents");
  });
  return list;
}

export function useSkills() {
  const list = createMemo(() => {
    void dbVersion();
    return dbList("skills");
  });
  return list;
}

export function useReleases(projectId?: string) {
  const list = createMemo(() => {
    void dbVersion();
    let items = dbList("releases");
    if (projectId) items = items.filter((r) => r.projectId === projectId);
    return items;
  });
  return list;
}

export function useMembers(projectId: string) {
  const list = createMemo(() => {
    void dbVersion();
    return dbList("memberships").filter((m) => m.projectId === projectId);
  });
  return list;
}

export function useProject(projectId: string) {
  const get = createMemo(() => {
    void dbVersion();
    return dbList("projects").find((p) => p.projectId === projectId);
  });
  return get;
}
