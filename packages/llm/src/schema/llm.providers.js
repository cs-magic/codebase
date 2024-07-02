import { z } from "zod";
export const llmProviderTypeSchema = z.enum([
    "openai",
    "zhipu",
    "moonshot",
    "baichuan",
    "dashscope",
    "deepseek",
]);
