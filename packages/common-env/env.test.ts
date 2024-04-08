import { env } from "@/env"

it("test env read", () => {
  console.log("-- hello")
  console.log(env.TENCENT_SK)
})
