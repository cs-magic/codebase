import { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    // name?: string | null // 已经有了？
    // image?: string // jwt 里是picture
    phone?: string
  }
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      phone?: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"]
  }

  interface User {
    // ...other properties
    // role: UserRole;
    phone?: string
  }
}
