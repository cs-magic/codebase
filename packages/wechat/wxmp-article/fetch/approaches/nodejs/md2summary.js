import { safeCallAgent } from "@cs-magic/llm/utils/safe-call-agent";
export const md2summary = async (contentMd, summaryOptions) => {
    return await safeCallAgent({
        input: contentMd,
        agentType: "summarize-content",
        model: summaryOptions?.model,
        llmOptions: summaryOptions?.llmOptions,
    });
};
