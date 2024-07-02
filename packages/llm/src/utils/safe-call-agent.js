import { loadAgent } from "@cs-magic/common";
import { compressContent } from "@cs-magic/common/utils/compress-content";
import { logger } from "@cs-magic/log/logger";
import { safeCallLLM } from "./safe-call-llm";
export const safeCallAgent = async ({ input, agentType = "default", llmOptions, model, }) => {
    logger.info("-- agent calling: %o", {
        agentType,
        model,
        llmOptions,
        inputLength: input.length,
    });
    const agent = await loadAgent(agentType);
    model = model ?? agent.model;
    if (!model)
        throw new Error("no model found");
    const messages = [];
    if (agent.system_prompt)
        messages.push({
            role: "system",
            content: agent.system_prompt,
        });
    const maxContentLen = 8192 -
        (agent.system_prompt?.length ?? 0) -
        1e3 - // 输出的预留长度
        1e2; // 误差
    const content = compressContent(input, maxContentLen);
    messages.push({
        role: "user",
        content,
    });
    return await safeCallLLM({
        model,
        messages,
        // topP: agent.top_p,
        temperature: agent.temperature,
        ...llmOptions,
    });
};
