import { GenWxmpArticleCardFetchOptions } from "@cs-magic/p01-common/schema/card"
import { type LangType } from "../../../packages-to-classify/i18n/schema"
import { LlmModelType } from "../../../packages-to-classify/llm/schema/llm.models"

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
  display: {
    lang: LangType
    maxLines: number
    style: CommandStyle
  }

  onRoomJoin?: {
    sayAnnounce?: {
      enabled?: boolean
      n?: number
    }
  }

  features: {
    chatter: {
      enabled: boolean
      model: LlmModelType
    }
    parser: {
      enabled: boolean
      options?: GenWxmpArticleCardFetchOptions
    }
    todo: {
      enabled: boolean
      filter?: string
    }
  }
}
export const defaultWechatPreference: IWechatPreference = {
  display: {
    lang: "en",
    maxLines: 20,
    style: CommandStyle.simple,
  },

  onRoomJoin: {
    sayAnnounce: {
      enabled: false,
      n: 1,
    },
  },

  features: {
    chatter: {
      enabled: false,
      model: "gpt-3.5-turbo",
    },
    parser: {
      enabled: false,
      options: {
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
    },
    todo: {
      enabled: true,
      filter: undefined,
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
