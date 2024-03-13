import { env } from "@/env"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { CallbacksOptions, type NextAuthOptions } from "next-auth"
import { type Adapter } from "next-auth/adapters"
import { ProfileUpdateProvider } from "../common-auth-profile/provider"
import { prisma } from "../common-db"
import { SmsProvider } from "../common-auth-sms/next-auth.provider"
import WechatProvider from "../common-auth-wechat/provider"

import { WECHAT_APP_ID } from "../common-wechat/config"
import { tokenExpireSeconds } from "./config"
import { IAuth } from "./types"

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  debug: true,

  pages: {
    signIn: "/auth",
    // signOut: "/auth",
  },

  session: {
    // Credentials should use `jwt`, ref: https://github.com/nextauthjs/next-auth/issues/3970#issuecomment-1046347097
    strategy: "jwt",
    maxAge: tokenExpireSeconds,
  },

  callbacks: {
    // compatible with credential providers
    jwt: ({ session, user, profile, token }) => {
      console.log("[next-auth] jwt: ", { user, token })

      // 首次注册入表
      if (user) {
        token.sub = user.id
        token.name = user.name
        token.image = user.image ?? null
        token.wxid = user.wxid
        token.phone = user.phone
      }

      // 每次登录
      if (profile) {
        token.sub = profile.id
        token.name = profile.name ?? null
        token.image = profile.image ?? null
        token.phone = profile.phone
        token.wxid = profile.wxid
      }

      return token
    },

    session: ({ session, user, token }) => {
      console.log("[next-auth] session: ", { session, user })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub ?? user.id,
          name: token.name,
          image: token.image,
        },
      }
    },
  } as Partial<
    CallbacksOptions<// custom profile
    IAuth>
  >,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    WechatProvider({
      clientId: WECHAT_APP_ID,
      clientSecret: env.WECHAT_APP_SECRET,
    }),

    SmsProvider,

    ProfileUpdateProvider,

    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
}
