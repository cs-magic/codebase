import { Job } from "node-schedule"
import { type Contact } from "wechaty-puppet/payloads"

type IUser = Contact

export type IBotStaticContext = {
  version: string
  startTime: number
  jobs: Job[]
}

export type IBotTemplate = {
  name: string
  basic: string
  help: string
  status: string
}

export type IBotContext = IBotStaticContext & IBotTemplate

export type IWechatBotScan = { value: string; status: number }

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

export type { IUser }
export type LlmScenario = "chatter" | "parser"
