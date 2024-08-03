import { wxmpUrl2preview } from "./wxmp-url2preview.js"

describe("test wxmp url2preview", async () => {
  const res = wxmpUrl2preview(
    "https://mp.weixin.qq.com/s/21hgd15n54CII2z7bui_qw",
  )
  console.log({ res })
})
