import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req, event) {
    const redirect = (url: string) =>
      NextResponse.redirect(new URL(url, req.url))

    const { pathname: path, search } = req.nextUrl
    const token = req.nextauth.token

    console.log("[middleware]: ", {
      path,
      search,
      token,
    })

    if (!token?.name && !path.startsWith("/auth")) return redirect("/auth")
    else if (token?.name && path.startsWith("/auth")) return redirect("/")
  },
  {
    // 加这个的必要性， ref: https://github.com/nextauthjs/next-auth/discussions/4136#discussioncomment-2314117
    pages: {
      signIn: "/auth",
    },
  },
)

export const config = {
  matcher: [
    "/",
    "/((?:auth|tt|dashboard).*)",
    // "/(api|api)(.*)"
    // "/((?!.+\\.[\\w]+$|_next).*)",
  ],
}
