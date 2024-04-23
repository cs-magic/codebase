import { env } from "../../packages-to-classify/env"
import WechatProvider from "./provider"

const provider = WechatProvider({
  clientId: env.NEXT_PUBLIC_WECHAT_APP_ID!,
  clientSecret: env.WECHAT_APP_SECRET!,
})

console.log({ provider })
