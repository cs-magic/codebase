import { getBotConfig } from "./get-bot-config"

it("should ", async () => {
  const config = await getBotConfig({}, "yaml")
  console.log({ config })
})
