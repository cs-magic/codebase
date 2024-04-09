declare global {
  // 要放在里面

  namespace PrismaJson {
    export { IUserSummary, IUserBasic } from "@/schema/user.summary"
    export { IMedia, ICardStat, ICardPlatform } from "@/schema/card"
    export {
      IWechatArticleStat,
      IWechatArticleComment,
    } from "../packages/3rd-wechat/wxmp-article/detail/schema"
  }
}
