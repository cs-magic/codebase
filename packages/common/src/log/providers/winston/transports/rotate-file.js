import winston, { format } from "winston";
import "winston-daily-rotate-file"; // for new winston.transports.DailyRotateFile
/**
 * ref:
 */
export const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: "combined-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "14d",
    format: format.combine(format.timestamp(), format.json()),
});
