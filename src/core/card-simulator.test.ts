import { promises } from "fs"
import path from "path"
import { generatedPath } from "../../packages/common-common/path"
import { CardSimulator } from "./card-simulator"

const simulatorWxmpArticle = async (fn: string) => {
  const simulator = new CardSimulator("playwright", { headless: false })

  const content = await promises.readFile(path.join(generatedPath, fn), {
    encoding: "utf-8",
  })

  const { cardUrl } = await simulator.genCard(content, {
    id: "",
    name: "南川 Mark",
    image:
      "http://wx.qlogo.cn/mmhead/Q3auHgzwzM4RANEFJicrdF4P3MaPCJNaRc9VrCKWCsyDlsZgzn6MPww/0",
  })

  console.log(`-- sending file: ${cardUrl}`)
}

it(
  "should generate a right card",
  () => simulatorWxmpArticle("wxmp-article.sample.1712633905649.json"),
  3e5,
)
