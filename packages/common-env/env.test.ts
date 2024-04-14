import { env } from "@cs-magic/p01-card/src/env";

it("test env read", () => {
  console.log("-- hello");
  console.log(env.TENCENT_SK);
});
