declare global {
  // 要放在里面

  namespace PrismaJson {
    export { IUserSummary } from "@/schema/user.summary"
    export { IMedia, ICardStat, ICardPlatform, IModel } from "@/schema/card"
    export {
      IWechatArticleStat,
      IWechatArticleComment,
    } from "../packages/common-platform-wechat/article/detail/schema"
  }
}
