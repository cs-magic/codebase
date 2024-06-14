"use server"
import { prisma } from "@cs-magic/common/deps/db/providers/prisma"

export const updateUserNameViaTrpc = async (userId: string, name: string) => {
  await prisma.user.update({ where: { id: userId }, data: { name } })
}
