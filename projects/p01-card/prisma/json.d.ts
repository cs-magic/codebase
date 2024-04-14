declare global {
  // 要放在里面

  namespace PrismaJson {
    export { ICallLLMResponse } from "../../common-llm/schema/llm"

    export { IUserSummary, IUserBasic } from "@/schema/user.summary"
    export { IMedia, ICardStat, ICardPlatform } from "@/schema/card"
    export {
      IWechatArticleStat,
      IWechatArticleComment,
    } from "../../3rd-wechat/wxmp-article/detail/schema"

    export {
      IWechatUserData,
      IWechatUserPreference,
    } from "@/schema/wechat-user"
  }
}
