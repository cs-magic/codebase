import { z } from "zod"

export const backendTypeSchema = z.enum(["fastapi", "nodejs"])
export type BackendType = z.infer<typeof backendTypeSchema>
