/**
 * ref" Better Logging in Next.js Apps with Pino | by Tat Leung | Level Up Coding, https://levelup.gitconnected.com/better-logging-in-next-js-apps-with-pino-f973de4dd8dd
 */

import pino, { Logger } from "pino"

import { logLevelData } from "./config.js"

const logLevels = new Map<string, string>(Object.entries(logLevelData))

export function getLogLevel(logger: string): string {
  return logLevels.get(logger) || logLevels.get("*") || "info"
}

export function getLogger(name: string): Logger {
  return pino({ name, level: getLogLevel(name) })
}

export const pinoLogger = getLogger("default")
