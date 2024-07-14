"use server"

import { prisma } from "@cs-magic/os"

export const updateUserNameViaTrpc = async (userId: string, name: string) => {
  await prisma.user.update({ where: { id: userId }, data: { name } })
}
