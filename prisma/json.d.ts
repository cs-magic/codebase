declare global {
  // 要放在里面

  namespace PrismaJson {
    export { IArticleSummary } from "../packages/common-article/schema"
    export { IUserSummary } from "@/schema/user.summary"
    export { IMedia } from "@/schema/card"
    export {
      IWechatArticleStat,
      IWechatArticleComment,
    } from "../packages/common-wechat/article/detail/schema"
  }
}
