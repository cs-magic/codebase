import { initBotStaticContext } from "./bot-context"
import { renderTemplate } from "./bot-template"
import { getRobustPreference } from "./get-robust-preference"

const f = async () => {
  const preference = getRobustPreference({ preference: {} })

  const context = initBotStaticContext()

  const template = await renderTemplate(preference, context)

  console.log({ template })
}

// it("should ", f )

void f()
