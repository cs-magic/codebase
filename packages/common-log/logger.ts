import { projectPath } from "@cs-magic/common/path"
import * as fs from "fs"
import path from "path"
import winston from "winston"

const logPath = path.join(projectPath, ".logs")
if (!fs.existsSync(logPath)) fs.mkdirSync(logPath)

const { combine, timestamp, printf, colorize } = winston.format

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    colorize(),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    printf((info) => `${info.timestamp} [${info.level}] ${info.message}`),
  ),
  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: path.join(logPath, "combined.log"),
    }),
  ],
})

export default logger
