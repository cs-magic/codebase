import { parseFunction } from "./parse-function"

it("should ", () => {
  const obj = { a: 2 }
  console.log({ obj })
  // { obj: { a: 2 } }
  expect(obj.a).toBe(2)

  parseFunction("this.a='b'")?.bind(obj)()
  console.log({ obj })
  expect(obj.a).toBe("b")
})
