import type { Contact } from "wechaty-puppet/dist/esm/src/mods/payloads"

export type IWechatBotScan = { value: string; status: number }
export type IUser = Contact
export type IWechatBotTransfer =
  | {
      type: "scan"
      data: IWechatBotScan
    }
  | {
      type: "login"
      data: IUser
    }
  | {
      type: "loggedIn"
      data: boolean
    }
export type LlmScenario = "chatter" | "parser"
