"use server"
import { prisma } from "../../../../../packages/common-db/providers/prisma"

export const updateUserNameViaTrpc = async (userId: string, name: string) => {
  await prisma.sender.update({ where: { id: userId }, data: { name } })
}
