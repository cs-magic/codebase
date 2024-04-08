export type Nullable = boolean | null
export type Nullish = undefined | null

export class UnexpectedError extends Error {
  constructor() {
    super("Unexpected!")
  }
}

export type BackendEngineType = "nodejs" | "fastapi"
export const supportedBackendEngineTypes: BackendEngineType[] = [
  "fastapi",
  "nodejs",
]
