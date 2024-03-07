export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/((?:tt|dashboard).*)",
    // "/",
    // "/(api|api)(.*)"
    // "/((?!.+\\.[\\w]+$|_next).*)",
  ],
}
