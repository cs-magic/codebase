import winston from "winston"
import { fileRotateTransport } from "./transports/rotate-file.js"
import { consoleTransport } from "./transports/console.js"

export const winstonLogger = winston.createLogger({
  level: "info",
  transports: [consoleTransport, fileRotateTransport],
})
