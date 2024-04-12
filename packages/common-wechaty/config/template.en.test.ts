import jsYaml from "js-yaml"
import { loadBotTemplate } from "../utils/bot-template"

it("should ", () => {
  const tempString = loadBotTemplate("en")
  const tempData = jsYaml.load(tempString)
  console.log({ tempString, tempData })
})
