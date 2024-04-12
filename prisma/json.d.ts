declare global {
  // 要放在里面

  namespace PrismaJson {
    export { ICallLLMResponse } from "../packages/common-llm/schema/llm"

    export { IUserSummary, IUserBasic } from "@/schema/user.summary"
    export { IMedia, ICardStat, ICardPlatform } from "@/schema/card"
    export {
      IWechatArticleStat,
      IWechatArticleComment,
    } from "../packages/3rd-wechat/wxmp-article/detail/schema"

    export {
      IWechatUserData,
      IWechatUserPreference,
    } from "../src/schema/wechat-user"
  }
}
