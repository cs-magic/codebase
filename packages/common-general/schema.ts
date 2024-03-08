export type Nullable = boolean | null
export type Nullish = undefined | null

export class UnexpectedError extends Error {
  constructor() {
    super("Unexpected!")
  }
}
