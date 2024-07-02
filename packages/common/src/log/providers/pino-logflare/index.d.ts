/**
 * repo: https://github.com/Logflare/next-pino-logflare-logging-example?tab=readme-ov-file
 * discussion: Recommended logging package or framework · vercel/next.js · Discussion #13214, https://github.com/vercel/next.js/discussions/13214
 * log dashboard: https://logflare.app/sources/31484
 *
 * 支持 %o，但是是基于 json
 * todo:
 * - 支持 format
 * - 支持 rotate-file
 * - 支持 console 颜色
 */
declare const pinoLogflareLogger: import("pino").Logger<never>;
export default pinoLogflareLogger;
