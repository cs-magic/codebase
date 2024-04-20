import { PrismaClient } from "@prisma/client"
import { getEnv } from "../../../env"

const env = getEnv()

const createPrismaClient = () =>
  new PrismaClient({
    // 可以不 log error，留给 project 的 log 捕获
    log:
      env.NODE_ENV !== "production"
        ? [
            // "error",
            "warn",
          ]
        : [
            // "error"
          ],
  })

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

// 开发模式下，每次复用连接
if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
