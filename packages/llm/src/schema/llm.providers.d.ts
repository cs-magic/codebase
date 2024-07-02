import { z } from "zod";
export declare const llmProviderTypeSchema: z.ZodEnum<["openai", "zhipu", "moonshot", "baichuan", "dashscope", "deepseek"]>;
export type LlmProviderType = z.infer<typeof llmProviderTypeSchema>;
