import { z } from "zod";
export declare const llmModelTypeSchema: z.ZodEnum<["gpt-4o", "gpt-3.5-turbo", "gpt-4", "glm-3-turbo", "glm-4", "moonshot-v1-8k", "moonshot-v1-32k", "moonshot-v1-128k", "Baichuan2-Turbo", "Baichuan2-Turbo-192k", "qwen-turbo", "qwen-plus", "qwen-max", "deepseek-chat", "deepseek-coder"]>;
export type LlmModelType = z.infer<typeof llmModelTypeSchema>;
