import { truncateString } from "./string"

it("should ", () => {
  expect(truncateString("asdfghjasdfasdfasdasd").length).toBe(20 + 1)
  expect(
    truncateString("这些区块几乎涵盖了所有的中文字符。因此，可以通过检查字")
      .length,
  ).toBe(10 + 1)
})
