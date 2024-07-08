import { pinoLogger } from "./providers/pino/index.js"

// export const logger = pinoLogflareLogger
export const logger = pinoLogger

export * from "./schema.js"

export default logger
