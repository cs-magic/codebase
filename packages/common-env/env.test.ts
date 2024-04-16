import { env } from "./index"

it("test env read", () => {
  console.log("-- hello")
  console.log(env.TENCENT_SK)
})
