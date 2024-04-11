import { parseCommand } from "./parse-command"

describe("parse command", () => {
  it("", () => {
    const result = parseCommand("/set-backend-engine-type", [
      "set-backend-engine-type",
    ])
    expect(result?.command).toBe("set-backend-engine-type")
    expect(result?.args).toBe("")
  })

  it("", () => {
    const result = parseCommand("/set-backend-engine-type  ", [
      "set-backend-engine-type",
    ])
    expect(result?.command).toBe("set-backend-engine-type")
    expect(result?.args).toBe("")
  })

  it("", () => {
    const result = parseCommand("/set-backend-engine-type  nodejs ss ", [
      "set-backend-engine-type",
    ])
    expect(result?.command).toBe("set-backend-engine-type")
    expect(result?.args).toBe("nodejs ss")
  })
})
