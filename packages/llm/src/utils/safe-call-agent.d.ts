import { ILlmQueryConfig } from "../schema/llm.api";
import { LlmModelType } from "../schema/llm.models";
export type AgentType = "default" | "summarize-content" | "summarize-ancient-title";
export declare const safeCallAgent: ({ input, agentType, llmOptions, model, }: {
    input: string;
    model?: LlmModelType;
    agentType?: AgentType;
} & {
    llmOptions?: Omit<ILlmQueryConfig, "messages" | "model">;
}) => Promise<import("../schema/llm.api").ILlmRes>;
