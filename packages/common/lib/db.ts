import { PrismaClient } from "@prisma/client"
import { isProd } from "./utils"

const createPrismaClient = () =>
  new PrismaClient({
    log: !isProd
      ? [
          // "schema",
          "error",
          "warn",
        ]
      : ["error"],
  })

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (!isProd) globalForPrisma.prisma = db
