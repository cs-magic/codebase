import OpenAI, { type ClientOptions } from "openai";
import { ILlmQueryConfig } from "../schema/llm.api";
import { type LlmProviderType } from "../schema/llm.providers";
export type ICompletion = OpenAI.Chat.Completions.ChatCompletion;
export declare const callLlm: ({ apiKey, llmProviderType, clientConfig, queryConfig, }: {
    apiKey: string;
    llmProviderType: LlmProviderType;
    clientConfig: ClientOptions;
    queryConfig: ILlmQueryConfig;
}) => Promise<ICompletion>;
