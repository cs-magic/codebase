export type Nullable = boolean | null

export class UnexpectedError extends Error {
  constructor() {
    super("Unexpected!")
  }
}
