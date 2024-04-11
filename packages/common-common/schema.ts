import { z } from "zod"

export type Nullable = boolean | null
export type Nullish = undefined | null

export class UnexpectedError extends Error {
  constructor() {
    super("Unexpected!")
  }
}

export type LiteralUnionSchema = z.ZodUnion<
  [z.ZodLiteral<string>, ...z.ZodLiteral<string>[]]
>
