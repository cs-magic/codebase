import { parseIndicesPriority } from "./parse-indices-number"

describe("", () => {
  it("should ok with one", async () => {
    expect(parseIndicesPriority("23 9")).resolves.toStrictEqual({
      indices: [23],
      priority: 9,
    })
  })

  it("should not ok with two", async () => {
    expect(parseIndicesPriority("23 44 9")).resolves.toStrictEqual({
      indices: [23, 44],
      priority: 9,
    })
  })
})
