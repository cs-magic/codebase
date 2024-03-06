"use server"
import { db } from "../../../../../packages/common/lib/db"

export const updateUserNameNormal = async (userId: string, name: string) => {
  await db.user.update({ where: { id: userId }, data: { name } })
}
