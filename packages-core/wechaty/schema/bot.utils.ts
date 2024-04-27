import type { payloads } from "wechaty"

export type IWechatBotScan = { value: string; status: number }
export type IUser = payloads.Contact
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
