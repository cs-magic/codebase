declare global {
  // 要放在里面
  import { IUserSummary } from "@/schema/user.summary"
  import { IMedia } from "@/schema/card"
  import {
    IWechatArticleStat,
    IWechatArticleComment,
  } from "../packages/common-wechat/article/detail/schema"

  namespace PrismaJson {
    type IWechatArticleStat = IWechatArticleStat
    type IWechatArticleComment = IWechatArticleComment
    type IMedia = IMedia
    type IUserSummary = IUserSummary
  }
}
