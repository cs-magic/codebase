import { GenWxmpArticleCardFetchOptions } from "@cs-magic/p01-common/schema/card"
import { type LangType } from "../../../packages-to-classify/i18n/schema"

export enum CommandStyle {
  standard = "standard",
  // omit title/footer
  simple = "simple",
  // convert to image
  image = "image",
}

/**
 * 用户偏好（可用户手动修改）
 */
export type IWechatPreference = {
  lang: LangType
  chatterEnabled: boolean
  parserEnabled: boolean
  todoFilter?: string
  maxOutputLines?: number
  commandStyle?: CommandStyle
  fetch?: GenWxmpArticleCardFetchOptions

  onRoomJoin?: {
    sayAnnounce?: {
      enabled?: boolean
      n?: number
    }
  }
}
export const defaultWechatPreference: IWechatPreference = {
  lang: "en",
  chatterEnabled: false,
  parserEnabled: false,
  fetch: {
    detail: {
      request: {
        backendType: "nodejs",
        approach: {
          type: "simulate",
          headless: true,
        },
      },
      summary: {
        enabled: false,
        model: "gpt-3.5-turbo",
        withImage: false,
      },
    },
    stat: {
      enabled: false,
    },
    comments: {
      enabled: false,
    },
    withCache: true,
  },
  onRoomJoin: {
    sayAnnounce: {
      enabled: false,
      n: 1,
    },
  },
}

/**
 * 用户数据（不可用户手动修改）
 */
export type IWechatData = {
  roomNewInvitees: string[]
  vipLevel: number
  balance: number
  llm: {
    chatter: {
      called: number
      success: number
    }
    parser: {
      called: number
      success: number
    }
  }
}

export const defaultWechatData: IWechatData = {
  roomNewInvitees: [],
  balance: 0,
  vipLevel: 0,
  llm: {
    chatter: {
      called: 0,
      success: 0,
    },
    parser: {
      called: 0,
      success: 0,
    },
  },
}
