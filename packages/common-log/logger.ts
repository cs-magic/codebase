import winston from "winston"
import { consoleTransport } from "./winston/transports/console"
import { fileRotateTransport } from "./winston/transports/rotate-file"

export const logger = winston.createLogger({
  level: "info",
  transports: [consoleTransport, fileRotateTransport],
})

export default logger
