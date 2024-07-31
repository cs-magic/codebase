import { type ContactSelf } from "wechaty"

export const getBotWxid = (user: ContactSelf): string => {
  // update bot wxid
  const botWxid = user.payload?.id
  if (!botWxid)
    throw new Error(
      `no wxid from user payload: ${JSON.stringify(user.payload)}`,
    )
  return botWxid
}
