import { getServerSession } from "next-auth"
import { authOptions } from "./next-auth.options.js"

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)

export { ProfileUpdateProvider } from "./providers/profile/provider.js"

export { SmsProvider } from "./providers/sms/provider.js"
export {
  refreshWechatAuthToken,
  getWechatAuthToken,
  adaptWechatAuthToken,
  getWechatUserProfile,
} from "./providers/wechat/funcs/server.js"
export { WechatProvider } from "./providers/wechat/provider.js"
export { WechatAuth } from "./providers/wechat/sdk.js"

export { authOptions } from "./next-auth.options.js"
