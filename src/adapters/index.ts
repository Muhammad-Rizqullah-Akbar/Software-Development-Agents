// Adapter contracts (spec sections 38-39, 130, 144-145)
// UI depends on these interfaces. Real adapters replace mocks later.

import type { ID } from "../domain/enums";
import type { AgentSession } from "../domain/models";
import type { RepositoryRegistry } from "./mock/repositories";

// ============ Hermes ============
export interface HermesMessageInput {
  workspaceId: ID;
  projectId: ID;
  agentAssignmentId?: ID;
  agentSessionId?: ID;
  taskId?: ID;
  message: string;
}

export interface HermesProposal {
  proposedWorkflow?: string;
  requirementIds?: ID[];
  taskIds?: ID[];
  requiredSkills?: string[];
  requiredAgentRoles?: string[];
  verificationRequired: boolean;
  risk?: "low" | "medium" | "high" | "critical";
  summary: string;
}

export interface HermesMessageResponse {
  message: string;
  proposal?: HermesProposal;
}

export interface CreateSessionInput {
  workspaceId: ID;
  projectId: ID;
  agentAssignmentId: ID;
  agentId: ID;
  context: string;
}

export interface ExecutionRequest {
  workspaceId: ID;
  projectId: ID;
  agentSessionId?: ID;
  taskId?: ID;
  workflowRunId?: ID;
  input: string;
}

export interface ApproveActionInput {
  approvalId: ID;
  reviewedByUserId: ID;
  approved: boolean;
}

export interface HermesAdapter {
  sendMessage(input: HermesMessageInput): Promise<HermesMessageResponse>;
  createSession(input: CreateSessionInput): Promise<AgentSession>;
  execute(input: ExecutionRequest): Promise<{ executionId: ID; status: string }>;
  approveAction(input: ApproveActionInput): Promise<{ approvalId: ID; status: string }>;
}

// ============ Model Gateway ============
export interface ModelQuery {
  workspaceId: ID;
  search?: string;
}

export interface ModelEstimateInput {
  modelId: ID;
  inputTokens: number;
  outputTokens: number;
}

export interface ModelEstimate {
  estimatedCost: number;
  currency: string;
  totalTokens: number;
}

export interface ModelGateway {
  listModels(query: ModelQuery): Promise<{ items: Array<{ modelId: ID; name: string; provider: string; costPer1KInput?: number; costPer1KOutput?: number }> }>;
  getModel(id: ID): Promise<{ modelId: ID; name: string; provider: string } | null>;
  estimate(input: ModelEstimateInput): Promise<ModelEstimate>;
}

// ============ Mock Hermes Adapter ============
export class MockHermesAdapter implements HermesAdapter {
  constructor(private repos: RepositoryRegistry) {}

  async sendMessage(input: HermesMessageInput): Promise<HermesMessageResponse> {
    const msg = input.message.toLowerCase();
    if (msg.includes("auth") || msg.includes("authentication")) {
      return {
        message:
          "I found an authentication requirement. I propose: update requirement R-021, create an architecture decision, create an implementation plan, and request Security Agent review.",
        proposal: {
          proposedWorkflow: "Secure Feature Development",
          requirementIds: ["r-021"],
          taskIds: ["t-101", "t-102", "t-103"],
          requiredSkills: ["Backend", "Security", "Testing"],
          requiredAgentRoles: ["Lead Development Agent", "Security Reviewer", "QA"],
          verificationRequired: true,
          risk: "high",
          summary: "Authentication implementation with security review and verification gates.",
        },
      };
    }
    if (msg.includes("plan")) {
      return {
        message: "Here is the plan. Goal: build authentication. It defines requirements, workflow, tasks, and agent roles. Waiting for your approval.",
        proposal: {
          proposedWorkflow: "Secure Feature Development",
          requirementIds: ["r-021", "r-022"],
          taskIds: ["t-101", "t-102", "t-103", "t-104"],
          requiredSkills: ["Backend", "Security"],
          requiredAgentRoles: ["Lead Development Agent", "Security Reviewer"],
          verificationRequired: true,
          risk: "high",
          summary: "Plan for auth with RBAC. 4 tasks across requirements, security review gate, verification required.",
        },
      };
    }
    return {
      message: "I understood your request. I will analyze it within the project context and propose structured actions.",
      proposal: {
        verificationRequired: false,
        summary: "Request acknowledged. Awaiting more context.",
      },
    };
  }

  async createSession(input: CreateSessionInput): Promise<AgentSession> {
    return this.repos.session.create({
      agentSessionId: undefined as any,
      workspaceId: input.workspaceId,
      projectId: input.projectId,
      agentAssignmentId: input.agentAssignmentId,
      agentId: input.agentId,
      status: "active",
      context: input.context,
    } as any);
  }

  async execute(input: ExecutionRequest): Promise<{ executionId: ID; status: string }> {
    const exec = await this.repos.execution.create({
      workspaceId: input.workspaceId,
      projectId: input.projectId,
      agentSessionId: input.agentSessionId,
      taskId: input.taskId,
      workflowRunId: input.workflowRunId,
      status: "running",
      input: input.input,
    } as any);
    return { executionId: exec.executionId, status: "running" };
  }

  async approveAction(input: ApproveActionInput): Promise<{ approvalId: ID; status: string }> {
    const status = input.approved ? "approved" : "rejected";
    await this.repos.approval.decide(input.approvalId, status as any, input.reviewedByUserId);
    return { approvalId: input.approvalId, status };
  }
}

// ============ Mock Model Gateway ============
export class MockModelGateway implements ModelGateway {
  constructor(private repos: RepositoryRegistry) {}

  async listModels(query: ModelQuery) {
    const gateways = await this.repos.gateway.list({ workspaceId: query.workspaceId, limit: 100 });
    const all: any[] = [];
    for (const g of gateways.items) {
      const models = await this.repos.model.listByGateway(g.gatewayId);
      all.push(...models);
    }
    const filtered = query.search ? all.filter((m) => m.name.toLowerCase().includes(query.search!.toLowerCase())) : all;
    return { items: filtered };
  }

  async getModel(id: ID) {
    const model = await this.repos.model.get(id);
    if (!model) return null;
    return { modelId: model.modelId, name: model.name, provider: model.provider };
  }

  async estimate(input: ModelEstimateInput): Promise<ModelEstimate> {
    const model = await this.repos.model.get(input.modelId);
    const total = input.inputTokens + input.outputTokens;
    const cost = model
      ? ((input.inputTokens / 1000) * (model.costPer1KInput ?? 0)) +
        ((input.outputTokens / 1000) * (model.costPer1KOutput ?? 0))
      : 0;
    return { estimatedCost: cost, currency: "USD", totalTokens: total };
  }
}
