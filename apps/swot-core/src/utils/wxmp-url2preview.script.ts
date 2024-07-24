import { wxmpUrl2preview } from "./wxmp-url2preview.js"

const programme = async () => {
  console.log("-- starting")
  try {
    const res = await wxmpUrl2preview(
      "https://mp.weixin.qq.com/s/21hgd15n54CII2z7bui_qw",
    )
    console.log("-- res: ", JSON.stringify(res))
  } catch (e) {
    console.error("-- error: ", e)
    throw e
  } finally {
    console.log("-- end")
  }
}

void programme()
