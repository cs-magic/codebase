import { ILlmQueryConfig } from "@cs-magic/llm/schema/llm.api";
import { LlmModelType } from "@cs-magic/llm/schema/llm.models";
export type SummaryOptions = {
    enabled?: boolean;
    model?: LlmModelType;
    withImage?: boolean;
    llmOptions?: ILlmQueryConfig;
};
export declare const md2summary: (contentMd: string, summaryOptions?: SummaryOptions) => Promise<import("@cs-magic/llm/schema/llm.api").ILlmRes>;
