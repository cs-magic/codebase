import { env } from "@/env"
import { PrismaClient } from "@prisma/client"

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV !== "production"
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

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

// 开发模式下，每次复用连接
if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
