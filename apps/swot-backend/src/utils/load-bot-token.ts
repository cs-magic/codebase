import fs, { promises } from "fs"
import { IWechatData, wechatyDataPath } from "./handle-message"
import { parseJsonSafe } from "@cs-magic/common"

export const loadBotToken = async () => {
  if (fs.existsSync(wechatyDataPath)) {
    const dataStr = await promises.readFile(wechatyDataPath, {
      encoding: "utf-8",
    })
    const data = parseJsonSafe<IWechatData>(dataStr)
    const token = data?.puppet?.padlocal?.token
    if (token) process.env.WECHATY_PUPPET_PADLOCAL_TOKEN = token
  }
  return process.env.WECHATY_PUPPET_PADLOCAL_TOKEN
}
