import { ILlmMessage } from "@cs-magic/common/schema/message";
import OpenAI from "openai";
import { LlmModelType } from "./llm.models";
/**
 * 直接用于调用大模型的参数
 */
export type ILlmQueryConfig = {
    model: LlmModelType;
    messages: ILlmMessage[];
    temperature?: number;
    stream?: boolean;
    user?: string;
};
export type ILlmQueryConfigExtra = {
    context?: {
        trimStart?: {
            whenTooLong?: boolean;
        };
    };
};
export declare const defaultLlmQueryConfigExtra: ILlmQueryConfigExtra;
export type ILlmRes = {
    options: ILlmQueryConfig;
    query: {
        id: string;
        start: number;
        end?: number;
        success: boolean;
    };
    response?: OpenAI.Chat.Completions.ChatCompletion;
    error?: string;
};
export type IAgentReq = {
    name?: string;
    author?: string;
    version?: string;
    model?: LlmModelType;
    total_tokens?: number;
    system_prompt?: string;
    temperature?: number;
    top_p?: number;
};
