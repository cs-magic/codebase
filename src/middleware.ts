export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/((?:tt).*)",
    // "/",
    // "/(api|api)(.*)"
    // "/((?!.+\\.[\\w]+$|_next).*)",
  ],
}
