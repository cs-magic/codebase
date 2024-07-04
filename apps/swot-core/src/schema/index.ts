import { BackendType } from "@cs-magic/llm/schema/llm.base"

import { RequestApproachType } from "./card"

import { FetchWxmpArticleDetailOptions } from "./wxmp-article"

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
