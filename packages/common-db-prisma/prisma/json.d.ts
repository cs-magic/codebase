declare global {
  // 要放在里面

  namespace PrismaJson {
    export { ICallLLMResponse } from "../../common-llm/schema/llm"

    export { IUserBasic } from "projects/p01-card/src/schema/user"
    export {
      IMedia,
      ICardStat,
      ICardPlatform,
    } from "@cs-magic/p01-card/src/schema/card"
    export {
      IWechatArticleStat,
      IWechatArticleComment,
    } from "../../3rd-wechat/wxmp-article/detail/schema"

    export {
      IWechatUserData,
      IWechatUserPreference,
    } from "@cs-magic/wechaty/schema/wechat-user"
  }
}
export { IUserSummary } from "../schema/user.summary"
