declare global {
  // 要放在里面

  namespace PrismaJson {
    export {
      IMedia,
      ICardStat,
      ICardPlatform,
    } from "@cs-magic/p01-card/src/schema/card"

    export {
      IWechatArticleStat,
      IWechatArticleComment,
    } from "../../wechat/wxmp-article/detail/schema"

    export {
      IWechatUserData,
      IWechatUserPreference,
    } from "@cs-magic/wechaty/schema/wechat-user"

    export { TaskTimer } from "../schema/task"

    export { IUserSummary } from "../schema/user.summary"
  }
}
export { ILlmRes } from "../../../packages-to-classify/llm/schema/llm.api"
