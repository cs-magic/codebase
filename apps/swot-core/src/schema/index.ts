import { BackendType } from "@cs-magic/llm/schema/llm.base"
import { RequestApproachType } from "@cs-magic/swot-web/src/utils/card-platform/wechat-article/request"
import { FetchWxmpArticleDetailOptions } from "@cs-magic/wechat/wxmp-article/fetch/schema"

export type GenWxmpArticleCardFetchOptions = {
  // 1. cache
  withCache?: boolean

  // 2. detail
  detail?: FetchWxmpArticleDetailOptions

  // 3. extra
  stat?: {
    enabled?: boolean
  }

  comments?: {
    enabled?: boolean
  }

  watermark?: {
    text?: string
  }
}
export type RequestOptions = {
  backendType?: BackendType
  approach?: {
    type?: RequestApproachType
    headless?: boolean
  }
}
