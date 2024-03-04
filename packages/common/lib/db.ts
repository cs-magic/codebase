import { PrismaClient } from "@prisma/client"
import { env } from "@/env"

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

export const db = globalForPrisma.prisma ?? createPrismaClient()

// 开发模式下，每次复用连接
if (env.NODE_ENV !== "production") globalForPrisma.prisma = db
