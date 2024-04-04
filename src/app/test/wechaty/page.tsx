import { FlexContainer } from "packages/common-ui/components/flex-container"
import { createBot } from "../../../../packages/common-platform-wechat/chat/core"

export default async function TestWechatyPage() {
  const bot = await createBot({ name: "mark" })
  console.log("-- bot: ", bot)

  return <FlexContainer>Test</FlexContainer>
}
