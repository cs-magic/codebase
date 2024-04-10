import { z } from "zod"

export type Nullable = boolean | null
export type Nullish = undefined | null

export class UnexpectedError extends Error {
  constructor() {
    super("Unexpected!")
  }
}

export const backendEngineTypeSchema = z.union([
  z.literal("fastapi"),
  z.literal("nodejs"),
])
export type BackendEngineType = z.infer<typeof backendEngineTypeSchema>
