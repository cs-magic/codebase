import { z } from "zod";
export const featureTypeSchema = z.enum([
    "system",
    "todo",
    "chatter",
    "parser",
    "room",
    "test",
]);
export const managerTypeSchema = z.enum(["base", ...featureTypeSchema.options]);
export const quoteTypeSchema = z.enum(["parse", "recall"]);
export const commandsSchema = z.enum([
    "love",
    "ding",
    "status",
    "help",
    ...featureTypeSchema.options,
    ...quoteTypeSchema.options,
]);
