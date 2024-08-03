"use server"

import { prisma } from "@cs-magic/common/dist/db/prisma.js"

export const updateUserNameViaTrpc = async (userId: string, name: string) => {
  await prisma.user.update({ where: { id: userId }, data: { name } })
}
