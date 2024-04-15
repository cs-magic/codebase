import { projectPath } from "@cs-magic/common/path"
import * as fs from "fs"
import path from "path"
import winston from "winston"

const logPath = path.join(projectPath, ".logs")
if (!fs.existsSync(logPath)) fs.mkdirSync(logPath)

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
  ),
  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: path.join(logPath, "combined.log"),
    }),
  ],
})

export default logger
