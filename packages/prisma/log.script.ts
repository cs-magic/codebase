import { formatError } from "@cs-magic/common/utils/format-error"
import { prisma } from "@cs-magic/common"

const g = async () => {
  try {
    // how to suppress the log of prisma itself
    await prisma.user.findUniqueOrThrow({ where: { id: "xxxx" } })
  } catch (e) {
    // and log it here only
    formatError(e)
  }
}

void g()
