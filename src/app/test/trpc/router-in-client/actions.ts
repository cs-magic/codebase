"use server"
import { prisma } from "../../../../../packages/common-db/providers/prisma/connection"

export const updateUserNameViaTrpc = async (userId: string, name: string) => {
  await prisma.user.update({ where: { id: userId }, data: { name } })
}
