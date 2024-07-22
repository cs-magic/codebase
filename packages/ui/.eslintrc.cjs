module.exports = {
  extends: [
    "../../.eslintrc.cjs",
    // 目前和 eslint@9 还不兼容，see: https://github.com/vercel/next.js/issues/64409
    "next/core-web-vitals",
  ]
}
