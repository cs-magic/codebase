declare global {
  // 要放在里面
  import { ILLMMessage } from "@/core/query-llm/schema/message"
  import { ConversationType } from "@prisma/client"

  namespace PrismaJson {
    type ConversationType = ConversationType

    type QueryContext = ILLMMessage[]
  }
}
