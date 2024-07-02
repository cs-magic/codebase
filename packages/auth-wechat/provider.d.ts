import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/index";
import { IWechatAdaptedProfile } from "./schema";
/**
 * todo: type hint on callbacks
 * ref:
 * 1. https://github.com/nextauthjs/next-auth/issues/5937
 * 2. node_modules/next-auth/src/providers/facebook.ts
 */
export default function WechatProvider<P extends IWechatAdaptedProfile>(options: OAuthUserConfig<P>): OAuthConfig<P>;
