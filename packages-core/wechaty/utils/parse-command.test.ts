import { z } from "zod"
import { parseLimitedCommand } from "./parse-command"

describe("parse command", () => {
  it("", () => {
    const result = parseLimitedCommand("set-backend", ["set-backend"])
    expect(result?.command).toBe("set-backend")
    expect(result?.args).toBe("")
  })

  it("", () => {
    const result = parseLimitedCommand("set-backend  ", ["set-backend"])
    expect(result?.command).toBe("set-backend")
    expect(result?.args).toBe("")
  })

  it("", () => {
    const result = parseLimitedCommand("set-backend  nodejs ss ", [
      "set-backend",
    ])
    expect(result?.command).toBe("set-backend")
    expect(result?.args).toBe("nodejs ss")
  })
})

const backendSchema = z.union([z.literal("a"), z.literal("b")])
export type Backend = z.infer<typeof backendSchema>
