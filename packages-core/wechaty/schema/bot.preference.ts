import { GenWxmpArticleCardFetchOptions } from "@cs-magic/p01-common/schema/card"
import { type LangType } from "../../../packages-to-classify/i18n/schema"
import { LlmModelType } from "@cs-magic/llm/schema/llm.models"

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

  on: {
    roomJoin: {
      sayAnnounce: {
        enabled: boolean
        n: number
      }
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
    maxLines: 100,
    style: CommandStyle.simple,
  },

  on: {
    roomJoin: {
      sayAnnounce: {
        enabled: true,
        n: 5,
      },
    },
  },

  features: {
    chatter: {
      enabled: true,
      model: "gpt-3.5-turbo",
    },
    parser: {
      enabled: true,
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
  room: {
    newInvitees: string[]
    welcome: {
      sent: boolean
    }
  }
  vipLevel: number
  balance: number
  plugin: {
    chatter: {
      turnOnReminded: boolean
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
  room: {
    newInvitees: [],
    welcome: {
      sent: false,
    },
  },

  balance: 0,
  vipLevel: 0,
  plugin: {
    chatter: {
      turnOnReminded: false,
      called: 0,
      success: 0,
    },
    parser: {
      called: 0,
      success: 0,
    },
  },
}
