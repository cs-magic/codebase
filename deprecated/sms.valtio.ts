// import { proxy } from "valtio"
//
// import { SmsStage } from "@/common/lib/sms/schema"
//
// export interface ISmsState {
//   stage: SmsStage
//   phone: string
//   code: string
//   downtime: number
//   sentOk?: boolean
//   signInOk?: boolean
// }
//
// // 不需要 persist，用户刷新就全部重置（包括手机号要重新输入，验证码重新发送等）
// export const smsState = proxy<ISmsState>({
//   stage: "toSendSms",
//   phone: "",
//   code: "",
//   downtime: 0,
//   sentOk: false,
//   signInOk: false,
// })
