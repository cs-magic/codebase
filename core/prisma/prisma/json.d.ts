declare global {
  // 要放在里面

  namespace PrismaJson {
    export { ICallLlmResponse } from "../../../common/llm/schema/llm"

    export {
      IMedia,
      ICardStat,
      ICardPlatform,
    } from "@cs-magic/p01-card/src/schema/card"
    export {
      IWechatArticleStat,
      IWechatArticleComment,
    } from "../../../common/3rd-wechat/wxmp-article/detail/schema"

    export {
      IWechatUserData,
      IWechatUserPreference,
    } from "@cs-magic/wechaty/schema/wechat-user"
  }
}
export { IUserSummary } from "../schema/user.summary"
