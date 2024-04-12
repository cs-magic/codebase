import { initBotContext } from "./bot-context"
import { renderBotTemplate } from "./bot-template"

it("should ", async () => {
  const context = await initBotContext()
  const template = renderBotTemplate(context)
  expect(template.status).not.toContain("&gt;")
})
