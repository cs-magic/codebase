import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req, event) {
    const redirect = (url: string) =>
      NextResponse.redirect(new URL(url, req.url))

    const path = req.nextUrl.pathname
    const token = req.nextauth.token
    console.log({ path, token })
    // if (!token?.name && !path.startsWith("/auth")) return redirect("/auth")
    // else if (token?.name && path.startsWith("/auth")) return redirect("/")
  },
  {
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
