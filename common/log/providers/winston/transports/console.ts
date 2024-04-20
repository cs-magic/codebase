import winston, { format } from "winston"
import { consoleLikeFormat } from "../formats/console-like"

export const consoleTransport = new winston.transports.Console({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    // format.prettyPrint(),
    format.align(),
    // format.json(),
    // format.splat(), // <-- to print logs, ref: https://stackoverflow.com/a/56092196/9422455
    consoleLikeFormat,
  ),
})
