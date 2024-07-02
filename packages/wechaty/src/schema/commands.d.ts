import { z } from "zod";
import { LangType } from "@cs-magic/common/i18n/schema";
import { Priority } from "../handlers/handle-message/plugins/task.plugin";
export declare const featureTypeSchema: z.ZodEnum<["system", "todo", "chatter", "parser", "room", "test"]>;
export type FeatureType = z.infer<typeof featureTypeSchema>;
export declare const managerTypeSchema: z.ZodEnum<["base", "system", "todo", "chatter", "parser", "room", "test"]>;
export type ManagerType = z.infer<typeof managerTypeSchema>;
export declare const quoteTypeSchema: z.ZodEnum<["parse", "recall"]>;
export type QuoteType = z.infer<typeof quoteTypeSchema>;
export declare const commandsSchema: z.ZodEnum<["love", "ding", "status", "help", "system", "todo", "chatter", "parser", "room", "test", "parse", "recall"]>;
export type CommandType = z.infer<typeof commandsSchema>;
export type Feature<T> = {
    title: string;
    description: string;
    commands: Record<string, {
        type: T;
        description?: string;
        priority?: Priority;
    }>;
};
export type FeatureMap<T extends string> = {
    [K in Exclude<LangType, "en">]?: Feature<T>;
} & {
    en: Feature<T>;
};
