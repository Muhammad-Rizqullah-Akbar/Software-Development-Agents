// Pagination & query contracts (spec sections 41-42, 100)

export interface Paginated<T> {
  items: T[];
  nextCursor?: string;
  hasMore: boolean;
}

export interface SortSpec {
  field: string;
  direction: "asc" | "desc";
}

export interface BaseQuery {
  workspaceId: string;
  search?: string;
  cursor?: string;
  limit?: number;
  sort?: SortSpec;
}

export interface ProjectQuery extends BaseQuery {
  status?: string[];
}

export interface TaskQuery extends BaseQuery {
  projectId: string;
  status?: string[];
}

export interface RequirementQuery extends BaseQuery {
  projectId: string;
  status?: string[];
}

export interface ExecutionQuery extends BaseQuery {
  projectId: string;
  status?: string[];
}

export interface AgentQuery extends BaseQuery {
  projectId?: string;
}

export interface SessionQuery extends BaseQuery {
  projectId?: string;
  agentId?: string;
}
