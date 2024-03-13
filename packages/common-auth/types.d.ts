import { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

export interface IAuth {
  id: string
  // the optional of (name, image) is for callback (like signIn) compatible
  name?: string | null
  image?: string | null
  phone: string | null
  wxid: string | null
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT, IAuth {}
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  /**
   * 第三方首次入表
   */
  interface User extends IAuth {}

  /**
   * 第三方登录返回
   */
  interface Profile extends IAuth {}

  /**
   * user/profile --> token --> session
   */
  interface Session extends DefaultSession {
    user: IAuth
  }
}
