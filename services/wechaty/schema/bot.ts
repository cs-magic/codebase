import { type Contact } from "wechaty-puppet/payloads"
import { type BackendType } from "../../../common/llm/schema/llm"
import { type LlmModelType } from "../../../common/llm/schema/providers"

type IUser = Contact

export type IBotPreference = {
  model: LlmModelType
  backend: BackendType
  handlers: string[]
}

export type IBotStaticContext = {
  version: string
  startTime: number
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
