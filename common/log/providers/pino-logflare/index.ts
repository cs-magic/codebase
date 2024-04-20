import pino from "pino"
import { logflarePinoVercel } from "pino-logflare"

import { getEnv } from "../../../../packages/env"

const env = getEnv()

// create pino-logflare console stream for serverless functions and send function for browser logs

// create pino-logflare console stream for serverless functions and send function for browser logs
// Browser logs are going to: https://logflare.app/sources/13989
// Vercel log drain was setup to send logs here: https://logflare.app/sources/13830

const { stream, send } = logflarePinoVercel({
  apiKey: env.NEXT_PUBLIC_PINO_LOGFLARE_API_KEY!,
  sourceToken: env.NEXT_PUBLIC_PINO_LOGFLARE_SOURCE_TOKEN!,
})

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
const pinoLogflareLogger = pino(
  {
    browser: {
      transmit: {
        level: "info",
        send: send,
      },
    },
    level: "debug",
    base: {
      env: env.NODE_ENV,
      revision: env.VERCEL_GITHUB_COMMIT_SHA,
    },
  },
  stream,
)

const logUrl = "https://logflare.app/sources/31484"
pinoLogflareLogger.info(
  `===\n-- visit ${logUrl} to view the logs powered by pino and logflare\n===\n`,
)

export default pinoLogflareLogger
