declare global {
  // 要放在里面

  namespace PrismaJson {
    export { IUserSummary, IUserBasic } from "@/schema/user.summary"
    export { IMedia, ICardStat, ICardPlatform, ISummary } from "@/schema/card"
    export {
      IWechatArticleStat,
      IWechatArticleComment,
    } from "../packages/common-platform-wechat/wxmp-article/detail/schema"
  }
}
