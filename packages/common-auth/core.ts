import { PrismaAdapter } from "@auth/prisma-adapter"
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth"
import { type Adapter } from "next-auth/adapters"
import { DefaultJWT } from "next-auth/jwt"
import { prisma } from "../common-db"
import {
  SmsProvider,
  ProfileUpdateProvider,
} from "../common-sms/next-auth.provider"
import WechatProvider from "../common-wechat/auth/provider"
import { env } from "@/env"

import { WECHAT_APP_ID } from "../common-wechat/config"
import { tokenExpireSeconds } from "./store"

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
    maxAge: tokenExpireSeconds, // 1 h
  },

  callbacks: {
    // compatible with credential providers
    jwt: ({ session, user, profile, token }) => {
      // console.log("[next-auth] jwt: ", { user, token })
      if (user) {
        token.sub = user.id
        token.name = user.name
      }
      return token
    },

    session: ({ session, user, token }) => {
      // console.log("[next-auth] session: ", { session, user })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub ?? user.id,
          image: token.picture,
        },
      }
    },
  },
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

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
