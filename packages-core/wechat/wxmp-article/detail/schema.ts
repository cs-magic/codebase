import { sampleWxmpArticleComment } from "../../../common/sample"

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

export type IWechatArticleComment = typeof sampleWxmpArticleComment
