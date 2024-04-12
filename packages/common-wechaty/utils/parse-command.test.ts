import { parseCommand } from "./parse-command"

describe("parse command", () => {
  it("", () => {
    const result = parseCommand("/set-backend", ["set-backend"])
    expect(result?.command).toBe("set-backend")
    expect(result?.args).toBe("")
  })

  it("", () => {
    const result = parseCommand("/set-backend  ", ["set-backend"])
    expect(result?.command).toBe("set-backend")
    expect(result?.args).toBe("")
  })

  it("", () => {
    const result = parseCommand("/set-backend  nodejs ss ", ["set-backend"])
    expect(result?.command).toBe("set-backend")
    expect(result?.args).toBe("nodejs ss")
  })
})
