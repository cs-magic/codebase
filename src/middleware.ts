export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    // intro 和 validation 都不要加 auth，因为还没登陆
    // intro 和 validation 都是需要 phone、code 的，所以算是密码登录

    "/((?:tt).*)",
    // "/",
    // "/(api|api)(.*)"
    // "/((?!.+\\.[\\w]+$|_next).*)",
  ],
}
