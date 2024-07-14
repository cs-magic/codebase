import winston from "winston"
import { consoleTransport } from "./transports/console.js"
import { fileRotateTransport } from "./transports/rotate-file.js"

export const winstonLogger = winston.createLogger({
  level: "info",
  transports: [consoleTransport, fileRotateTransport],
})
