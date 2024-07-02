import { z } from "zod";
declare const backendSchema: z.ZodUnion<[z.ZodLiteral<"a">, z.ZodLiteral<"b">]>;
export type Backend = z.infer<typeof backendSchema>;
export {};
