import { parseCommand } from "./parse-command"

it("", () => {
  const result = parseCommand("/set-backend-engine-type  nodejs", [
    "set-backend-engine-type",
  ])
  expect(result.command).toBe("set-backend-engine-type")
  expect(result.args).toBe("nodejs")
})

it("", () => {
  const result = parseCommand("/set-backend-engine-type  ", [
    "set-backend-engine-type",
  ])
  expect(result.command).toBe("set-backend-engine-type")
  expect(result.args).toBe("")
})
