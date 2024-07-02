import { z } from "zod";
export declare const backendTypeSchema: z.ZodEnum<["fastapi", "nodejs"]>;
export type BackendType = z.infer<typeof backendTypeSchema>;
