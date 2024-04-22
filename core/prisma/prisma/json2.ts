import {
  type ICardPlatform as ICardPlatform_,
  type ICardStat as ICardStat_,
  type IMedia as IMedia_,
} from "@cs-magic/p01-card/src/schema/card"
import {
  type IWechatData as IWechatData_,
  type IWechatPreference as IWechatPreference_,
} from "@cs-magic/wechaty/schema/wechat-user"
import { type ICallLlmResponse as ICallLlmResponse_ } from "../../../packages/llm/schema/llm"
import { type TaskTimer as TaskTimer_ } from "../schema/task"
import { type IUserSummary as IUserSummary_ } from "../schema/user.summary"

declare global {
  namespace PrismaJson {
    type ICallLlmResponse = ICallLlmResponse_
    type IUserSummary = IUserSummary_
    type IMedia = IMedia_
    type ICardStat = ICardStat_
    type ICardPlatform = ICardPlatform_<any>
    type TaskTimer = TaskTimer_
    type IWechatPreference = IWechatPreference_
    type IWechatData = IWechatData_
  }
}
