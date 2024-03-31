import { IApi } from "../../../common-api/schema"
import { wechatArticleCommentSample } from "./sample"

export type IFetchWechatArticleStat = {
  // query
  uin: string
  key: string
  __biz: string

  // form
  mid: string
  sn: string
  idx: "1" // todo ?
  is_only_read: "1"
}

export type IWechatArticleStat = {
  readnum: number
  likenum: number
  oldlikenum: number
  comment_count: number
  biz: string
}

export type IWechatArticleComment = typeof wechatArticleCommentSample

export type IWechatArticleDetail = {
  stat: IWechatArticleStat | null
  comments: IWechatArticleComment[] | null
}

export type IFetchWechatArticleDetail = (
  url: string,
) => Promise<IApi<IWechatArticleDetail>>

export type IFetchWechatArticleDetailConfig = {
  provider: "mock" | "wxapi"
  // db hook
  get?: (id: string) => Promise<IWechatArticleDetail | null>
  commentsDisabled?: boolean
  commentsCacheIgnored?: boolean
  statDisabled?: boolean
  statCacheIgnored?: boolean
}
