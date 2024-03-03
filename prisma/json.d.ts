declare global {
  // 要放在里面
  import { ConversationType } from "@prisma/client"

  namespace PrismaJson {
    type ConversationType = ConversationType
  }
}
