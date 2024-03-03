declare global {
  // 要放在里面
  import { ILLMMessage } from "@/schema/query-message"
  import { ConversationType } from "@prisma/client"

  namespace PrismaJson {
    type ConversationType = ConversationType

    type QueryContext = ILLMMessage[]
  }
}
