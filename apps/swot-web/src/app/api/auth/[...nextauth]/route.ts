import { authOptions } from "../../../../../../../packages/auth/src/next-auth.options" // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
import NextAuth from "next-auth"

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

export async function generateStaticParams() {
  return
}
