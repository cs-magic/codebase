import { ContactPayload } from "wechaty-puppet/dist/esm/src/schemas/contact.js"
import { IWechatPreference } from "./bot.preference.js"

export type IWechatBotScan = { value: string; status: number }
export type IUser = ContactPayload
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
  | {
      type: "preference"
      data: IWechatPreference
    }
  | {
      type: "contacts"
      data: ContactPayload[]
    }
export type LlmScenario = "chatter" | "parser"
