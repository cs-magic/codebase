import { z } from "zod";
export declare const langTypeSchema: z.ZodEnum<["zh", "en"]>;
export type LangType = z.infer<typeof langTypeSchema>;
export declare const inputLangTypeSchema: z.ZodEnum<["中文", "zh", "英文", "en"]>;
export type InputLangType = z.infer<typeof inputLangTypeSchema>;
export declare const langMap: Record<InputLangType, LangType>;
